<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-has="[2, 3, 4, 5, 6, 7]" v-model:grade="year" class="select100" />
      <el-button v-has="[2, 3, 4, 5, 6, 7]" @click="turnPage('middleAppoint')">我的委托</el-button>
      <el-button v-has="[3, 4, 5, 6, 7]" @click="turnPage('middleApprove')">审阅</el-button>
    </div>
    <div class="tableBody">
      <base-subject-table>
        <template #option="{ subjectInfo, index }">
          <el-button
            v-if="store.state.user.userDesc.role_id === 1"
            size="small"
            type="primary"
            @click="showMiddle(subjectInfo)"
          >
            {{ store.state.user.userDesc.role_id === 1 ? "查看" : "填写/修改" }}
          </el-button>
          <el-button size="small" type="primary"> 下载 </el-button>
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

const showMiddle = (subjectInfo) => {
  const isStu = store.state.user.userDesc.role_id === 1;
  bus.emit("showMiddle", {
    title: isStu ? "中期检查详情" : "填写中期检查",
    subjectInfo,
    isChange: !isStu,
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
  bus.on("getMiddleData", () => {
    pageRef.value.comGetData();
  });
});
onBeforeUnmount(() => {
  bus.off("getMiddleData");
});
</script>

<style scoped lang="less"></style>
