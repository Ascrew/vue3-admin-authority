<!--
 * @Author: zhangyu
 * @Date: 2022-07-20 14:34:57
 * @LastEditors: Please set LastEditors
 * @Description: 不同用户的首页 - admin
 * @FilePath: src/views/dashboard/editor/index.vue
-->
<template>
  <div class="admin-dashboard">admin dashboard</div>
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

.admin-dashboard {
  height: 100%;
  width: 100%;
}
</style>
