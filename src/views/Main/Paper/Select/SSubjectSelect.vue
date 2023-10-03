<template>
  <div class="table">
    <div class="tableHeader">
      <el-input
        v-model="params.condition"
        placeholder="按老师姓名或题目名称模糊查询"
        class="select200"
      />
      <el-button @click="query">查询</el-button>
      <el-button @click="selectTableVisible = true">操作说明与你的选择</el-button>
      <el-button @click="submitSelect">提交选择</el-button>
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
        <el-table-column prop="headline" label="论文题目" min-width="200">
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
        <el-table-column label="第一选择" min-width="150" align="center">
          <template #default="scope">
            <el-radio
              v-model="firstSubjectId"
              :label="subjectList[scope.$index].id"
              :disabled="secondSubjectId === subjectList[scope.$index].id"
              >&nbsp</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column label="第二选择" min-width="150" align="center">
          <template #default="scope">
            <el-radio
              v-model="secondSubjectId"
              :label="subjectList[scope.$index].id"
              :disabled="firstSubjectId === subjectList[scope.$index].id"
              >&nbsp</el-radio
            >
          </template>
        </el-table-column>
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
    width="70%"
    style="border-radius: 15px"
  >
    <div style="display: flex; flex-direction: column; justify-content: center">
      <div>操作说明：</div>
      <div>
        (1) 根据自己的意愿做出第一和第二志愿选择，每种选择只能修改3次。（选择之后需点击提交选择）
      </div>
      <div>
        (2)
        选题为双向选择。这里进行的是学生选题操作，然后教师再根据全部选题的情况选择学生，因此只有当教师确认操作完成之后才能确保你的选题是否完成。如果选题未成功，系统会在第4阶段(题目调配阶段)给您分配一个题目。
      </div>
      <div>
        <table>
          <tr>
            <th>选择</th>
            <th>论文题目</th>
            <th>指导老师</th>
            <th>论文类型</th>
            <th>题目来源</th>
            <th>修改次数</th>
          </tr>
          <tr>
            <td>第一选择</td>
            <td>{{ selectedData.firstSubject?.headline }}</td>
            <td>{{ selectedData.firstSubject?.first_teacher_name }}</td>
            <td>{{ selectedData.firstSubject?.type_name }}</td>
            <td>{{ selectedData.firstSubject?.origin_name }}</td>
            <td>{{ selectedData.firstChangeCount }}</td>
          </tr>
          <tr>
            <td>第二选择</td>
            <td>{{ selectedData.secondSubject?.headline }}</td>
            <td>{{ selectedData.secondSubject?.first_teacher_name }}</td>
            <td>{{ selectedData.secondSubject?.type_name }}</td>
            <td>{{ selectedData.secondSubject?.origin_name }}</td>
            <td>{{ selectedData.secondChangeCount }}</td>
          </tr>
        </table>
      </div>
    </div>
    <template #footer>
      <span>
        <el-button @click="selectTableVisible = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import MyPagination from "@/components/MyPagination.vue";
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { pageBody } from "@/store/modules/baseInfo.ts";
import { useRouter } from "vue-router";
import {
  GetStuSelect,
  getStuSelected,
  postStuSelect,
  SelectedData,
  StuSelect,
  SubjectInfo,
} from "@/service/select/student.ts";
import { ElMessage } from "element-plus";
import { bus } from "@/utils/bus.ts";

const store = useStore();
const router = useRouter();
let pageRef = ref<any>();
let selectTableVisible = ref<boolean>(false);
let firstSubjectId = ref<number>(0);
let secondSubjectId = ref<number>(0);
let params = reactive({
  majorId: 0,
  grade: 0,
  condition: "",
});
let selectedData = reactive<SelectedData>({
  firstSubject: {} as SubjectInfo,
  firstChangeCount: 0,
  secondSubject: {} as SubjectInfo,
  secondChangeCount: 0,
});
let subjectList = computed(() => {
  return store.state.subject.studentSelectList.array.subjectList;
});
let userInfo = computed(() => {
  return store.state.user.userDesc;
});
const getData = async (pageParams: pageBody) => {
  const data: GetStuSelect = JSON.parse(JSON.stringify(pageParams));
  data.condition = params.condition;
  data.grade = params.grade;
  data.majorId = params.majorId;
  await store.dispatch("subject/getStudentSelectList", data);
  firstSubjectId.value = store.state.subject.studentSelectList.array.firstSubjectId;
  secondSubjectId.value = store.state.subject.studentSelectList.array.secondSubjectId;
};

const query = () => {
  pageRef.value.reset();
  pageRef.value.comGetData();
};

const showDetail = (id) => {
  bus.emit("showDetail", id);
};

const submitSelect = async () => {
  if (firstSubjectId.value === 0 && secondSubjectId.value === 0) {
    ElMessage.error("请选择题目");
    return;
  }
  let data: StuSelect;
  data = {
    firstSubjectId: firstSubjectId.value,
    secondSubjectId: secondSubjectId.value,
  };
  let result = await postStuSelect(data);
  if (result.status_code === 10000) {
    ElMessage.success(result.status_msg);
    await getSelectedData();
  } else {
    ElMessage.error(result.status_msg);
  }
};

const getSelectedData = async () => {
  let result = await getStuSelected();
  if (result.status_code === 10000) {
    selectedData.firstChangeCount = result.data.firstChangeCount;
    selectedData.firstSubject = result.data.firstSubject;
    selectedData.secondChangeCount = result.data.secondChangeCount;
    selectedData.secondSubject = result.data.secondSubject;
  } else {
    ElMessage.error(result.status_msg);
  }
};
onBeforeMount(() => {
  params.majorId = store.state.user.userDesc.major_id;
  params.grade = store.state.user.userDesc.year as number;
});
onMounted(() => {
  getSelectedData();
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
