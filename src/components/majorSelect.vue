<template>
  <el-select
    :model-value="props.major_id"
    @change="
      (val) => {
        $emit('update:major_id', val);
      }
    "
  >
    <el-option
      v-for="item in data.majors.array"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { getMajors, getMajorsCollege } from "@/service/info/major.ts";
import { ElMessage } from "element-plus";
interface Props {
  major_id: number;
  college_id?: number;
  update: boolean;
}
const store = useStore();
const emit = defineEmits(["update:major_id"]);
let props = withDefaults(defineProps<Props>(), {
  college_id: 0,
  update: true,
});
let data = reactive({
  majors: {},
});
watch(
  () => props.college_id,
  async () => {
    await getMajorSelect();
    if (props.update) {
      emit("update:major_id", data.majors.array[0] ? data.majors.array[0].id : null);
    }
  },
);
const getMajorSelect = async () => {
  let result;
  if (props.college_id) {
    result = await getMajorsCollege(props.college_id, 0, 0);
  } else {
    result = await getMajors(0, 0);
  }
  if (result.status_code === 10000) {
    data.majors = result.data;
  } else {
    ElMessage.error(result.status_msg);
  }
};

onMounted(() => {
  getMajorSelect();
});
</script>

<style scoped lang="less"></style>
