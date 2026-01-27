import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import { useDark } from "@vueuse/core";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { DownloadQueue } from "./download_queue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { prepareDownload } from "./store";

import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./style.css";
import { isPrepared } from "./utils";

// 创建下载队列实例
const downloadQueue = new DownloadQueue();
const app = createApp(App);

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.provide("downloadQueue", downloadQueue);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router);
app.mount("#app");

utools.onPluginEnter(async ({ code, type, payload }) => {
  console.log("onPluginEnter", code, type, payload);
  useDark();

  if (code == "download") {
    switch (type) {
      case "window": {
        let url = await utools.readCurrentBrowserUrl();
        prepareDownload.url = url;
        prepareDownload.dialogVisible = true;
        break;
      }
      case "regex": {
        prepareDownload.url = payload;
        prepareDownload.dialogVisible = true;
        break;
      }
    }
  }

  if (!(await isPrepared())) {
    router.push({ name: "setting" });
    return;
  }
});

utools.onPluginOut((processExit) => {
  console.log("onPluginOut, processExit:", processExit);
});
