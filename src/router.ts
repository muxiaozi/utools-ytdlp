import { createRouter, createMemoryHistory } from "vue-router";

import Home from "./components/Home.vue";
import Download from "./components/Download.vue";
import Setting from "./components/Setting.vue";
import Helper from "./components/Helper.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/download", name: "download", component: Download },
  { path: "/setting", name: "setting", component: Setting },
  { path: "/helper", name: "helper", component: Helper },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
