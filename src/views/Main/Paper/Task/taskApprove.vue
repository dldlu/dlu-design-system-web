<template>
  <base-approve-table
    title="任务书审批"
    :approve-func="approve"
    :firstProgress="6"
    :secondProgress="7"
    :appoint="route.name !== 'taskApprove'"
  />
</template>

<script setup lang="ts">
import { postTaskAppointApprove, postTaskApprove } from "@/service/subject/task.ts";
import BaseApproveTable from "@/components/baseApproveTable.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const approve = computed(() => {
  if (route.name === "taskApprove") {
    return postTaskApprove;
  } else {
    return postTaskAppointApprove;
  }
});
</script>

<style scoped lang="less"></style>
