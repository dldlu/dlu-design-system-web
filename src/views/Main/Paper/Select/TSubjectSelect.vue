<template>
  <div class="table">
    <div class="tableHeader">
      <el-button v-has="[3, 4, 5, 6, 7]" @click="turnPage('approve')">审阅</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="subjects" stripe style="margin-top: 20px">
        <el-table-column min-width="50">
          <template #default="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="headline" label="论文题目" min-width="200">
          <template #default="scope">
            <div @click="showDetail(subjects[scope.$index].subjectId)">
              {{ subjects[scope.$index].headline }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学生姓名" min-width="100">
          <template #default="scope">
            <el-tooltip placement="bottom-start" effect="light">
              <template #content>
                学号:{{ subjects[scope.$index].studentNumber }}<br />手机号:{{
                  subjects[scope.$index].studentPhone
                }}
              </template>
              {{ subjects[scope.$index].studentName }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column min-width="300">
          <template #default="scope">
            <div v-if="subjects[scope.$index].studentNumber">
              {{ subjects[scope.$index].studentMajorName }}/{{
                subjects[scope.$index].studentClassName
              }}
            </div>
            <div v-else>
              <el-button
                type="primary"
                size="small"
                @click="showAdjustTable(subjects[scope.$index].subjectId, scope.$index)"
                >调整选题</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog v-model="adjustTableVisible" title="调整选题" width="35%" style="border-radius: 15px">
    <div
      style="display: flex; flex-direction: column; align-items: center; justify-content: center"
    >
      <div v-if="subjects[currentAdjustSubjectIndex].firstList">第一选择</div>
      <el-radio-group v-model="adjustStudentId">
        <el-radio
          v-for="item in subjects[currentAdjustSubjectIndex].firstList"
          :label="item.studentId"
          @change="changeMajorId(item.studentMajorId)"
        >
          {{ item.studentName }}({{ item.studentClassName }})
        </el-radio>
      </el-radio-group>
      <div v-if="subjects[currentAdjustSubjectIndex].secondList">第二选择</div>
      <el-radio-group v-model="adjustStudentId">
        <el-radio
          v-for="item in subjects[currentAdjustSubjectIndex].secondList"
          :label="item.studentId"
          @change="changeMajorId(item.studentMajorId)"
        >
          {{ item.studentName }}({{ item.studentClassName }})
        </el-radio>
      </el-radio-group>
      <div
        v-if="
          !subjects[currentAdjustSubjectIndex].firstList &&
          !subjects[currentAdjustSubjectIndex].secondList
        "
      >
        暂无人选择
      </div>
    </div>
    <template #footer>
      <span>
        <el-button @click="sendTeacherSelect">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <proposal-report title="题目详情" :type="3" :subjectId="currentSubjectId" ref="detailRef" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ProposalReport from "@/views/Main/Paper/Approval/proposalReport.vue";
import { postTeacherSelect, TeacherSelect } from "@/service/select/adjust.ts";
import { ElMessage } from "element-plus";

const store = useStore();
const router = useRouter();
const detailRef = ref<any>();
let adjustTableVisible = ref<boolean>(false);
let adjustSubjectId = ref<number>(0);
let adjustStudentId = ref<number>(0);
let currentAdjustSubjectIndex = ref<number>(0);
let currentSubjectId = ref<number>(0);
let majorId = 0;
let subjects = computed(() => {
  return store.state.subject.teacherSelectList;
});
const changeMajorId = (id) => {
  majorId = id;
};
const turnPage = (name) => {
  router.push({ name });
};
const getData = () => {
  store.dispatch("subject/getTeacherSelectList", new Date().getFullYear());
};
const showAdjustTable = (id, index) => {
  adjustTableVisible.value = true;
  adjustSubjectId.value = id;
  currentAdjustSubjectIndex.value = index;
};
const showDetail = (id) => {
  currentSubjectId.value = id;
  detailRef.value.showForm();
};
const sendTeacherSelect = async () => {
  let params: TeacherSelect;
  params = {
    studentId: adjustStudentId.value,
    subjectId: adjustSubjectId.value,
    majorId: Number(majorId),
  };
  let result = await postTeacherSelect(params);
  if (result.status_code === 10000) {
    ElMessage.success(result.status_msg);
    getData();
    adjustTableVisible.value = false;
  } else {
    ElMessage.error(result.status_msg);
  }
};
onMounted(() => {
  getData();
});
</script>

<style scoped lang="less"></style>
