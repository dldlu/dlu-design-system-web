<template>
  <component
    v-if="route.name === 'select'"
    :is="userInfo.role_id > 1 ? TSubjectSelect : SSubjectSelect"
  />
  <router-view />
</template>

<script setup lang="ts">
import SSubjectSelect from "@/views/Main/Paper/Select/SSubjectSelect.vue";
import TSubjectSelect from "@/views/Main/Paper/Select/TSubjectSelect.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useStore();
let userInfo = computed(() => {
  return store.state.user.userDesc;
});
</script>

<style scoped lang="less"></style>
