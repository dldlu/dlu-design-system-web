<template>
  <div class="table">
    <div class="tableHeader">
      <el-select v-model="managerType">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="tableBody">
      <el-table :data="managers.array" stripe style="margin-top: 20px">
        <el-table-column prop="id" label="序号" min-width="90" />
        <el-table-column prop="number" label="工号" min-width="120" />
        <el-table-column prop="name" label="姓名" min-width="90" />
        <el-table-column prop="major_name" label="专业" min-width="150" />
        <el-table-column prop="phone" label="电话" min-width="150" />
        <el-table-column prop="email" label="邮箱" min-width="150" />
        <el-table-column label="权限" min-width="150">
          <template #default="scope">
            <div>
              <el-checkbox
                v-model="managers.array[scope.$index].is_delete"
                :true-label="0"
                :false-label="1"
                size="small"
                :label="options[managerType - 3].label"
                @change="cancel(managers.array[scope.$index].id, scope.$index)"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tableFooter">
      <my-pagination :page_total="managers.page_total" @getData="getData" ref="pageRef" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { cancelRole } from "@/service/user/userManage.ts";
import { ElMessage } from "element-plus";
import MyPagination from "@/components/myPagination.vue";
import { pageBody } from "@/store/modules/baseInfo.ts";

const store = useStore();
let pageRef = ref();
let managerType = ref<number>(3);
let managers = computed(() => {
  return store.state.baseInfo.managers;
});
const options = [
  {
    value: 3,
    label: "专业负责人",
  },
  {
    value: 4,
    label: "学院负责人",
  },
  {
    value: 5,
    label: "学校负责人",
  },
];
watch(managerType, () => {
  pageRef.value.reset();
  pageRef.value.comGetData();
});
const cancel = async (id: number, index: number) => {
  let res = await cancelRole(id);
  console.log(res);
  if (res.status_code === 10000) {
    ElMessage.success(res.status_msg);
    pageRef.value.comGetData();
  } else {
    ElMessage.error(res.status_msg);
    store.state.baseInfo.managers.array[index].is_delete =
      store.state.baseInfo.managers.array[index].is_delete === 0 ? 1 : 0;
  }
};
const getData = (pageParams: pageBody) => {
  const params = JSON.parse(JSON.stringify(pageParams));
  params.roleId = managerType.value;
  store.dispatch("baseInfo/getManagers", params);
};
</script>
<style lang="less" scoped></style>
