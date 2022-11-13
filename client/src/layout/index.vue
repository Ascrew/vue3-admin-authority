<!--
 * @Author: zhangyu
 * @Date: 2022-07-18 16:56:37
 * @LastEditors: Please set LastEditors
 * @Description: layout index.vue
 * @FilePath: src/layout/index.vue
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 全屏遮罩 -->
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <!-- 侧边栏 -->
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
        <TagsView v-if="showTagsView" />
      </div>
      <AppMain />
      <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { useStore } from "vuex";
import { DeviceType } from "@/store/modules/app";
import Sidebar from "./components/Sidebar/index.vue";
import Navbar from "./components/Navbar/index.vue";
import TagsView from "./components/TagsView/index.vue";
import AppMain from "./components/AppMain.vue";
import RightPanel from "@/components/RightPanel/index.vue";
import Settings from "./components/Settings/index.vue";

import resize from "@/hooks/core/resize";

// 引入resize hook
const {
  sidebar,
  device,
  addEventListenerOnResize,
  resizeMounted,
  removeEventListenerResize,
  watchRoute,
} = resize();

let store = useStore();

const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === DeviceType.Mobile,
  };
});

const showSettings = computed(() => {
  return store.state.settings.showSettings;
});

const showTagsView = computed(() => {
  return store.state.settings.showTagsView;
});

const fixedHeader = computed(() => {
  return store.state.settings.fixedHeader;
});

watchRoute();
onBeforeMount(() => {
  addEventListenerOnResize();
});

onMounted(() => {
  resizeMounted();
});

onBeforeUnmount(() => {
  removeEventListenerResize();
});

const handleClickOutside = (): void => {
  store.dispatch("CloseSideBar", false);
};
</script>
<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 59px;
  }
  .sidebar-container {
    width: 59px !important;
  }

  .fixed-header {
    width: calc(100% - 59px);
  }
}

/* for mobile response */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }
  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }
}
.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
