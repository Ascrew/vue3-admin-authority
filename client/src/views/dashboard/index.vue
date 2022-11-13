<!--
 * @Author: zhangyu
 * @Date: 2022-07-19 17:17:04
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: src/views/dashboard/index.vue
-->
<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import AdminDashboard from "./admin/index.vue";
import EditorDashboard from "./editor/index.vue";

const store = useStore();
const currentRole = ref("admin-dashboard");
const roles = computed(() => {
  return store.state.user.roles;
});

onMounted(() => {
  if (!roles.value.includes("admin")) {
    currentRole.value = "editor-dashboard";
  }
});
</script>
<style lang="scss" scoped></style>
