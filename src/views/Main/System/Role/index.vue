<template>
  <div class="table">
    <div class="tableHeader">
      <el-button @click="addRoleVisible = true">添加角色</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="roles" stripe style="margin-top: 20px" max-height="500">
        <el-table-column label="序号" min-width="90">
          <template #default="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="角色代码" min-width="120" />
        <el-table-column prop="name" label="角色名称" min-width="90" />
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
                :true-label="0"
                :false-label="1"
                @change="changeIsDelete(roles[scope.$index].id, scope.$index)"
                size="small"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog
    v-model="addRoleVisible"
    title="添加角色"
    width="35%"
    style="border-radius: 15px"
    @close="closeDialog"
  >
    <div style="display: flex; justify-content: center">
      <el-form
        ref="addRoleFormRef"
        label-position="left"
        label-width="100px"
        :model="addRoleForm"
        :rules="addRoleFormRules"
        style="max-width: 460px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addRoleVisible = false">取消</el-button>
        <el-button type="primary" @click="sendAddRole(addRoleFormRef)"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { computed, onMounted, reactive, ref, toRaw } from "vue";
import { addRole, deleteRole } from "@/service/user/userRole.ts";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

const store = useStore();
let addRoleVisible = ref<boolean>(false);
let addRoleFormRef = ref<FormInstance>();
let addRoleForm = reactive({
  name: "",
});
let addRoleFormRules = reactive<FormRules>({
  name: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
});
let roles = computed(() => {
  return store.state.baseInfo.roles;
});
/**
 * @description:发起新增角色请求
 * @return {*}
 */
let sendAddRole = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const form = toRaw(addRoleForm);
      let res = await addRole(form);
      if (res.status_code === 10000) {
        ElMessage.success(res.status_msg);
        await store.dispatch("baseInfo/getRoles");
      } else {
        ElMessage.error(res.status_msg);
      }
    } else {
      ElMessage.error("有错误信息");
    }
  });
};
/**
 * @description:修改是否有效
 * @return {*}
 * @param roleId 角色代码
 * @param index 索引
 */
let changeIsDelete = async (roleId: string, index: number) => {
  let res = await deleteRole(roleId);
  if (res.status_code === 10000) {
    ElMessage.success(res.status_msg);
  } else {
    ElMessage.error(res.status_msg);
    store.state.baseInfo.roles[index].is_delete =
      store.state.baseInfo.roles[index].is_delete === 0 ? 1 : 0;
  }
};
let closeDialog = () => {
  addRoleForm.name = "";
};
onMounted(() => {
  store.dispatch("baseInfo/getRoles");
});
</script>
<style lang="less" scoped></style>
