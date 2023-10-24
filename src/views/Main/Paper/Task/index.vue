<template>
  <task-manage v-if="route.name === 'task'" />
  <router-view v-else />
  <task
    ref="taskRef"
    :title="title"
    :subject_id="subject_id"
    :headline="headline"
    :isChange="isChange"
  />
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import TaskManage from "@/views/Main/Paper/Task/taskManage.vue";
import Task from "@/views/Main/Paper/Task/task.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {bus} from "@/utils/bus.ts";

const route = useRoute();
const title = ref<string>("查看任务书");
const subject_id = ref<number>(0);
const headline = ref<string>('');
const isChange = ref<boolean>(false);
const taskRef = ref();
onMounted(() => {
  bus.on("showTask", (taskInfo: any) => {
    console.log(taskInfo);
    subject_id.value = taskInfo.subject_id;
    title.value = taskInfo.title;
    headline.value = taskInfo.headline;
    isChange.value = taskInfo.isChange;
    taskRef.value.showForm();
  });
});
onBeforeUnmount(() => {
  bus.off("showTask");
});
</script>

<style scoped lang="less"></style>
