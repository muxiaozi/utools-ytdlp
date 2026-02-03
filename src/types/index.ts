export type VideoQuality =
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

export type VideoItem = {
  id: string;
  title: string;
  url: string;
  time: string;
  size: number;
  thumbnail: string;
  type: "video" | "audio" | "playlist";
  platform: string;
  quality: string;
  width: number;
  height: number;
  uploader: string;
  uploader_id: string;
  description: string;
  duration: number;
  fps: number | undefined;
  ext: string;
};

export type LocalSetting = {
  ytdlpPath: string;
  ytdlpSha256: string;
  ffmpegPath: string;
  ffmpegSha256: string;
  denoPath: string;
  denoSha256: string;
  aria2cPath: string;
  aria2cSha256: string;
  outputDir: string;
  proxy: string;
  useProxy: boolean;
  cookiePath: string | undefined;
};

export type GlobalSetting = {
  quality: VideoQuality;
  codec: string;
  videoCount: number;
  notifyComponentUpdate: boolean;
  notifyDownloadFinish: boolean;
};

export type DisplayVideoItem = VideoItem & {
  state: "pending" | "downloading" | "finished" | "failed";
  progress: number;
  index: number;
};

export type ComponentMetadata = {
  ytdlp: {
    url: string;
    sha256: string;
  },
  ffmpeg: {
    url: string;
    sha256: string;
  },
  deno: {
    url: string;
    sha256: string;
  },
  aria2c: {
    url: string;
    sha256: string;
  }
}
