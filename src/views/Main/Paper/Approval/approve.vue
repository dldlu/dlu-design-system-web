<template>
  <div class="table">
    <div class="tableHeader">
      <el-button @click="genSerialFunc" v-if="route.name === 'approve'">生成归档序号</el-button>
      <el-button
        @click="turnPage('appointManage')"
        style="margin-right: 10px"
        v-if="route.name === 'approve'"
        >委托管理</el-button
      >
      <year-select v-model:grade="approvalGrade" class="select100" />
      <college-select
        v-model:college_id="college_id"
        class="select140"
        v-if="route.name !== 'myAppoint'"
      />
      <major-select
        v-model:major_id="major_id"
        :college_id="college_id"
        class="select140"
        v-if="route.name !== 'myAppoint'"
      />
      <teacher-select
        v-model:teacher_number="teacher_number"
        :major_id="major_id"
        class="select100"
        v-if="route.name !== 'myAppoint'"
      />
      <el-input
        v-model="number"
        placeholder="按老师工号或姓名查询"
        class="select140"
        v-if="route.name !== 'myAppoint'"
      />
      <el-button @click="query" v-if="route.name !== 'myAppoint'">查询</el-button>
      <el-button v-if="route.name === 'approve'">下载论文封皮</el-button>
      <el-button v-if="route.name === 'approve'">下载统计表</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="approveList.array" stripe style="margin-top: 20px" max-height="500">
        <el-table-column min-width="50">
          <template #header>
            <el-checkbox
              v-model="allCheck"
              @change="setAllCheck"
              size="small"
              :disabled="approveList.array === null"
            />
          </template>
          <template #default="scope">
            <el-checkbox v-model="bulkList[scope.$index]" size="small" @change="checkIsAll" />
          </template>
        </el-table-column>
        <el-table-column prop="subject_id" label="ID" min-width="50" />
        <el-table-column prop="headline" label="论文题目" min-width="300" />
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
        <el-table-column prop="progress_name" label="状态" min-width="200" />
        <el-table-column
          prop="serial_number"
          label="排序"
          min-width="100"
          v-if="route.name === 'approve'"
        />
        <el-table-column
          min-width="300"
          v-if="route.name === 'approve' || route.name === 'myAppoint'"
        >
          <template #header>
            <el-button size="small" @click="showBulkTable" :disabled="approveList.array === null"
              >批量审阅</el-button
            >
          </template>
          <template #default="scope">
            <div>
              <el-button
                size="small"
                type="primary"
                @click="showAppointTable(approveList.array[scope.$index])"
                >审阅</el-button
              >
              <el-popconfirm
                title="确定要删除吗?"
                @confirm="delSubject(approveList.array[scope.$index].subject_id)"
              >
                <template #reference>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
              <el-button size="small" type="warning">修改</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="300" v-else>
          <template #header>
            <el-button
              size="small"
              type="primary"
              :disabled="approveList.array === null"
              @click="showBulkTable"
              >批量委托</el-button
            >
          </template>
          <template #default="scope">
            <div>
              <el-button
                size="small"
                type="primary"
                @click="showAppointTable(approveList.array[scope.$index])"
                >设置委托</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="approveList.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
  <el-dialog
    v-model="appointTableVisible"
    title="设置委托"
    width="35%"
    style="border-radius: 15px"
    @close="tableClose"
  >
    <div style="display: flex; justify-content: center">
      <el-form :model="appointForm">
        <el-form-item label="需要委托的题目ID:" label-width="140px">
          <div v-for="item in appointForm.subjectIds">{{ item }} &nbsp</div>
        </el-form-item>
        <el-form-item label="将题目委托给:" label-width="140px">
          <el-input v-model="appointForm.number" style="width: 250px" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span>
        <el-button @click="appointTableVisible = false">取消</el-button>
        <el-button type="primary" @click="sendAppointReq"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="approveTableVisible"
    title="题目审批"
    width="35%"
    style="border-radius: 15px"
    @close="tableClose"
  >
    <div style="display: flex; justify-content: center">
      <el-form :model="appointForm">
        <el-form-item label="当前审批的题目ID:" label-width="140px">
          <div v-for="item in appointForm.subjectIds">{{ item }} &nbsp</div>
        </el-form-item>
        <el-form-item label="教研室主任审核:" label-width="140px">
          <el-checkbox
            :model-value="currentProgress >= 2"
            label="同意"
            border
            :disabled="currentProgress !== 1"
          />
        </el-form-item>
        <el-form-item label="院学术委员会审核:" label-width="140px">
          <el-checkbox
            :model-value="currentProgress >= 3"
            label="同意"
            border
            :disabled="currentProgress !== 2"
          />
        </el-form-item>
        <el-form-item label="提交修改意见:" label-width="140px">
          <el-input v-model="appointForm.suggest" style="width: 250px" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span>
        <el-button @click="approveTableVisible = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import MyPagination from "@/components/MyPagination.vue";
import YearSelect from "@/components/yearSelect.vue";
import { computed, onMounted, onUpdated, reactive, ref, watch } from "vue";
import MajorSelect from "@/components/majorSelect.vue";
import CollegeSelect from "@/components/collegeSelect.vue";
import { useStore } from "vuex";
import { pageBody } from "@/store/modules/baseInfo.ts";
import { approveListRequest } from "@/service/subject/approve.ts";
import { delApply, genSerial, serialRequest } from "@/service/subject/apply.ts";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import TeacherSelect from "@/components/teacherSelect.vue";
import { appointRequest, postAppoint } from "@/service/subject/appoint.ts";
import { subjectBody, subjectInfo } from "@/service/subject/self.ts";

const store = useStore();
const router = useRouter();
const route = useRoute();
let pageRef = ref<any>();
let approvalGrade = ref<number>(0);
let college_id = ref<number>(42);
let major_id = ref<number>(4205);
let teacher_number = ref<string>("");
let number = ref<string>("");
let college_status = ref<boolean>(false);
let major_status = ref<boolean>(false);
let appointForm = reactive({
  subjectIds: [],
  number: "",
  suggest: "",
});
let bulkList = reactive([]);
let allCheck = ref<boolean>(false);
let appointTableVisible = ref<boolean>(false);
let approveTableVisible = ref<boolean>(false);
let condition = "";
let currentProgress = ref<number>(0);
let approveList = computed(() => {
  return store.state.subject.approveList;
});
watch([major_id, college_id, approvalGrade], () => {
  query();
});
watch(teacher_number, () => {
  number.value = teacher_number.value;
  condition = number.value;
  query();
});
watch(number, () => {
  condition = number.value;
});
const setAllCheck = () => {
  for (let i = 0; i < store.state.subject.approveList.array.length; i++) {
    bulkList[i] = allCheck.value;
  }
};
const checkIsAll = () => {
  for (let i = 0; i < store.state.subject.approveList.array.length; i++) {
    if (!bulkList[i]) {
      allCheck.value = false;
      return;
    }
  }
  allCheck.value = true;
};

const getData = (pageParams: pageBody) => {
  if (route.name === "myAppoint") {
    const params: subjectBody = JSON.parse(JSON.stringify(pageParams));
    params.year = approvalGrade.value;
    store.dispatch("subject/getAppointListAction", params);
  } else {
    const params: approveListRequest = JSON.parse(JSON.stringify(pageParams));
    params.year = approvalGrade.value;
    params.collegeId = college_id.value;
    params.majorId = major_id.value;
    params.condition = condition;
    store.dispatch("subject/getApproveListAction", params);
  }
};
const genSerialFunc = async () => {
  let params: serialRequest;
  params = {
    year: approvalGrade.value,
    majorId: major_id.value,
  };
  let result = await genSerial(params);
  if (result.status_code === 10000) {
    ElMessage.success(result.status_msg);
  } else {
    ElMessage.error(result.status_msg);
  }
};
const turnPage = (name) => {
  router.push({ name });
};
const query = () => {
  pageRef.value.reset();
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
const showAppointTable = (subject) => {
  appointForm.subjectIds.push(subject.subject_id);
  if (route.name === "approve") {
    approveTableVisible.value = true;
    currentProgress.value = subject.progress_id;
  } else if (route.name === "appointManage") {
    appointTableVisible.value = true;
  }
};
const showBulkTable = () => {
  bulkList.forEach((item, index) => {
    if (item) {
      appointForm.subjectIds.push(store.state.subject.approveList.array[index].subject_id);
    }
  });
  if (route.name === "approve") {
    approveTableVisible.value = true;
  } else if (route.name === "appointManage") {
    appointTableVisible.value = true;
  }
};
const sendAppointReq = async () => {
  let params: appointRequest;
  params = {
    subjectIds: appointForm.subjectIds,
    number: appointForm.number,
  };
  let result = await postAppoint(params);
  if (result.status_code === 10000) {
    ElMessage.success(result.status_msg);
    pageRef.value.comGetData();
  } else {
    ElMessage.error(result.status_msg);
  }
};
const tableClose = () => {
  appointForm.subjectIds.length = 0;
};
onUpdated(() => {
  allCheck.value = false;
  for (let i = 0; i < 10; i++) {
    bulkList[i] = false;
  }
});
</script>

<style scoped lang="less"></style>
