<!--
 * @Author: zhangyu
 * @Date: 2021-09-14 15:54:43
 * @LastEditors: Please set LastEditors
 * @Description: admin-add blog
 * @FilePath: src/views/admin/AddBlog.vue
-->
<template>
  <div class="markdown">
    <h3 class="title">@kangc/v-md-editor</h3>
    <v-md-editor v-if="disabled" v-model="content" height="400px"></v-md-editor>
    <v-md-preview v-else :text="content"></v-md-preview>
  </div>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
const content = ref("");
const disabled = ref("true");
onMounted(() => {
  content.value = `[v-md-editor](https://code-farmer-i.github.io/vue-markdown-editor/zh/changelog.html).`;
});
</script>

<style lang="scss" scoped>
.markdown {
  padding: 20px;
  .title {
    text-align: center;
  }
}
</style>
