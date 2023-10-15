<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-has="[2, 3, 4, 5, 6, 7]" v-model:grade="approvalGrade" class="select100" />
      <el-button v-has="[2, 3, 4, 5, 6, 7]" @click="turnPage('myAppoint')">我的委托</el-button>
      <el-button @click="showReportForm">报题</el-button>
      <el-button v-has="[3, 4, 5, 6, 7]" @click="turnPage('approve')">审阅</el-button>
    </div>
    <div class="tableBody">
      <base-subject-table>
        <template #option="{ subjectInfo }">
          <div>
            <el-button size="small" type="primary">下载</el-button>
            <el-popconfirm title="确定要删除吗?" @confirm="delSubject(subjectInfo.subject_id)">
              <template #reference>
                <el-button size="small" type="danger" :disabled="subjectInfo.progress_id !== 1"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
            <el-button
              size="small"
              type="warning"
              :disabled="subjectInfo.progress_id !== 1"
              @click="showDetail(subjectInfo.subject_id)"
              >修改</el-button
            >
          </div>
        </template>
      </base-subject-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="subjects.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
  <proposal-report title="题目审批表" :type="1" @getNewData="getNewData" ref="reportRef" />
  <proposal-report
    title="题目详情"
    :type="4"
    :subjectId="currentSubjectId"
    @getNewData="getNewData"
    ref="detailRef"
  />
</template>

<script setup lang="ts">
import YearSelect from "@/components/yearSelect.vue";
import MyPagination from "@/components/myPagination.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { pageBody } from "@/store/modules/baseInfo.ts";
import { useRouter } from "vue-router";
import ProposalReport from "@/views/Main/Paper/Approval/proposalReport.vue";
import { delApply } from "@/service/subject/apply.ts";
import { ElMessage } from "element-plus";
import BaseSubjectTable from "@/components/baseSubjectTable.vue";

const store = useStore();
const router = useRouter();
const pageRef = ref<any>();
const reportRef = ref<any>();
const detailRef = ref<any>();
let approvalGrade = ref<number>(0);
let currentSubjectId = ref<number>(0);
let subjects = computed(() => {
  return store.state.subject.selfSubject;
});

watch(approvalGrade, (value, oldValue) => {
  if (oldValue !== 0) {
    pageRef.value.reset();
    pageRef.value.comGetData();
  }
});
const showReportForm = () => {
  reportRef.value.showForm();
};
const turnPage = (name) => {
  router.push({ name });
};
const getData = (pageParams: pageBody) => {
  const params = JSON.parse(JSON.stringify(pageParams));
  params.year = approvalGrade.value;
  store.dispatch("subject/getSelfSubjectAction", params);
};
const getNewData = () => {
  pageRef.value.comGetData();
};
const delSubject = async (id) => {
  let result = await delApply(id);
  if (result.status_code === 10000) {
    ElMessage.success(result.status_msg);
    pageRef.value.comGetData();
  } else {
    ElMessage.error(result.status_msg);
  }
};

const showDetail = (id) => {
  currentSubjectId.value = id;
  detailRef.value.showForm();
};
</script>

<style scoped lang="less"></style>
