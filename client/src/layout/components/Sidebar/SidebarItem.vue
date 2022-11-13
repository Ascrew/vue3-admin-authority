<!--
 * @Author: zhangyu
 * @Date: 2022-07-27 17:21:23
 * @LastEditors: Please set LastEditors
 * @Description: sidebar 递归子级
 * @FilePath: src/layout/components/Sidebar/SidebarItem.vue
-->
<template>
  <div
    v-if="!props.item.meta || !props.item.meta.hidden"
    :class="[
      props.isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': props.isFirstLevel },
    ]"
  >
    <template
      v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
    >
      <SIdebarItemLink :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdonw': props.isFirstLevel }"
        >
          <i v-if="theOnlyOneChild.meta.icon" class="icon-sidebar">
            <IconSvg
              :icon-class="(theOnlyOneChild.meta.icon as string)"
            ></IconSvg>
          </i>
          <template v-if="theOnlyOneChild.meta.title" #title>{{
            $t("route." + theOnlyOneChild.meta.title)
          }}</template>
        </el-menu-item>
      </SIdebarItemLink>
    </template>
    <el-sub-menu
      v-else
      :index="resolvePath(props.item.path)"
      popper-append-to-body
    >
      <template #title>
        <i v-if="props.item.meta && props.item.meta.icon" class="icon-sidebar">
          <IconSvg :icon-class="(props.item.meta.icon as string)"></IconSvg>
        </i>
        <span v-if="props.item.meta && props.item.meta.title">
          {{ $t("route." + props.item.meta.title) }}
        </span>
      </template>
      <template v-if="props.item.children">
        <SidebarItem
          v-for="child in props.item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        ></SidebarItem>
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import path from "path";
import { computed, withDefaults } from "vue";
import { isExternal } from "@/utils/validate";
import { RouteRecordRaw } from "vue-router";
import SIdebarItemLink from "./SIdebarItemLink.vue";
import IconSvg from "@/components/IconSvg/index.vue";

const props = withDefaults(
  defineProps<{
    isCollapse?: boolean;
    item: RouteRecordRaw;
    isFirstLevel?: boolean;
    basePath: string;
  }>(),
  {
    isCollapse: false,
    isFirstLevel: true,
    basePath: "",
  }
);
const showingChildNumber = computed((): number => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item) => {
      if (item.meta && item.meta.hidden) {
        return false;
      } else {
        return true;
      }
    });
    return showingChildren.length;
  }
  return 0;
});

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null;
  }
  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child;
      }
    }
  }
  // If there is no children, return itself with path removed,
  // because this.basePath already conatins item's path information
  return { ...props.item, path: "" };
});

const alwaysShowRootMenu = computed(() => {
  if (props.item.meta && props.item.meta.alwaysShow) {
    return true;
  }
  return false;
});

const resolvePath = (routePath: string): string => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>
<style lang="scss">
.el-submenu.is-active > .el-sub-menu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-sub-menu > .el-sub-menu__title,
  .el-sub-menu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}
.first-level {
  .el-sub-menu__title {
    &:hover {
      background-color: var(--el-menu-hover-bg-color) !important;
    }
  }
}
.simple-mode.first-level {
  .el-sub-menu {
    & > .el-sub-menu__title {
      .el-sub-menu__icon-arrow {
        display: none;
      }
      & > span {
        display: none;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.icon-sidebar {
  margin-right: 5px;
}
</style>
