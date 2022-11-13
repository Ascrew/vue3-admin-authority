<!--
 * @Author: zhangyu
 * @Date: 2022-08-22 14:37:42
 * @LastEditors: Please set LastEditors
 * @Description: 业务组件主容器
 * @FilePath: src/layout/components/AppMain.vue
-->
<template>
  <section class="app-main">
    <router-view :key="key" v-slot="{ Component }">
      <transition name="fade-transfrom" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const cachedViews = computed<(string | undefined)[]>(() => {
  return store.state.tagsView.cachedViews;
});

const key = computed(() => {
  return route.path;
});
</script>
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  widows: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - 84px);
  }
  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
