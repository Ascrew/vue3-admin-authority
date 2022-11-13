<!--
 * @Author: zhangyu
 * @Date: 2022-07-19 16:57:23
 * @LastEditors: Please set LastEditors
 * @Description: 401 page
 * @FilePath: src/views/error-page/401.vue
-->
<template>
  <div class="errPage-container">
    <el-button icon="el-icon-arrow-left" class="back-btn" @click="back">
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面
        <h2>你没有权限去该页面</h2>
        <h6>如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/dashboard"> 回首页 </router-link>
          </li>
          <li class="link-type">
            <a href="https://github.com/armour">随便看看</a>
          </li>
          <li>
            <a href="#" @click.prevent="dialogVisible = true">点我看图</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGifUrl"
          class="some-gif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
    <el-dialog v-model:visible="dialogVisible" title="随便看">
      <img :src="ewizardClap" class="some-img" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import errGif from "@/assets/401.gif";

const route = useRoute();
const router = useRouter();

const errGifUrl = ref(errGif + "?" + new Date());
const ewizardClap = ref(
  "https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646"
);
const dialogVisible = ref(false);

const back = () => {
  if (route.query.noGoBack) {
    router.push({ path: "/dashboard" }).catch((err) => {
      console.warn(err);
    });
  } else {
    router.go(-1);
  }
};
</script>
<style lang="scss" scoped></style>
