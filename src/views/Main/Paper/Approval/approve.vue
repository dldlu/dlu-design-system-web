<template>
  <div class="table">
    <div class="tableHeader">
      <el-button @click="genSerialFunc">生成归档序号</el-button>
      <el-button style="margin-right: 10px">委托管理</el-button>
      <year-select v-model:grade="approvalGrade" class="select100" />
      <el-select :model-value="number" class="select100">
        <el-option
          v-for="item in grades"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        />
      </el-select>
      <college-select v-model:college_id="college_id" class="select140" />
      <major-select v-model:major_id="major_id" :college_id="college_id" class="select140" />
      <el-input v-model="number" placeholder="按老师工号或姓名查询" class="select140" />
      <el-button>查询</el-button>
      <el-button>下载论文封皮</el-button>
      <el-button>下载统计表</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="approveList.array" stripe style="margin-top: 20px" max-height="500">
        <el-table-column min-width="100">
          <template #default="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="headline" label="论文题目" min-width="300" />
        <el-table-column label="第一指导教师姓名" min-width="150">
          <template #default="scope">
            <el-tooltip placement="bottom-start" effect="light">
              <template #content>
                手机号:{{ approveList.array[scope.$index].first_teacher_phone }}
              </template>
              {{ approveList.array[scope.$index].first_teacher_name }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="学生姓名" min-width="150">
          <template #default="scope">
            <el-tooltip placement="bottom-start" effect="light">
              <template #content>
                学号:{{ approveList.array[scope.$index].student_number }}<br />手机号:{{
                  approveList.array[scope.$index].student_phone
                }}
              </template>
              {{ approveList.array[scope.$index].student_name }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="progress_name" label="状态" min-width="200" />
        <el-table-column prop="serial_number" label="排序" min-width="100" />
        <el-table-column min-width="300">
          <template #header>
            <el-button>批量审阅</el-button>
          </template>
          <template #default="scope">
            <div>
              <el-button type="primary">审阅</el-button>
              <el-button type="danger">删除</el-button>
              <el-button type="warning">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="approveList.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MyPagination from "@/components/MyPagination.vue";
import YearSelect from "@/components/yearSelect.vue";
import { computed, ref, watch } from "vue";
import MajorSelect from "@/components/majorSelect.vue";
import CollegeSelect from "@/components/collegeSelect.vue";
import { useStore } from "vuex";
import { pageBody } from "@/store/modules/baseInfo.ts";
import { approveListRequest } from "@/service/subject/approve.ts";
import { genSerial, serialRequest } from "@/service/subject/apply.ts";
import { ElMessage } from "element-plus";
const store = useStore();
let pageRef = ref<any>();
let approvalGrade = ref<number>(0);
let college_id = ref<number>(42);
let major_id = ref<number>(4208);
let number = ref<string>("");
let approveList = computed(() => {
  return store.state.subject.approveList;
});
watch([major_id, college_id, approvalGrade], () => {
  pageRef.value.reset();
  pageRef.value.comGetData();
});
const getData = (pageParams: pageBody) => {
  const params: approveListRequest = JSON.parse(JSON.stringify(pageParams));
  params.year = approvalGrade.value;
  params.collegeId = college_id.value;
  params.majorId = major_id.value;
  params.condition = "";
  store.dispatch("subject/getApproveListAction", params);
};
const genSerialFunc = async () => {
  let params;
  params = {};
  params.year = approvalGrade.value;
  params.majorId = major_id.value;
  let result = await genSerial(params);
  if (result.status_code === 10000) {
    ElMessage.success(result.status_msg);
  } else {
    ElMessage.error(result.status_msg);
  }
};
</script>

<style scoped lang="less"></style>
