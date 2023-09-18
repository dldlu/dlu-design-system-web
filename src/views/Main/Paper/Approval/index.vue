<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-model:grade="approvalGrade" />
      <el-button>我的委托</el-button>
      <el-button>报题</el-button>
      <el-button>审阅</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="subjects.array" stripe style="margin-top: 20px" max-height="500">
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
                手机号:{{ subjects.array[scope.$index].first_teacher_phone }}
              </template>
              {{ subjects.array[scope.$index].first_teacher_name }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="学生姓名" min-width="150">
          <template #default="scope">
            <el-tooltip placement="bottom-start" effect="light">
              <template #content>
                学号:{{ subjects.array[scope.$index].student_number }}<br />手机号:{{
                  subjects.array[scope.$index].student_phone
                }}
              </template>
              {{ subjects.array[scope.$index].student_name }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="progress_name" label="状态" min-width="200" />
        <el-table-column min-width="300">
          <template #default="scope">
            <div>
              <el-button type="primary">下载</el-button>
              <el-button type="danger">删除</el-button>
              <el-button type="warning">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="subjects.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import YearSelect from "@/components/yearSelect.vue";
import MyPagination from "@/components/MyPagination.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { pageBody } from "@/store/modules/baseInfo.ts";

const store = useStore();
const pageRef = ref<any>();
let subjects = computed(() => {
  return store.state.subject.selfSubject;
});
let approvalGrade = ref<number>(0);
const getData = (pageParams: pageBody) => {
  const params = JSON.parse(JSON.stringify(pageParams));
  params.year = approvalGrade.value;
  console.log(params);
  store.dispatch("subject/getSelfSubjectAction", params);
};
watch(approvalGrade, (value, oldValue) => {
  if (oldValue !== 0) {
    pageRef.value.reset();
    pageRef.value.comGetData();
  }
});
</script>

<style scoped lang="less"></style>
