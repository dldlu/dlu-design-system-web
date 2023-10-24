<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-has="[2, 3, 4, 5, 6, 7]" v-model:grade="year" class="select100"/>
      <el-button v-has="[2, 3, 4, 5, 6, 7]" @click="turnPage('reportAppoint')">我的委托</el-button>
      <el-button v-has="[3, 4, 5, 6, 7]" @click="turnPage('reportApprove')">审阅</el-button>
      <el-button v-has="[1]">下载开题报告模版</el-button>
    </div>
    <div class="tableBody">
      <base-subject-table>
        <template #option="{ subjectInfo }">
          <el-button
              v-if="!isStu"
              size="small"
              type="primary"
              @click="showComment(subjectInfo.subject_id)"
          >
            填写评语
          </el-button>
          <el-button
              v-if="!isStu"
              size="small"
              type="primary"
          >
            下载
          </el-button>
          <el-button
              v-if="isStu"
              size="small"
              type="primary"
          >
            上传pdf文件
          </el-button>
        </template>
      </base-subject-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="subjectList.page_total" @getData="getData" ref="pageRef"/>
    </div>
  </div>
  <el-dialog
      v-model="commentVisible"
      title="填写评语"
      width="50%"
      @open="getCurComment"
      style="border-radius: 15px"
  >
    <div
        style="display: flex; flex-direction: column; justify-content: center"
    >
      <div style="display: flex">
        <el-input
            v-model="formData.advice"
        />
        <el-button style="margin-left: 10px">
          提交修改意见
        </el-button>
      </div>
      <div style="margin-top: 10px">
        <el-input
            v-model="formData.comment"
            :rows="5"
            type="textarea"
        />
      </div>
    </div>
    <template v-if="!isStu" #footer>
      <span>
        <el-button @click="submitComment">提交评语</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import YearSelect from "@/components/yearSelect.vue";
import BaseSubjectTable from "@/components/baseSubjectTable.vue";
import MyPagination from "@/components/myPagination.vue";
import {computed, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {pageBody} from "@/store/modules/baseInfo.ts";
import {useRouter} from "vue-router";
import {getReportComment, postReportComment, reportComment} from "@/service/subject/report.ts";
import {ElMessage} from "element-plus";

const store = useStore();
const router = useRouter();
let year = ref<number>(new Date().getFullYear());
let commentVisible = ref<boolean>(false)
let curSubjectId = ref<number>(0)
let pageRef = ref();
let formData = reactive({
  advice: '',
  comment: ''
})

let subjectList = computed(() => {
  return store.state.subject.selfSubject;
});

let isStu = store.getters["user/isStu"]

watch(year, () => {
  pageRef.value.reset();
  pageRef.value.comGetData();
});

const getCurComment = async () => {
  let res = await getReportComment(curSubjectId.value)
  console.log(res)
  if (res.status_code === 10000) {
    console.log(res.data)
  } else {
    ElMessage.error(res.status_msg)
  }
}

const showComment = (subject_id: number) => {
  curSubjectId.value = subject_id
  commentVisible.value = true
};

const submitComment = async () => {
  let data: reportComment = {
    subject_id: curSubjectId.value,
    teacher_comment: formData.comment
  }
  let res = await postReportComment(data)
  if (res.status_code === 10000) {
    ElMessage.success(res.status_msg)
  } else {
    ElMessage.error(res.status_msg)
  }
}

const getData = (pageParams: pageBody) => {
  const params = JSON.parse(JSON.stringify(pageParams));
  params.year = year.value;
  store.dispatch("subject/getSelfSubjectAction", params);
};

const turnPage = (name: string) => {
  router.push({name});
};
</script>

<style scoped lang="less"></style>
