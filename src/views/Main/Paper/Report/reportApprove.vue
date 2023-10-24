<template>
  <base-approve-table
      title="开题报告审批"
      :approve-func="approve"
      :firstProgress="10"
      :secondProgress="11"
      :appoint="route.name !== 'reportApprove'"
  />
</template>

<script setup lang="ts">
import BaseApproveTable from "@/components/baseApproveTable.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";
import {postReportAppointApprove, postReportApprove} from "@/service/subject/report.ts";

const route = useRoute();
const approve = computed(() => {
  if (route.name === "reportApprove") {
    return postReportApprove;
  } else {
    return postReportAppointApprove;
  }
});
</script>

<style scoped lang="less"></style>
