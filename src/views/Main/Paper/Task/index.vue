<template>
  <task-manage v-if="route.name === 'task'" />
  <router-view v-else />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import TaskManage from "@/views/Main/Paper/Task/taskManage.vue";

const route = useRoute();
</script>

<style scoped lang="less"></style>
