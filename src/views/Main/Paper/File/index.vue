<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-has="[2, 3, 4, 5, 6, 7]" v-model:grade="year" class="select100"/>
    </div>
    <div class="tableBody">
      <base-subject-table ref="table">
        <template #expand>
          <el-table-column type="expand">
            <template #default="scope">
              <div style="display: flex;justify-content: center">
                <el-button>题目审批表</el-button>
                <el-button>开题报告</el-button>
                <el-button>中期检查表</el-button>
                <el-button>论文</el-button>
                <el-button>设计作品</el-button>
                <el-button>过程管理手册</el-button>
                <el-button>打包下载</el-button>
              </div>
            </template>
          </el-table-column>
        </template>
        <template #option="{ subjectInfo }">
          <el-button v-if="!isStu">论文</el-button>
          <el-button v-if="!isStu" @click="showOption(subjectInfo)">其他文件</el-button>
          <el-button v-if="isStu" @click="showOption(subjectInfo)">下载</el-button>
          <el-button v-if="isStu">传设计作品</el-button>
          <el-button v-if="isStu">传论文</el-button>
        </template>
      </base-subject-table>
    </div>

    <div class="tableFooter">
      <my-pagination :page_total="subjectList.page_total" @getData="getData" ref="pageRef"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

import BaseSubjectTable from "@/components/baseSubjectTable.vue";
import MyPagination from "@/components/myPagination.vue";
import YearSelect from "@/components/yearSelect.vue";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {pageBody} from "@/store/modules/baseInfo.ts";

const store = useStore()
const table = ref()
let year = ref<number>(new Date().getFullYear());
let subjectList = computed(() => {
  return store.state.subject.selfSubject;
});
let isStu = store.getters["user/isStu"]

const getData = (pageParams: pageBody) => {
  const params = JSON.parse(JSON.stringify(pageParams));
  params.year = year.value;
  store.dispatch("subject/getSelfSubjectAction", params);
};

const showOption = (subjectInfo) => {
  table.value.showExpand(subjectInfo)
}
</script>

<style lang="less" scoped>


</style>