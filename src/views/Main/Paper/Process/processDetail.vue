<template>
  <el-menu style="margin-top: 20px" default-active="0" mode="horizontal" @select="handleSelect">
    <el-menu-item v-for="(item, index) in details" :index="String(index)"
      >第{{ item.week }}周</el-menu-item
    >
  </el-menu>
  <div class="content">
    <div class="title">工作进展情况</div>
    <el-input v-model="details[curIndex].content" :rows="4" type="textarea" :disabled="!isStu" />
    <div class="title">指导教师评语</div>
    <el-input v-model="details[curIndex].comment" :rows="4" type="textarea" :disabled="isStu" />
    <el-button class="title" @click="save"> 保存({{ details[curIndex].week }}) </el-button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
import {
  getProcessDetail,
  postProcessContent,
  processContent,
  processItem,
} from "@/service/subject/process.ts";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();
let details = ref<processItem[]>([
  {
    comment: "",
    comment_date: "",
    content: "",
    content_date: "",
    id: 31,
    is_delete: 0,
    subject_id: 107,
    week: 1,
  },
]);
let curIndex = ref<number>(0);

let isStu = computed(() => {
  return store.state.user.userDesc.role_id === 1;
});
const handleSelect = (key: string) => {
  curIndex.value = Number(key);
};

const getDetails = async (id: number) => {
  let res = await getProcessDetail(id);
  if (res.status_code === 10000) {
    if (res.data.length === 0) {
      ElMessage.error("检查点未设置");
      await router.push({
        name: "process",
      });
    }
    details.value = res.data;
  } else {
    ElMessage.error(res.status_msg);
    await router.push({
      name: "process",
    });
  }
};
const save = async () => {
  let isStu = store.state.user.userDesc.role_id === 1;
  let content = isStu
    ? details.value[curIndex.value].content
    : details.value[curIndex.value].comment;
  let data: processContent = {
    subjectId: Number(route.params.subject_id),
    week: details.value[curIndex.value].week,
    contentOrComment: content,
  };
  console.log(data);
  let res = await postProcessContent(data);
  if (res.status_code === 10000) {
    ElMessage.success(res.status_msg);
  } else {
    ElMessage.error(res.status_msg);
  }
};

onBeforeMount(() => {
  getDetails(Number(route.params.subject_id));
});
</script>

<style scoped lang="less">
.content {
  margin: 10px;
  .title {
    margin: 10px 0;
  }
}
</style>
