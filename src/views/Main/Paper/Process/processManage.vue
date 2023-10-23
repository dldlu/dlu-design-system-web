<template>
  <div class="table">
    <div class="tableHeader">
      <year-select v-has="[2, 3, 4, 5, 6, 7]" v-model:grade="year" class="select100" />
      <el-button v-if="store.state.user.userDesc.role_id !== 1" @click="showSetPoint(0)">
        全部设置检查点
      </el-button>
    </div>
    <div class="tableBody">
      <base-subject-table>
        <template #option="{ subjectInfo }">
          <el-button size="small" type="primary" @click="turnDetail(subjectInfo.subject_id)">
            填写/修改
          </el-button>
          <el-button
            v-if="store.state.user.userDesc.role_id !== 1"
            size="small"
            type="primary"
            @click="showSetPoint(subjectInfo.subject_id)"
          >
            检查点设置
          </el-button>
        </template>
      </base-subject-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="subjectList.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
  <el-dialog
    v-model="setPointVisible"
    title="检查点设置"
    width="50%"
    style="border-radius: 15px"
    align-center
  >
    <div style="display: flex; flex-wrap: wrap">
      <el-checkbox v-for="(_, index) in points" v-model="points[index]">
        第{{ index + 1 }}周
      </el-checkbox>
    </div>
    <template #footer>
      <span>
        <el-button @click="submitAdjust">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import YearSelect from "@/components/yearSelect.vue";
import BaseSubjectTable from "@/components/baseSubjectTable.vue";
import MyPagination from "@/components/myPagination.vue";
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { pageBody } from "@/store/modules/baseInfo.ts";
import { useRouter } from "vue-router";
import { bus } from "@/utils/bus.ts";
import { getProcessDetail, postProcessPoint, processPoint } from "@/service/subject/process.ts";
import { ElMessage } from "element-plus";

const store = useStore();
const router = useRouter();
let year = ref<number>(new Date().getFullYear());
let curSubjectId = ref<number>(0);
let setPointVisible = ref<boolean>(false);
let points = reactive([
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]);
let pageRef = ref();
let subjectList = computed(() => {
  return store.state.subject.selfSubject;
});

watch(year, () => {
  pageRef.value.reset();
  pageRef.value.comGetData();
});

const showSetPoint = async (id: number) => {
  curSubjectId.value = id;
  points.forEach((_, index) => {
    points[index] = false;
  });
  setPointVisible.value = true;
  if (id) {
    let res = await getProcessDetail(id);
    if (res.status_code === 10000) {
      res.data &&
        res.data.forEach((item) => {
          points[item.week - 1] = true;
        });
    } else {
      ElMessage.error(res.status_msg);
    }
  }
};

const getData = (pageParams: pageBody) => {
  const params = JSON.parse(JSON.stringify(pageParams));
  params.year = year.value;
  store.dispatch("subject/getSelfSubjectAction", params);
};

const submitAdjust = async () => {
  let data: processPoint;
  if (curSubjectId.value) {
    data = {
      subject_id: [curSubjectId.value],
      week: [],
    };
  } else {
    data = {
      subject_id: [],
      week: [],
    };
    store.state.subject.selfSubject.array.forEach((item: any) => {
      data.subject_id.push(item.subject_id);
    });
  }
  points.forEach((item, index) => {
    if (item) {
      data.week.push(index + 1);
    }
  });
  if (data.week.length >= 4) {
    let res = await postProcessPoint(data);
    if (res.status_code === 10000) {
      ElMessage.success(res.status_msg);
    } else {
      ElMessage.error(res.status_msg);
    }
  } else {
    ElMessage.error("检查点不得少于4个");
  }
};

const turnDetail = (id: number) => {
  router.push(`/paper/process/processDetail/${id}`);
};

onMounted(() => {
  bus.on("getMiddleData", () => {
    pageRef.value.comGetData();
  });
});
onBeforeUnmount(() => {
  bus.off("getMiddleData");
});
</script>

<style scoped lang="less"></style>
