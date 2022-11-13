<!--
 * @Author: zhangyu
 * @Date: 2022-08-03 16:40:27
 * @LastEditors: Please set LastEditors
 * @Description: svg图标标签
 * @FilePath: src/components/IconSvg/index.vue
-->
<template>
  <svg class="icon-svg" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts" setup>
import { computed, withDefaults } from "vue";

const props = withDefaults(defineProps<{ iconClass: string }>(), {
  iconClass: "pingtai",
});
const iconName = computed((): string => {
  return `#icon-${props.iconClass}`;
});
</script>
<style lang="scss" scoped>
.icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
