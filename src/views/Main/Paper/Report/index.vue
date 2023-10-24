<template>
  <report-manage v-if="route.name === 'report'"/>
  <router-view v-else/>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import ReportManage from "@/views/Main/Paper/Report/reportManage.vue";

const route = useRoute();
</script>

<style scoped lang="less"></style>
