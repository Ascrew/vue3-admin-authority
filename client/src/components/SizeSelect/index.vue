<!--
 * @Author: zhangyu
 * @Date: 2022-08-08 13:44:33
 * @LastEditors: Please set LastEditors
 * @Description: navbar右侧选择字体大小按钮
 * @FilePath: src/components/SizeSelect/index.vue
-->
<template>
  <el-dropdown id="size_select" trigger="click" @command="handleSetSize">
    <div>
      <IconSvg icon-class="refresh"></IconSvg>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item of sizeOptions"
          :key="item.value"
          :disabled="size === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import IconSvg from "../IconSvg/index.vue";

interface SizeOptions {
  label: string;
  value: string;
}

const store = useStore();
const route = useRoute();
const router = useRouter();

const handleSetSize = (size: string): void => {
  // (this as any).$ELEMENT.size = size;
  store.dispatch("SetSize", size);
  refreshView();
  ElMessage.success("Switch Size Success");
};

const refreshView = (): void => {
  // In order to make the cached page re-rendered
  store.dispatch("delAllCachedViews");
  const { fullPath } = route;
  nextTick(() => {
    router
      .replace({
        path: "/redirect" + fullPath,
      })
      .catch((err) => {
        console.warn(err);
      });
  });
};

const sizeOptions = ref<SizeOptions[]>([
  { label: "Large", value: "large" },
  { label: "Default", value: "default" },
  { label: "Small", value: "small" },
]);

const size = computed(() => {
  return store.state.app.size;
});
</script>
<style lang="scss" scoped></style>
