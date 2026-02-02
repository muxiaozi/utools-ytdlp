import { DisplayVideoItem } from "./types";
import { globalSettingState, localSettingState } from "./store";
import { makeYtdlpFormat } from "./utils";
import _ from "lodash";

type DownloadResult = {
  filePath: string;
  info: {
    id: string;
    original_url: string;
    title: string;
  };
};

// 下载队列管理器
export class DownloadQueue {
  private queue: Array<{
    item: DisplayVideoItem;
    resolve: (result: DownloadResult) => void;
    reject: (error: any) => void;
  }> = [];
  private isProcessing = false;

  // 添加任务到队列
  async add(item: DisplayVideoItem): Promise<DownloadResult> {
    return new Promise((resolve, reject) => {
      this.queue.push({ item, resolve, reject });
      this.processQueue();
    });
  }

  // 处理队列
  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    const task = this.queue.shift()!;
    const { item, resolve, reject } = task;

    try {
      // 开始下载时设置状态
      item.state = "downloading";
      console.log(`开始下载 [队列剩余: ${this.queue.length}]:`, item.title);

      // 执行下载
      const result = await this.download(item);
      item.state = "finished";
      resolve(result);
    } catch (error) {
      item.state = "failed";
      reject(error);
    } finally {
      this.isProcessing = false;
      // 继续处理下一个任务
      this.processQueue();
    }
  }

  // 执行下载
  private async download(item: DisplayVideoItem): Promise<DownloadResult> {
    return new Promise((resolve, reject) => {
      window.ytdlp
        .downloadAsync(item.url, {
          output: window.pathJoin(
            localSettingState.outputDir,
            "%(id)s.%(ext)s",
          ),
          format: makeYtdlpFormat(globalSettingState.quality),
          cookies: localSettingState.cookiePath,
          proxy: localSettingState.useProxy
            ? localSettingState.proxy
            : undefined,
          jsRuntime: localSettingState.denoPath
            ? `deno:${localSettingState.denoPath}`
            : "node",
          onProgress: (progress) => {
            item.progress = _.isNumber(progress.percentage)
              ? Math.floor(progress.percentage)
              : 0;
          },
        })
        .then(resolve)
        .catch(reject);
    });
  }

  // 获取队列长度
  get length() {
    return this.queue.length;
  }

  // 获取当前是否正在处理
  get processing() {
    return this.isProcessing;
  }
}
