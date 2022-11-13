<!--
 * @Author: zhangyu
 * @Date: 2022-08-07 21:42:14
 * @LastEditors: Please set LastEditors
 * @Description: navbar面包屑
 * @FilePath: src/components/Breadcrumb/index.vue
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb" tag="span">
      <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
        <span>{{ $t("route." + item.meta.title) }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import {
  RouteRecordRaw,
  useRouter,
  useRoute,
  RouteLocationMatched,
  RouteLocationNormalizedLoaded,
} from "vue-router";
const router = useRouter();
const route = useRoute();

let breadcrumbs = ref<RouteLocationMatched[]>([]);
onMounted(() => {
  getBreadcrumb();
});
const isDashboard = (route) => {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
};

const getBreadcrumb = (): void => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  const first = matched[0];
  if (!isDashboard(first)) {
    matched = [
      {
        path: "/dashboard",
        meta: { title: "dashboard" },
      } as unknown as RouteLocationMatched,
    ].concat(matched);
  }
  breadcrumbs.value = matched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false;
  });
};

watch(route, (route: RouteLocationNormalizedLoaded) => {
  if (route.path.startsWith("/redirect/")) {
    return;
  }
  getBreadcrumb();
});
</script>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  :deep(.el-breadcrumb__inner) {
    color: #97a8be;
    cursor: text;
    &:hover {
      color: #97a8be;
    }
  }
}
</style>
