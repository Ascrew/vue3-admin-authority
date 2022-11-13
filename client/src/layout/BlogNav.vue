<!--
 * @Author: zhangyu
 * @Date: 2021-09-09 15:14:08
 * @LastEditors: Please set LastEditors
 * @Description: 博客顶部 bar
 * @FilePath: src/components/BlogNav.vue
-->
<template>
  <div>
    <div class="comp-nav">
      <div
        class="nav-btn"
        v-for="(item, index) in navBtnList"
        :key="index"
        @click="jumpRouter(item.routeName)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="comp-fill"></div>
    <div class="comp-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import router from "@/router/index";

export interface navBtnInterface {
  title?: string;
  routeName?: string;
}

const navBtnList = ref<navBtnInterface[]>([
  {
    title: "首页",
    routeName: "/",
  },
  {
    title: "博客",
    routeName: "BlogList",
  },
]);

const jumpRouter = (path: string | undefined) => {
  router.push({ name: path });
};
onMounted(async () => {
  // onMounted area
});
</script>
<style lang="scss" scoped>
.comp-nav {
  width: 100%;
  height: 70px;
  background: linear-gradient(70deg, #fcf3cf, #d1f2eb);
  display: flex;
  position: fixed;
  top: 0;
  .nav-btn {
    text-align: center;
    color: black;
    width: 100px;
    height: 100%;
    line-height: 70px;
    cursor: pointer;
  }
}
.comp-fill {
  height: 70px;
  width: 100%;
}
</style>
