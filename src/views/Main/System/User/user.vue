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
      <el-button @click="show(0)">添加学生</el-button>
      <el-button @click="show(1)">添加教工</el-button>
      <el-button @click="turnManager">管理员名单</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="users.array" stripe style="margin-top: 20px">
        <el-table-column prop="id" label="序号" min-width="90" />
        <el-table-column prop="number" label="账号" min-width="120" />
        <el-table-column prop="name" label="姓名" min-width="90" />
        <el-table-column prop="major_name" label="专业" min-width="100" />
        <el-table-column prop="phone" label="电话" min-width="150" />
        <el-table-column prop="email" label="邮箱" min-width="200" />
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
              <el-button type="warning" size="small" @click="show(2, scope.$index)"
                >修改信息</el-button
              >
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
  <info-form title="添加学生" :type="1" ref="addStuRef" @getNewData="getNewData" />
  <info-form title="添加教师" :type="2" ref="addTchRef" @getNewData="getNewData" />
  <info-form
    title="修改信息"
    :type="1"
    :func="2"
    :userInfo="currentInfo"
    ref="changeStuRef"
    @getNewData="getNewData"
  />
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
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CollegeSelect from "@/components/collegeSelect.vue";
import MajorSelect from "@/components/majorSelect.vue";
import MyPagination from "@/components/myPagination.vue";
import { pageBody } from "@/store/modules/baseInfo.ts";
import { changeTchRole, deleteUser, initPassword } from "@/service/user/userManage.ts";
import { ElMessage } from "element-plus";
import InfoForm from "@/views/Main/System/User/infoForm.vue";

const router = useRouter();
const store = useStore();
let pageRef = ref();
let is_Stu = ref<number>(1);
let college_id = ref<number>(42);
let major_id = ref<number>(4208);
let way = ref<number>(2);
let number = ref<string>("");
let addStuRef = ref();
let addTchRef = ref();
let changeStuRef = ref();
let changeTchRef = ref();
let currentInfo = ref({});
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
const getNewData = () => {
  pageRef.value.comGetData();
};
const show = (type, index = 0) => {
  if (type === 0) {
    addStuRef.value.showForm();
  } else if (type === 1) {
    addTchRef.value.showForm();
  } else {
    currentInfo.value = store.state.baseInfo.users.array[index];
    if (is_Stu.value === 1) {
      changeStuRef.value.showForm();
    } else {
      changeTchRef.value.showForm();
    }
  }
};
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
