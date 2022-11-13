<!--
 * @Author: zhangyu
 * @Date: 2022-07-27 20:39:23
 * @LastEditors: Please set LastEditors
 * @Description: sidebar routerlink  直达页面路由
 * @FilePath: src/layout/components/Sidebar/SIdebarItemLink.vue
-->
<template>
  <a
    v-if="isExternal(props.to)"
    :href="props.to"
    target="_blank"
    rel="noopener"
  >
    <slot></slot>
  </a>
  <router-link v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<script lang="ts" setup>
import { isExternal as isExternalUtil } from "@/utils/validate";

const props = defineProps<{ to: string }>();
const isExternal = isExternalUtil;
</script>
<style lang="scss" scoped></style>
