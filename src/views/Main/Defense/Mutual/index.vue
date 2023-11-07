<template>
  <mutual-manage v-if="route.name==='mutual'"/>
  <router-view v-else/>
</template>

<script setup lang="ts">
import MutualManage from "@/views/Main/Defense/Mutual/mutualManage.vue";
import {useRoute} from "vue-router";

const route = useRoute()

</script>

<style scoped lang="less">

</style>