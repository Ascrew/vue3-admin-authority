<!--
 * @Author: zhangyu
 * @Date: 2022-08-09 11:36:56
 * @LastEditors: Please set LastEditors
 * @Description: tagsview
 * @FilePath: src/layout/components/TagsView/index.vue
-->
<template>
  <div
    id="tags_view_container"
    class="tags-view-container"
    ref="tagsviewRootRef"
  >
    <ScrollPane
      ref="scrollPaneRef"
      class="tags-view-wrapper"
      :tag-list="tagList"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tagRef"
        :key="tag.path"
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ $t("route." + tag.meta.title) }}
        <div
          class="close-icon-wrapper"
          v-if="!isAffix(tag)"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <Close class="close-icon"></Close>
        </div>
      </router-link>
    </ScrollPane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag as TagView)">
        {{ $t("tagsView.refresh") }}
      </li>
      <li
        v-if="!isAffix(selectedTag as TagView)"
        @click="closeSelectedTag(selectedTag as TagView)"
      >
        {{ $t("tagsView.close") }}
      </li>
      <li @click="closeOthersTags">
        {{ $t("tagsView.closeOthers") }}
      </li>
      <li @click="closeAllTags(selectedTag as TagView)">
        {{ $t("tagsView.closeAll") }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import path from "path";
import { ref, computed, nextTick, onMounted, watch } from "vue";
import {
  useRoute,
  RouteMeta,
  useRouter,
  RouteRecordRaw,
  RouteLocationNormalizedLoaded,
} from "vue-router";
import { TagView } from "@/store/modules/tagsView";
import { useStore } from "vuex";
import ScrollPane from "./ScrollPane.vue";
import { Close } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
const store = useStore();

const tagRef = ref<any[]>([]);
const scrollPaneRef = ref<InstanceType<typeof ScrollPane>>();
const tagsviewRootRef = ref<HTMLDivElement>();

const top = ref(0);
const left = ref(0);
const visible = ref<boolean>(false);

const affixTags = ref<TagView[]>([]);

const tagList = ref<TagView[]>([]);

onMounted(() => {
  initTags();
  addTags();
});

const routes = computed<RouteRecordRaw[]>(() => {
  return store.state.permission.routes;
});

watch(route, (newVal: RouteLocationNormalizedLoaded) => {
  addTags();
  moveToCurrentTag();
});

watch(visible, (newVal: boolean) => {
  if (newVal) {
    document.body.addEventListener("click", closeMenu);
  } else {
    document.body.removeEventListener("click", closeMenu);
  }
});

const initTags = (): void => {
  affixTags.value = filterAffixTags(routes.value);
  for (const tag of affixTags.value) {
    // Must have tag name
    if (tag.name) {
      store.dispatch("addVisitedView", tag);
    }
  }
};

const filterAffixTags = (
  routes: RouteRecordRaw[],
  basePath = "/"
): TagView[] => {
  let tags: TagView[] = [];
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path);
      if (childTags.length >= 1) {
        tags = [...tags, ...childTags];
      }
    }
  });
  return tags;
};

const addTags = (): boolean => {
  const { name } = route;
  if (name) {
    store.dispatch("addView", route);
  }
  return false;
};

const closeMenu = (): void => {
  visible.value = false;
};

const handleScroll = (): void => {
  closeMenu();
};

// const visitedViews = ref<TagView[]>([]);
const visitedViews = computed<TagView[]>(() => {
  return store.state.tagsView.visitedViews;
});

// 当前激活的tag
const isActive = (tagRoute: TagView): boolean => {
  return tagRoute.path === route.path;
};

const isAffix = (tag: TagView): RouteMeta | unknown => {
  return tag.meta && tag.meta.affix;
};

// 鼠标中键关闭tag页
const closeSelectedTag = (view: TagView): void => {
  store.dispatch("delView", view);
  if (isActive(view)) {
    toLastView(store.state.tagsView.visitedViews, view);
  }
};

// if 关闭的是正在使用的页面 就是让最后一个标签激活  然后判断是否是dashboard
const toLastView = (visitedViews: TagView[], view: TagView): void => {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push(latestView.fullPath).catch((err) => {
      console.warn(err);
    });
  } else {
    // Default redirect to the home page if there is no tags-view, adjust it if you want
    if (view.name === "Dashboard") {
      // to reload home page
      router.replace({ path: "/redirect" + view.fullPath }).catch((err) => {
        console.warn(err);
      });
    } else {
      router.push("/").catch((err) => {
        console.warn(err);
      });
    }
  }
};

// 右键自定义按钮页
const openMenu = (tag: TagView, e: MouseEvent): void => {
  const menuMinWidth = 105;
  const offsetLeft = tagsviewRootRef.value.getBoundingClientRect().left; // container margin left
  const offsetWidth = (tagsviewRootRef.value as HTMLElement).offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const menuLeft = e.clientX - offsetLeft + 15; // 15: margin right
  if (menuLeft > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = menuLeft;
  }
  top.value = e.clientY;
  visible.value = true;
  selectedTag.value = tag;
};

// 刷新
const refreshSelectedTag = (view: TagView): void => {
  store.dispatch("delCachedView", view);
  const { fullPath } = view;
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

// 关闭当前选中的tag页面
const closeCurrentSelectedTag = (view: TagView): void => {
  store.dispatch("delView", view);
  if (isActive(view)) {
    toLastView(store.state.tagsView.visitedViews, view);
  }
};

// 右键选中的标签
const selectedTag = ref<TagView>({});

const closeOthersTags = (): void => {
  if (
    selectedTag.value.fullPath !== route.path &&
    selectedTag.value.fullPath !== undefined
  ) {
    router.push(selectedTag.value.fullPath).catch((err) => {
      console.warn(err);
    });
  }
  store.dispatch("delOthersViews", selectedTag.value);
  moveToCurrentTag();
};

const moveToCurrentTag = (): void => {
  const tags = tagRef.value; // TODO: better typescript support for router-link
  tagList.value = tags;
  nextTick(() => {
    for (const tag of tags) {
      if ((tag.to as TagView).path === route.path) {
        scrollPaneRef.value.moveToTarget(tag as any);
        // When query is different then update
        if ((tag.to as TagView).fullPath !== route.fullPath) {
          store.dispatch("updateVisitedView", route);
        }
        break;
      }
    }
  });
};

//关闭所有标签
const closeAllTags = (view: TagView) => {
  store.dispatch("delAllViews");
  if (affixTags.value.some((tag) => tag.path === route.path)) {
    return;
  }
  toLastView(store.state.tagsView.visitedViews, view);
};
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
      }
      .close-icon-wrapper {
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        display: inline-block;
        border-radius: 50%;
        margin-left: 2px;
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
        .close-icon {
          width: 10px;
          height: 10px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          transform-origin: 100% 50%;

          &:before {
            transform: scale(0.6);
            display: inline-block;
            vertical-align: -3px;
          }
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
