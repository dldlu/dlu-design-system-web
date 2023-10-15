<template>
  <div class="table">
    <div class="tableHeader">
      <college-select v-model:college_id="addMajForm.college_id" class="select140" />
      <el-button @click="addMajVisible = true">添加专业</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="majors.array" stripe style="margin-top: 20px" max-height="500">
        <el-table-column label="序号" min-width="90">
          <template #default="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="专业代码" min-width="100" />
        <el-table-column prop="name" label="专业名称" min-width="150" />
        <el-table-column label="专业信息" min-width="150">
          <template #default="scope">
            <div>
              <el-button type="warning" size="small" @click="changeForm(majors.array[scope.$index])"
                >修改信息</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="有效" min-width="100">
          <template #default="scope">
            <div>
              <el-checkbox
                v-model="majors.array[scope.$index].is_delete"
                :true-label="0"
                :false-label="1"
                @change="changeIsDelete(<number>majors.array[scope.$index].id, scope.$index)"
                size="small"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="majors.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
  <el-dialog
    v-model="addMajVisible"
    :title="dialogTitle"
    width="35%"
    style="border-radius: 15px"
    @close="closeDialog"
  >
    <div style="display: flex; justify-content: center">
      <el-form
        ref="addMajFormRef"
        label-position="left"
        label-width="100px"
        :model="addMajForm"
        :rules="addMajFormRules"
        style="max-width: 460px"
      >
        <el-form-item label="专业代码" prop="id">
          <el-input v-model.number="addMajForm.id" />
        </el-form-item>
        <el-form-item label="专业名称" prop="name">
          <el-input v-model="addMajForm.name" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addMajVisible = false">取消</el-button>
        <el-button type="primary" @click="sendAddMaj(addMajFormRef)"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { computed, reactive, ref, toRaw, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { delMajor, majorRequest, postMajor, putMajor } from "@/service/info/major.ts";
import CollegeSelect from "@/components/collegeSelect.vue";
import MyPagination from "@/components/myPagination.vue";
import { pageBody } from "@/store/modules/baseInfo.ts";

type addMajForm = {
  id: null | number;
  name: string;
  college_id: number;
};

const store = useStore();
let dialogTitle = "添加专业";
let pageRef = ref();
let addMajVisible = ref<boolean>(false);
let addMajFormRef = ref<FormInstance>();
let addMajForm = reactive<addMajForm>({
  id: null,
  name: "",
  college_id: 21,
});
let addMajFormRules = reactive<FormRules>({
  id: [{ required: true, message: "专业代码不能为空", trigger: "blur" }],
  name: [{ required: true, message: "专业名称不能为空", trigger: "blur" }],
});
let majors = computed(() => {
  return store.state.baseInfo.majors;
});
watch(
  () => addMajForm.college_id,
  () => {
    pageRef.value.reset();
    pageRef.value.comGetData();
  },
);
/**
 * @description:获取专业数据
 * @return {*}
 */
const getData = (pageParams: pageBody) => {
  const params = JSON.parse(JSON.stringify(pageParams));
  params.collegeId = addMajForm.college_id;
  store.dispatch("baseInfo/getMajorsByCollege", params);
};
/**
 * @description:发起新增专业请求
 * @return {*}
 */
let sendAddMaj = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const form = toRaw(addMajForm) as majorRequest;
      let res = dialogTitle === "添加专业" ? await postMajor(form) : await putMajor(form);
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
/**
 * @description:修改是否有效
 * @return {*}
 * @param majorId
 * @param index 索引
 */
let changeIsDelete = async (majorId: number, index: number) => {
  let res = await delMajor(majorId);
  if (res.status_code === 10000) {
    ElMessage.success(res.status_msg);
  } else {
    ElMessage.error(res.status_msg);
    store.state.baseInfo.colleges.array[index].is_delete =
      store.state.baseInfo.colleges.array[index].is_delete === 0 ? 1 : 0;
  }
};
let changeForm = (major: majorRequest) => {
  dialogTitle = "修改信息";
  addMajForm.id = major.id;
  addMajForm.name = major.name;
  addMajVisible.value = true;
};
let closeDialog = () => {
  addMajForm.id = null;
  addMajForm.name = "";
  dialogTitle = "添加专业";
};
</script>
<style lang="less" scoped></style>
