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
const localSetting = reactive<LocalSetting>({
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
const updateLocalSetting = _.debounce((setting: LocalSetting) => {
  utools.dbStorage.setItem(localSettingKey, _.cloneDeep(setting));
}, 1000);
watch(localSetting, updateLocalSetting);

let localSetting_ = utools.dbStorage.getItem(localSettingKey);
if (localSetting_) {
  Object.assign(localSetting, localSetting_);
}

// GlobalSetting
const globalSetting = reactive<GlobalSetting>({
  quality: "highest",
  codec: "h265",
  videoCount: 0,
});
const globalSettingKey = "global/setting";
const updateGlobalSetting = _.debounce((setting: GlobalSetting) => {
  utools.dbStorage.setItem(globalSettingKey, _.cloneDeep(setting));
}, 1000);
watch(globalSetting, updateGlobalSetting);

let globalSetting_ = utools.dbStorage.getItem(globalSettingKey);
if (globalSetting_) {
  Object.assign(globalSetting, globalSetting_);
}

// VideoItems
const videoItems = reactive<DisplayVideoItem[]>([]);
for (let i = 0; i < globalSetting.videoCount; i++) {
  const videoItem = utools.dbStorage.getItem<VideoItem>("videos/" + i);
  if (!videoItem) {
    continue;
  }

  videoItems.unshift({
    ...videoItem,
    state: "pending",
    progress: 0,
    index: i,
  });
}

// PrepareDownload
const prepareDownload = reactive<{
  url: string;
  dialogVisible: boolean;
}>({
  url: "",
  dialogVisible: false,
});

// ComponentSha256
const componentState = reactive<{
  metadata?: ComponentMetadata;
}>({});

export {
  localSetting,
  globalSetting,
  videoItems,
  prepareDownload,
  componentState,
};
