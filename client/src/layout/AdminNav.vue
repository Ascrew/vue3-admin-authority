<!--
 * @Author: zhangyu
 * @Date: 2021-09-09 16:05:25
 * @LastEditors: Please set LastEditors
 * @Description: admin nav
 * @FilePath: src/layout/AdminNav.vue
-->
<template>
  <div>
    <div class="comp-nav">
      <div class="nav-title" @click="jumpToAdminHome">Admin Site</div>
      <div class="nav-func">
        <div class="one-func" v-for="(item, index) in 3" :key="index">
          {{ "btn:" + index }}
        </div>
      </div>
    </div>
    <div class="comp-fill"></div>
    <div class="comp-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import router from "@/router/index";
// import { useRouter } from 'vue-router'

const jumpToAdminHome = () => {
  // useRouter().push('AdminHome')
  router.push("AdminHome");
};
onMounted(async () => {
  // onMounted area
});
</script>
<style lang="scss" scoped>
.comp-nav {
  z-index: 2001;
  width: 100%;
  height: 70px;
  background-color: #6168c0;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nav-title {
    margin-left: 40px;
    font-size: 30px;
    font-weight: 600;
    cursor: pointer;
  }
  .one-func {
    margin: 0 10px;
    float: right;
    cursor: pointer;
    text-decoration: underline;
  }
}
.comp-fill {
  width: 100%;
  height: 70px;
  z-index: 2001;
}
.comp-content {
  padding: 40px 100px 40px;
}
</style>
