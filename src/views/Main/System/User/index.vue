<template>
  <div class="table">
    <div class="tableHeader">
      <el-select v-model="is_Stu" class="isStuSelect">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <college-select v-model:college_id="college_id" class="collegeSelect" />
      <major-select v-model:major_id="major_id" :college_id="college_id" class="majorSelect" />
      <el-select v-model="way" class="numberSelect">
        <el-option v-for="item in ways" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-show="way === 1" v-model="number" placeholder="请输入内容" class="numberInput" />
      <el-button v-show="way === 1" @click="getUserByNumber">查询</el-button>
      <el-button @click="addStuVisible = true">添加学生</el-button>
      <el-button @click="addTchVisible = true">添加教工</el-button>
      <el-button @click="turnManager">管理员名单</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="users.array" stripe style="margin-top: 20px">
        <el-table-column prop="id" label="序号" min-width="90" />
        <el-table-column prop="number" label="账号" min-width="120" />
        <el-table-column prop="name" label="姓名" min-width="90" />
        <el-table-column prop="major_name" label="专业" min-width="150" />
        <el-table-column prop="phone" label="电话" min-width="150" />
        <el-table-column prop="email" label="邮箱" min-width="150" />
        <el-table-column label="权限" min-width="150">
          <template #default="scope">
            <div>
              <el-button
                type="primary"
                size="small"
                :disabled="is_Stu === 1 || users.array[scope.$index].is_delete"
                @click="changeRole(users.array[scope.$index].id, users.array[scope.$index].role_id)"
                >修改权限
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="个人信息" min-width="150">
          <template #default="scope">
            <div>
              <el-button type="warning" size="small">修改信息</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="密码" min-width="150">
          <template #default="scope">
            <div>
              <el-button
                type="success"
                size="small"
                @click="initPasswordRequest(users.array[scope.$index].id)"
                >初始化</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="有效" min-width="100">
          <template #default="scope">
            <div>
              <el-checkbox
                v-model="users.array[scope.$index].is_delete"
                :true-label="0"
                :false-label="1"
                @change="changeIsDelete(<number>users.array[scope.$index].id, scope.$index)"
                size="small"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="users.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
  <el-dialog
    v-model="addStuVisible"
    title="添加学生"
    width="35%"
    style="border-radius: 15px"
    @open="getClasses"
    @close="closeAddStu"
  >
    <div style="display: flex; justify-content: center">
      <el-form
        label-position="left"
        label-width="100px"
        :model="addStuForm"
        style="max-width: 460px"
        ref="addStuRef"
        :rules="addStuFormRules"
      >
        <el-form-item label="用户ID" prop="number">
          <el-input v-model="addStuForm.number" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addStuForm.name" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="addStuForm.gender">
            <el-radio :label="1" size="large">男</el-radio>
            <el-radio :label="2" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addStuForm.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addStuForm.email" />
        </el-form-item>
        <el-form-item label="班级" prop="class_id">
          <el-select v-model="grade" style="width: 100px; margin-right: 10px">
            <el-option
              v-for="item in grades"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="addStuForm.class_id">
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
        <el-button @click="addStuVisible = false">取消</el-button>
        <el-button type="primary" @click="addStu(addStuRef)"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="addTchVisible"
    title="添加教师"
    width="35%"
    style="border-radius: 15px"
    @close="closeAddTch"
  >
    <div style="display: flex; justify-content: center">
      <el-form
        label-position="left"
        label-width="100px"
        :model="addTchForm"
        style="max-width: 460px"
        :rules="addTchFormRules"
        ref="addTchRef"
      >
        <el-form-item label="用户ID" prop="number">
          <el-input v-model="addTchForm.number" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addTchForm.name" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="addTchForm.gender">
            <el-radio :label="1" size="large">男</el-radio>
            <el-radio :label="2" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addTchForm.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addTchForm.email" />
        </el-form-item>
        <el-form-item label="职称" prop="title_id">
          <el-select v-model="addTchForm.title_id" style="width: 140px">
            <el-option v-for="item in titles" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="学位" prop="degree_id">
          <el-select v-model="addTchForm.degree_id" style="width: 140px">
            <el-option v-for="item in degrees" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major_id">
          <major-select v-model:major_id="addTchForm.major_id" :college_id="college_id" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addTchVisible = false">取消</el-button>
        <el-button type="primary" @click="addTch(addTchRef)"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="changeRoleVisible" title="权限" width="35%" style="border-radius: 15px">
    <div style="display: flex; justify-content: center">
      <el-radio-group v-model="currentRole" style="width: 80%">
        <el-radio :label="1" size="large">学生</el-radio>
        <el-radio :label="2" size="large">教师</el-radio>
        <el-radio :label="3" size="large">专业管理</el-radio>
        <el-radio :label="4" size="large">学院管理</el-radio>
        <el-radio :label="5" size="large">学校管理</el-radio>
        <el-radio :label="6" size="large">管理员</el-radio>
        <el-radio :label="7" size="large">超级管理员</el-radio>
      </el-radio-group>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changeRoleVisible = false">取消</el-button>
        <el-button type="primary" @click="setUserRole"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CollegeSelect from "@/components/collegeSelect.vue";
import MajorSelect from "@/components/majorSelect.vue";
import MyPagination from "@/components/MyPagination.vue";
import { pageBody } from "@/store/modules/baseInfo.ts";
import {
  addUser,
  changeTchRole,
  deleteUser,
  initPassword,
  userBody,
} from "@/service/user/userManage.ts";
import { ElMessage, FormInstance, FormRules } from "element-plus";

const router = useRouter();
const store = useStore();
let pageRef = ref();
let is_Stu = ref<number>(1);
let college_id = ref<number>(42);
let major_id = ref<number>(4208);
let grade = ref<number>(2023);
const grades = reactive([]);
let way = ref<number>(2);
let number = ref<string>("");
let addStuRef = ref();
let addStuVisible = ref<boolean>(false);
let addStuForm = reactive({
  number: "",
  name: "",
  gender: 1,
  phone: "",
  email: "",
  class_id: null,
});
let addStuFormRules = reactive<FormRules>({
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
});
let addTchRef = ref();
let addTchVisible = ref<boolean>(false);
let addTchForm = reactive({
  number: "",
  name: "",
  gender: 1,
  phone: "",
  email: "",
  title_id: null,
  degree_id: null,
  major_id: null,
});
let addTchFormRules = reactive<FormRules>({
  number: [{ required: true, message: "教师ID不能为空", trigger: "blur" }],
  name: [{ required: true, message: "教师姓名不能为空", trigger: "blur" }],
  gender: [{ required: true, message: "教师性别不能为空", trigger: "blur" }],
  phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    { pattern: /^1[0-9]{10}$/, message: "请输入正确的手机号", trigger: "blur" },
  ],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
  title_id: [{ required: true, message: "职称不能为空", trigger: "blur" }],
  degree_id: [{ required: true, message: "学位不能为空", trigger: "blur" }],
  major_id: [{ required: true, message: "专业不能为空", trigger: "blur" }],
});
let changeRoleVisible = ref<boolean>(false);
let currentRole = ref<number>(0);
let currentUserId = null;
let users = computed(() => {
  return store.state.baseInfo.users;
});
const options = [
  {
    value: 2,
    label: "教师",
  },
  {
    value: 1,
    label: "学生",
  },
];
const ways = [
  {
    value: 1,
    label: "只按学号/工号",
  },
  {
    value: 2,
    label: "只按专业",
  },
];
let classes = computed(() => {
  return store.state.baseInfo.classes;
});
let degrees = computed(() => {
  return store.state.baseInfo.degrees;
});
let titles = computed(() => {
  return store.state.baseInfo.titles;
});
watch(is_Stu, () => {
  pageRef.value.reset();
  pageRef.value.comGetData();
});
watch(major_id, () => {
  way.value = 2;
  pageRef.value.reset();
  pageRef.value.comGetData();
});
watch(way, (value) => {
  if (value === 2) {
    pageRef.value.reset();
    pageRef.value.comGetData();
  }
});
watch(grade, () => {
  getClasses();
});
/**
 * @description:显示修改权限弹窗
 * @return {*}
 * @param id
 * @param role_id
 */
const changeRole = (id: number, role_id: number) => {
  changeRoleVisible.value = true;
  currentRole.value = role_id;
  currentUserId = id;
};
/**
 * @description:修改用户权限
 * @return {*}
 */
const setUserRole = async () => {
  const data = {
    roleId: currentRole.value,
    id: currentUserId,
  };
  let res = await changeTchRole(data);
  if (res.status_code === 10000) {
    ElMessage.success(res.status_msg);
    pageRef.value.comGetData();
  } else {
    ElMessage.error(res.status_msg);
  }
};
/**
 * @description:通过学号或工号查询用户
 * @return {*}
 */
const getUserByNumber = () => {
  const data = {
    number: number.value,
    isStu: is_Stu.value,
  };
  store.dispatch("baseInfo/getUserByNumber", data);
};
/**
 * @description:通过专业查询用户
 * @return {*}
 * @param pageParams
 */
const getUserByMajor = (pageParams: pageBody) => {
  const data: any = pageParams;
  data.majorId = major_id.value;
  data.isStu = is_Stu.value;
  store.dispatch("baseInfo/getUserByMajor", data);
};
/**
 * @description:初始化用户密码
 * @return {*}
 * @param id
 */
const initPasswordRequest = async (id: number) => {
  let res = await initPassword(id, is_Stu.value);
  if (res.status_code === 10000) {
    ElMessage.success(res.status_msg);
  } else {
    ElMessage.error(res.status_msg);
  }
};
const changeIsDelete = async (userId: number, index: number) => {
  let res = await deleteUser(userId, is_Stu.value);
  if (res.status_code === 10000) {
    ElMessage.success(res.status_msg);
  } else {
    ElMessage.error(res.status_msg);
    store.state.baseInfo.users.array[index].is_delete =
      store.state.baseInfo.users.array[index].is_delete === 0 ? 1 : 0;
  }
};
const getClasses = () => {
  store.dispatch("baseInfo/getClasses", {
    size: 0,
    num: 0,
    grade: grade.value,
    majorId: major_id.value,
  });
};
const getGrades = () => {
  const now = new Date();
  const year = now.getFullYear();
  grade.value = year;
  for (let i = 0; i < 5; i++) {
    grades.push({
      value: year - i,
    });
  }
};
const addStu = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const body: userBody = {
        is_stu: 1,
        number: addStuForm.number,
        name: addStuForm.name,
        gender: addStuForm.gender,
        email: addStuForm.email,
        phone: addStuForm.phone,
        college_id: college_id.value,
        major_id: major_id.value,
        class_id: addStuForm.class_id,
      };
      let res = await addUser(body);
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
const addTch = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const body: userBody = {
        is_stu: 2,
        number: addTchForm.number,
        name: addTchForm.name,
        gender: addTchForm.gender,
        email: addTchForm.email,
        phone: addTchForm.phone,
        college_id: college_id.value,
        major_id: addTchForm.major_id,
        title_id: addTchForm.title_id,
        degree_id: addTchForm.degree_id,
      } as userBody;
      let res = await addUser(body);
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
const closeAddStu = () => {
  addStuForm.number = "";
  addStuForm.name = "";
  addStuForm.gender = 1;
  addStuForm.phone = "";
  addStuForm.email = "";
  addStuForm.class_id = null;
};
const closeAddTch = () => {
  addTchForm.number = "";
  addTchForm.name = "";
  addTchForm.gender = 1;
  addTchForm.phone = "";
  addTchForm.email = "";
  addTchForm.title_id = null;
  addTchForm.degree_id = null;
  addTchForm.major_id = null;
};
const getData = (pageParams: pageBody) => {
  if (way.value === 2) {
    getUserByMajor(pageParams);
  } else {
    getUserByNumber();
  }
};
const turnManager = () => {
  router.push({ name: "manager" });
};
onMounted(() => {
  getGrades();
  store.dispatch("baseInfo/getDegrees");
  store.dispatch("baseInfo/getTitles");
});
</script>
<style lang="less" scoped>
.isStuSelect {
  width: 72px;
  margin-right: 10px;
}

.collegeSelect {
  width: 130px;
  margin-right: 10px;
}

.majorSelect {
  width: 160px;
  margin-right: 10px;
}

.numberSelect {
  width: 130px;
  margin-right: 10px;
}

.numberInput {
  width: 140px;
  margin-right: 10px;
}
</style>
