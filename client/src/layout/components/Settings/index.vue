<!--
 * @Author: zhangyu
 * @Date: 2022-08-22 21:06:31
 * @LastEditors: Please set LastEditors
 * @Description: 右侧setting按钮内容
 * @FilePath: src/layout/components/Settings/index.vue
-->
<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">
        {{ $t("settings.title") }}
      </h3>

      <div class="drawer-item">
        <span>{{ $t("settings.theme") }}</span>
        <ThemePicker @change="themeChange" />
      </div>

      <div class="drawer-item">
        <span>{{ $t("settings.showTagsView") }}</span>
        <el-switch v-model="showTagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t("settings.showSidebarLogo") }}</span>
        <el-switch v-model="showSidebarLogo" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t("settings.fixedHeader") }}</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t("settings.sidebarTextTheme") }}</span>
        <el-switch v-model="sidebarTextTheme" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import ThemePicker from "@/components/ThemePicker/index.vue";

const store = useStore();

const fixedHeader = computed<boolean>({
  get() {
    return store.state.settings.fixedHeader;
  },
  set(value) {
    store.dispatch("ChangeSetting", { key: "fixedHeader", value });
  },
});

const showTagsView = computed({
  get() {
    return store.state.settings.showTagsView;
  },
  set(value) {
    store.dispatch("ChangeSetting", { key: "showTagsView", value });
  },
});

const showSidebarLogo = computed({
  get() {
    return store.state.settings.showSidebarLogo;
  },
  set(value) {
    store.dispatch("ChangeSetting", { key: "showSidebarLogo", value });
  },
});

const sidebarTextTheme = computed({
  get() {
    return store.state.settings.sidebarTextTheme;
  },
  set(value) {
    store.dispatch("ChangeSetting", { key: "sidebarTextTheme", value });
  },
});

const themeChange = (value: string) => {
  store.dispatch("ChangeSetting", { key: "theme", value });
};
</script>
<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
