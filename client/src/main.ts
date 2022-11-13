import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { useStore } from "./store";
// 语言包
import vueI18n from "./lang";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 引入iconfont svg
import "@/assets/icon/index.css";
// import "@/assets/icon/index.js";

import "@/styles/index.scss";
// 引入权限路由
import "@/permission";

// markdown preview with html
import VMdPreviewHtml from "@kangc/v-md-editor/lib/preview-html";
import "@kangc/v-md-editor/lib/style/preview-html.css";

// markdown preview
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";

// markdown
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

// highlightjs 核心代码
import hljs from "highlight.js/lib/core";
// 按需引入语言包
import json from "highlight.js/lib/languages/json";
import javascript from "highlight.js/lib/languages/javascript";
import shell from "highlight.js/lib/languages/shell";
import bash from "highlight.js/lib/languages/bash";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import markdown from "highlight.js/lib/languages/markdown";
import scss from "highlight.js/lib/languages/scss";
import sql from "highlight.js/lib/languages/sql";
import vim from "highlight.js/lib/languages/vim";

hljs.registerLanguage("json", json);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("vim", vim);

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
  extend() {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  },
});

import { gSize } from "@/utils/globalPropeties";

createApp(App)
  .provide("$gSize", gSize)
  .use(store)
  .use(router)
  .use(ElementPlus, {
    size: useStore().state.app.size,
    i18n: vueI18n.global.t,
  })
  .use(VueMarkdownEditor)
  .use(VMdPreview)
  .use(VMdPreviewHtml)
  .use(vueI18n)
  .mount("#app");
