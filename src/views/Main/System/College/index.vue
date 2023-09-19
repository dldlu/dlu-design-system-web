<template>
  <div class="table">
    <div class="tableHeader">
      <el-select v-model="schoolId" class="select140">
        <el-option
          v-for="item in schools.array"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button @click="addColVisible = true">添加学院</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="colleges.array" stripe style="margin-top: 20px" max-height="500">
        <el-table-column label="序号" min-width="90">
          <template #default="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="学院代码" min-width="100" />
        <el-table-column prop="name" label="学院名称" min-width="150" />
        <el-table-column label="学院信息" min-width="150">
          <template #default="scope">
            <div>
              <el-button
                type="warning"
                size="small"
                @click="changeForm(colleges.array[scope.$index])"
                >修改信息</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="有效" min-width="100">
          <template #default="scope">
            <div>
              <el-checkbox
                v-model="colleges.array[scope.$index].is_delete"
                :true-label="0"
                :false-label="1"
                @change="changeIsDelete(<number>colleges.array[scope.$index].id, scope.$index)"
                size="small"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="colleges.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
  <el-dialog
    v-model="addColVisible"
    title="添加学院"
    width="35%"
    style="border-radius: 15px"
    @close="closeDialog"
  >
    <div style="display: flex; justify-content: center">
      <el-form
        ref="addColFormRef"
        label-position="left"
        label-width="100px"
        :model="addColForm"
        :rules="addColFormRules"
        style="max-width: 460px"
      >
        <el-form-item label="学院代码" prop="id">
          <el-input v-model.number="addColForm.id" />
        </el-form-item>
        <el-form-item label="学院名称" prop="name">
          <el-input v-model="addColForm.name" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addColVisible = false">取消</el-button>
        <el-button type="primary" @click="sendAddCol(addColFormRef)"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { computed, onBeforeMount, onMounted, reactive, ref, toRaw, toRefs, watch } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { collegeRequest, delCollege, postCollege } from "@/service/info/college.ts";
import MyPagination from "@/components/MyPagination.vue";
import { pageBody } from "@/store/modules/baseInfo.ts";

type addColForm = {
  id: null | number;
  name: string;
  is_delete: number;
};

const store = useStore();
let dialogTitle = "添加学院";
let pageRef = ref();
let schoolId = ref<number>(27);
let addColVisible = ref<boolean>(false);
let addColFormRef = ref<FormInstance>();
let addColForm = reactive<addColForm>({
  id: null,
  name: "",
  is_delete: 0,
});
let addColFormRules = reactive<FormRules>({
  id: [{ required: true, message: "学院代码不能为空", trigger: "blur" }],
  name: [{ required: true, message: "学院名称不能为空", trigger: "blur" }],
});
let schools = computed(() => {
  return store.state.baseInfo.schools;
});
let colleges = computed(() => {
  return store.state.baseInfo.colleges;
});
/**
 * @description:获取学院数据
 * @return {*}
 */
const getData = (pageParams: pageBody) => {
  store.dispatch("baseInfo/getColleges", pageParams);
};
/**
 * @description:发起新增学院请求
 * @return {*}
 */
let sendAddCol = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const form = toRaw(addColForm) as collegeRequest;
      let res = dialogTitle === "添加学院" ? await postCollege(form) : await postCollege(form);
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
 * @param collegeId 学院代码
 * @param index 索引
 */
let changeIsDelete = async (collegeId: number, index: number) => {
  let res = await delCollege(collegeId);
  if (res.status_code === 10000) {
    ElMessage.success(res.status_msg);
  } else {
    ElMessage.error(res.status_msg);
    store.state.baseInfo.colleges.array[index].is_delete =
      store.state.baseInfo.colleges.array[index].is_delete === 0 ? 1 : 0;
  }
};
let changeForm = (college: collegeRequest) => {
  dialogTitle = "修改信息";
  addColForm.id = college.id;
  addColForm.name = college.name;
  addColVisible.value = true;
};
let closeDialog = () => {
  dialogTitle = "添加学院";
  addColForm.id = null;
  addColForm.name = "";
};
onMounted(() => {
  store.dispatch("baseInfo/getSchools", { size: 0, num: 0 });
});
</script>
<style lang="less" scoped></style>
