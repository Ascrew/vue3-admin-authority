<!--
 * @Author: zhangyu
 * @Date: 2022-08-07 20:58:33
 * @LastEditors: Please set LastEditors
 * @Description: navbar 侧边栏 collapse控制按钮
 * @FilePath: src/components/Hamburger/index.vue
-->
<template>
  <div :class="[{ 'is-active': isActive }]" @click="toggleSidebarCollapse">
    <IconSvg icon-class="s-unfold"></IconSvg>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineEmits } from "vue";
import IconSvg from "@/components/IconSvg/index.vue";

const props = withDefaults(defineProps<{ isActive: boolean }>(), {
  isActive: false,
});

const emit = defineEmits(["toggleClick"]);

const toggleSidebarCollapse = (): void => {
  emit("toggleClick");
};
</script>
<style lang="scss" scoped>
.icon-svg {
  vertical-align: middle;
  font-size: 20px;
}
.is-active {
  transform: rotate(180deg);
}
</style>
