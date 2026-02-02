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
        <el-radio-group v-model="globalSetting.quality">
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
          <el-input v-model="localSetting.outputDir" readonly style="flex: 1" />
          <el-button-group>
            <el-button @click="selectOutputDir">选择目录</el-button>
            <el-button @click="openOutputDir">打开目录</el-button>
          </el-button-group>
        </div>
      </el-form-item>
      <el-form-item label="YtDlp 路径">
        <div class="singleline-box">
          <el-input
            v-model="localSetting.ytdlpPath"
            readonly
            :suffix-icon="ytdlpPathIcon"
          />
          <el-button @click="selectYtdlpFile">选择文件</el-button>
        </div>
      </el-form-item>
      <el-form-item label="FFmpeg 路径">
        <div class="singleline-box">
          <el-input
            v-model="localSetting.ffmpegPath"
            readonly
            :suffix-icon="ffmpegPathIcon"
          />
          <el-button @click="selectFFmpegFile">选择文件</el-button>
        </div>
      </el-form-item>
      <el-form-item label="Deno 路径">
        <div class="singleline-box">
          <el-input
            v-model="localSetting.denoPath"
            readonly
            :suffix-icon="denoPathIcon"
          />
          <el-button @click="selectDenoFile">选择文件</el-button>
        </div>
      </el-form-item>
      <el-form-item label="Cookie 路径">
        <div class="singleline-box">
          <el-input v-model="localSetting.cookiePath" readonly />
          <el-button @click="selectCookieFile">选择文件</el-button>
        </div>
      </el-form-item>
      <el-form-item label="代理地址">
        <div class="singleline-box">
          <el-input
            v-model="localSetting.proxy"
            :disabled="!localSetting.useProxy"
            placeholder="例如 http://127.0.0.1:1080"
          />
          <el-checkbox border v-model="localSetting.useProxy">启用</el-checkbox>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { localSetting, globalSetting, componentState } from "../store";
import { getUpdatableComponents, exename } from "../utils";

const router = useRouter();
const downloadComponentsVisible = computed(() => {
  return (
    !localSetting.ytdlpPath ||
    !localSetting.ffmpegPath ||
    !localSetting.denoPath ||
    getUpdatableComponents().length > 0
  );
});
const downloadComponentsLoading = ref(false);
const ytdlpPathIcon = computed(() => {
  if (!componentState.metadata) {
    return "";
  }
  if (
    !localSetting.ytdlpPath ||
    localSetting.ytdlpSha256 !== componentState.metadata!.ytdlp.sha256
  ) {
    return "Download";
  }
  return "";
});
const ffmpegPathIcon = computed(() => {
  if (!componentState.metadata) {
    return "";
  }
  if (
    !localSetting.ffmpegPath ||
    localSetting.ffmpegSha256 !== componentState.metadata!.ffmpeg.sha256
  ) {
    return "Download";
  }
  return "";
});
const denoPathIcon = computed(() => {
  if (!componentState.metadata) {
    return "";
  }
  if (
    !localSetting.denoPath ||
    localSetting.denoSha256 !== componentState.metadata!.deno.sha256
  ) {
    return "Download";
  }
  return "";
});

onMounted(async () => {
  try {
    let components = getUpdatableComponents();
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
    } else if (components.length > 0) {
      let component_list = components.join(", ");
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
    defaultPath: localSetting.outputDir,
    properties: ["openDirectory"],
  });
  if (path && path.length > 0) {
    localSetting.outputDir = path[0];
  }
};

const openOutputDir = () => {
  utools.shellOpenPath(localSetting.outputDir);
};

const selectYtdlpFile = async () => {
  const path = utools.showOpenDialog({
    title: "选择 YtDlp 可执行文件",
    defaultPath: localSetting.ytdlpPath,
    properties: ["openFile"],
  });
  if (path && path.length > 0) {
    localSetting.ytdlpPath = path[0];
    localSetting.ytdlpSha256 = await window.fileSha256(localSetting.ytdlpPath);
    window.ytdlp.init({
      ffmpegPath: localSetting.ffmpegPath,
      binaryPath: localSetting.ytdlpPath,
    });
  }
};

const selectFFmpegFile = async () => {
  const path = utools.showOpenDialog({
    title: "选择 FFmpeg 可执行文件",
    defaultPath: localSetting.ffmpegPath,
    properties: ["openFile"],
  });
  if (path && path.length > 0) {
    localSetting.ffmpegPath = path[0];
    localSetting.ffmpegSha256 = await window.fileSha256(
      localSetting.ffmpegPath,
    );
    window.ytdlp.init({
      ffmpegPath: localSetting.ffmpegPath,
      binaryPath: localSetting.ytdlpPath,
    });
  }
};

const selectDenoFile = async () => {
  const path = utools.showOpenDialog({
    title: "选择 Deno 可执行文件",
    defaultPath: localSetting.denoPath,
    properties: ["openFile"],
  });
  if (path && path.length > 0) {
    localSetting.denoPath = path[0];
    localSetting.denoSha256 = await window.fileSha256(localSetting.denoPath);
  }
};

const selectCookieFile = () => {
  const path = utools.showOpenDialog({
    title: "选择 Cookie 文件",
    defaultPath: localSetting.cookiePath,
    properties: ["openFile"],
    filters: [{ name: "Cookie Files", extensions: ["txt"] }],
  });
  if (path && path.length > 0) {
    localSetting.cookiePath = path[0];
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

    downloadComponentsLoading.value = true;
    console.log("Checking YtDlp");
    if (
      !localSetting.ytdlpPath ||
      !window.fileExists(localSetting.ytdlpPath) ||
      localSetting.ytdlpSha256 !== componentState.metadata!.ytdlp.sha256
    ) {
      const outputPath = window.pathJoin(componentsDir, exename("yt-dlp"));
      console.log("Downloading yt-dlp to:", outputPath);
      await window.downloadFileAsync(
        componentState.metadata!.ytdlp.url,
        outputPath,
      );
      localSetting.ytdlpPath = outputPath;
      localSetting.ytdlpSha256 = await window.fileSha256(outputPath);
      try {
        window.chmod(outputPath, 0o755);
      } catch (_err) {}
    }

    console.log("Checking FFmpeg");
    if (
      !localSetting.ffmpegPath ||
      !window.fileExists(localSetting.ffmpegPath) ||
      localSetting.ffmpegSha256 !== componentState.metadata!.ffmpeg.sha256
    ) {
      const outputPath = window.pathJoin(componentsDir, exename("ffmpeg"));
      console.log("Downloading ffmpeg to:", outputPath);
      await window.downloadFileAsync(
        componentState.metadata!.ffmpeg.url,
        outputPath,
      );
      localSetting.ffmpegPath = outputPath;
      localSetting.ffmpegSha256 = await window.fileSha256(outputPath);
      try {
        window.chmod(outputPath, 0o755);
      } catch (_err) {}
    }

    console.log("Checking Deno");
    if (
      !localSetting.denoPath ||
      !window.fileExists(localSetting.denoPath) ||
      localSetting.denoSha256 !== componentState.metadata!.deno.sha256
    ) {
      const outputPath = window.pathJoin(componentsDir, exename("deno"));
      console.log("Downloading deno to:", outputPath);
      await window.downloadFileAsync(
        componentState.metadata!.deno.url,
        outputPath,
      );
      localSetting.denoPath = outputPath;
      localSetting.denoSha256 = await window.fileSha256(outputPath);
      try {
        window.chmod(outputPath, 0o755);
      } catch (_err) {}
    }

    window.ytdlp.init({
      binaryPath: localSetting.ytdlpPath,
      ffmpegPath: localSetting.ffmpegPath,
    });
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
