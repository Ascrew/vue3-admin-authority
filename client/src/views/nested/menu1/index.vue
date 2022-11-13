<template>
  <div style="padding: 30px">
    <el-alert :closable="false" title="menu 1">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </el-alert>
  </div>
</template>

<script lang="ts" setup></script>
