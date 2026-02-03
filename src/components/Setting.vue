<template>
  <div class="setting-container">
    <el-page-header @back="goBack" class="page-header">
      <template #content>
        <span> 设置 </span>
      </template>
      <template #extra>
        <el-button
          v-if="downloadComponentsVisible"
          @click="installComponents"
          :loading="downloadComponentsLoading"
          >安装组件</el-button
        >
      </template>
    </el-page-header>

    <el-divider style="margin: 0px" />

    <el-form label-width="auto" class="setting-form">
      <el-form-item label="下载质量">
        <el-radio-group v-model="globalSettingState.quality">
          <el-radio value="highest">最高</el-radio>
          <el-radio value="2160p">4K</el-radio>
          <el-radio value="1440p">2K</el-radio>
          <el-radio value="1080p">1080P</el-radio>
          <el-radio value="720p">720P</el-radio>
          <el-radio value="360p">360P</el-radio>
          <el-radio value="lowest">最低</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="下载目录">
        <div class="singleline-box">
          <el-input
            v-model="localSettingState.outputDir"
            readonly
            style="flex: 1"
          />
          <el-button-group>
            <el-button @click="selectOutputDir">选择目录</el-button>
            <el-button @click="openOutputDir">打开目录</el-button>
          </el-button-group>
        </div>
      </el-form-item>
      <el-form-item label="YtDlp 路径">
        <div class="singleline-box">
          <el-input
            v-model="localSettingState.ytdlpPath"
            readonly
            :suffix-icon="ytdlpPathIcon"
          />
          <el-button @click="selectYtdlpFile">选择文件</el-button>
        </div>
      </el-form-item>
      <el-form-item label="FFmpeg 路径">
        <div class="singleline-box">
          <el-input
            v-model="localSettingState.ffmpegPath"
            readonly
            :suffix-icon="ffmpegPathIcon"
          />
          <el-button @click="selectFFmpegFile">选择文件</el-button>
        </div>
      </el-form-item>
      <el-form-item label="Deno 路径">
        <div class="singleline-box">
          <el-input
            v-model="localSettingState.denoPath"
            readonly
            :suffix-icon="denoPathIcon"
          />
          <el-button @click="selectDenoFile">选择文件</el-button>
        </div>
      </el-form-item>
      <el-form-item label="Cookie 路径">
        <div class="singleline-box">
          <el-input v-model="localSettingState.cookiePath" readonly />
          <el-button @click="selectCookieFile">选择文件</el-button>
        </div>
      </el-form-item>
      <el-form-item label="代理地址">
        <div class="singleline-box">
          <el-input
            v-model="localSettingState.proxy"
            :disabled="!localSettingState.useProxy"
            placeholder="例如 http://127.0.0.1:1080"
          />
          <el-checkbox border v-model="localSettingState.useProxy"
            >启用</el-checkbox
          >
        </div>
      </el-form-item>
      <el-form-item label="通知">
        <div class="singleline-box">
          <el-checkbox v-model="globalSettingState.notifyComponentUpdate"
            >组件有更新</el-checkbox
          >
          <el-checkbox v-model="globalSettingState.notifyDownloadFinish"
            >下载完成</el-checkbox
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { localSettingState, globalSettingState } from "../store";
import {
  getUpdatableComponents,
  exename,
  getComponentMetadata,
  shouldNotifyComponentUpdate,
} from "../utils";

const router = useRouter();
const downloadComponentsVisible = computed(() => {
  return (
    !localSettingState.ytdlpPath ||
    !localSettingState.ffmpegPath ||
    !localSettingState.denoPath ||
    getUpdatableComponents().length > 0
  );
});
const downloadComponentsLoading = ref(false);
const ytdlpPathIcon = computed(() => {
  if (
    !localSettingState.ytdlpPath ||
    localSettingState.ytdlpSha256 !== getComponentMetadata().ytdlp.sha256
  ) {
    return "Download";
  }
  return "";
});
const ffmpegPathIcon = computed(() => {
  if (
    !localSettingState.ffmpegPath ||
    localSettingState.ffmpegSha256 !== getComponentMetadata().ffmpeg.sha256
  ) {
    return "Download";
  }
  return "";
});
const denoPathIcon = computed(() => {
  if (
    !localSettingState.denoPath ||
    localSettingState.denoSha256 !== getComponentMetadata().deno.sha256
  ) {
    return "Download";
  }
  return "";
});

onMounted(async () => {
  try {
    if (!window.ytdlp.isInitialized()) {
      ElMessageBox.confirm("未找到 FFmpeg 或 YtDlp 组件", "提示", {
        confirmButtonText: "帮我搞定",
        cancelButtonText: "我自己来",
        type: "primary",
        showClose: false,
        closeOnClickModal: false,
      })
        .then(() => {
          installComponents();
        })
        .catch(() => {});
    } else if (shouldNotifyComponentUpdate()) {
      let component_list = getUpdatableComponents().join(", ");
      ElMessageBox.confirm(`组件新版本可用: ${component_list}`, "提示", {
        confirmButtonText: "开始更新",
        cancelButtonText: "稍后再说",
        type: "primary",
        showClose: false,
        closeOnClickModal: false,
      })
        .then(() => {
          installComponents();
        })
        .catch(() => {});
    }
  } catch (error) {
    console.error("Error during YtdlpManager initialization:", error);
  }
});

const goBack = () => {
  router.back();
};

const selectOutputDir = () => {
  const path = utools.showOpenDialog({
    title: "选择下载目录",
    defaultPath: localSettingState.outputDir,
    properties: ["openDirectory"],
  });
  if (path && path.length > 0) {
    localSettingState.outputDir = path[0];
  }
};

const openOutputDir = () => {
  utools.shellOpenPath(localSettingState.outputDir);
};

const selectYtdlpFile = async () => {
  const path = utools.showOpenDialog({
    title: "选择 YtDlp 可执行文件",
    defaultPath: localSettingState.ytdlpPath,
    properties: ["openFile"],
  });
  if (path && path.length > 0) {
    localSettingState.ytdlpPath = path[0];
    localSettingState.ytdlpSha256 = await window.fileSha256(
      localSettingState.ytdlpPath,
    );
    window.ytdlp.init({
      ffmpegPath: localSettingState.ffmpegPath,
      binaryPath: localSettingState.ytdlpPath,
    });
  }
};

const selectFFmpegFile = async () => {
  const path = utools.showOpenDialog({
    title: "选择 FFmpeg 可执行文件",
    defaultPath: localSettingState.ffmpegPath,
    properties: ["openFile"],
  });
  if (path && path.length > 0) {
    localSettingState.ffmpegPath = path[0];
    localSettingState.ffmpegSha256 = await window.fileSha256(
      localSettingState.ffmpegPath,
    );
    window.ytdlp.init({
      ffmpegPath: localSettingState.ffmpegPath,
      binaryPath: localSettingState.ytdlpPath,
    });
  }
};

const selectDenoFile = async () => {
  const path = utools.showOpenDialog({
    title: "选择 Deno 可执行文件",
    defaultPath: localSettingState.denoPath,
    properties: ["openFile"],
  });
  if (path && path.length > 0) {
    localSettingState.denoPath = path[0];
    localSettingState.denoSha256 = await window.fileSha256(
      localSettingState.denoPath,
    );
  }
};

const selectCookieFile = () => {
  const path = utools.showOpenDialog({
    title: "选择 Cookie 文件",
    defaultPath: localSettingState.cookiePath,
    properties: ["openFile"],
    filters: [{ name: "Cookie Files", extensions: ["txt"] }],
  });
  if (path && path.length > 0) {
    localSettingState.cookiePath = path[0];
  }
};

const installComponents = async () => {
  try {
    const componentsDir = window.pathJoin(
      utools.getPath("appData"),
      "utools-ytdlp",
    );
    console.log("make dir", componentsDir);
    window.mkdir(componentsDir);
    const componentMetadata = getComponentMetadata();

    downloadComponentsLoading.value = true;
    console.log("Checking YtDlp");
    if (
      !localSettingState.ytdlpPath ||
      !window.fileExists(localSettingState.ytdlpPath) ||
      localSettingState.ytdlpSha256 !== componentMetadata.ytdlp.sha256
    ) {
      const outputPath = window.pathJoin(componentsDir, exename("yt-dlp"));
      console.log("Downloading yt-dlp to:", outputPath);
      await window.downloadFileAsync(componentMetadata.ytdlp.url, outputPath);
      localSettingState.ytdlpPath = outputPath;
      localSettingState.ytdlpSha256 = await window.fileSha256(outputPath);
      try {
        window.chmod(outputPath, 0o755);
      } catch (_err) {}
    }

    console.log("Checking FFmpeg");
    if (
      !localSettingState.ffmpegPath ||
      !window.fileExists(localSettingState.ffmpegPath) ||
      localSettingState.ffmpegSha256 !== componentMetadata.ffmpeg.sha256
    ) {
      const outputPath = window.pathJoin(componentsDir, exename("ffmpeg"));
      console.log("Downloading ffmpeg to:", outputPath);
      await window.downloadFileAsync(componentMetadata.ffmpeg.url, outputPath);
      localSettingState.ffmpegPath = outputPath;
      localSettingState.ffmpegSha256 = await window.fileSha256(outputPath);
      try {
        window.chmod(outputPath, 0o755);
      } catch (_err) {}
    }

    window.ytdlp.init({
      binaryPath: localSettingState.ytdlpPath,
      ffmpegPath: localSettingState.ffmpegPath,
    });

    console.log("Checking Deno");
    if (
      !localSettingState.denoPath ||
      !window.fileExists(localSettingState.denoPath) ||
      localSettingState.denoSha256 !== componentMetadata.deno.sha256
    ) {
      const outputPath = window.pathJoin(componentsDir, exename("deno"));
      console.log("Downloading deno to:", outputPath);
      await window.downloadFileAsync(componentMetadata.deno.url, outputPath);
      localSettingState.denoPath = outputPath;
      localSettingState.denoSha256 = await window.fileSha256(outputPath);
      try {
        window.chmod(outputPath, 0o755);
      } catch (_err) {}
    }

    ElMessage({
      type: "success",
      message: "组件下载完成",
    });
  } catch (error) {
    ElMessage({
      type: "error",
      message: "组件下载失败，请重试",
    });
    console.error("Error downloading components:", error);
  } finally {
    downloadComponentsLoading.value = false;
  }
};
</script>

<style scoped>
.setting-container {
  border-top: 1px solid var(--el-border-color-light);
}

.page-header {
  margin: 8px 12px;
  min-height: 32px;
}

.page-header :deep(.el-page-header__content) {
  display: flex;
  align-items: center;
  min-height: 32px;
}

.setting-form {
  margin: 12px;
}

.singleline-box {
  display: flex;
  gap: 10px;
  width: 100%;
}
</style>
