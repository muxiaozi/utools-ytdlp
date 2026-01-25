const { YtDlp, helpers } = require("./ytdlp-nodejs");
const fs = require("node:fs");
const path = require("node:path");

/**
 * 检测文件是否存在
 * @param {string} filePath
 * @returns {boolean}
 */
window.fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

/**
 * 删除文件
 * @param {string} filePath
 */
window.deleteFile = (filePath) => {
  fs.unlinkSync(filePath);
};

/**
 * 创建文件夹
 * @param {string} dirPath 文件夹路径
 */
window.mkdir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

/**
 * 设置文件权限
 * @param {string} path 文件路径
 * @param {string | number} mode 文件权限
 */
window.chmod = (path, mode) => {
  fs.chmodSync(path, mode);
}

/**
 * 合并路径
 * @param {string[]} args
 */
window.pathJoin = (...args) => {
  return path.join(...args);
}

/**
 * 异步下载文件
 * @param {string} url 下载链接
 * @param {string} outputPath 文件保存路径
 * 
 * @returns {Promise<void>}
 */
window.downloadFileAsync = async (url, outputPath) => {
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
      additionalOptions: options.additionalOptions,
      recodeVideo: "mp4",
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
