const { YtDlp, helpers } = require("./ytdlp-nodejs");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

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
};

/**
 * 合并路径
 * @param {string[]} args
 */
window.pathJoin = (...args) => {
  return path.join(...args);
};

/**
 * 异步下载文件
 * @param {string} url 下载链接
 * @param {string} outputPath 文件保存路径
 *
 * @returns {Promise<void>}
 */
window.downloadFileAsync = async (url, outputPath) => {
  // TODO: 如果文件存在，则重命名文件，然后再下载
  return await helpers.downloadFile(url, outputPath);
};

/**
 * 计算文件的SHA256摘要
 * @param {string} filePath 文件路径
 * @returns {Promise<string>} SHA256摘要
 */
window.fileSha256 = async (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);
    stream.on("data", (chunk) => {
      hash.update(chunk);
    });
    stream.on("end", () => {
      const sha256 = hash.digest("hex");
      resolve(sha256);
    });
    stream.on("error", (err) => {
      reject(err);
    });
  });
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
    });
  },
};
