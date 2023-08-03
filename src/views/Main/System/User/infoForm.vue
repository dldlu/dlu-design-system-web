<template>
  <el-dialog
    v-model="formVisible"
    :title="props.title"
    width="35%"
    style="border-radius: 15px"
    @open="getInfo"
    @close="closeAddStu"
  >
    <div style="display: flex; justify-content: center">
      <el-form
        label-position="left"
        label-width="100px"
        :model="formData as Record<string, any>"
        style="max-width: 460px"
        ref="formRef"
        :rules="formRules"
      >
        <el-form-item label="用户ID" prop="number">
          <el-input v-model="formData.number" :disabled="props.func === 2" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio :label="1" size="large">男</el-radio>
            <el-radio :label="2" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item v-if="props.type === 2" label="职称" prop="title_id">
          <el-select v-model="formData.title_id">
            <el-option v-for="item in titles" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="props.type === 2" label="学位" prop="degree_id">
          <el-select v-model="formData.degree_id">
            <el-option v-for="item in degrees" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="学院" prop="college_id">
          <college-select v-model:college_id="formData.college_id" />
        </el-form-item>
        <el-form-item label="专业" prop="major_id">
          <major-select
            v-model:major_id="formData.major_id"
            :college_id="formData.college_id"
            :update="props.func === 1"
          />
        </el-form-item>
        <el-form-item v-if="props.type === 1" label="班级" prop="class_id">
          <el-select v-model="grade" style="width: 100px; margin-right: 10px">
            <el-option
              v-for="item in grades"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="formData.class_id">
            <el-option
              v-for="item in classes.array"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="formVisible = false">取消</el-button>
        <el-button type="primary" @click="sendRequest(formRef)"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { addUser, changeUserInfo, userBody } from "@/service/user/userManage.ts";
import MajorSelect from "@/components/majorSelect.vue";
import CollegeSelect from "@/components/collegeSelect.vue";
import { userDesc } from "@/service/user/userInfo.ts";

interface Props {
  title: string;
  type: number; //1为学生 2为老师
  func: number; //1为添加 2为修改
  userInfo: any;
}

const store = useStore();
let props = withDefaults(defineProps<Props>(), {
  type: 1,
  func: 1,
  userInfo: () => {
    return {
      number: "",
      name: "",
      gender: 1,
      phone: "",
      email: "",
      class_id: null,
      title_id: null,
      degree_id: null,
      college_id: null,
      major_id: null,
    };
  },
});
const emit = defineEmits(["getNewData"]);
let grade = ref<number>(2023);
const grades = reactive([]);
let formRef = ref();
let formData = reactive({
  number: "",
  name: "",
  gender: 1,
  phone: "",
  email: "",
  class_id: null,
  title_id: null,
  degree_id: null,
  college_id: null,
  major_id: null,
});
let formVisible = ref<boolean>(false);
let formRules = reactive<FormRules>({
  number: [{ required: true, message: "学生ID不能为空", trigger: "blur" }],
  name: [{ required: true, message: "学生姓名不能为空", trigger: "blur" }],
  gender: [{ required: true, message: "学生性别不能为空", trigger: "blur" }],
  phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    { pattern: /^1[0-9]{10}$/, message: "请输入正确的手机号", trigger: "blur" },
  ],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
  class_id: [{ required: true, message: "班级不能为空", trigger: "blur" }],
  title_id: [{ required: true, message: "职称不能为空", trigger: "blur" }],
  degree_id: [{ required: true, message: "学位不能为空", trigger: "blur" }],
  college_id: [{ required: true, message: "学院不能为空", trigger: "blur" }],
  major_id: [{ required: true, message: "专业不能为空", trigger: "blur" }],
});
let classes = computed(() => {
  return store.state.baseInfo.classes;
});
let degrees = computed(() => {
  return store.state.baseInfo.degrees;
});
let titles = computed(() => {
  return store.state.baseInfo.titles;
});
watch([grade, () => formData.major_id], () => {
  getClasses();
});
const sendRequest = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const body = JSON.parse(JSON.stringify(formData));
      body.is_stu = props.type;
      let res;
      if (props.func === 1) {
        res = await addUser(body);
      } else {
        body.id = props.userInfo.id;
        console.log(body);
        res = await changeUserInfo(body);
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
const getGrades = () => {
  if (props.type === 1) {
    const now = new Date();
    const year = now.getFullYear();
    grade.value = year;
    for (let i = 0; i < 5; i++) {
      grades.push({
        value: year - i,
      });
    }
  }
};
const getClasses = () => {
  if (props.type === 1) {
    store.dispatch("baseInfo/getClasses", {
      size: 0,
      num: 0,
      grade: grade.value,
      majorId: formData.major_id,
    });
  }
};
const getInfo = () => {
  formData.number = props.userInfo.number;
  formData.name = props.userInfo.name;
  formData.gender = props.userInfo.gender;
  formData.phone = props.userInfo.phone;
  formData.email = props.userInfo.email;
  formData.class_id = props.userInfo.class_id;
  formData.degree_id = props.userInfo.degree_id;
  formData.title_id = props.userInfo.title_id;
  formData.college_id = props.userInfo.college_id;
  formData.major_id = props.userInfo.major_id;
};
const closeAddStu = () => {
  formData.number = "";
  formData.name = "";
  formData.gender = 1;
  formData.phone = "";
  formData.email = "";
  formData.class_id = null;
  formData.degree_id = null;
  formData.title_id = null;
  formData.college_id = null;
  formData.major_id = null;
};
const showForm = () => {
  formVisible.value = true;
};

defineExpose({ showForm });
onMounted(() => {
  getGrades();
});
</script>

<style scoped lang="less"></style>
