<template>
  <base-approve-table
    title="任务书审批"
    :approve-func="approve"
    :firstProgress="6"
    :secondProgress="7"
    :appoint="route.name !== 'taskApprove'"
    @showDetail="showDetail"
  />
</template>

<script setup lang="ts">
import { postTaskAppointApprove, postTaskApprove } from "@/service/subject/task.ts";
import BaseApproveTable from "@/components/baseApproveTable.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { bus } from "@/utils/bus.ts";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const approve = computed(() => {
  if (route.name === "taskApprove") {
    return postTaskApprove;
  } else {
    return postTaskAppointApprove;
  }
});
const showDetail = (subjectInfo) => {
  bus.emit("showTask", {
    title: "任务书详情",
    headline: subjectInfo.headline,
    isChange: false,
    subject_id: subjectInfo.subject_id,
  });
};
</script>

<style scoped lang="less"></style>
