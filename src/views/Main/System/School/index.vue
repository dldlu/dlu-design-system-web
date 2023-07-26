<template>
  <div class="table">
    <div class="tableHeader">
      <el-button @click="addSchVisible = true">添加学校</el-button>
    </div>
    <div class="tableBody">
      <el-table
        :data="schools.array"
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
        <el-table-column prop="id" label="学校代码" min-width="100" />
        <el-table-column prop="name" label="学校名称" min-width="100" />
        <el-table-column prop="address" label="学校地址" min-width="100" />
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
                v-model="schools.array[scope.$index].is_delete"
                :true-label="0"
                :false-label="1"
                @change="
                  changeIsDelete(
                    <number>schools.array[scope.$index].id,
                    scope.$index,
                  )
                "
                size="small"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <el-pagination
        v-model:current-page="pageParams.num"
        layout="prev, pager, next"
        :page-count="schools.page_total || 1"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <el-dialog
    v-model="addSchVisible"
    title="添加学校"
    width="35%"
    style="border-radius: 15px"
    @close="closeDialog"
  >
    <div style="display: flex; justify-content: center">
      <el-form
        ref="addSchFormRef"
        label-position="left"
        label-width="100px"
        :model="addSchForm"
        :rules="addSchFormRules"
        style="max-width: 460px"
      >
        <el-form-item label="学校代码" prop="id">
          <el-input v-model.number="addSchForm.id" />
        </el-form-item>
        <el-form-item label="学校名称" prop="name">
          <el-input v-model="addSchForm.name" />
        </el-form-item>
        <el-form-item label="学校地址" prop="address">
          <el-input v-model="addSchForm.address" />
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
import {
  computed,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  toRaw,
  toRefs,
  watch,
} from "vue";
import { addRole } from "@/service/user/userRole.ts";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { delSchool, postSchool, schoolRequest } from "@/service/info/school.ts";

const store = useStore();
let addSchVisible = ref<boolean>(false);
let addSchFormRef = ref<FormInstance>();
let addSchForm = reactive({
  id: null,
  name: "",
  address: "",
  is_delete: 0,
});
let pageParams = reactive({
  num: 1,
  size: 10,
});
let addSchFormRules = reactive<FormRules>({
  id: [{ required: true, message: "学校代码不能为空", trigger: "blur" }],
  name: [{ required: true, message: "学校名称不能为空", trigger: "blur" }],
  address: [{ required: true, message: "学校地址不能为空", trigger: "blur" }],
});
let schools = computed(() => {
  return store.state.baseInfo.schools;
});
watch(pageParams, () => {
  getData();
});
const handleCurrentChange = (val: number) => {
  pageParams.num = val;
};
/**
 * @description:获取学校数据
 * @return {*}
 */
const getData = () => {
  const params = JSON.parse(JSON.stringify(pageParams));
  store.dispatch("baseInfo/getSchools", params);
};
/**
 * @description:发起新增学校请求
 * @return {*}
 */
let sendAddSch = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const form = toRaw(addSchForm);
      let res = await postSchool(form as schoolRequest);
      if (res.status_code === 10000) {
        ElMessage.success(res.status_msg);
        getData();
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
 * @param schoolId
 * @param index 索引
 */
let changeIsDelete = async (schoolId: number, index: number) => {
  let res = await delSchool(schoolId);
  if (res.status_code === 10000) {
    ElMessage.success(res.status_msg);
  } else {
    ElMessage.error(res.status_msg);
    store.state.baseInfo.schools.array[index].is_delete =
      store.state.baseInfo.schools.array[index].is_delete === 0 ? 1 : 0;
  }
};
let closeDialog = () => {
  addSchForm.id = null;
  addSchForm.name = "";
};
onMounted(() => {
  getData();
});
</script>
<style lang="less" scoped></style>
