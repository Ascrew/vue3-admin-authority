<!--
 * @Author: zhangyu
 * @Date: 2022-07-19 15:14:28
 * @LastEditors: Please set LastEditors
 * @Description:  后台管理 权限登录重定向
 * @FilePath: src/views/login/auth-redirect.vue
-->
<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {
  const hash = window.location.search.slice(1);
  if (window.localStorage) {
    window.localStorage.setItem("x-admin-oauth-code", hash);
    window.close();
  }
});
</script>
