<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-model:grade="addClaForm.grade" class="select100" />
      <college-select v-model:college_id="college_id" class="select140" />
      <major-select
        v-model:major_id="addClaForm.major_id"
        :college_id="college_id"
        class="select140"
      />
      <el-button @click="addClaVisible = true">添加班级</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="classes.array" stripe style="margin-top: 20px" max-height="500">
        <el-table-column label="序号" min-width="90">
          <template #default="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="班级代码" min-width="100" />
        <el-table-column prop="name" label="班级名称" min-width="150" />
        <el-table-column label="班级信息" min-width="150">
          <template #default="scope">
            <div>
              <el-button
                type="warning"
                size="small"
                @click="changeForm(classes.array[scope.$index])"
                >修改信息</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="有效" min-width="100">
          <template #default="scope">
            <div>
              <el-checkbox
                v-model="classes.array[scope.$index].is_delete"
                :true-label="0"
                :false-label="1"
                @change="changeIsDelete(<number>classes.array[scope.$index].id, scope.$index)"
                size="small"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="classes.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
  <el-dialog
    v-model="addClaVisible"
    :title="dialogTitle"
    width="35%"
    style="border-radius: 15px"
    @close="closeDialog"
  >
    <div style="display: flex; justify-content: center">
      <el-form
        ref="addClaFormRef"
        label-position="left"
        label-width="100px"
        :model="addClaForm"
        :rules="addClaFormRules"
        style="max-width: 460px"
      >
        <el-form-item label="班级代码" prop="id">
          <el-input v-model.number="addClaForm.id" />
        </el-form-item>
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="addClaForm.name" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addClaVisible = false">取消</el-button>
        <el-button type="primary" @click="sendAddCla(addClaFormRef)"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { computed, reactive, ref, toRaw, watch } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { classRequest, delClass, postClass, putClass } from "@/service/info/class.ts";
import CollegeSelect from "@/components/collegeSelect.vue";
import MajorSelect from "@/components/majorSelect.vue";
import MyPagination from "@/components/MyPagination.vue";
import { pageBody } from "@/store/modules/baseInfo.ts";
import YearSelect from "@/components/yearSelect.vue";

type addClaForm = {
  id: null | number;
  name: string;
  major_id: number;
  grade: number;
};

const store = useStore();
let dialogTitle = "添加班级";
let pageRef = ref();
let college_id = ref<number>(42);
let addClaVisible = ref<boolean>(false);
let addClaFormRef = ref<FormInstance>();
let addClaForm = reactive<addClaForm>({
  id: null,
  name: "",
  major_id: 4208,
  grade: 2023,
});
let addClaFormRules = reactive<FormRules>({
  id: [{ required: true, message: "班级代码不能为空", trigger: "blur" }],
  name: [{ required: true, message: "班级名称不能为空", trigger: "blur" }],
});
const grades = reactive([]);
let classes = computed(() => {
  return store.state.baseInfo.classes;
});
watch([() => addClaForm.major_id, () => addClaForm.grade], () => {
  pageRef.value.reset();
  pageRef.value.comGetData();
});

/**
 * @description:获取班级数据
 * @return {*}
 */
const getData = (pageParams: pageBody) => {
  const params = JSON.parse(JSON.stringify(pageParams));
  params.majorId = addClaForm.major_id;
  params.grade = addClaForm.grade;
  store.dispatch("baseInfo/getClasses", params);
};
/**
 * @description:发起新增班级请求
 * @return {*}
 */
let sendAddCla = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const form = toRaw(addClaForm) as classRequest;
      let res = dialogTitle === "添加班级" ? await postClass(form) : await putClass(form);
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
 * @param classId 班级id
 * @param index 索引
 */
let changeIsDelete = async (classId: number, index: number) => {
  let res = await delClass(classId);
  if (res.status_code === 10000) {
    ElMessage.success(res.status_msg);
  } else {
    ElMessage.error(res.status_msg);
    store.state.baseInfo.colleges.array[index].is_delete =
      store.state.baseInfo.colleges.array[index].is_delete === 0 ? 1 : 0;
  }
};
let changeForm = (Cla: classRequest) => {
  dialogTitle = "修改信息";
  addClaForm.id = Cla.id;
  addClaForm.name = Cla.name;
  addClaForm.major_id = Cla.major_id;
  addClaForm.grade = Cla.grade;
  addClaVisible.value = true;
};
let closeDialog = () => {
  dialogTitle = "添加班级";
  addClaForm.id = null;
  addClaForm.name = "";
};
</script>
<style lang="less" scoped></style>
