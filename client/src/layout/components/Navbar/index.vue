<!--
 * @Author: zhangyu
 * @Date: 2022-08-07 20:54:24
 * @LastEditors: Please set LastEditors
 * @Description: 右侧主页面头部bar
 * @FilePath: src/layout/components/Navbar/index.vue
-->
<template>
  <div class="navbar">
    <Hamgburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <Breadcrumb id="breadcrumb_container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->
        <el-tooltip
          :content="$t('navbar.size')"
          effect="dark"
          placement="bottom"
        >
          <SizeSelect class="right-menu-item hover-effect" />
        </el-tooltip>
        <LangSelect class="right-menu-item hover-effect" />
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <IconSvg
            icon-class="caret-bottom"
            class="el-icon-caret-bottom"
          ></IconSvg>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <router-link to="/profile/">
              <el-dropdown-item>
                {{ $t("navbar.profile") }}
              </el-dropdown-item>
            </router-link> -->
            <router-link to="/">
              <el-dropdown-item>
                {{ $t("navbar.dashboard") }}
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="setTheme">
              <span style="display: block">
                {{ $t("navbar.setTheme") }}
              </span>
            </el-dropdown-item>
            <!-- <a
              target="_blank"
              href="https://github.com/armour/vue-typescript-admin-template/"
            >
              <el-dropdown-item>
                {{ $t("navbar.github") }}
              </el-dropdown-item>
            </a> -->
            <!-- <a
              target="_blank"
              href="https://armour.github.io/vue-typescript-admin-docs/"
            >
              <el-dropdown-item>Docs</el-dropdown-item>
            </a> -->
            <el-dropdown-item divided @click="logout">
              <span style="display: block">
                {{ $t("navbar.logOut") }}
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Hamgburger from "@/components/Hamburger/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import SizeSelect from "@/components/SizeSelect/index.vue";
import LangSelect from "@/components/LangSelect/index.vue";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import IconSvg from "@/components/IconSvg/index.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

// ----- hamburger ----- start
const sidebar = computed(() => {
  return store.state.app.sidebar;
});
const toggleSideBar = (): void => {
  store.dispatch("ToggleSideBar");
};

// ----- hamburger ----- end

// ----- right menu ----- start

// is phone page
const device = computed((): string => {
  return store.state.app.device.toString();
});

// user operation area
const avatar = computed(() => {
  return store.state.user.avatar;
});

const logout = async () => {
  await store.dispatch("LogOut");
  router.push(`/login?redirect=${route.fullPath}`).catch((err) => {
    console.warn(err);
  });
};

const setTheme = () => {
  store.dispatch("ChangeSetting", { key: "showSettingsDrawer", value: true });
};

// ----- right menu ----- end
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      line-height: 50px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        position: relative;
        height: 100%;
        line-height: 50px;
        .user-avatar {
          margin-top: 5px;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          width: 13px;
          height: 13px;
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
