<!--
 * @Author: zhangyu
 * @Date: 2022-08-22 20:43:03
 * @LastEditors: Please set LastEditors
 * @Description: 右侧全局设置功能
 * @FilePath: src/components/RightPanel/index.vue
-->
<template>
  <el-drawer
    title="设置"
    v-model="show"
    size="260px"
    destroy-on-close
    :before-close="handleClose"
  >
    <slot />
  </el-drawer>
</template>

<script lang="ts" setup>
// import { addClass, removeClass } from "element-plus/es/utils";
// import { Setting } from "@element-plus/icons-vue";
import {
  withDefaults,
  ref,
  computed,
  watch,
  // onMounted,
  // onBeforeMount,
  // watch,
  // onBeforeUnmount,
} from "vue";
import { useStore } from "vuex";

const props = withDefaults(
  defineProps<{
    buttonTop: number;
  }>(),
  {
    buttonTop: 250,
  }
);

const store = useStore();
const rightPanelRef = ref<Element>(null);

// const show = ref(false);

const theme = computed<string>((): string => {
  return store.state.settings.theme;
});

const show = computed(() => {
  return store.state.settings.showSettingsDrawer;
});

const handleClose = () => {
  store.dispatch("ChangeSetting", { key: "showSettingsDrawer", value: false });
};

// watch(show, (newVal: boolean) => {
//   if (newVal && !props.clickNotClose) {
//     addEventClick();
//   }
//   if (newVal) {
//     addClass(document.body, "showRightPanel");
//   } else {
//     removeClass(document.body, "showRightPanel");
//   }
// });

// onMounted(() => {
//   insertToBody();
// });

// onBeforeUnmount(() => {
//   const elx = rightPanelRef;
//   elx.value.remove();
// });

// const addEventClick = () => {
//   window.addEventListener("click", closeSidebar);
// };

// const closeSidebar = (ev: MouseEvent) => {
//   const parent = (ev.target as HTMLElement).closest(".rightPanel");
//   debugger;
//   if (!parent) {
//     show.value = false;
//     window.removeEventListener("click", closeSidebar);
//   }
// };

// const insertToBody = () => {
//   const elx = rightPanelRef;
//   const body = document.querySelector("body");
//   if (body) {
//     body.insertBefore(elx.value, body.firstChild);
//   }
// };
</script>
<style lang="scss" scoped></style>
