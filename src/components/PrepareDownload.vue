<template>
  <div>
    <div style="display: flex; gap: 10px">
      <el-input
        v-model="prepareDownload.url"
        clearable
        placeholder="请输入视频链接"
        @input="onUrlChanged"
        style="width: 100%; margin-bottom: 20px"
      />
      <el-button
        :type="btnType"
        :disabled="!btnEnabled"
        @click="onClick"
        :loading="btnLoading"
        >{{ btnText }}</el-button
      >
    </div>
    <el-table
      row-key="id"
      :data="tableData"
      style="width: 100%"
      @selection-change="onSelectionChange"
    >
      <el-table-column type="selection" width="30" />
      <el-table-column label="标题" prop="title">
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.title" placement="top">
            <span style="white-space: nowrap">{{ row.title }}</span>
          </el-tooltip>
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
      <el-table-column label="最高品质" prop="quality" width="100">
        <template #default="{ row }">{{ formatQuality(row.quality) }}</template>
      </el-table-column>
      <el-table-column label="平台" prop="platform" width="100" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { VideoItem } from "../types";
import { formatSize, formatDuration, formatQuality } from "../utils";
import { localSetting, prepareDownload } from "../store";
import { ElMessageBox } from "element-plus";

const btnState = ref<"analyize" | "download">("analyize");
const btnText = computed(() => {
  return btnState.value === "analyize" ? "分析" : "下载";
});
const btnType = computed(() => {
  return btnState.value === "analyize" ? "primary" : "success";
});
const tableData = ref<VideoItem[]>([]);
const multipleSelection = ref<VideoItem[]>([]);
const btnEnabled = computed(() => {
  return (
    (btnState.value === "analyize" && prepareDownload.url != "") ||
    (btnState.value === "download" && multipleSelection.value.length > 0)
  );
});
const btnLoading = ref(false);

const emits = defineEmits(["download"]);

const onUrlChanged = (_value: string) => {
  btnState.value = "analyize";
};

const onSelectionChange = (selection: VideoItem[]) => {
  multipleSelection.value = selection;
};

const onClick = () => {
  if (btnState.value === "analyize") {
    analyzeLink();
  } else {
    emits("download", multipleSelection.value);
    prepareDownload.dialogVisible = false;
  }
};

function collectVideoItem(result: any): VideoItem[] {
  let items: VideoItem[] = [];
  if (result._type == "playlist") {
    for (let item of result.entries) {
      items.push(...collectVideoItem(item));
    }
  } else {
    items.push({
      id: result.id,
      title: result.title,
      url: result.original_url,
      time: new Date().toLocaleString(),
      size: result.filesize_approx,
      thumbnail: result.thumbnail,
      type: "video",
      platform: result.extractor_key,
      quality: result.format,
      width: result.width,
      height: result.height,
      uploader: result.uploader,
      uploader_id: result.uploader_id,
      description: result.description,
      duration: result.duration,
      fps: result.fps,
      ext: result.ext,
    });
  }
  return items;
}

const analyzeLink = async () => {
  tableData.value = [];
  console.log("分析链接:", prepareDownload.url);
  try {
    btnLoading.value = true;
    let result = await window.ytdlp.getInfoAsync(prepareDownload.url, {
      cookies: localSetting.cookiePath,
      proxy: localSetting.useProxy ? localSetting.proxy : undefined,
      jsRuntime: localSetting.denoPath
        ? `deno:${localSetting.denoPath}`
        : "node",
    });
    console.log("分析结果:", result);
    tableData.value = collectVideoItem(result);
    btnState.value = "download";
  } catch (error) {
    console.error("分析链接出错:", error);
    ElMessageBox.alert(
      `
    1. 检查链接是否正确<br>
    2. 检查是否设置了代理<br>
    3. 检查是否设置了cookie
    `,
      "分析链接失败",
      { type: "error", dangerouslyUseHTMLString: true },
    );
  } finally {
    btnLoading.value = false;
  }
};
</script>

<style scoped></style>
