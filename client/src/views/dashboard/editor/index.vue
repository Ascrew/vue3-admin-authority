<!--
 * @Author: zhangyu
 * @Date: 2022-07-20 14:34:57
 * @LastEditors: Please set LastEditors
 * @Description: 不同用户的首页
 * @FilePath: src/views/dashboard/editor/index.vue
-->
<template>
  <div class="dashboard-editor-container">
    <div class="clearfix">
      <pan-thumb :image="avatar" style="float: left">
        Your roles:
        <span v-for="item in roles" :key="item" class="info-roles">{{
          item
        }}</span>
      </pan-thumb>
      <github-corner
        style="position: absolute; top: 0px; border: 0; right: 0"
      />
      <div class="info-container">
        <span class="display_name">{{ name }}</span>
        <span style="font-size: 20px; padding-top: 20px; display: inline-block"
          >Editor's Dashboard</span
        >
      </div>
    </div>
    <div>
      <img :src="emptyGif" class="emptyGif" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import PanThumb from "@/components/PanThumb/index.vue";
import GithubCorner from "@/components/GithubCorner/index.vue";
import { useStore } from "vuex";

const store = useStore();

const emptyGif = ref(
  "https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3"
);
const name = computed(() => {
  return store.state.user.name;
});
const avatar = computed(() => {
  return store.state.user.avatar;
});

const roles = computed(() => {
  return store.state.user.roles;
});
</script>
<style lang="scss" scoped>
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}

.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 50px 60px 0px;

  .info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }

  .info-container {
    position: relative;
    margin-left: 190px;
    height: 150px;
    line-height: 200px;

    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}
</style>
