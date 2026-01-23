import { localSetting } from "./store";

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

export function formatDuration(seconds: number): string {
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

export function formatQuality(format: string): string {
  const qualitParts = format.split("+");
  return qualitParts.length > 0 ? qualitParts[0] : "-";
}

export function ytdlpUrl(): string {
  if (utools.isWindows()) {
    return "https://pan.cheshuimanong.com/f/a7mCJ/yt-dlp_win64.exe";
  } else if (utools.isMacOS()) {
    return "https://pan.cheshuimanong.com/f/42nU4/yt-dlp_macos";
  } else if (utools.isLinux()) {
    return "https://pan.cheshuimanong.com/f/vjghp/yt-dlp_linux";
  } else {
    throw new Error("Unsupported platform");
  }
}

export function ffmpegUrl(): string {
  if (utools.isWindows()) {
    return "https://pan.cheshuimanong.com/f/Ka0Ib/ffmpeg_win64.exe";
  } else if (utools.isMacOS()) {
    return "https://pan.cheshuimanong.com/f/eE8tj/ffmpeg_macos";
  } else if (utools.isLinux()) {
    return "https://pan.cheshuimanong.com/f/zxZUx/ffmpeg_linux";
  } else {
    throw new Error("Unsupported platform");
  }
}

export function denoUrl(): string {
  if (utools.isWindows()) {
    return "https://pan.cheshuimanong.com/f/GyJSw/deno_win64.exe";
  } else if (utools.isMacOS()) {
    return "https://pan.cheshuimanong.com/f/Qx4tk/deno_macos";
  } else if (utools.isLinux()) {
    return "https://pan.cheshuimanong.com/f/BGjtV/deno_linux";
  } else {
    throw new Error("Unsupported platform");
  }
}

export function exeExt(): string {
  if (utools.isWindows()) {
    return ".exe";
  } else if (utools.isMacOS()) {
    return "";
  } else if (utools.isLinux()) {
    return "";
  } else {
    throw new Error("Unsupported platform");
  }
}