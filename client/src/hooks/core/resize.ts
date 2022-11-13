/*
 * @Author: zhangyu
 * @Date: 2022-07-20 15:38:53
 * @LastEditors: Please set LastEditors
 * @Description: 根据大小重新布局
 * @FilePath: src/hooks/core/resize.ts
 */

import { computed, watch, ComputedRef, WatchStopHandle } from "vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { DeviceType } from "@/store/modules/app";

interface Resize {
  device: ComputedRef<DeviceType>;
  sidebar: ComputedRef<{
    opened: boolean;
    withoutAnimation: boolean;
  }>;
  resizeMounted: () => void;
  addEventListenerOnResize: () => void;
  removeEventListenerResize: () => void;
  watchRoute: WatchStopHandle;
}

const WIDTH = 992; // refer to Bootstrap's responsive design
const store = useStore();
const route = useRoute();

export default function (): Resize {
  const device = computed(() => {
    return store.state.app.device;
  });

  const sidebar = computed(() => {
    return store.state.app.sidebar;
  });

  const watchRoute = watch(route, () => {
    if (
      store.state.app.device === DeviceType.Mobile &&
      store.state.app.sidebar.opened
    ) {
      store.dispatch("CloseSideBar", false);
    }
  });

  const isMobile = (): boolean => {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  };

  const resizeHandler = () => {
    if (!document.hidden) {
      const isMobileFlag = isMobile();
      store.dispatch(
        "ToggleDevice",
        isMobileFlag ? DeviceType.Mobile : DeviceType.Desktop
      );
      if (isMobileFlag) {
        store.dispatch("CloseSideBar", true);
      }
    }
  };

  // onBeforeMount(() => {
  //   window.addEventListener("resize", resizeHandler);
  // });

  // onMounted(() => {
  //   if (isMobile()) {
  //     store.dispatch("ToggleDevice", DeviceType.Mobile);
  //     store.dispatch("CloseSideBar", true);
  //   }
  // });

  const resizeMounted = () => {
    if (isMobile()) {
      store.dispatch("ToggleDevice", DeviceType.Mobile);
      store.dispatch("CloseSideBar", true);
    }
  };

  const addEventListenerOnResize = () => {
    window.addEventListener("resize", resizeHandler);
  };

  const removeEventListenerResize = () => {
    window.removeEventListener("resize", resizeHandler);
  };
  return {
    device,
    sidebar,
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize,
    watchRoute,
  };
}
