<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-model:grade="params.grade" class="select100" />
      <college-select v-model:college_id="params.college_id" class="select140" />
      <major-select
        v-model:major_id="params.major_id"
        :college_id="params.college_id"
        class="select140"
      />
      <el-button v-if="status === 0" @click="status = 1">调配指导老师</el-button>
      <el-button v-else @click="status = 0">调配学生选题</el-button>
      <el-button>下载选题统计表</el-button>
      <el-button>选题及指导老师情况分析表</el-button>
    </div>
    <div class="tableBody">
      <el-table v-if="status === 0" :data="studentList" stripe style="margin-top: 20px">
        <el-table-column label="学号">
          <template #default="scope">
            {{ studentList[scope.$index].student.studentNumber }}
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template #default="scope">
            {{ studentList[scope.$index].student.studentName }}
          </template>
        </el-table-column>
        <el-table-column label="班级">
          <template #default="scope">
            {{ studentList[scope.$index].student.studentClassName }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="showAdjustTable(scope.$index)"
              >调配选题</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-table v-else :data="approveList.array" stripe style="margin-top: 20px" max-height="500">
        <el-table-column prop="headline" label="论文题目" min-width="200">
          <template #default="scope">
            <div @click="showDetail(approveList.array[scope.$index].subject_id)">
              {{ approveList.array[scope.$index].headline }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="第一指导教师姓名" min-width="150">
          <template #default="scope">
            <el-tooltip placement="bottom-start" effect="light">
              <template #content>
                职位:{{ approveList.array[scope.$index].first_teacher_title_name }}<br />
                手机号:{{ approveList.array[scope.$index].first_teacher_phone }}
              </template>
              {{ approveList.array[scope.$index].first_teacher_name }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="学生姓名" min-width="150">
          <template #default="scope">
            <el-tooltip placement="bottom-start" effect="light">
              <template #content>
                学号:{{ approveList.array[scope.$index].student_number }}<br />手机号:{{
                  approveList.array[scope.$index].student_phone
                }}
              </template>
              {{ approveList.array[scope.$index].student_name }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="progress_name" label="状态" min-width="100" />
        <el-table-column label="操作" min-width="100">
          <template #default="scope">
            <el-button type="primary" size="small" @click="showAdjustTable(scope.$index)"
              >调配指导老师</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="status === 1" class="tableFooter">
      <my-pagination :page_total="approveList.page_total" @getData="getTeaData" ref="pageRef" />
    </div>
  </div>
  <el-dialog
    v-model="adjustTeaVisible"
    title="调配指导老师"
    width="30%"
    style="border-radius: 15px"
  >
    <div
      style="display: flex; flex-direction: column; justify-content: center; align-items: center"
    >
      <teacher-select
        v-model:teacher_id="teacherId"
        :college_id="params.college_id"
        type="2"
        class="select200"
      />
    </div>
    <template #footer>
      <span>
        <el-button @click="submitAdjustTea">提交</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="adjustSubVisible"
    title="调配选题（表格内为曾选题）"
    width="70%"
    style="border-radius: 15px"
  >
    <div style="display: flex; flex-direction: column; justify-content: center">
      <table>
        <tr>
          <th>选择</th>
          <th>论文题目</th>
          <th>指导老师</th>
          <th>论文类型</th>
          <th>题目来源</th>
        </tr>
        <tr>
          <td>第一选择</td>
          <td
            style="cursor: pointer"
            @click="showDetail(studentList[currentStuIndex].firstSubject?.id)"
          >
            {{ studentList[currentStuIndex].firstSubject?.headline }}
          </td>
          <td>{{ studentList[currentStuIndex].firstSubject?.first_teacher_name }}</td>
          <td>{{ studentList[currentStuIndex].firstSubject?.type_name }}</td>
          <td>{{ studentList[currentStuIndex].firstSubject?.origin_name }}</td>
        </tr>
        <tr>
          <td>第二选择</td>
          <td
            style="cursor: pointer"
            @click="showDetail(studentList[currentStuIndex].secondSubject?.id)"
          >
            {{ studentList[currentStuIndex].secondSubject?.headline }}
          </td>
          <td>{{ studentList[currentStuIndex].secondSubject?.first_teacher_name }}</td>
          <td>{{ studentList[currentStuIndex].secondSubject?.type_name }}</td>
          <td>{{ studentList[currentStuIndex].secondSubject?.origin_name }}</td>
        </tr>
      </table>
      <el-table :data="subjectList" stripe style="margin-top: 20px" max-height="400">
        <el-table-column prop="headline" label="论文题目" min-width="200">
          <template #default="scope">
            <div style="cursor: pointer" @click="showDetail(subjectList[scope.$index].subjectId)">
              {{ subjectList[scope.$index].headline }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="first_teacher_name" label="指导老师" min-width="100" />
        <el-table-column prop="firstTeacherOffice" label="科室" min-width="100" />
        <el-table-column label="选择此题" align="center" min-width="50">
          <template #default="scope">
            <el-radio v-model="selectSubjectId" :label="subjectList[scope.$index].subjectId"
              >&nbsp</el-radio
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <span>
        <el-button @click="submitAdjust">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import YearSelect from "@/components/yearSelect.vue";
import CollegeSelect from "@/components/collegeSelect.vue";
import MajorSelect from "@/components/majorSelect.vue";
import { computed, ComputedRef, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import {
  AdjustSub,
  AdjustTea,
  OverStu,
  OverSub,
  postAdjustSubRes,
  postAdjustTeaRes,
} from "@/service/select/adjust.ts";
import { ElMessage } from "element-plus";
import { pageData } from "@/service/type.ts";
import { subjectInfo } from "@/service/subject/self.ts";
import { approveListRequest } from "@/service/subject/approve.ts";
import { pageBody } from "@/store/modules/baseInfo.ts";
import MyPagination from "@/components/myPagination.vue";
import TeacherSelect from "@/components/teacherSelect.vue";
import { bus } from "@/utils/bus.ts";

const store = useStore();
let status = ref<number>(0);
let adjustSubVisible = ref<boolean>(false);
let adjustTeaVisible = ref<boolean>(false);
let currentStuIndex = ref<number>(0);
let selectSubjectId = ref<number>(0);
let teacherId = ref<number>(0);
let pageRef = ref<any>();
let params = reactive({
  grade: new Date().getFullYear(),
  college_id: store.state.user.userDesc.college_id,
  major_id: store.state.user.userDesc.major_id,
});
let studentList: ComputedRef<OverStu[]> = computed(() => {
  return store.state.subject.overStudentList;
});
let subjectList: ComputedRef<OverSub[]> = computed(() => {
  return store.state.subject.overSubjectList;
});
let approveList: ComputedRef<pageData<subjectInfo>> = computed(() => {
  return store.state.subject.approveList;
});
watch([() => params.grade, () => params.major_id], () => {
  if (status.value === 0) {
    getStuData();
  } else {
    pageRef.value.comGetData();
  }
});
const getStuData = () => {
  let data = {
    majorId: params.major_id,
    grade: params.grade,
  };
  store.dispatch("subject/getOverStudentList", data);
  store.dispatch("subject/getOverSubjectList", data);
};

const getTeaData = (pageParams: pageBody) => {
  let data: approveListRequest & pageBody;
  data = {
    year: params.grade,
    collegeId: params.college_id,
    majorId: params.major_id,
    condition: "",
    size: pageParams.size,
    num: pageParams.num,
  };
  store.dispatch("subject/getApproveListAction", data);
};

const showAdjustTable = (index) => {
  if (status.value === 0) {
    adjustSubVisible.value = true;
  } else {
    adjustTeaVisible.value = true;
  }
  currentStuIndex.value = index;
};

const showDetail = (id) => {
  if (id) {
    bus.emit("showDetail", id);
  }
};

const submitAdjust = async () => {
  if (selectSubjectId.value === 0) {
    ElMessage.error("请选择要调配的题目");
    return;
  }
  let data: AdjustSub;
  data = {
    studentId: store.state.subject.overStudentList[currentStuIndex.value].student.studentId,
    majorId: store.state.subject.overStudentList[currentStuIndex.value].student.studentMajorId,
    subjectId: selectSubjectId.value,
  };
  let result = await postAdjustSubRes(data);
  if (result.status_code === 10000) {
    ElMessage.success(result.status_msg);
    getStuData();
    adjustSubVisible.value = false;
  } else {
    ElMessage.error(result.status_msg);
  }
};

const submitAdjustTea = async () => {
  if (teacherId.value === 0) {
    ElMessage.error("请选择要调配的老师");
    return;
  }
  let data: AdjustTea;
  data = {
    subjectId: store.state.subject.approveList.array[currentStuIndex.value].subject_id,
    teacherId: teacherId.value,
  };
  let result = await postAdjustTeaRes(data);
  if (result.status_code === 10000) {
    ElMessage.success(result.status_msg);
    teacherId.value = 0;
    pageRef.value.comGetData();
    adjustTeaVisible.value = false;
  } else {
    ElMessage.error(result.status_msg);
  }
};

onMounted(() => {
  getStuData();
});
</script>

<style scoped lang="less">
table {
  width: 100%;
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid black;
}

th,
td {
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
</style>
