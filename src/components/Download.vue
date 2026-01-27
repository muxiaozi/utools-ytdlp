<template>
  <div class="container">
    <div class="operation-bar">
      <div>
        <el-button text :icon="Plus" @click="openCreateDialog">新建</el-button>
        <template v-if="batchDeleteEnabled">
          <el-divider direction="vertical" />
          <el-button text :icon="Delete" type="danger" @click="batchDelete"
            >批量删除</el-button
          >
        </template>
      </div>
      <div>
        <el-button text :icon="QuestionFilled" @click="openHelper"></el-button>
        <el-button text :icon="Setting" @click="openSetting"></el-button>
      </div>
    </div>

    <el-table
      row-key="id"
      :data="tableData"
      style="width: 100%"
      :height="tableHeight"
      @selection-change="onSelectionChange"
    >
      <el-table-column type="selection" width="30" />
      <el-table-column label="标题" prop="title">
        <template #default="{ row }">
          <div class="title-cell">
            <span class="title-text">{{ row.title }}</span>
            <div class="action-buttons">
              <el-button
                :icon="Folder"
                circle
                size="small"
                text
                type="primary"
                @click="openFileFolder(row)"
                title="打开文件位置"
              />
              <el-button
                :icon="Document"
                circle
                size="small"
                text
                type="primary"
                @click="openDetail(row)"
                title="查看详情"
              />
              <el-button
                :icon="Delete"
                circle
                size="small"
                text
                type="danger"
                @click="deleteVideo(row)"
                title="删除任务"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="大小" prop="size" width="100">
        <template #default="{ row }">{{ formatSize(row.size) }}</template>
      </el-table-column>
      <el-table-column label="时长" prop="duration" width="100">
        <template #default="{ row }">{{
          formatDuration(row.duration)
        }}</template>
      </el-table-column>
      <el-table-column label="平台" prop="platform" width="100" />
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-tag
            :type="
              row.state === 'downloading'
                ? 'warning'
                : row.state === 'finished'
                  ? 'success'
                  : row.state === 'failed'
                    ? 'danger'
                    : 'info'
            "
            :percentage="row.progress"
            >{{
              row.state === "downloading"
                ? `下载中 ${row.progress}%`
                : row.state === "finished"
                  ? "已完成"
                  : row.state === "failed"
                    ? "下载失败"
                    : "等待中"
            }}</el-tag
          >
          <el-button
            v-if="row.state === 'failed'"
            :icon="Retry"
            circle
            size="small"
            text
            @click="startDownload([row])"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="tableCurrentPage"
      v-model:page-size="tablePageSize"
      :page-sizes="[10, 20, 50]"
      background
      layout="total, sizes, prev, pager, next"
      :total="videoItems.length"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 10px"
    />

    <el-dialog
      v-model="prepareDownload.dialogVisible"
      title="新建下载任务"
      width="90%"
      :close-on-click-modal="false"
      @closed="onPrepareDownloadDialogClosed"
      style="max-width: 1000px"
    >
      <prepare-download :key="createTaskDialogKey" @download="startDownload" />
    </el-dialog>

    <el-drawer
      v-if="selectVideo"
      v-model="videoDetailVisible"
      :title="selectVideo.title"
      size="50%"
    >
      <div class="drawer-content">
        <el-image
          :src="selectVideo.thumbnail"
          referrerpolicy="no-referrer"
          fit="contain"
          class="thumbnail-image"
        ></el-image>
        <el-descriptions border :column="1" style="margin-top: 20px">
          <el-descriptions-item label="分辨率" :min-width="80"
            >{{ selectVideo.width }}x{{
              selectVideo.height
            }}</el-descriptions-item
          >
          <el-descriptions-item label="Url">
            <el-link
              type="primary"
              @click="openLink(selectVideo.url)"
              class="url-link"
            >
              {{ selectVideo.url }}
            </el-link>
          </el-descriptions-item>
          <el-descriptions-item label="UP">
            <el-link
              type="primary"
              @click="
                openUploaderLink(selectVideo.platform, selectVideo.uploader_id)
              "
            >
              {{ selectVideo.uploader }}
            </el-link>
          </el-descriptions-item>
          <el-descriptions-item label="时长">
            {{ formatDuration(selectVideo.duration) }}
          </el-descriptions-item>
          <el-descriptions-item label="大小">
            {{ formatSize(selectVideo.size) }}
          </el-descriptions-item>
          <el-descriptions-item label="平台">
            {{ selectVideo.platform }}
          </el-descriptions-item>
          <el-descriptions-item label="质量">{{
            formatQuality(selectVideo.quality)
          }}</el-descriptions-item>
          <el-descriptions-item label="时间">{{
            selectVideo.time
          }}</el-descriptions-item>
          <el-descriptions-item label="描述">
            <div class="description-text">{{ selectVideo.description }}</div>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive, computed, inject } from "vue";
import { useRouter } from "vue-router";
import {
  Setting,
  Plus,
  Folder,
  Document,
  Delete,
  Refresh as Retry,
  QuestionFilled,
} from "@element-plus/icons-vue";
import PrepareDownload from "./PrepareDownload.vue";
import { DisplayVideoItem, VideoItem } from "../types";
import { prepareDownload, globalSetting, videoItems } from "../store";
import {
  formatSize,
  formatDuration,
  formatQuality,
  makeUploaderLink,
  makeFilePath,
} from "../utils";
import _ from "lodash";
import { ElMessageBox } from "element-plus";
import { DownloadQueue } from "../download_queue";

const tableData = computed(() => {
  const start = (tableCurrentPage.value - 1) * tablePageSize.value;
  const end = start + tablePageSize.value;
  const items = _.slice(videoItems, start, end);
  for (const item of items) {
    if (item.state == "pending") {
      item.state = window.fileExists(makeFilePath(item))
        ? "finished"
        : "failed";
    }
  }
  return items;
});
const createTaskDialogKey = ref(0);
const videoDetailVisible = ref(false);
const selectVideo = ref<DisplayVideoItem>();
const router = useRouter();
const multipleSelection = ref<DisplayVideoItem[]>([]);
const tableHeight = ref(400);
const batchDeleteEnabled = computed(() => {
  return multipleSelection.value.length > 0;
});
const tableCurrentPage = ref(1);
const tablePageSize = ref(10);
const downloadQueue = inject<DownloadQueue>("downloadQueue");

function openLink(url: string) {
  utools.shellOpenExternal(url);
}

function openUploaderLink(platform: string, id: string) {
  const link = makeUploaderLink(platform, id);
  if (link) {
    openLink(link);
  }
}

function onCurrentChange(page: number) {
  tableCurrentPage.value = page;
}

function onSizeChange(size: number) {
  tablePageSize.value = size;
}

function onPrepareDownloadDialogClosed() {
  prepareDownload.url = "";
  createTaskDialogKey.value++;
}

async function onSelectionChange(items: DisplayVideoItem[]) {
  multipleSelection.value = items;
}

async function startDownload(items: VideoItem[]) {
  const itemToDownload: DisplayVideoItem[] = [];
  for (const item of items) {
    let displayItem = videoItems.find((v) => v.id === item.id);
    if (!displayItem) {
      const videoCount = globalSetting.videoCount;

      // 下载时品质以全局设置为准
      item.quality = globalSetting.quality;
      // 添加到表格
      displayItem = reactive<DisplayVideoItem>({
        ...item,
        progress: 0,
        state: "downloading",
        index: videoCount,
      });
      itemToDownload.push(displayItem);

      // 保存到数据库
      utools.dbStorage.setItem("videos/" + videoCount, _.cloneDeep(item));
      globalSetting.videoCount = videoCount + 1;
    } else {
      // 重置状态
      displayItem.progress = 0;
      displayItem.state = "downloading";
    }

    console.log("添加下载任务到队列:", item.url);
    downloadQueue
      ?.add(displayItem)
      .then((result) => {
        console.log("下载成功:", item.title, result);
      })
      .catch((error) => {
        console.error("下载失败:", item.title, error);
      });
  }

  videoItems.unshift(...itemToDownload);
}

function openCreateDialog() {
  prepareDownload.dialogVisible = true;
}

function openSetting() {
  router.push({ name: "setting" });
}

function openHelper() {
  router.push({ name: "helper" });
}

function openFileFolder(row: DisplayVideoItem) {
  utools.shellShowItemInFolder(makeFilePath(row));
}

function openDetail(row: DisplayVideoItem) {
  selectVideo.value = row;
  videoDetailVisible.value = true;
}

function doDeleteVideo(row: DisplayVideoItem) {
  utools.dbStorage.removeItem("videos/" + row.index);
  const index = videoItems.findIndex((item) => item.id === row.id);
  if (index > -1) {
    videoItems.splice(index, 1);
  }
}

function batchDelete() {
  const count = multipleSelection.value.length;
  const messageHtml = `
    <p style="margin-bottom: 12px;">确定删除选中的 ${count} 个视频吗？</p>
    <label style="display: flex; align-items: center; cursor: pointer; user-select: none;">
      <input type="checkbox" id="batch-delete-source-file-checkbox" style="margin-right: 8px; cursor: pointer;" />
      <span>同时删除源文件</span>
    </label>
  `;

  ElMessageBox.confirm(messageHtml, "批量删除视频", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    dangerouslyUseHTMLString: true,
  })
    .then(async () => {
      // 获取 checkbox 的状态
      const checkbox = document.getElementById(
        "batch-delete-source-file-checkbox",
      ) as HTMLInputElement;
      const deleteSourceFile = checkbox?.checked || false;

      // 删除所有选中的视频
      for (let item of multipleSelection.value) {
        // 删除数据库记录
        doDeleteVideo(item);

        // 如果选择删除源文件，则删除文件
        if (deleteSourceFile) {
          const filePath = makeFilePath(item);
          if (await window.fileExists(filePath)) {
            window.deleteFile(filePath);
            console.log("源文件已删除:", filePath);
          }
        }
      }
    })
    .catch(() => {});
}

function deleteVideo(row: DisplayVideoItem) {
  const messageHtml = `
    <p style="margin-bottom: 12px;">确定删除 "${row.title}" 吗？</p>
    <label style="display: flex; align-items: center; cursor: pointer; user-select: none;">
      <input type="checkbox" id="delete-source-file-checkbox" style="margin-right: 8px; cursor: pointer;" />
      <span>同时删除源文件</span>
    </label>
  `;

  ElMessageBox.confirm(messageHtml, "删除视频", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    dangerouslyUseHTMLString: true,
  })
    .then(async () => {
      // 获取 checkbox 的状态
      const checkbox = document.getElementById(
        "delete-source-file-checkbox",
      ) as HTMLInputElement;
      const deleteSourceFile = checkbox?.checked || false;

      // 删除数据库记录
      doDeleteVideo(row);

      // 如果选择删除源文件，则删除文件
      if (deleteSourceFile) {
        const filePath = makeFilePath(row);
        if (window.fileExists(filePath)) {
          window.deleteFile(filePath);
          console.log("源文件已删除:", filePath);
        }
      }
    })
    .catch(() => {
      // 用户取消删除操作
    });
}

function calculateTableHeight() {
  // 操作栏高度约为 40px，加上一些边距和padding，预留 60px
  const operationBarHeight = 100;
  tableHeight.value = window.innerHeight - operationBarHeight;
}

function handleResize() {
  calculateTableHeight();
}

onMounted(async () => {
  // 初始化表格高度
  setTimeout(() => {
    calculateTableHeight();
  }, 100);

  // 监听窗口大小变化
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  // 移除窗口大小变化监听
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped lang="css">
.container {
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 100%;
}

.operation-bar {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--el-border-color-light);
  border-bottom: 1px solid var(--el-border-color-light);
}

.title-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.title-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.action-buttons {
  display: none;
  margin-left: 8px;
}

.title-cell:hover .action-buttons {
  display: flex;
}

.drawer-content {
  overflow-x: hidden;
  word-break: break-word;
}

.thumbnail-image {
  width: 100%;
  height: auto;
  max-width: 100%;
  display: block;
}

.thumbnail-image :deep(img) {
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
}

.url-link {
  word-break: break-all;
  overflow-wrap: anywhere;
}

.description-text {
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
}
</style>
