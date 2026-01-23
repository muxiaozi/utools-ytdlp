import { reactive, watch } from "vue";
import _ from "lodash";

type LocalSetting = {
  ytdlpPath: string;
  ffmpegPath: string;
  denoPath: string;
  outputDir: string;
  proxy: string;
  useProxy: boolean;
  cookiePath: string | undefined;
};

type GlobalSetting = {
  quality: VideoQuality;
  codec: string;
  videoCount: number;
};

const defaultLocalSetting: LocalSetting = {
  ytdlpPath: "",
  ffmpegPath: "",
  denoPath: "",
  outputDir: utools.getPath("videos"),
  proxy: "",
  useProxy: false,
  cookiePath: undefined,
};

const defaultGlobalSetting: GlobalSetting = {
  quality: "highest",
  codec: "h265",
  videoCount: 0,
};

const localSetting = reactive<LocalSetting>(defaultLocalSetting);
const globalSetting = reactive<GlobalSetting>(defaultGlobalSetting);

const globalSettingKey = "global/setting";
const localSettingKey = utools.getNativeId() + "/setting";

function updateLocalSetting(setting: LocalSetting) {
  utools.dbStorage.setItem(localSettingKey, _.cloneDeep(setting));
}

function updateGlobalSetting(setting: GlobalSetting) {
  utools.dbStorage.setItem(globalSettingKey, _.cloneDeep(setting));
}

const updateLocalSettingDebounced = _.debounce(updateLocalSetting, 1000);
const updateGlobalSettingDebounced = _.debounce(updateGlobalSetting, 1000);
watch(localSetting, updateLocalSettingDebounced);
watch(globalSetting, updateGlobalSettingDebounced);

let localSetting_ = utools.dbStorage.getItem(localSettingKey);
if (localSetting_) {
  Object.assign(localSetting, localSetting_);
}

let globalSetting_ = utools.dbStorage.getItem(globalSettingKey);
if (globalSetting_) {
  Object.assign(globalSetting, globalSetting_);
}

export { localSetting, globalSetting };
