import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import { useDark } from "@vueuse/core";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { DownloadQueue } from "./download_queue";

import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./style.css";

// 创建下载队列实例
const downloadQueue = new DownloadQueue();
const app = createApp(App);

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.provide("downloadQueue", downloadQueue);
app.use(ElementPlus);
app.use(router);
app.mount("#app");

utools.onPluginEnter(async ({ code, type, payload }) => {
  console.log("onPluginEnter", code, type, payload);
  useDark();

  if (code == "download") {
    switch (type) {
      case "window": {
        let url = await utools.readCurrentBrowserUrl();
        router.push({
          name: "download",
          query: {
            url: encodeURIComponent(url),
          },
        });
        break;
      }
      case "regex": {
        router.push({
          name: "download",
          query: {
            url: encodeURIComponent(payload),
          },
        });
        break;
      }
      default: {
        router.push({
          name: "download",
        });
        break;
      }
    }
  } else {
    router.push({ name: "download" });
  }
});

utools.onPluginOut((processExit) => {
  console.log("onPluginOut, processExit:", processExit);
});
