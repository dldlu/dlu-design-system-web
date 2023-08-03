<template>
  <el-menu :default-active="route.path.substring(route.path.indexOf('/'))" @select="turn">
    <el-sub-menu index="system">
      <template #title>
        <img src="../assets/md-room@1x.png" />
        <span class="font" style="margin-left: 20px">系统管理</span>
      </template>
      <el-menu-item index="/system/user">用户管理</el-menu-item>
      <el-menu-item index="/system/role">角色管理</el-menu-item>
      <el-menu-item index="/system/school">学校管理</el-menu-item>
      <el-menu-item index="/system/college">学院管理</el-menu-item>
      <el-menu-item index="/system/major">专业管理</el-menu-item>
      <el-menu-item index="/system/class">班级管理</el-menu-item>
      <el-menu-item index="/system/log">日志管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <img src="../assets/md-room@1x.png" />
        <span class="font" style="margin-left: 20px">通知管理</span>
      </template>
      <el-menu-item index="2-1">消息管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const turn = (indexPath: string) => {
  router.push(`${indexPath}`);
};
</script>
<style lang="less" scoped>
.font {
  font-size: 14px;
  font-family: SourceHanSansSC-regular;
}
</style>
