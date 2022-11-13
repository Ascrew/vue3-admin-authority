<!--
 * @Author: zhangyu
 * @Date: 2022-08-22 21:28:41
 * @LastEditors: Please set LastEditors
 * @Description: 主题色更改模块
 * @FilePath: src/components/ThemePicker/index.vue
-->
<template>
  <div class="settings-theme-picker">
    <el-color-picker
      v-model="theme"
      :predefine="[
        '#409EFF',
        '#1890ff',
        '#304156',
        '#212121',
        '#11a983',
        '#13c2c2',
        '#6959CD',
        '#f5222d',
      ]"
      popper-class="theme-picker-dropdown"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref, defineEmits } from "vue";
import { useStore } from "@/store";
import { ElMessage } from "element-plus";
// eslint-disable-next-line @typescript-eslint/no-var-requires

const emit = defineEmits(["change"]);
const ORIGINAL_THEME = "#409EFF"; // default color
const version = require("element-plus/package.json").version; // element-ui version from node_modules

const store = useStore();

const chalk = ref(""); // The content of theme-chalk css
const theme = ref("");

const defaultTheme = computed(() => {
  return store.state.settings.theme;
});

watch(
  defaultTheme,
  (newVal: string) => {
    theme.value = newVal;
  },
  { immediate: true }
);

watch(theme, async (newVal: string) => {
  if (!newVal) return;
  const oldValue = chalk.value ? theme.value : ORIGINAL_THEME;
  const themeCluster = getThemeCluster(newVal.replace("#", ""));
  const originalCluster = getThemeCluster(oldValue.replace("#", ""));
  const message = ElMessage({
    message: "  Compiling the theme",
    customClass: "theme-message",
    type: "success",
    duration: 0,
    icon: "Loading" as "",
  });

  if (!chalk.value) {
    const url = `https://unpkg.com/element-plus@${version}/theme-chalk/index.css`;
    await getCSSString(url, chalk.value);
  }

  const getHandler = (variable: string, id: string) => {
    return () => {
      const originalCluster = getThemeCluster(ORIGINAL_THEME.replace("#", ""));
      const newStyle = updateStyle(variable, originalCluster, themeCluster);

      let styleTag = document.getElementById(id);
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.setAttribute("id", id);
        document.head.appendChild(styleTag);
      }
      styleTag.innerText = newStyle;
    };
  };
  const chalkHandler = getHandler(chalk.value, "chalk-style");
  chalkHandler();

  let styles: HTMLElement[] = [].slice.call(document.querySelectorAll("style"));
  styles = styles.filter((style) => {
    const text = style.innerText;
    return (
      new RegExp(oldValue, "i").test(text) && !/Chalk Variables/.test(text)
    );
  });
  styles.forEach((style) => {
    const { innerText } = style;
    if (typeof innerText !== "string") return;
    style.innerText = updateStyle(innerText, originalCluster, themeCluster);
  });

  emit("change", newVal);

  message.close();
});

const updateStyle = (
  style: string,
  oldCluster: string[],
  newCluster: string[]
) => {
  let newStyle = style;
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
  });
  return newStyle;
};

const getCSSString = (url: string, variable: string) => {
  return new Promise<void>((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        variable = xhr.responseText.replace(/@font-face{[^}]+}/, "");
        resolve();
      }
    };
    xhr.open("GET", url);
    xhr.send();
  });
};

const getThemeCluster = (theme: string) => {
  const tintColor = (color: string, tint: number) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);
    if (tint === 0) {
      // when primary color is in its rgb space
      return [red, green, blue].join(",");
    } else {
      red += Math.round(tint * (255 - red));
      green += Math.round(tint * (255 - green));
      blue += Math.round(tint * (255 - blue));
      return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
    }
  };

  const shadeColor = (color: string, shade: number) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);
    red = Math.round((1 - shade) * red);
    green = Math.round((1 - shade) * green);
    blue = Math.round((1 - shade) * blue);
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  };

  const clusters = [theme];
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
  }
  clusters.push(shadeColor(theme, 0.1));
  return clusters;
};
</script>

<style lang="scss">
.theme-picker-dropdown {
  z-index: 99999 !important;
}
.settings-theme-picker {
  float: right;
  height: 26px;
  margin: -3px 8px 0 0;
  .el-color-picker {
    .el-color-picker__trigger {
      height: 26px !important;
      width: 26px !important;
      padding: 2px;
    }

    .theme-picker-dropdown .el-color-dropdown__link-btn {
      display: none;
    }
  }
}
</style>
