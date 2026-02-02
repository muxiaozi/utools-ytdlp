import { componentState, localSetting } from "./store";
import { ComponentMetadata, VideoItem, VideoQuality } from "./types";

export async function isPrepared(): Promise<boolean> {
  if (window.ytdlp.isInitialized()) {
    return true;
  }

  let ffmpegPath = localSetting.ffmpegPath;
  if (!ffmpegPath) {
    console.error("ffmpegPath is not set");
    return false;
  }

  let ytdlpPath = localSetting.ytdlpPath;
  if (!ytdlpPath) {
    console.error("ytdlpPath is not set");
    return false;
  }

  try {
    window.ytdlp.init({ ffmpegPath, binaryPath: ytdlpPath });
  } catch (err) {
    console.error("ytdlp init error:", err);
    return false;
  }

  return true;
}

export function formatDuration(seconds: number | undefined): string {
  if (!seconds) {
    return "-";
  }
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.trunc(seconds % 60);
  return `${hrs > 0 ? hrs + "h " : ""}${mins > 0 ? mins + "m " : ""}${secs}s`;
}

export function formatSize(bytes: number | undefined): string {
  if (!bytes) {
    return "-";
  }
  if (bytes < 1024) return bytes + " B";
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
  else if (bytes < 1024 * 1024 * 1024)
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  else return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
}

export function formatQuality(format: string | undefined): string {
  if (!format) {
    return "-";
  }
  const qualitParts = format.split("+");
  return qualitParts.length > 0 ? qualitParts[0] : "-";
}

export function makeYtdlpFormat(quality: VideoQuality): string {
  switch (quality) {
    case "highest":
      return "bv*+ba/b*";
    case "lowest":
      return "wv*+wa/w*";
    case "2160p":
      return "bv[height<=2160]+ba/b*[height<=2160]";
    case "1440p":
      return "bv[height<=1440]+ba/b*[height<=1440]";
    case "1080p":
      return "bv[height<=1080]+ba/b*[height<=1080]";
    case "720p":
      return "bv[height<=720]+ba/b*[height<=720]";
    case "480p":
      return "bv[height<=480]+ba/b*[height<=480]";
    case "360p":
      return "bv[height<=360]+ba/b*[height<=360]";
    case "240p":
      return "bv[height<=240]+ba/b*[height<=240]";
    case "144p":
      return "bv[height<=144]+ba/b*[height<=144]";
    default:
      return "bv*+ba/b*";
  }
}

export async function fetchComponentMetadata(): Promise<ComponentMetadata> {
  let response = await fetch(
    "https://pan.cheshuimanong.com/f/MMGCb/metadata.json",
  );
  const json = await response.json();
  if (utools.isWindows()) {
    return json["windows"];
  } else if (utools.isMacOS()) {
    return json["macos"];
  } else if (utools.isLinux()) {
    return json["linux"];
  } else {
    throw new Error("Unsupported platform");
  }
}

export function exename(basename: string): string {
  if (utools.isWindows()) {
    return `${basename}.exe`;
  } else if (utools.isMacOS()) {
    return `${basename}`;
  } else if (utools.isLinux()) {
    return `${basename}`;
  } else {
    throw new Error("Unsupported platform");
  }
}

/**
 * 根据UP主ID和平台生成UP主链接
 * @param platform 平台
 * @param uploaderId UP主ID
 * @returns
 */
export function makeUploaderLink(
  platform: string,
  uploaderId: string,
): string | undefined {
  const DICT: Record<string, string> = {
    BiliBili: "https://space.bilibili.com/{id}",
    Youtube: "https://www.youtube.com/{id}",
    PornHub: "https://cn.pornhub.com/model/{id}",
    XVideos: "https://www.xvideos.com/{id}",
  };

  const template = DICT[platform];
  if (!template) {
    return undefined;
  }

  return template.replace("{id}", uploaderId);
}

export function makeFilePath(row: VideoItem) {
  return window.pathJoin(localSetting.outputDir, row.id + "." + row.ext);
}

export function getUpdatableComponents(): Array<string> {
  if (!componentState.metadata) {
    return [];
  }
  let updateList = [];
  if (localSetting.ytdlpSha256 !== componentState.metadata!.ytdlp.sha256) {
    updateList.push("yt-dlp");
  }
  if (localSetting.ffmpegSha256 !== componentState.metadata!.ffmpeg.sha256) {
    updateList.push("ffmpeg");
  }
  if (localSetting.denoSha256 !== componentState.metadata!.deno.sha256) {
    updateList.push("deno");
  }
  return updateList;
}
