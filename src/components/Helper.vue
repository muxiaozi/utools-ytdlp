<template>
  <div class="setting-container">
    <el-page-header @back="goBack" class="page-header">
      <template #content>
        <span> 帮助 </span>
      </template>
    </el-page-header>

    <el-divider style="margin: 0px" />

    <el-collapse accordion class="collapse-container">
      <el-collapse-item title="如何下载高清视频？" name="1">
        <div
          class="markdown-content"
          v-html="renderMarkdown(helpContent.highQuality)"
          @click="handleMarkdownClick"
        ></div>
      </el-collapse-item>
      <el-collapse-item title="为什么要下载这么多组件？" name="2">
        <div
          class="markdown-content"
          v-html="renderMarkdown(helpContent.components)"
          @click="handleMarkdownClick"
        ></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { marked } from "marked";

const router = useRouter();

// 帮助内容 - 支持 Markdown 格式
const helpContent = {
  highQuality: `
1. 登录对应的网站

2. 下载 Cookie 文件
   - 安装浏览器扩展
       - Edge: [Cookies txt](https://microsoftedge.microsoft.com/addons/detail/cookies-txt/dilbcaaegopfblcjdjikanigjbcbngbk)
       - Chrome: [Get cookies.txt Clean](https://chromewebstore.google.com/detail/get-cookiestxt-clean/ahmnmhfbokciafffnknlekllgcnafnie?utm_source=ext_app_menu)
       - Firefox: [cookies.txt](https://addons.mozilla.org/zh-CN/firefox/addon/cookies-txt/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search)
   - 使用浏览器插件导出 Netscape 格式的 Cookie 文件

3. 在设置中配置 Cookie 路径
   - 进入设置页面
   - 设置 Cookie 文件的完整路径
   - 保存设置后即可下载高清视频
`,
  components: `
  | 组件 | 作用 |
  | --- | --- |
  | YtDlp | 下载视频的核心工具 |
  | FFmpeg | 合并音视频、转码视频为MP4格式 |
  | Deno | 通过 Youtube 等网站的人类校验 |
`,
};

// 配置 marked 选项
marked.setOptions({
  breaks: true,
  gfm: true,
});

function goBack() {
  router.back();
}

function renderMarkdown(content: string): string {
  return marked.parse(content) as string;
}

// 处理 markdown 中的链接点击
function handleMarkdownClick(event: MouseEvent) {
  const target = event.target as HTMLElement;

  // 检查是否点击的是链接
  if (target.tagName === "A") {
    event.preventDefault(); // 阻止默认行为

    const href = target.getAttribute("href");
    if (href) {
      console.log("点击了链接:", href);

      // 如果是外部链接，使用 utools 打开
      if (href.startsWith("http://") || href.startsWith("https://")) {
        utools.shellOpenExternal(href);
      }
      // 如果是内部路由，使用 router 跳转
      else if (href.startsWith("/")) {
        router.push(href);
      }
    }
  }
}
</script>

<style scoped>
.setting-container {
  border-top: 1px solid var(--el-border-color-light);
}

.page-header {
  margin: 8px 12px;
  min-height: 32px;
}

.page-header :deep(.el-page-header__content) {
  display: flex;
  align-items: center;
  min-height: 32px;
}

.collapse-container {
  margin: 12px;
  border: none;
}

.collapse-container :deep(.el-collapse-item__header) {
  background-color: transparent;
}

/* Markdown 内容样式 */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  margin: 0.8em 0 0.5em;
  font-weight: 600;
  line-height: 1.4;
}

.markdown-content :deep(h1) {
  font-size: 1.8em;
  border-bottom: 2px solid var(--el-border-color-light);
  padding-bottom: 0.3em;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  color: var(--el-text-color-primary);
}

.markdown-content :deep(h3) {
  font-size: 1.2em;
  color: var(--el-text-color-regular);
}

.markdown-content :deep(p) {
  margin: 0.8em 0;
  line-height: 1.6;
  color: var(--el-text-color-regular);
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0.8em 0;
  padding-left: 2em;
}

.markdown-content :deep(li) {
  margin: 0.4em 0;
  line-height: 1.6;
  color: var(--el-text-color-regular);
}

.markdown-content :deep(strong) {
  color: var(--el-text-color-primary);
  font-weight: 600;
}

.markdown-content :deep(code) {
  background-color: var(--el-fill-color-light);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: "Courier New", monospace;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background-color: var(--el-fill-color-light);
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1em 0;
}

.markdown-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--el-color-primary);
  padding-left: 1em;
  margin: 1em 0;
  color: var(--el-text-color-secondary);
}

.markdown-content :deep(a) {
  color: var(--el-color-primary);
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

/* 表格样式 */
.markdown-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
  border: 1px solid var(--el-border-color);
}

.markdown-content :deep(thead) {
  background-color: var(--el-fill-color-light);
}

.markdown-content :deep(th) {
  padding: 0.8em 1em;
  text-align: left;
  font-weight: 600;
  color: var(--el-text-color-primary);
  border: 1px solid var(--el-border-color);
}

.markdown-content :deep(td) {
  padding: 0.8em 1em;
  border: 1px solid var(--el-border-color);
  color: var(--el-text-color-regular);
}

.markdown-content :deep(tr:hover) {
  background-color: var(--el-fill-color-lighter);
}
</style>
