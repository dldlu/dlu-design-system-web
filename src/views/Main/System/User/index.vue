<template>
  <user v-if="route.name !== 'manager'"></user>
  <router-view v-else></router-view>
</template>

<script setup lang="ts">
import User from "@/views/Main/System/User/user.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped lang="less"></style>
