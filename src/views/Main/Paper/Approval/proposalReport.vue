<template>
  <el-dialog
    v-model="formVisible"
    :title="props.title"
    width="60%"
    style="border-radius: 15px"
    @open="onOpen"
  >
    <div style="display: flex; justify-content: center">
      <el-form
        label-position="left"
        label-width="100px"
        :model="formData as Record<string, any>"
        ref="formRef"
        :rules="formRules"
        style="width: 100%"
        hide-required-asterisk
      >
        <el-form-item label="论文题目" prop="headline">
          <el-input v-model="formData.headline" :disabled="props.type === 3" />
        </el-form-item>
        <div class="rowItem">
          <div v-if="userInfo.role_id > 1" class="teacher">指导老师</div>
          <div v-if="userInfo.role_id > 1" class="teacherName">{{ teacherInfo.teacher_name }}</div>
          <el-form-item
            v-if="userInfo.role_id === 1"
            label="指导老师"
            prop="first_teacher_id"
            style="margin-bottom: 0"
          >
            <teacher-select
              :disabled="props.type === 3"
              :type="2"
              v-model:teacher_id="formData.first_teacher_id"
              :college_id="userInfo.college_id"
              style="width: 100px"
            />
          </el-form-item>
          <div class="labels">职称</div>
          <div class="teacher center">{{ teacherInfo.teacher_title_name }}</div>
          <div class="labels">专业</div>
          <div class="detail center">{{ teacherInfo.teacher_major_name }}</div>
          <div class="labels">科室</div>
          <div class="detail center">{{ teacherInfo.teacher_office_name }}</div>
        </div>
        <el-form-item label="题目分配给" prop="major_id">
          <el-checkbox-group
            v-if="userInfo.role_id > 1 && props.type !== 3"
            v-model="formData.major_id"
          >
            <el-checkbox
              v-for="item in data.majors"
              :label="item.name"
              :disabled="userInfo.role_id === 1"
            />
          </el-checkbox-group>
          <div v-else-if="userInfo.role_id === 1 && props.type === 1">
            {{ userInfo.major_name }}
          </div>
          <div v-else-if="props.type === 3">
            <span v-for="item in data.major_names"> {{ item }} &nbsp </span>
          </div>
        </el-form-item>
        <div class="rowItem">
          <el-form-item label="学生学号" prop="student_number" style="margin-bottom: 0">
            <el-input
              v-model="formData.student_number"
              :disabled="props.type !== 2"
              @blur="getStudentInfo(formData.student_number)"
              style="width: 100px"
            />
          </el-form-item>
          <div class="labels">姓名</div>
          <div class="teacher center">{{ studentInfo.student_name }}</div>
          <div class="labels">专业</div>
          <div class="detail center">{{ studentInfo.student_major_name }}</div>
          <div class="labels">班级</div>
          <div class="detail center">{{ studentInfo.student_class_name }}</div>
        </div>
        <div class="threeItem">
          <el-form-item label="是否初次指导毕业论文" label-width="160px">
            <el-select v-model="isFirst" disabled style="width: 100px" />
          </el-form-item>
          <el-form-item label="近三年是否有雷同题目" label-width="160px" prop="identical">
            <el-select
              v-model="formData.identical"
              style="width: 100px"
              :disabled="props.type === 3"
            >
              <el-option label="否" :value="1" />
              <el-option label="是" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="第二指导教师" prop="second_teacher_id">
            <teacher-select
              :disabled="props.type === 3"
              :type="2"
              v-model:teacher_id="formData.second_teacher_id"
              :college_id="userInfo.college_id"
              style="width: 100px"
            />
          </el-form-item>
        </div>
        <div class="threeItem">
          <el-form-item label="拟需学生人数" label-width="160px" prop="need_total">
            <el-input-number
              v-model="formData.need_total"
              style="width: 100px"
              :disabled="props.type === 3"
            />
          </el-form-item>
          <el-form-item label="毕业论文类型" prop="type_id">
            <el-select v-model="formData.type_id" style="width: 160px" :disabled="props.type === 3">
              <el-option v-for="item in data.types" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="题目来源" prop="origin_id">
            <el-select
              v-model="formData.origin_id"
              style="width: 100px"
              :disabled="props.type === 3"
            >
              <el-option v-for="item in data.origins" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="内容提要" prop="abstract">
          <el-input
            v-model="formData.abstract"
            :rows="4"
            type="textarea"
            :disabled="props.type === 3"
          />
        </el-form-item>
        <el-form-item label="选题的必要性" prop="necessity">
          <el-input
            v-model="formData.necessity"
            :rows="4"
            type="textarea"
            :disabled="props.type === 3"
          />
        </el-form-item>
        <el-form-item label="选题的可行性" prop="feasibility">
          <el-input
            v-model="formData.feasibility"
            :rows="4"
            type="textarea"
            :disabled="props.type === 3"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span>
        <el-button v-if="props.type === 3">下载打印</el-button>
        <el-button @click="formVisible = false">取消</el-button>
        <el-button v-if="props.type !== 3" type="primary" @click="sendRequest(formRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { getMajorsCollege } from "@/service/info/major.ts";
import TeacherSelect from "@/components/teacherSelect.vue";
import { useStore } from "vuex";
import {
  getSubjectDetail,
  getSubjectOrigins,
  getSubjectTypes,
  postApply,
  putApply,
} from "@/service/subject/apply.ts";
import { queryUserById, queryUserByNumber } from "@/service/user/userInfo.ts";

interface Props {
  title: string;
  type: number; //1为报题 2为强修改 3为查看 4为弱修改
  subjectId: number;
}
const store = useStore();
const emit = defineEmits(["getNewData"]);
let props = defineProps<Props>();
let teacherInfo = reactive({
  teacher_name: "",
  teacher_title_name: "",
  teacher_office_name: "",
  teacher_major_name: "",
});
let studentInfo = reactive({
  student_name: "",
  student_major_name: "",
  student_class_name: "",
});
let data = reactive({
  majors: [],
  types: [],
  origins: [],
  major_names: [],
});
let isFirst = ref("否");
let formVisible = ref<boolean>(false);
let formRef = ref<any>();
let formData = reactive<any>({
  headline: "",
  first_teacher_id: 0,
  second_teacher_id: 0,
  student_number: "",
  student_id: null,
  progress_id: 1,
  college_id: 0,
  major_id: [],
  role_id: 2,
  abstract: "",
  necessity: "",
  feasibility: "",
  identical: null,
  type_id: null,
  origin_id: null,
  need_total: 0,
  year: null,
  is_delete: 0,
});

const checkTotal = (rule: any, value: any, callback: any) => {
  if (value === 0) {
    callback(new Error("拟需人数不能为0"));
  } else {
    callback();
  }
};
const checkSecTeacher = (rule: any, value: any, callback: any) => {
  if (value === formData.first_teacher_id) {
    callback(new Error());
  } else {
    callback();
  }
};
let formRules = reactive<FormRules>({
  headline: [{ required: true, message: "标题不能为空", trigger: "blur" }],
  first_teacher_id: [{ required: true, message: "第一指导老师不能为空", trigger: "blur" }],
  second_teacher_id: [{ validator: checkSecTeacher, message: "第二指导老师雷同", trigger: "blur" }],
  major_id: [{ required: true, message: "分配专业不能为空", trigger: "blur" }],
  abstract: [{ required: true, message: "内容提要不能为空", trigger: "blur" }],
  necessity: [{ required: true, message: "题目必要性不能为空", trigger: "blur" }],
  feasibility: [{ required: true, message: "题目可行性不能为空", trigger: "blur" }],
  identical: [{ required: true, message: "是否有雷同题目不能为空", trigger: "blur" }],
  type_id: [{ required: true, message: "题目类型不能为空", trigger: "blur" }],
  origin_id: [{ required: true, message: "题目来源不能为空", trigger: "blur" }],
  need_total: [{ validator: checkTotal, trigger: "blur" }],
});
watch(
  () => formData.first_teacher_id,
  async (value) => {
    if (props.type === 1) {
      let res = await queryUserById(value, 2);
      if (res.status_code === 10000) {
        ElMessage.success(res.status_msg);
        teacherInfo.teacher_name = res.data.name;
        teacherInfo.teacher_title_name = res.data.title_name as string;
        teacherInfo.teacher_office_name = res.data.office_name as string;
        teacherInfo.teacher_major_name = res.data.major_name;
      } else {
        ElMessage.error(res.status_msg);
      }
    }
  },
);
const userInfo = computed(() => {
  return store.state.user.userDesc;
});
const getMajors = async (id) => {
  console.log(id);
  let result = await getMajorsCollege(id, 0, 0);
  if (result.status_code === 10000) {
    data.majors = result.data.array;
  } else {
    ElMessage.error(result.status_msg);
  }
};
const getTypes = async () => {
  let result = await getSubjectTypes();
  if (result.status_code === 10000) {
    data.types = result.data;
  } else {
    ElMessage.error(result.status_msg);
  }
};
const getOrigins = async () => {
  let result = await getSubjectOrigins();
  if (result.status_code === 10000) {
    data.origins = result.data;
  } else {
    ElMessage.error(result.status_msg);
  }
};
const getStudentInfo = async (number) => {
  let res = await queryUserByNumber(number, 1, 2);
  if (res.status_code === 10000) {
    console.log(res.data);
    ElMessage.success(res.status_msg);
    formData.student_id = res.data.id;
    studentInfo.student_name = res.data.name;
    studentInfo.student_major_name = res.data.major_name;
    studentInfo.student_class_name = res.data.class_name as string;
  } else {
    ElMessage.error(res.status_msg);
    formData.student_id = null;
    studentInfo.student_name = "";
    studentInfo.student_major_name = "";
    studentInfo.student_class_name = "";
  }
};
const sendRequest = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const body = JSON.parse(JSON.stringify(formData));
      if (store.state.user.userDesc.role_id > 1) {
        body.major_id = body.major_id.map((item) => {
          let id;
          data.majors.forEach((i) => {
            if (i.name === item) {
              id = i.id;
            }
          });
          return id;
        });
      }
      console.log(body);
      let res;
      if (props.type === 1) {
        res = await postApply(body);
      } else {
        body["id"] = props.subjectId;
        res = await putApply(body);
      }
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
  formVisible.value = true;
};

const applyData = () => {
  formData.college_id = store.state.user.userDesc.college_id;
  formData.role_id = store.state.user.userDesc.role_id > 1 ? 2 : 1;
  if (store.state.user.userDesc.role_id > 1) {
    formData.first_teacher_id = store.state.user.userDesc.id;
  } else {
    formData.major_id.push(store.state.user.userDesc.major_id);
    formData.student_id = store.state.user.userDesc.id;
    formData.student_number = store.state.user.userDesc.number;
  }
};
const changeData = async () => {
  let res = await getSubjectDetail(props.subjectId);
  if (res.status_code === 10000) {
    ElMessage.success(res.status_msg);
    let info = res.data;
    formData.headline = info.headline;
    formData.major_id = info.select_major_name;
    formData.college_id = info.subject_college_id;
    formData.necessity = info.necessity;
    formData.abstract = info.abstract;
    formData.feasibility = info.feasibility;
    formData.need_total = info.need_total;
    formData.second_teacher_id = info.second_teacher_id;
    formData.student_number = info.student_number;
    formData.identical = info.identical;
    formData.first_teacher_id = info.first_teacher_id;
    formData.type_id = info.type_id;
    formData.origin_id = info.origin_id;
    formData.year = info.year;
    teacherInfo.teacher_name = info.first_teacher_name;
    teacherInfo.teacher_title_name = info.first_teacher_title_name;
    teacherInfo.teacher_major_name = info.first_teacher_major_name;
    teacherInfo.teacher_office_name = info.first_teacher_office_name;
    studentInfo.student_name = info.student_name;
    studentInfo.student_class_name = info.student_class_name;
    studentInfo.student_major_name = info.student_major_name;
    if (props.type !== 3) {
      await getMajors(info.subject_college_id);
    } else {
      data.major_names = info.select_major_name;
    }
  } else {
    ElMessage.error(res.status_msg);
  }
};
const onOpen = async () => {
  if (props.type !== 1) {
    await changeData();
  } else {
    formData.year = new Date().getFullYear();
    applyData();
    await getMajors(store.state.user.userDesc.college_id);
    if (store.state.user.userDesc.role_id === 1) {
      await getStudentInfo(store.state.user.userDesc.number);
    }
  }
};

defineExpose({ showForm });

onMounted(() => {
  getTypes();
  getOrigins();
});
</script>

<style scoped lang="less">
.rowItem {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
  margin-bottom: 18px;
  .teacher {
    width: 100px;
  }
  .teacherName {
    width: 100px;
  }
  .labels {
    width: 35px;
    margin-left: 10px;
  }
  .detail {
    width: 25%;
  }
  .center {
    text-align: center;
  }
}
.threeItem {
  display: flex;
  justify-content: space-between;
}
</style>
