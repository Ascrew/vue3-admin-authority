<!--
 * @Author: zhangyu
 * @Date: 2022-08-08 15:17:16
 * @LastEditors: Please set LastEditors
 * @Description: navbar右侧语言控制按钮
 * @FilePath: src/components/LangSelect/index.vue
-->
<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <!-- <svg-icon name="language" class="international-icon" /> -->
      <IconSvg icon-class="menu"></IconSvg>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'es'" command="es">
          Español
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'ja'" command="ja">
          日本語
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'ko'" command="ko">
          한국어
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'it'" command="it">
          Italiano
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import settings from "@/settings";
import { computed } from "vue";
import IconSvg from "../IconSvg/index.vue";

const store = useStore();
const route = useRoute();
const { locale, t } = useI18n();

const language = computed(() => {
  return store.state.app.language;
});

const handleSetLanguage = (lang: string): void => {
  locale.value = lang;
  store.dispatch("SetLanguage", lang);
  document.documentElement.lang = lang;
  const title = route.meta.title
    ? `${t(`route.${route.meta.title}`)} - ${settings.title}`
    : `${settings.title}`;
  document.title = title;
  ElMessage.success(t("components.changeLanguageTips").toString());
};
</script>
<style lang="scss" scoped></style>
