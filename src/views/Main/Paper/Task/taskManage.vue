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
            @click="showAdjustTable(subjectInfo.subject_id, index)"
          >
            填写/修改
          </el-button>
        </template>
      </base-subject-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="subjectList.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
  <el-dialog
    v-model="adjustTaskVisible"
    title="计划操作"
    width="50%"
    @open="getCurTask"
    style="border-radius: 15px"
  >
    <div
      style="display: flex; flex-direction: column; justify-content: center; align-items: center"
    >
      <el-form
        label-position="left"
        label-width="100px"
        :model="taskForm as Record<string, any>"
        ref="formRef"
        :rules="formRules"
        style="width: 100%"
        hide-required-asterisk
      >
        <el-form-item label="论文题目">
          <div>{{ subjectList.array[curIndex].headline }}</div>
        </el-form-item>
        <el-form-item label="工作时间" prop="timeRange">
          <el-date-picker
            v-model="taskForm.timeRange"
            type="daterange"
            range-separator="To"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="default"
            value-format="YYYY-MM-DDTHH:mm:ssZ"
          />
        </el-form-item>
        <el-form-item label="选题依据" prop="according">
          <el-input v-model="taskForm.according" :rows="4" type="textarea" :disabled="isStu" />
        </el-form-item>
        <el-form-item label="论文要求(设计参数)" prop="require">
          <el-input v-model="taskForm.require" :rows="4" type="textarea" :disabled="isStu" />
        </el-form-item>
        <el-form-item label="个人工作重点" prop="importance">
          <el-input v-model="taskForm.importance" :rows="4" type="textarea" :disabled="isStu" />
        </el-form-item>
        <el-form-item label="应阅读的基本文献录目(要求不少于10篇)" prop="literature">
          <el-input v-model="taskForm.literature" :rows="4" type="textarea" :disabled="isStu" />
        </el-form-item>
      </el-form>
    </div>
    <template v-if="!isStu" #footer>
      <span>
        <el-button @click="submitAdjust(formRef)">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import YearSelect from "@/components/yearSelect.vue";
import BaseSubjectTable from "@/components/baseSubjectTable.vue";
import MyPagination from "@/components/myPagination.vue";
import { computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { pageBody } from "@/store/modules/baseInfo.ts";
import { useRouter } from "vue-router";
import { getTaskDetail, postAddTask, task } from "@/service/subject/task.ts";
import { ElMessage, FormInstance, FormRules } from "element-plus";

const store = useStore();
const router = useRouter();
let year = ref<number>(new Date().getFullYear());
let adjustTaskVisible = ref<boolean>(false);
let curIndex = ref<number>(0);
let taskForm = reactive({
  subject_id: 0,
  timeRange: [null, null],
  according: "",
  importance: "",
  require: "",
  literature: "",
});
let formRules = reactive<FormRules>({
  timeRange: [{ required: true, message: "时间不能为空", trigger: "blur" }],
  according: [{ required: true, message: "选题依据不能为空", trigger: "blur" }],
  importance: [{ required: true, message: "工作重点不能为空", trigger: "blur" }],
  require: [{ required: true, message: "要求不能为空", trigger: "blur" }],
  literature: [{ required: true, message: "文献不能为空", trigger: "blur" }],
});
let formRef = ref();
let pageRef = ref();
let subjectList = computed(() => {
  return store.state.subject.selfSubject;
});

let isStu = computed(() => {
  return store.state.user.userDesc.role_id === 1;
});

watch(year, () => {
  pageRef.value.reset();
  pageRef.value.comGetData();
});

const getData = (pageParams: pageBody) => {
  const params = JSON.parse(JSON.stringify(pageParams));
  params.year = year.value;
  store.dispatch("subject/getSelfSubjectAction", params);
};

const turnPage = (name) => {
  router.push({ name });
};

const getCurTask = async () => {
  taskForm.timeRange = [null, null];
  taskForm.according = "";
  taskForm.require = "";
  taskForm.importance = "";
  taskForm.literature = "";
  let res = await getTaskDetail(taskForm.subject_id);
  if (res.status_code === 10000) {
    console.log(res.data);
    taskForm.timeRange[0] = res.data.beginTime;
    taskForm.timeRange[1] = res.data.endTime;
    taskForm.according = res.data.according;
    taskForm.require = res.data.require;
    taskForm.importance = res.data.importance;
    taskForm.literature = res.data.literature;
    ElMessage.success(res.status_msg);
  } else {
    ElMessage.error(res.status_msg);
  }
};

const showAdjustTable = (id, index) => {
  curIndex.value = index;
  taskForm.subject_id = id;
  adjustTaskVisible.value = true;
};

const submitAdjust = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let data: task = {
        subject_id: taskForm.subject_id,
        beginTime: taskForm.timeRange[0],
        endTime: taskForm.timeRange[1],
        according: taskForm.according,
        require: taskForm.require,
        importance: taskForm.importance,
        literature: taskForm.literature,
      };
      let res = await postAddTask(data);
      if (res.status_code === 10000) {
        ElMessage.success(res.status_msg);
        pageRef.value.comGetData();
      } else {
        ElMessage.error(res.status_msg);
      }
    } else {
      ElMessage.error("有错误信息");
    }
  });
};
</script>

<style scoped lang="less"></style>
