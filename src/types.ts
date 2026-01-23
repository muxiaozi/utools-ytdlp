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
