<template>
  <el-config-provider :size="size">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const size = computed(() => {
  return store.state.app.size;
});
</script>

<style lang="scss">
// #app {
// font-family: Avenir, Helvetica, Arial, sans-serif;
// -webkit-font-smoothing: antialiased;
// -moz-osx-font-smoothing: grayscale;
// color: #2c3e50;
// }
</style>
