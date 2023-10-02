<template>
  <div class="table">
    <div class="tableHeader">
      <el-input
        v-model="params.condition"
        placeholder="按老师姓名或题目名称模糊查询"
        class="select200"
      />
      <el-button @click="query">查询</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="subjectList" stripe style="margin-top: 20px" max-height="500">
        <el-table-column min-width="50">
          <template #default="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="headline" label="论文题目" min-width="300">
          <template #default="scope">
            <div @click="showDetail(subjectList[scope.$index].id)">
              {{ subjectList[scope.$index].headline }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="第一指导教师姓名" min-width="150">
          <template #default="scope">
            <el-tooltip placement="bottom-start" effect="light">
              <template #content>
                职位:{{ subjectList[scope.$index].first_teacher_title_name }}<br />
                手机号:{{ subjectList[scope.$index].first_teacher_phone }}
              </template>
              {{ subjectList[scope.$index].first_teacher_name }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="已选人数" min-width="100"> </el-table-column>
        <el-table-column label="第一选择" min-width="100"> </el-table-column>
        <el-table-column label="第二选择" min-width="100"> </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <my-pagination
        :page_total="store.state.subject.studentSelectList.page_total"
        @getData="getData"
        ref="pageRef"
      />
    </div>
  </div>
  <el-dialog
    v-model="selectTableVisible"
    title="操作说明与选择"
    width="35%"
    style="border-radius: 15px"
  >
    <div style="display: flex; justify-content: center"></div>
    <template #footer>
      <span>
        <el-button @click="selectTableVisible = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <proposal-report title="题目详情" :type="3" :subjectId="currentSubjectId" ref="detailRef" />
</template>

<script setup lang="ts">
import MyPagination from "@/components/MyPagination.vue";
import YearSelect from "@/components/yearSelect.vue";
import { computed, onBeforeMount, onMounted, onUpdated, reactive, ref, watch } from "vue";
import MajorSelect from "@/components/majorSelect.vue";
import CollegeSelect from "@/components/collegeSelect.vue";
import { useStore } from "vuex";
import { pageBody } from "@/store/modules/baseInfo.ts";
import { approveListRequest, approveRequest } from "@/service/subject/approve.ts";
import { delApply, genSerial, serialRequest, subjectApprove } from "@/service/subject/apply.ts";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import TeacherSelect from "@/components/teacherSelect.vue";
import { appointRequest, postAppoint } from "@/service/subject/appoint.ts";
import { subjectBody, subjectInfo } from "@/service/subject/self.ts";
import ProposalReport from "@/views/Main/Paper/Approval/proposalReport.vue";
import { GetStuSelect } from "@/service/select/student.ts";

const store = useStore();
const router = useRouter();
const route = useRoute();
let pageRef = ref<any>();
let detailRef = ref<any>();
let currentSubjectId = ref<number>(0);
let appointForm = reactive({
  subjectIds: [],
  number: "",
  suggest: "",
});
let selectTableVisible = ref<boolean>(false);
let params = reactive({
  majorId: 0,
  grade: 0,
  condition: "",
});
let subjectList = computed(() => {
  return store.state.subject.studentSelectList.array.subjectList;
});
let firstSubjectId = computed(() => {
  return store.state.subject.studentSelectList.array.firstSubjectId;
});
let secondSubjectId = computed(() => {
  return store.state.subject.studentSelectList.array.secondSubjectId;
});
let userInfo = computed(() => {
  return store.state.user.userDesc;
});

const getData = (pageParams: pageBody) => {
  const data: GetStuSelect = JSON.parse(JSON.stringify(pageParams));
  data.condition = params.condition;
  data.grade = params.grade;
  data.majorId = params.majorId;
  console.log(data);
  store.dispatch("subject/getStudentSelectList", data);
};

const query = () => {
  pageRef.value.reset();
  pageRef.value.comGetData();
};

const showDetail = (id) => {
  currentSubjectId.value = id;
  detailRef.value.showForm();
};

onBeforeMount(() => {
  params.majorId = store.state.user.userDesc.major_id;
  params.grade = store.state.user.userDesc.year as number;
});
</script>

<style scoped lang="less"></style>
