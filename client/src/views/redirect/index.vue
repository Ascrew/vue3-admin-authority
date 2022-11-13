<!--
 * @Author: zhangyu
 * @Date: 2022-07-19 14:49:12
 * @LastEditors: Please set LastEditors
 * @Description: 重定向
 * @FilePath: src/views/redirect/index.vue
-->
<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

onMounted(() => {
  const route = useRoute();
  const { params, query } = route;
  const { path } = params;
  useRouter()
    // replace 不会留下导航记录 区别于router.push方法
    .replace({ path: "/" + path, query })
    .catch((err) => {
      console.warn(err);
    });
});
</script>
