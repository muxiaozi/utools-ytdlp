<template>
  <div>
    <div style="display: flex; gap: 10px">
      <el-input
        v-model="url"
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
import { ref, computed, onMounted } from "vue";
import { VideoItem } from "../types";
import { formatSize, formatDuration, formatQuality } from "../utils";
import { localSetting } from "../store";

const url = ref("");
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
    (btnState.value === "analyize" && url.value !== "") ||
    (btnState.value === "download" && multipleSelection.value.length > 0)
  );
});
const btnLoading = ref(false);

const emits = defineEmits(["download"]);
const props = defineProps<{
  url?: string | null;
}>();

onMounted(async () => {
  if (props.url) {
    url.value = props.url;
  }
});

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
  }
};

const analyzeLink = async () => {
  tableData.value = [];
  console.log("分析链接:", url.value);
  try {
    btnLoading.value = true;
    let result = await window.ytdlp.getInfoAsync(url.value, {
      cookies: localSetting.cookiePath,
      proxy: localSetting.useProxy ? localSetting.proxy : undefined,
      additionalOptions: localSetting.denoPath
        ? ["--js-runtimes", `deno:${localSetting.denoPath}`]
        : undefined,
    });
    console.log("分析结果:", result);
    if (result._type == "video") {
      tableData.value.push({
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
    } else if (result._type == "playlist") {
      for (let item of result.entries) {
        tableData.value.push({
          id: item.id,
          title: item.title,
          url: item.original_url,
          time: new Date().toLocaleString(),
          size: item.filesize_approx,
          thumbnail: item.thumbnail,
          type: "video",
          platform: item.extractor_key,
          quality: item.format,
          width: item.width,
          height: item.height,
          uploader: item.uploader,
          uploader_id: item.uploader_id,
          description: item.description,
          duration: item.duration,
          fps: item.fps,
          ext: item.ext,
        });
      }
    }
    btnState.value = "download";
  } catch (error) {
    console.error("分析链接出错:", error);
  } finally {
    btnLoading.value = false;
  }
};
</script>

<style scoped></style>
