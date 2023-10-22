<template>
  <base-approve-table
    title="任务书审批"
    :approve-func="approve"
    :firstProgress="13"
    :secondProgress="14"
    :appoint="route.name !== 'middleApprove'"
    @showDetail="showDetail"
  />
</template>

<script setup lang="ts">
import BaseApproveTable from "@/components/baseApproveTable.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { bus } from "@/utils/bus.ts";
import { useStore } from "vuex";
import {
  postMiddleTermAppointApprove,
  postMiddleTermApprove,
} from "@/service/subject/middleTerm.ts";

const store = useStore();
const route = useRoute();
const approve = computed(() => {
  if (route.name === "taskApprove") {
    return postMiddleTermApprove;
  } else {
    return postMiddleTermAppointApprove;
  }
});
const showDetail = (subjectInfo) => {
  bus.emit("showMiddle", {
    title: "中期检查详情",
    subjectInfo,
    isChange: false,
  });
};
</script>

<style scoped lang="less"></style>
