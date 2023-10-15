<template>
  <el-menu
    :default-active="route.path.substring(route.path.indexOf('/'))"
    @select="turn"
    unique-opened
  >
    <el-sub-menu v-for="parent in menus" :index="parent.name">
      <template #title>
        <img src="../assets/md-room@1x.png" />
        <span class="font" style="margin-left: 20px">{{ parent.meta.title }}</span>
      </template>
      <el-menu-item v-for="child in parent.children" :index="parent.path + '/' + child.path">
        {{ child.meta.title }}
      </el-menu-item>
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
import { useStore } from "vuex";
import { computed } from "vue";

const router = useRouter();
const route = useRoute();
const store = useStore();
let menus = computed(() => {
  return store.state.user.addRouters.filter((item) => item.hasOwnProperty("meta"));
});
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
