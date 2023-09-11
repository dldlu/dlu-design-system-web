<template>
  <div class="app">
    <div class="main">
      <MyNav class="Nav"></MyNav>
      <div class="right">
        <MyHeader></MyHeader>
        <div class="bread">
          <MyBreadcrumb></MyBreadcrumb>
        </div>
        <div class="view">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyHeader from "@/components/MyHeader.vue";
import MyNav from "@/components/MyNav.vue";
import MyBreadcrumb from "@/components/MyBreadcrumb.vue";
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
  min-width: 1180px;
}

.Nav {
  flex: 0 0 12.5%;
}

.right {
  margin-left: 20px;
  flex: 0 1 87.5%;
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
  border-radius: 20px 0 0 0;
  background-color: rgba(255, 255, 255, 1);
  width: 100%;
}
</style>
