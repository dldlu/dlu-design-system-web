<template>
  <process-manage v-if="route.name === 'process'" />
  <router-view v-else />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import ProcessManage from "@/views/Main/Paper/Process/processManage.vue";

const route = useRoute();
</script>

<style scoped lang="less"></style>
