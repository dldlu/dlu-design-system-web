<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-model:grade="options.year" class="select100" />
      <major-select
        v-model:major_id="options.major_id"
        :college_id="options.college_id"
        class="select140"
        v-if="store.state.user.userDesc.role_id >= 4 && !props.appoint"
      />
      <el-input
        v-model="options.condition"
        placeholder="按老师工号或姓名查询"
        class="select200"
        v-if="!props.appoint"
      />
      <el-button @click="query" v-if="!props.appoint">查询</el-button>
    </div>
    <div class="tableBody">
      <el-table
        :data="subjectList.array"
        stripe
        style="margin-top: 20px"
        @selection-change="handleSelectionChange"
        max-height="500"
      >
        <el-table-column type="selection" min-width="50" />
        <el-table-column prop="subject_id" label="ID" min-width="50" />
        <el-table-column prop="headline" label="论文题目" min-width="300">
          <template #default="scope">
            <div @click="showDetail(subjectList.array[scope.$index].subject_id)">
              {{ subjectList.array[scope.$index].headline }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="指导教师" min-width="150">
          <template #default="scope">
            <el-tooltip placement="bottom-start" effect="light">
              <template #content>
                职位:{{ subjectList.array[scope.$index].first_teacher_title_name }}<br />
                手机号:{{ subjectList.array[scope.$index].first_teacher_phone }}
              </template>
              {{ subjectList.array[scope.$index].first_teacher_name }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="学生姓名" min-width="150">
          <template #default="scope">
            <el-tooltip placement="bottom-start" effect="light">
              <template #content>
                学号:{{ subjectList.array[scope.$index].student_number }}<br />手机号:{{
                  subjectList.array[scope.$index].student_phone
                }}
              </template>
              {{ subjectList.array[scope.$index].student_name }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="progress_name" label="状态" min-width="150" />
        <el-table-column min-width="150">
          <template #header>
            <el-button
              size="small"
              @click="showBulkTable(0)"
              :disabled="subjectList.array.length === 0"
              >批量审阅</el-button
            >
          </template>
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="showApproveTable(subjectList.array[scope.$index])"
              >审阅</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="subjectList.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
  <el-dialog
    v-model="approveTableVisible"
    :title="title"
    width="35%"
    style="border-radius: 15px"
    @close="tableClose"
  >
    <div style="display: flex; justify-content: center">
      <el-form>
        <el-form-item label="当前审批的题目ID:" label-width="140px">
          <div v-for="item in subjectIds">{{ item }} &nbsp</div>
        </el-form-item>
        <el-form-item
          v-if="store.state.user.userDesc.role_id === 4"
          label="院学术委员会审核:"
          label-width="140px"
        >
          <el-checkbox
            :model-value="collegeApproveSuccess"
            label="同意"
            border
            @change="sendApproveReq"
            :disabled="!collegeApprove"
          />
        </el-form-item>
        <el-form-item v-else label="教研室主任审核:" label-width="140px">
          <el-checkbox
            :model-value="majorApproveSuccess"
            label="同意"
            border
            @change="sendApproveReq"
            :disabled="!majorApprove"
          />
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
import { computed, reactive, ref, toRaw, watch } from "vue";
import { useStore } from "vuex";
import { bus } from "@/utils/bus.ts";
import YearSelect from "@/components/yearSelect.vue";
import MajorSelect from "@/components/majorSelect.vue";
import { approveListRequest, approveRequest } from "@/service/subject/approve.ts";
import { ElMessage } from "element-plus";
import MyPagination from "@/components/myPagination.vue";
import { pageBody } from "@/store/modules/baseInfo.ts";

interface Props {
  firstProgress: number; //专业审批的progressId
  secondProgress: number; //院审批的progressId
  approveFunc: Function;
  title: string;
  appoint: boolean;
}

const store = useStore();
const emit = defineEmits(["sendApprove"]);
let props = withDefaults(defineProps<Props>(), {
  firstProgress: 6,
  secondProgress: 7,
});
let pageRef = ref();
let approveTableVisible = ref<boolean>(false);
let bulkList = ref([]);
let subjectIds = reactive([]);
let currentProgress = ref<number>(0);
let options = reactive({
  year: 0,
  major_id: store.state.user.userDesc.major_id,
  college_id: store.state.user.userDesc.college_id,
  condition: "",
});

watch([() => options.year, () => options.major_id, () => options.college_id], () => {
  query();
});

let majorApprove = computed(() => {
  return currentProgress.value === props.firstProgress - 1 || currentProgress.value === 0;
});

let majorApproveSuccess = computed(() => {
  return currentProgress.value >= props.firstProgress;
});

let collegeApprove = computed(() => {
  return currentProgress.value === props.secondProgress - 1 || currentProgress.value === 0;
});

let collegeApproveSuccess = computed(() => {
  return currentProgress.value >= props.secondProgress;
});

let subjectList = computed(() => {
  return store.state.subject.approveList;
});

const handleSelectionChange = (val) => {
  bulkList.value = val;
};

const getData = (pageParams: pageBody) => {
  if (props.appoint) {
    const params = JSON.parse(JSON.stringify(pageParams));
    params.year = options.year;
    store.dispatch("subject/getAppointListAction", params);
  } else {
    const params: approveListRequest = JSON.parse(JSON.stringify(pageParams));
    params.year = options.year;
    params.collegeId = options.college_id;
    params.majorId = options.major_id;
    params.condition = options.condition;
    store.dispatch("subject/getApproveListAction", params);
  }
};

const query = () => {
  pageRef.value.reset();
  pageRef.value.comGetData();
};

const showDetail = (id) => {
  bus.emit("showDetail", id);
};

const showApproveTable = (info) => {
  currentProgress.value = info.progress_id;
  subjectIds.push(info.subject_id);
  approveTableVisible.value = true;
};

const showBulkTable = (id) => {
  currentProgress.value = id;
  bulkList.value.forEach((item) => {
    if (item) {
      subjectIds.push(item.subject_id);
    }
  });
  approveTableVisible.value = true;
};

const sendApproveReq = async () => {
  let params: approveRequest;
  params = {
    subjectIds: toRaw(subjectIds),
  };
  let result = await props.approveFunc(params);
  if (result.status_code === 10000) {
    ElMessage.success(result.status_msg);
    approveTableVisible.value = false;
    pageRef.value.comGetData();
  } else {
    ElMessage.error(result.status_msg);
  }
};

const tableClose = () => {
  subjectIds.length = 0;
  currentProgress.value = 0;
};
</script>

<style scoped lang="less"></style>
