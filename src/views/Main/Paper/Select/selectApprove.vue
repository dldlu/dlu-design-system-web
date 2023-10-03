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
      <el-button v-if="status === 0">调配指导老师</el-button>
      <el-button v-else>调配学生选题</el-button>
      <el-button>下载选题统计表</el-button>
      <el-button>选题及指导老师情况分析表</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="studentList" stripe style="margin-top: 20px">
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
    </div>
  </div>
  <el-dialog
    v-model="adjustTableVisible"
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
  <proposal-report title="题目详情" :type="3" :subjectId="currentSubjectId" ref="detailRef" />
</template>

<script setup lang="ts">
import YearSelect from "@/components/yearSelect.vue";
import CollegeSelect from "@/components/collegeSelect.vue";
import MajorSelect from "@/components/majorSelect.vue";
import { computed, ComputedRef, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { AdjustRes, OverStu, OverSub, postAdjustRes } from "@/service/select/adjust.ts";
import ProposalReport from "@/views/Main/Paper/Approval/proposalReport.vue";
import { ElMessage } from "element-plus";

const store = useStore();
let status = ref<number>(0);
let adjustTableVisible = ref<boolean>(false);
let currentStuIndex = ref<number>(0);
let currentSubjectId = ref<number>(0);
let selectSubjectId = ref<number>(0);
let detailRef = ref<any>();
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
watch([() => params.grade, () => params.major_id], () => {
  getData();
});
const getData = () => {
  const data = {
    majorId: params.major_id,
    grade: params.grade,
  };
  store.dispatch("subject/getOverStudentList", data);
  store.dispatch("subject/getOverSubjectList", data);
};

const showAdjustTable = (index) => {
  adjustTableVisible.value = true;
  currentStuIndex.value = index;
};

const showDetail = (id) => {
  currentSubjectId.value = id;
  detailRef.value.showForm();
};

const submitAdjust = async () => {
  if (selectSubjectId.value === 0) {
    ElMessage.error("请选择要调配的题目");
    return;
  }
  let data: AdjustRes;
  data = {
    studentId: store.state.subject.overStudentList[currentStuIndex.value].student.studentId,
    majorId: store.state.subject.overStudentList[currentStuIndex.value].student.studentMajorId,
    subjectId: selectSubjectId.value,
  };
  let result = await postAdjustRes(data);
  if (result.status_code === 10000) {
    ElMessage.success(result.status_msg);
    getData();
    adjustTableVisible.value = false;
  } else {
    ElMessage.error(result.status_msg);
  }
};

onMounted(() => {
  getData();
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
