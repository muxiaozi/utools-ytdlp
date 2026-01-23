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

type VideoQuality =
  | "2160p"
  | "1440p"
  | "1080p"
  | "720p"
  | "480p"
  | "360p"
  | "240p"
  | "144p"
  | "highest"
  | "lowest";

declare class YtdlpManager {
  init(options: { ffmpegPath: string; binaryPath: string }): void;
  isInitialized(): boolean;
  checkInstallationAsync(options: { ffmpeg: boolean }): Promise<boolean>;
  downloadAsync(
    url: string,
    options: {
      output: string;
      quality: VideoQuality;
      cookies?: string;
      proxy?: string;
      onProgress?: (progress: DownloadProcess) => void;
      additionalOptions?: string[];
    },
  ): Promise<string>;
  getInfoAsync(
    url: string,
    options: { cookies?: string; proxy?: string; additionalOptions?: string[] },
  ): Promise<any>;
}

interface Window {
  ytdlp: YtdlpManager;

  fileExists(filePath: string): Promise<boolean>;
  downloadFile(url: string, outputPath: string): Promise<void>;
  deleteFile(filePath: string): Promise<void>;
}
