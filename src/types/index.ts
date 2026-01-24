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
  ffmpegPath: string;
  denoPath: string;
  outputDir: string;
  proxy: string;
  useProxy: boolean;
  cookiePath: string | undefined;
};

export type GlobalSetting = {
  quality: VideoQuality;
  codec: string;
  videoCount: number;
};

export type DisplayVideoItem = VideoItem & {
  state: "pending" | "downloading" | "finished" | "failed";
  progress: number;
  index: number;
};
