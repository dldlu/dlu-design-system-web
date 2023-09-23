<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-model:grade="approvalGrade" class="select100" />
      <el-button @click="turnPage('myAppoint')">我的委托</el-button>
      <el-button @click="showForm">报题</el-button>
      <el-button @click="turnPage('approve')">审阅</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="subjects.array" stripe style="margin-top: 20px" max-height="500">
        <el-table-column min-width="100">
          <template #default="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="headline" label="论文题目" min-width="300">
          <template #default="scope">
            <div @click="showDetail(subjects.array[scope.$index].subject_id)">
              {{ subjects.array[scope.$index].headline }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="指导教师" min-width="150">
          <template #default="scope">
            <el-tooltip placement="bottom-start" effect="light">
              <template #content>
                职位:{{ subjects.array[scope.$index].first_teacher_title_name }}<br />
                手机号:{{ subjects.array[scope.$index].first_teacher_phone }}
              </template>
              {{ subjects.array[scope.$index].first_teacher_name }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="学生姓名" min-width="150">
          <template #default="scope">
            <el-tooltip placement="bottom-start" effect="light">
              <template #content>
                学号:{{ subjects.array[scope.$index].student_number }}<br />手机号:{{
                  subjects.array[scope.$index].student_phone
                }}
              </template>
              {{ subjects.array[scope.$index].student_name }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="progress_name" label="状态" min-width="200" />
        <el-table-column min-width="300">
          <template #default="scope">
            <div>
              <el-button size="small" type="primary">下载</el-button>
              <el-popconfirm
                title="确定要删除吗?"
                @confirm="delSubject(subjects.array[scope.$index].subject_id)"
              >
                <template #reference>
                  <el-button
                    size="small"
                    type="danger"
                    :disabled="subjects.array[scope.$index].progress_id !== 1"
                    >删除</el-button
                  >
                </template>
              </el-popconfirm>
              <el-button size="small" type="warning">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="subjects.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
  <proposal-report title="题目审批表" :type="1" @getNewData="getNewData" ref="reportRef" />
  <proposal-report title="题目详情" :type="3" :subjectId="currentSubjectId" ref="detailRef" />
</template>

<script setup lang="ts">
import YearSelect from "@/components/yearSelect.vue";
import MyPagination from "@/components/MyPagination.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { pageBody } from "@/store/modules/baseInfo.ts";
import { useRouter } from "vue-router";
import ProposalReport from "@/views/Main/Paper/Approval/proposalReport.vue";
import { delApply } from "@/service/subject/apply.ts";
import { ElMessage } from "element-plus";

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
const showForm = () => {
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
