import { reactive, watch } from "vue";
import _ from "lodash";
import {
  VideoItem,
  DisplayVideoItem,
  GlobalSetting,
  LocalSetting,
  ComponentMetadata,
} from "./types";

// LocalSetting
const localSettingState = reactive<LocalSetting>({
  ytdlpPath: "",
  ytdlpSha256: "",
  ffmpegPath: "",
  ffmpegSha256: "",
  denoPath: "",
  denoSha256: "",
  aria2cPath: "",
  aria2cSha256: "",
  outputDir: utools.getPath("videos"),
  proxy: "",
  useProxy: false,
  cookiePath: undefined,
});
const localSettingKey = utools.getNativeId() + "/setting";
watch(localSettingState, (setting: LocalSetting) => {
  utools.dbStorage.setItem(localSettingKey, _.cloneDeep(setting));
});

let localSetting = utools.dbStorage.getItem(localSettingKey);
if (localSetting) {
  Object.assign(localSettingState, localSetting);
}

// GlobalSetting
const globalSettingState = reactive<GlobalSetting>({
  quality: "highest",
  codec: "h265",
  videoCount: 0,
});
const globalSettingKey = "global/setting";
watch(globalSettingState, (setting: GlobalSetting) => {
  utools.dbStorage.setItem(globalSettingKey, _.cloneDeep(setting));
});

let globalSetting = utools.dbStorage.getItem(globalSettingKey);
if (globalSetting) {
  Object.assign(globalSettingState, globalSetting);
}

// DownloadState
const downloadState = reactive<{
  url: string;
  prepareDialogVisible: boolean;
  videos: DisplayVideoItem[];
}>({
  url: "",
  prepareDialogVisible: false,
  videos: [],
});

for (let i = 0; i < globalSettingState.videoCount; i++) {
  const videoItem = utools.dbStorage.getItem<VideoItem>("videos/" + i);
  if (!videoItem) {
    continue;
  }

  downloadState.videos.unshift({
    ...videoItem,
    state: "pending",
    progress: 0,
    index: i,
  });
}

// ComponentState
const componentState = reactive<{
  metadata?: ComponentMetadata;
}>({});

export { localSettingState, globalSettingState, downloadState, componentState };
