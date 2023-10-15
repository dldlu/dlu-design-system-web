<template>
  <div class="table">
    <div class="tableHeader">
      <div style="width: 380px; margin-right: 10px">
        <el-date-picker
          v-model="timeRange"
          type="daterange"
          range-separator="To"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @calendar-change="getData({ size: 10, num: 1 })"
          size="default"
        />
      </div>
      <el-select v-model="logParams.stateId" class="select140">
        <el-option
          v-for="item in stateOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="logParams.methodId" style="width: 140px; margin-right: 10px">
        <el-option
          v-for="item in methodOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button @click="clear">清空筛选</el-button>
    </div>
    <div class="tableBody">
      <el-table :data="logs.array" stripe style="margin-top: 20px" max-height="500">
        <el-table-column prop="id" label="序号" min-width="90" />
        <el-table-column prop="operator" label="账号" min-width="100" />
        <el-table-column prop="content" label="日志内容" min-width="100" />
        <el-table-column label="操作类型" min-width="100">
          <template #default="scope">
            <div>
              <el-tag :type="methodOptions[logs.array[scope.$index].method].type" effect="dark">
                {{ methodOptions[logs.array[scope.$index].method].name }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="日志类型" min-width="100">
          <template #default="scope">
            <div>
              <el-tag :type="stateOptions[logs.array[scope.$index].state].type" effect="dark">
                {{ stateOptions[logs.array[scope.$index].state].name }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="operator_ip" label="ip" min-width="100" />
        <el-table-column prop="time" label="时间" min-width="100" />
      </el-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="logs.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { computed, nextTick, reactive, ref, watch } from "vue";
import MyPagination from "@/components/myPagination.vue";

const store = useStore();
let pageRef = ref();
let timeRange = ref([null, null]);
let logParams = reactive({
  stateId: 0,
  methodId: 0,
});
const stateOptions = [
  {
    id: 0,
    name: "全部日志",
  },
  {
    id: 1,
    name: "常规日志",
    type: "",
  },
  {
    id: 2,
    name: "错误日志",
    type: "danger",
  },
];
const methodOptions = [
  {
    id: 0,
    name: "全部类型",
  },
  {
    id: 1,
    name: "新增",
    type: "success",
  },
  {
    id: 2,
    name: "删除",
    type: "danger",
  },
  {
    id: 3,
    name: "修改",
    type: "warning",
  },
  {
    id: 4,
    name: "查询",
    type: "",
  },
];
let logs = computed(() => {
  return store.state.baseInfo.logs;
});
watch(logParams, () => {
  getData({ size: 10, num: 1 });
});
/**
 * @description:获取日志数据
 * @return {*}
 */
const getData = (pageParams) => {
  nextTick(() => {
    const params = JSON.parse(JSON.stringify(pageParams));
    params.stateId = logParams.stateId;
    params.methodId = logParams.methodId;
    params.start = timeRange.value[0];
    params.end = timeRange.value[1];
    console.log(params);
    store.dispatch("baseInfo/getLogs", params);
  });
};
const clear = () => {
  logParams.methodId = 0;
  logParams.stateId = 0;
  timeRange.value = [null, null];
  pageRef.value.reset();
  getData({ size: 10, num: 1 });
};
</script>
<style lang="less" scoped></style>
