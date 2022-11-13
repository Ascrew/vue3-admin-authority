<!--
 * @Author: zhangyu
 * @Date: 2022-07-21 22:58:07
 * @LastEditors: Please set LastEditors
 * @Description: 侧边栏主体
 * @FilePath: src/layout/components/Sidebar/index.vue
-->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <SidebarLogo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :collapse-transition="false"
        :unique-opened="false"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        ></SidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import SidebarLogo from "./SidebarLogo.vue";
import SidebarItem from "./SidebarItem.vue";
import variables from "@/styles/_variables.scss";

const store = useStore();
const showLogo = computed(() => {
  return store.state.settings.showSidebarLogo;
});
const routes = computed(() => {
  return store.state.permission.routes;
});
const isCollapse = computed(() => {
  return !store.state.app.sidebar.opened;
});

const activeMenu = computed(() => {
  const route = useRoute();
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});

const menuActiveTextColor = computed(() => {
  if (store.state.settings.sidebarTextTheme) {
    return store.state.settings.theme;
  } else {
    return variables.menuActiveText;
  }
});
</script>
<style lang="scss" scoped>
:deep(.el-scrollbar) {
  height: 100%;
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar__view {
    height: 100%;
  }
  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}
:deep(.el-menu) {
  height: 100%;
  border: none;
  width: 100% !important;
}
</style>
