<!--
 * @Author: zhangyu
 * @Date: 2022-08-09 11:39:10
 * @LastEditors: Please set LastEditors
 * @Description: tagsview 滚动
 * @FilePath: src/layout/components/TagsView/ScrollPane.vue
-->
<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot></slot>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
  defineEmits,
  onBeforeMount,
  onBeforeUnmount,
  defineExpose,
  VueElement,
  withDefaults,
  Component,
} from "vue";
import { ElScrollbar } from "element-plus";
import { TagView } from "@/store/modules/tagsView";

const props = defineProps<{ tagList: any[] }>();

const TAGSPACING = 4;

const scrollContainer = ref<InstanceType<typeof ElScrollbar>>();

const emit = defineEmits(["scroll"]);

const emitScroll = (): void => {
  emit("scroll");
};

const scrollWrapper = computed<HTMLDivElement>((): HTMLDivElement => {
  return scrollContainer.value.wrap$;
});

onMounted(() => {
  scrollWrapper.value.addEventListener("scroll", emitScroll, true);
});

onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener("scroll", emitScroll, true);
});

const handleScroll = (e: WheelEvent): void => {
  const eventDelta = (e as any).wheelDelta || -e.deltaY * 40;
  const scrollWrapperValue = scrollWrapper.value;
  scrollWrapperValue.scrollLeft =
    scrollWrapperValue.scrollLeft + eventDelta / 4;
};

const moveToTarget = (currentTag: HTMLElement) => {
  const containerEl: HTMLDivElement = scrollContainer.value.$el;
  const containerWidth = containerEl.offsetWidth;
  const scrollWrapperEl = scrollWrapper.value;
  const tagList = props.tagList;

  let firstTag = null;
  let lastTag = null;

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0];
    lastTag = tagList[tagList.length - 1];
  }

  if (firstTag === currentTag) {
    scrollWrapper.value.scrollLeft = 0;
  } else if (lastTag === currentTag) {
    scrollWrapper.value.scrollLeft =
      scrollWrapper.value.scrollWidth - containerWidth;
  } else {
    // find preTag and nextTag
    const currentIndex = tagList.findIndex((item) => item === currentTag);
    const prevTag = tagList[currentIndex - 1];
    const nextTag = tagList[currentIndex + 1];
    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft =
      (nextTag.value.$el as HTMLDivElement).offsetLeft +
      (nextTag.value.$el as HTMLDivElement).offsetWidth +
      TAGSPACING;
    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft =
      (prevTag.value.$el as HTMLDivElement).offsetLeft - TAGSPACING;

    if (
      afterNextTagOffsetLeft >
      scrollWrapper.value.scrollLeft + containerWidth
    ) {
      scrollWrapper.value.scrollLeft = afterNextTagOffsetLeft - containerWidth;
    } else if (beforePrevTagOffsetLeft < scrollWrapper.value.scrollLeft) {
      scrollWrapper.value.scrollLeft = beforePrevTagOffsetLeft;
    }
  }
};

defineExpose({
  moveToTarget,
});
</script>
<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  .el-scrollbar__bar {
    bottom: 0px;
  }
  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>
