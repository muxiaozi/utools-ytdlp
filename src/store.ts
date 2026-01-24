import { reactive, watch } from "vue";
import _ from "lodash";
import {
  VideoItem,
  DisplayVideoItem,
  GlobalSetting,
  LocalSetting,
} from "./types";

// LocalSetting
const localSetting = reactive<LocalSetting>({
  ytdlpPath: "",
  ffmpegPath: "",
  denoPath: "",
  outputDir: utools.getPath("videos"),
  proxy: "",
  useProxy: false,
  cookiePath: undefined,
});
const localSettingKey = utools.getNativeId() + "/setting";

function updateLocalSetting(setting: LocalSetting) {
  utools.dbStorage.setItem(localSettingKey, _.cloneDeep(setting));
}
const updateLocalSettingDebounced = _.debounce(updateLocalSetting, 1000);
watch(localSetting, updateLocalSettingDebounced);

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

function updateGlobalSetting(setting: GlobalSetting) {
  utools.dbStorage.setItem(globalSettingKey, _.cloneDeep(setting));
}
const updateGlobalSettingDebounced = _.debounce(updateGlobalSetting, 1000);
watch(globalSetting, updateGlobalSettingDebounced);

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

export { localSetting, globalSetting, videoItems };
