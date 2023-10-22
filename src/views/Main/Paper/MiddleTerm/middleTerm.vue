<template>
  <el-dialog
    v-model="adjustMiddleVisible"
    :title="props.title"
    width="50%"
    @open="getCurMiddle"
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
          <div>{{ props.subject.headline }}</div>
        </el-form-item>
        <el-form-item label="学生姓名">
          <div>{{ props.subject.student_name }}</div>
        </el-form-item>
        <el-form-item label="选题难易程度" prop="difficulty">
          <el-radio-group v-model="taskForm.difficulty" :disabled="!props.isChange">
            <el-radio :label="1">偏难</el-radio>
            <el-radio :label="2">适中</el-radio>
            <el-radio :label="3">偏易</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="阅读文献数" prop="literature_quantity">
          <el-input-number
            v-model="taskForm.literature_quantity"
            style="width: 200px"
            :disabled="!props.isChange"
          />
        </el-form-item>
        <el-form-item label="工作量" prop="workload">
          <el-radio-group v-model="taskForm.workload" :disabled="!props.isChange">
            <el-radio :label="1">较少</el-radio>
            <el-radio :label="2">适中</el-radio>
            <el-radio :label="3">较多</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="初稿完成时间" prop="first_draft_date">
          <el-date-picker
            v-model="taskForm.first_draft_date"
            type="date"
            placeholder="选择时间"
            :disabled="!props.isChange"
          />
        </el-form-item>
        <el-form-item label="任务书" prop="has_assignment">
          <el-radio-group v-model="taskForm.has_assignment" :disabled="!props.isChange">
            <el-radio :label="1">无</el-radio>
            <el-radio :label="2">有</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开题报告" prop="has_open_report">
          <el-radio-group v-model="taskForm.has_open_report" :disabled="!props.isChange">
            <el-radio :label="1">无</el-radio>
            <el-radio :label="2">有</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学习态度" prop="attitude">
          <el-radio-group v-model="taskForm.attitude" :disabled="!props.isChange">
            <el-radio :label="1">好</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">差</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工作进度" prop="working_speed">
          <el-radio-group v-model="taskForm.working_speed" :disabled="!props.isChange">
            <el-radio :label="1">快</el-radio>
            <el-radio :label="2">按计划进行</el-radio>
            <el-radio :label="3">慢</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="中期工作总结" prop="conclude">
          <el-radio-group v-model="taskForm.conclude" :disabled="!props.isChange">
            <el-radio :label="1">优</el-radio>
            <el-radio :label="2">良</el-radio>
            <el-radio :label="3">中</el-radio>
            <el-radio :label="4">差</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="毕业论文(设计)调整情况" prop="arrange">
          <el-input
            v-model="taskForm.arrange"
            :rows="4"
            type="textarea"
            :disabled="!props.isChange"
          />
        </el-form-item>
        <el-form-item label="调整时间" prop="arrange_date">
          <el-date-picker
            v-model="taskForm.arrange_date"
            type="date"
            placeholder="选择时间"
            :disabled="!props.isChange"
          />
        </el-form-item>
      </el-form>
    </div>
    <template v-if="props.isChange" #footer>
      <span>
        <el-button @click="submitAdjust(formRef)">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useStore } from "vuex";
import { bus } from "@/utils/bus.ts";
import { subjectInfo } from "@/service/subject/self.ts";
import { getMiddleTerm, middleTerm, postMiddleTerm } from "@/service/subject/middleTerm.ts";
import _ from "lodash";

interface Props {
  isChange: boolean;
  subject: subjectInfo;
  title: string;
}

const store = useStore();
let props = withDefaults(defineProps<Props>(), {
  isChange: false,
});
let adjustMiddleVisible = ref<boolean>(false);
let formRef = ref();
let taskForm = ref({
  difficulty: null,
  workload: null,
  literature_quantity: null,
  first_draft_date: null,
  has_assignment: null,
  has_open_report: null,
  attitude: null,
  working_speed: null,
  conclude: null,
  arrange: null,
  arrange_date: null,
});
let formRules = reactive<FormRules>({
  difficulty: [{ required: true, message: "难易程度不能为空", trigger: "blur" }],
  workload: [{ required: true, message: "工作量不能为空", trigger: "blur" }],
  literature_quantity: [{ required: true, message: "文献数不能为空", trigger: "blur" }],
  first_draft_date: [{ required: true, message: "时间不能为空", trigger: "blur" }],
  has_assignment: [{ required: true, message: "选择有无任务书", trigger: "blur" }],
  has_open_report: [{ required: true, message: "选择有无开题报告", trigger: "blur" }],
  attitude: [{ required: true, message: "学习态度不能为空", trigger: "blur" }],
  working_speed: [{ required: true, message: "工作进度不能为空", trigger: "blur" }],
  conclude: [{ required: true, message: "中期工作总结不能为空", trigger: "blur" }],
  arrange: [{ required: true, message: "调整情况不能为空", trigger: "blur" }],
  arrange_date: [{ required: true, message: "调整时间不能为空", trigger: "blur" }],
});

const getCurMiddle = async () => {
  taskForm.value = {
    arrange: null,
    arrange_date: null,
    attitude: null,
    conclude: null,
    difficulty: null,
    first_draft_date: null,
    has_assignment: null,
    has_open_report: null,
    literature_quantity: null,
    working_speed: null,
    workload: null,
  };
  let res = await getMiddleTerm(props.subject.subject_id);
  if (res.status_code === 10000) {
    taskForm.value = _.merge(taskForm.value, res.data);
    ElMessage.success(res.status_msg);
  } else {
    ElMessage.error(res.status_msg);
  }
};

const submitAdjust = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let data: middleTerm = _.merge(
        {
          subject_id: props.subject.subject_id,
        },
        toRaw(taskForm.value),
      );
      let res = await postMiddleTerm(data);
      if (res.status_code === 10000) {
        ElMessage.success(res.status_msg);
        bus.emit("getMiddleData");
      } else {
        ElMessage.error(res.status_msg);
      }
    } else {
      ElMessage.error("有错误信息");
    }
  });
};

const showForm = () => {
  adjustMiddleVisible.value = true;
};

defineExpose({ showForm });
</script>

<style scoped lang="less"></style>
