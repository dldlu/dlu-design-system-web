<template>
  <div class="app">
    <MyHeader></MyHeader>
    <div class="main">
      <MyNav class="Nav"></MyNav>
      <div class="right">
        <div class="bread">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item>通知管理</el-breadcrumb-item>
            <el-breadcrumb-item>消息管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="view">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import MyHeader from './components/MyHeader.vue'
import MyNav from './components/MyNav.vue';

</script>

<style lang="less" scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.Nav {
  flex: 1;
}

.right {
  margin-left: 20px;
  flex: 7;
  display: flex;
  flex-direction: column;
}

.bread {
  height: 51px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.view {
  flex: 1;
  border-radius: 20px 0px 0px 0px;
  background-color: rgba(255, 255, 255, 1);
  width: 100%;
}
</style>


