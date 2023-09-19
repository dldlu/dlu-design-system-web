<template>
  <approval v-if="route.name === 'approval'" />
  <router-view v-else />
</template>

<script setup lang="ts">
import Approval from "@/views/Main/Paper/Approval/approval.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped lang="less"></style>
