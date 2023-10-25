<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-has="[2, 3, 4, 5, 6, 7]" v-model:grade="year" class="select100" />
    </div>
    <div class="tableBody">
      <base-subject-table>
        <template #option="{ subjectInfo }">
          <el-button size="small" type="primary" @click="showAdjustTable(subjectInfo.subject_id)">
            点击进行计划操作
          </el-button>
        </template>
      </base-subject-table>
    </div>

    <div class="tableFooter">
      <my-pagination :page_total="subjectList.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
  <el-dialog
    v-model="adjustPlanVisible"
    title="计划操作"
    width="70%"
    @open="getCurPlan"
    style="border-radius: 15px"
  >
    <div
      style="display: flex; flex-direction: column; justify-content: center; align-items: center"
    >
      <div
        v-for="(item, index) in plans"
        style="display: flex; align-items: center; margin-bottom: 10px"
      >
        <div>第{{ index + 1 }}周:</div>
        <el-input
          :disabled="store.state.user.userDesc.role_id === 1"
          v-model="plans[index]"
          style="margin-left: 10px; width: 500px"
        />
      </div>
    </div>
    <template v-if="store.state.user.userDesc.role_id !== 1" #footer>
      <span>
        <el-button @click="submitAdjust">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import MyPagination from "@/components/myPagination.vue";
import YearSelect from "@/components/yearSelect.vue";
import {computed, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {pageBody} from "@/store/modules/baseInfo.ts";
import {getPlans, plan, postPlans} from "@/service/subject/plan.ts";
import {ElMessage} from "element-plus";
import BaseSubjectTable from "@/components/baseSubjectTable.vue";

const store = useStore();
let pageRef = ref<any>();
let year = ref<number>(new Date().getFullYear());
let adjustPlanVisible = ref<boolean>(false);
let adjustSubjectId = ref<number>(0);
let plans = reactive(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
let subjectList = computed(() => {
  return store.state.subject.selfSubject;
});
watch(year, () => {
  pageRef.value.reset();
  pageRef.value.comGetData();
});
const getData = (pageParams: pageBody) => {
  const params = JSON.parse(JSON.stringify(pageParams));
  params.year = year.value;
  store.dispatch("subject/getSelfSubjectAction", params);
};

const getCurPlan = async () => {
  let result = await getPlans(adjustSubjectId.value);
  if (result.status_code === 10000) {
    ElMessage.success(result.status_msg);
    plans.forEach((item, index) => {
      plans[index] = "";
    });
    result.data.forEach((item) => {
      plans[item.week - 1] = item.content;
    });
  } else {
    ElMessage.error(result.status_msg);
  }
};

const showAdjustTable = (id) => {
  adjustSubjectId.value = id;
  adjustPlanVisible.value = true;
};

const submitAdjust = async () => {
  let data: Array<plan> = [];
  plans.forEach((item, index) => {
    data.push({
      subjectId: adjustSubjectId.value,
      week: index + 1,
      content: item,
    });
  });
  let result = await postPlans(data);
  if (result.status_code === 10000) {
    ElMessage.success(result.status_msg);
  } else {
    ElMessage.error(result.status_msg);
  }
};
</script>

<style scoped lang="less"></style>
