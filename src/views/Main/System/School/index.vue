<template>
  <div class="table">
    <div class="tableHeader">
      <el-button @click="addSchVisible = true">添加学校</el-button>
    </div>
    <div class="tableBody">
      <el-table
        :data="schools"
        stripe
        style="margin-top: 20px"
        max-height="500"
      >
        <el-table-column prop="id" label="序号" min-width="90">
          <template #default="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="学校代码" min-width="120" />
        <el-table-column prop="name" label="学校名称" min-width="90" />
        <el-table-column label="学校信息" min-width="150">
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
                v-model="schools[scope.$index].is_delete"
                :true-label="0"
                :false-label="1"
                size="small"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog
    v-model="addSchVisible"
    title="添加学校"
    width="35%"
    style="border-radius: 15px"
  >
    <div style="display: flex; justify-content: center">
      <el-form
        ref="addRoleFormRef"
        label-position="left"
        label-width="100px"
        :model="addSchForm"
        :rules="addSchFormRules"
        style="max-width: 460px"
      >
        <el-form-item label="学校代码" prop="id">
          <el-input v-model="addSchForm.name" />
        </el-form-item>
        <el-form-item label="学校名称" prop="name">
          <el-input v-model="addSchForm.name" />
        </el-form-item>
        <el-form-item label="学校地址" prop="address">
          <el-input v-model="addSchForm.name" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addSchVisible = false">取消</el-button>
        <el-button type="primary" @click="sendAddSch(addSchFormRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { addRole } from "@/service/user/userRole.ts";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

const store = useStore();
let addSchVisible = ref<boolean>(false);
let addSchFormRef = ref<FormInstance>();
let addSchForm = reactive({
  id: "",
  name: "",
  address: "",
});
let addSchFormRules = reactive<FormRules>({
  id: [{ required: true, message: "学校代码不能为空", trigger: "blur" }],
  name: [{ required: true, message: "学校名称不能为空", trigger: "blur" }],
  address: [{ required: true, message: "学校地址不能为空", trigger: "blur" }],
});
let schools = computed(() => {
  return store.state.baseInfo.schools;
});
/**
 * @description:发起新增角色请求
 * @return {*}
 */
let sendAddSch = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let res = await addRole(addSchForm);
      if (res.status_code === 10000) {
        ElMessage.success(res.status_msg);
        await store.dispatch("user/getRoleList");
      } else {
        ElMessage.error(res.status_msg);
      }
    } else {
      ElMessage.error("有错误信息");
    }
  });
};
onMounted(() => {
  store.dispatch("user/getRoleList");
});
</script>
<style lang="less" scoped></style>
