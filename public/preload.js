const { YtDlp, helpers } = require("./ytdlp-nodejs");
const fs = require("node:fs");

/**
 * 检测文件是否存在
 * @param {string} filePath
 * @returns
 */
window.fileExists = async (filePath) => {
  return fs.fileExistsSync(filePath);
};

/**
 * 删除文件
 * @param {string} filePath
 * @returns {Promise<void>}
 */
window.deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error("删除文件失败:", err);
    throw err;
  }
};

/**
 * 异步下载文件
 * @param {string} url 下载链接
 * @param {string} outputPath 文件保存路径
 * 
 * @returns {Promise<void>}
 */
window.downloadFile = async (url, outputPath) => {
  return await helpers.downloadFile(url, outputPath);
};

// YtDlp Manager
let ytdlp = null;

window.ytdlp = {
  // 初始化 YtDlp 实例
  init: (config) => {
    ytdlp = new YtDlp(config);
    console.log("YtDlp initialized");
    return true;
  },
  // 检查是否初始化
  isInitialized: () => {
    return ytdlp !== null;
  },
  // 检查安装是否有效
  checkInstallationAsync: async (options) => {
    if (!ytdlp) {
      throw new Error("YtDlp is not initialized");
    }
    return await ytdlp.checkInstallationAsync(options);
  },
  // 下载视频
  downloadAsync: async (url, options) => {
    if (!ytdlp) {
      throw new Error("YtDlp is not initialized");
    }
    return await ytdlp.downloadAsync(url, {
      output: options.output,
      format: options.format,
      proxy: options.proxy,
      cookies: options.cookies,
      onProgress: options.onProgress,
      jsRuntime: options.jsRuntime,
      printPaths: true,
      onPaths: options.onPaths,
      additionalOptions: options.additionalOptions,
    });
  },
  // 获取视频信息
  getInfoAsync: async (url, options) => {
    if (!ytdlp) {
      throw new Error("YtDlp is not initialized");
    }
    return await ytdlp.getInfoAsync(url, {
      flatPlaylist: false,
      proxy: options.proxy,
      cookies: options.cookies,
      jsRuntime: options.jsRuntime,
      additionalOptions: options.additionalOptions,
    });
  },
};
