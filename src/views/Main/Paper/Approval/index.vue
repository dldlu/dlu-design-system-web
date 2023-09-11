<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-model:grade="approvalGrade" />
      <el-button>我的委托</el-button>
      <el-button>报题</el-button>
      <el-button>审阅</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="subjects" stripe :fit="false" style="margin-top: 20px" max-height="100">
        <el-table-column width="100">
          <template #default="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="headline" label="论文题目" width="200" />
        <el-table-column prop="student_name" label="学生姓名" width="200" />
        <el-table-column prop="progress_name" label="状态" width="200" />
        <el-table-column width="300">
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
      <!--      <my-pagination :page_total="classes.page_total" @getData="getData" ref="pageRef" />-->
    </div>
  </div>
</template>

<script setup lang="ts">
import YearSelect from "@/components/yearSelect.vue";
import MyPagination from "@/components/MyPagination.vue";
import { computed, onMounted, ref } from "vue";
import { getSelfSubject } from "@/service/subject/self.ts";
import { useStore } from "vuex";

const store = useStore();
const pageRef = ref<any>();
let subjects = computed(() => {
  return store.state.subject.selfSubject;
});
let approvalGrade = ref<number>(0);
onMounted(() => {
  store.dispatch("subject/getSelfSubjectAction", approvalGrade.value);
});
</script>

<style scoped lang="less"></style>
