<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-has="[2, 3, 4, 5, 6, 7]" v-model:grade="year" class="select100" />
      <el-button v-has="[2, 3, 4, 5, 6, 7]" @click="turnPage('taskAppoint')">我的委托</el-button>
      <el-button v-has="[3, 4, 5, 6, 7]" @click="turnPage('taskApprove')">审阅</el-button>
    </div>
    <div class="tableBody">
      <base-subject-table>
        <template #option="{ subjectInfo, index }">
          <el-button
            size="small"
            type="primary"
            @click="showTask(subjectInfo.headline, subjectInfo.subject_id)"
          >
            {{ store.state.user.userDesc.role_id === 1 ? "查看" : "填写/修改" }}
          </el-button>
        </template>
      </base-subject-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="subjectList.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import YearSelect from "@/components/yearSelect.vue";
import BaseSubjectTable from "@/components/baseSubjectTable.vue";
import MyPagination from "@/components/myPagination.vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { pageBody } from "@/store/modules/baseInfo.ts";
import { useRouter } from "vue-router";
import { bus } from "@/utils/bus.ts";

const store = useStore();
const router = useRouter();
let year = ref<number>(new Date().getFullYear());
let pageRef = ref();
let subjectList = computed(() => {
  return store.state.subject.selfSubject;
});

watch(year, () => {
  pageRef.value.reset();
  pageRef.value.comGetData();
});

const showTask = (headline, subject_id) => {
  const isStu = store.state.user.userDesc.role_id === 1;
  bus.emit("showTask", {
    title: isStu ? "任务书详情" : "填写任务书",
    headline,
    isChange: isStu,
    subject_id,
  });
};

const getData = (pageParams: pageBody) => {
  const params = JSON.parse(JSON.stringify(pageParams));
  params.year = year.value;
  store.dispatch("subject/getSelfSubjectAction", params);
};

const turnPage = (name) => {
  router.push({ name });
};

onMounted(() => {
  bus.on("getTaskData", () => {
    pageRef.value.comGetData();
  });
});
onBeforeUnmount(() => {
  bus.off("getTaskData");
});
</script>

<style scoped lang="less"></style>
