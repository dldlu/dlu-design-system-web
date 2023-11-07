<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-has="[2, 3, 4, 5, 6, 7]" v-model:grade="year" class="select100"/>
      <el-button v-has="[2, 3, 4, 5, 6, 7]" @click="turnPage('mutualSet')">管理</el-button>
    </div>
    <div class="tableBody">
      <base-subject-table>
        <template #extra>
          <el-table-column label="互评教师" min-width="150">

          </el-table-column>
        </template>
        <template #option="{ subjectInfo, index }">
          <el-button
              size="small"
              type="primary"
          >
            查看详情
          </el-button>
        </template>
      </base-subject-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="subjectList.page_total" @getData="getData" ref="pageRef"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSubjectTable from "@/components/baseSubjectTable.vue";
import MyPagination from "@/components/myPagination.vue";
import YearSelect from "@/components/yearSelect.vue";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {pageBody} from "@/store/modules/baseInfo.ts";

const router = useRouter()
const store = useStore()
let year = ref<number>(new Date().getFullYear());
let pageRef = ref();
let subjectList = computed(() => {
  return store.state.subject.selfSubject;
});
const turnPage = (name: string) => {
  router.push({name})
}
const getData = (pageParams: pageBody) => {
  const params = JSON.parse(JSON.stringify(pageParams));
  params.year = year.value;
  store.dispatch("subject/getSelfSubjectAction", params);
};
</script>

<style scoped lang="less">

</style>