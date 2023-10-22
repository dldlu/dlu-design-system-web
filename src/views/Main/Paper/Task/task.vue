<template>
  <el-dialog
    v-model="adjustTaskVisible"
    :title="props.title"
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
          <div>{{ props.headline }}</div>
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
          <el-input
            v-model="taskForm.according"
            :rows="4"
            type="textarea"
            :disabled="props.isChange"
          />
        </el-form-item>
        <el-form-item label="论文要求(设计参数)" prop="require">
          <el-input
            v-model="taskForm.require"
            :rows="4"
            type="textarea"
            :disabled="props.isChange"
          />
        </el-form-item>
        <el-form-item label="个人工作重点" prop="importance">
          <el-input
            v-model="taskForm.importance"
            :rows="4"
            type="textarea"
            :disabled="props.isChange"
          />
        </el-form-item>
        <el-form-item label="应阅读的基本文献录目(要求不少于10篇)" prop="literature">
          <el-input
            v-model="taskForm.literature"
            :rows="4"
            type="textarea"
            :disabled="props.isChange"
          />
        </el-form-item>
      </el-form>
    </div>
    <template v-if="!props.isChange" #footer>
      <span>
        <el-button @click="submitAdjust(formRef)">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useStore } from "vuex";
import { getTaskDetail, postAddTask, task } from "@/service/subject/task.ts";

interface Props {
  isChange: boolean;
  subject_id: number;
  headline: string;
  title: string;
}

const store = useStore();
let props = withDefaults(defineProps<Props>(), {
  isChange: false,
});
const emit = defineEmits(["getNewData"]);
let adjustTaskVisible = ref<boolean>(false);
let formRef = ref();
let taskForm = reactive({
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

const getCurTask = async () => {
  taskForm.timeRange = [null, null];
  taskForm.according = "";
  taskForm.require = "";
  taskForm.importance = "";
  taskForm.literature = "";
  let res = await getTaskDetail(props.subject_id);
  if (res.status_code === 10000) {
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

const submitAdjust = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let data: task = {
        subject_id: props.subject_id,
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
        emit("getNewData");
      } else {
        ElMessage.error(res.status_msg);
      }
    } else {
      ElMessage.error("有错误信息");
    }
  });
};

const showForm = () => {
  adjustTaskVisible.value = true;
};

defineExpose({ showForm });
</script>

<style scoped lang="less"></style>
