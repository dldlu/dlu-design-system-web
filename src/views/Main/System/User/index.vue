<template>
  <div class="table">
    <div class="tableHeader">
      <el-select v-model="is_Stu" class="isStuSelect">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-select v-model="is_Stu" class="collegeSelect">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-select v-model="is_Stu" class="majorSelect">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-select v-model="is_Stu" class="numberSelect">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-input v-model="number" placeholder="请输入内容" class="numberInput"/>
      <el-button>查询</el-button>
      <el-button @click="addStuVisible = true">添加学生</el-button>
      <el-button @click="addTchVisible = true">添加教工</el-button>
      <el-button @click="turnManager">管理员名单</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="users" stripe style="margin-top: 20px;">
        <el-table-column prop="id" label="序号" min-width="90"/>
        <el-table-column prop="number" label="账号" min-width="120"/>
        <el-table-column prop="name" label="姓名" min-width="90"/>
        <el-table-column prop="major_name" label="专业" min-width="150"/>
        <el-table-column prop="phone" label="电话" min-width="150"/>
        <el-table-column prop="email" label="邮箱" min-width="150"/>
        <el-table-column label="权限" min-width="150">
          <template #default="scope">
            <div>
              <el-button
                  type="primary"
                  size="small"
                  @click="changeRole(users[scope.$index].number,users[scope.$index].role_id)"
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
              <el-button type="success" size="small">初始化</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="有效" min-width="100">
          <template #default="scope">
            <div>
              <el-checkbox
                  v-model="users[scope.$index].is_delete"
                  :true-label=0
                  :false-label=1
                  size="small"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <el-pagination layout="prev, pager, next" :total="1000"/>
    </div>
  </div>
  <el-dialog
      v-model="addStuVisible"
      title="添加学生"
      width="35%"
      style="border-radius: 15px"
  >
    <div style="display: flex;justify-content: center">
      <el-form
          label-position="left"
          label-width="100px"
          :model="addStuForm"
          style="max-width: 460px"
      >
        <el-form-item label="用户ID">
          <el-input v-model="addStuForm.id"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addStuForm.name"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addStuForm.sex">
            <el-radio label="" size="large">男</el-radio>
            <el-radio label="2" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addStuForm.phone"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addStuForm.email"/>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="is_Stu" class="majorSelect">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <el-select v-model="is_Stu" class="classSelect">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addStuVisible = false">取消</el-button>
        <el-button type="primary" @click="addStuVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
      v-model="addTchVisible"
      title="添加教师"
      width="35%"
      style="border-radius: 15px"
  >
    <div style="display: flex;justify-content: center">
      <el-form
          label-position="left"
          label-width="100px"
          :model="addTchForm"
          style="max-width: 460px"

      >
        <el-form-item label="用户ID">
          <el-input v-model="addTchForm.id"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addTchForm.name"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addTchForm.sex">
            <el-radio label="1" size="large">男</el-radio>
            <el-radio label="2" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addTchForm.phone"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addTchForm.email"/>
        </el-form-item>
        <el-form-item label="职称">
          <el-select v-model="is_Stu" style="width: 140px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="学位">
          <el-select v-model="is_Stu" style="width: 140px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="is_Stu" style="width: 140px;margin-right: 10px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <el-select v-model="is_Stu" style="width: 140px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addTchVisible = false">取消</el-button>
        <el-button type="primary" @click="addTchVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
      v-model="changeRoleVisible"
      title="权限"
      width="35%"
      style="border-radius: 15px"
  >
    <div style="display: flex;justify-content: center">
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
        <el-button type="primary" @click="setUserRole">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {ref, reactive} from 'vue'
import {useStore} from 'vuex';
import {useRouter} from "vue-router";

const router = useRouter()
const store = useStore()
let is_Stu = ref<string>('0')
let number = ref<string>('')
let users = reactive(store.state.baseInfo.users)
let addStuVisible = ref<boolean>(false)
let addStuForm = reactive({
  id: '',
  name: '',
  sex: '',
  phone: '',
  email: '',
  class: '',
})
let addTchVisible = ref<boolean>(false)
let addTchForm = reactive({
  id: '',
  name: '',
  sex: '',
  phone: '',
  email: '',
  title: '',
  degree: '',
  major: '',
})
let changeRoleVisible = ref<boolean>(false)
let currentRole = ref<number>(0)
let currentUserNumber = ''
const options = [
  {
    value: '0',
    label: '教师'
  },
  {
    value: '1',
    label: '学生'
  }
]
/**
 * @description:显示修改权限弹窗
 * @return {*}
 * @param number
 * @param role_id
 */
const changeRole = (number: string, role_id: number) => {
  changeRoleVisible.value = true
  currentRole.value = role_id
  currentUserNumber = number
}
/**
 * @description:修改用户权限
 * @return {*}
 */
const setUserRole = () => {
  console.log(currentUserNumber)
}
const turnManager = () => {
  router.push({name: 'manager'})
}
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

.classSelect {
  width: 100px;
  margin-left: 20px;
}
</style>
