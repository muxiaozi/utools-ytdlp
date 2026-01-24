/// <reference types="vite/client" />

interface DownloadProcess {
  filename: string;
  status: "downloading" | "finished";
  downloaded: number;
  downloaded_str: string;
  total: number;
  total_str: string;
  speed: number;
  speed_str: string;
  eta: number;
  eta_str: string;
  percentage: number;
  percentage_str: string;
}

declare class YtdlpManager {
  init(options: { ffmpegPath: string; binaryPath: string }): void;
  isInitialized(): boolean;
  checkInstallationAsync(options: { ffmpeg: boolean }): Promise<boolean>;
  downloadAsync(
    url: string,
    options: {
      output: string;
      format: string;
      cookies?: string;
      proxy?: string;
      onProgress?: (progress: DownloadProcess) => void;
      onPaths?: (paths: string[]) => void;
      jsRuntime?: string;
      additionalOptions?: string[];
    },
  ): Promise<string>;
  getInfoAsync(
    url: string,
    options: {
      cookies?: string;
      proxy?: string;
      jsRuntime?: string;
      additionalOptions?: string[];
    },
  ): Promise<any>;
}

interface Window {
  ytdlp: YtdlpManager;

  fileExists(filePath: string): boolean;
  downloadFile(url: string, outputPath: string): Promise<void>;
  deleteFile(filePath: string): void;
}
