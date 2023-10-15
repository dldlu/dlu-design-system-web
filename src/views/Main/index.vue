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
  <proposal-report title="题目详情" :type="3" :subjectId="currentSubjectId" ref="detailRef" />
</template>

<script lang="ts" setup>
import MyHeader from "@/components/myHeader.vue";
import MyNav from "@/components/myNav.vue";
import MyBreadcrumb from "@/components/myBreadcrumb.vue";
import ProposalReport from "@/views/Main/Paper/Approval/proposalReport.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { bus } from "@/utils/bus.ts";

let detailRef = ref<any>();
let currentSubjectId = ref<number>(0);
onMounted(() => {
  bus.on("showDetail", (id: number) => {
    currentSubjectId.value = id;
    detailRef.value.showForm();
  });
});
onBeforeUnmount(() => {
  bus.off("showDetail");
});
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
