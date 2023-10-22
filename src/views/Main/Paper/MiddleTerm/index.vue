<template>
  <middle-term-manage v-if="route.name === 'middleTerm'" />
  <router-view v-else />
  <middle-term ref="middleTermRef" :title="title" :subject="subject" :isChange="isChange" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { bus } from "@/utils/bus.ts";
import MiddleTermManage from "@/views/Main/Paper/MiddleTerm/middleTermManage.vue";
import MiddleTerm from "@/views/Main/Paper/MiddleTerm/middleTerm.vue";
import { subjectInfo } from "@/service/subject/self.ts";

const route = useRoute();
const title = ref<string>("查看中期检查");
const subject = ref<subjectInfo>();
const isChange = ref<boolean>(false);
const middleTermRef = ref();
onMounted(() => {
  bus.on("showMiddle", (middleInfo: any) => {
    console.log(middleInfo);
    subject.value = middleInfo.subjectInfo;
    title.value = middleInfo.title;
    isChange.value = middleInfo.isChange;
    middleTermRef.value.showForm();
  });
});
onBeforeUnmount(() => {
  bus.off("showMiddle");
});
</script>

<style scoped lang="less"></style>
