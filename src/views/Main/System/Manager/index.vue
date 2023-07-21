<template>
  <div class="table">
    <div class="tableHeader">
      <el-select v-model="managerType">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="tableBody">
      <el-table :data="users" stripe style="margin-top: 20px;">
        <el-table-column prop="id" label="序号" min-width="90"/>
        <el-table-column prop="number" label="工号" min-width="120"/>
        <el-table-column prop="name" label="姓名" min-width="90"/>
        <el-table-column prop="major_name" label="专业" min-width="150"/>
        <el-table-column prop="phone" label="电话" min-width="150"/>
        <el-table-column prop="email" label="邮箱" min-width="150"/>
        <el-table-column label="权限" min-width="150">
          <template #default="scope">
            <div>
              <el-checkbox
                  v-model="users[scope.$index].is_delete"
                  :true-label=0
                  :false-label=1
                  size="small"
                  :label="options[managerType].label"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <el-pagination layout="prev, pager, next" :total="1000" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import {useStore} from "vuex";

const store=useStore()
let managerType=ref<string>('0')
let users = reactive(store.state.baseInfo.users)
const options = [
  {
    value: '0',
    label: '专业负责人'
  },
  {
    value: '1',
    label: '学院负责人'
  },
  {
    value: '2',
    label: '学校负责人'
  }
]
</script>
<style lang="less" scoped>
</style>
