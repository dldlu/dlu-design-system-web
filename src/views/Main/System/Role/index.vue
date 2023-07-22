<template>
  <div class="table">
    <div class="tableHeader">
      <el-button @click="addRoleVisible = true">添加角色</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="roles" stripe style="margin-top: 20px;">
        <el-table-column prop="id" label="序号" min-width="90">
          <template #default="scope">
            <div>
              {{scope.$index+1}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="角色代码" min-width="120"/>
        <el-table-column prop="name" label="角色名称" min-width="90"/>
        <el-table-column label="角色信息" min-width="150">
          <template #default="scope">
            <div>
              <el-button type="warning" size="small">修改信息</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="有效" min-width="100">
          <template #default="scope">
            <div>
              <el-checkbox
                  v-model="roles[scope.$index].is_delete"
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
      <el-pagination layout="prev, pager, next" :total="1000" />
    </div>
  </div>
  <el-dialog
      v-model="addRoleVisible"
      title="添加角色"
      width="35%"
      style="border-radius: 15px"
  >
    <div style="display: flex;justify-content: center">
      <el-form
          label-position="left"
          label-width="100px"
          :model="addRoleForm"
          style="max-width: 460px"
      >
        <el-form-item label="角色代码">
          <el-input v-model="addRoleForm.id"/>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="addRoleForm.name"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addRoleVisible = false">取消</el-button>
        <el-button type="primary" @click="addRoleVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex';
import {computed, onBeforeMount, onMounted, reactive, ref} from "vue";

const store=useStore()
let addRoleVisible=ref<boolean>(false)
let addRoleForm=reactive({
  id:'',
  name:''
})
let roles=computed(()=>{
  return store.state.user.roleList
})

onMounted(()=>{
  store.dispatch('user/getRoleList')
})
</script>
<style lang="less" scoped>
</style>
