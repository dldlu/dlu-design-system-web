<template>
  <el-table :data="subjectList.array" stripe style="margin-top: 20px" max-height="500">
    <el-table-column min-width="50">
      <template #default="scope">
        <div>
          {{ scope.$index + 1 }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="headline" label="论文题目" min-width="300">
      <template #default="scope">
        <div @click="showDetail(subjectList.array[scope.$index].subject_id)">
          {{ subjectList.array[scope.$index].headline }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="指导教师" min-width="150">
      <template #default="scope">
        <el-tooltip placement="bottom-start" effect="light">
          <template #content>
            职位:{{ subjectList.array[scope.$index].first_teacher_title_name }}<br />
            手机号:{{ subjectList.array[scope.$index].first_teacher_phone }}
          </template>
          {{ subjectList.array[scope.$index].first_teacher_name }}
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="学生姓名" min-width="150">
      <template #default="scope">
        <el-tooltip placement="bottom-start" effect="light">
          <template #content>
            学号:{{ subjectList.array[scope.$index].student_number }}<br />手机号:{{
              subjectList.array[scope.$index].student_phone
            }}
          </template>
          {{ subjectList.array[scope.$index].student_name }}
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="progress_name" label="状态" min-width="150" />
    <el-table-column label="操作" min-width="150">
      <template #default="scope">
        <slot name="option" :subjectInfo="subjectList.array[scope.$index]"> </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { bus } from "@/utils/bus.ts";

const store = useStore();
let subjectList = computed(() => {
  return store.state.subject.selfSubject;
});
const showDetail = (id) => {
  bus.emit("showDetail", id);
};
</script>

<style scoped lang="less"></style>
