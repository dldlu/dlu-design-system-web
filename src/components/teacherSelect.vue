<template>
  <el-select
    :model-value="props.teacher_id"
    @change="
      (val) => {
        $emit('update:teacher_id', val);
      }
    "
  >
    <el-option
      v-for="item in data.teachers.array"
      :key="item.id"
      :label="item.name"
      :value="item.number"
    />
  </el-select>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { queryUserbyMajor } from "@/service/user/userInfo.ts";
interface Props {
  teacher_id: number;
  major_id: number;
  update: boolean;
}
const store = useStore();
const emit = defineEmits(["update:teacher_id"]);
let props = withDefaults(defineProps<Props>(), {
  teacher_id: 0,
  major_id: 4205,
  update: true,
});
let data = reactive({
  teachers: {},
});
watch(
  () => props.major_id,
  async () => {
    await getTeacherSelect();
    if (props.update) {
      emit("update:teacher_id", data.teachers.array ? data.teachers.array[0].number : "");
    }
  },
);
const getTeacherSelect = async () => {
  let result;
  result = await queryUserbyMajor(props.major_id, 2, 0, 0);
  if (result.status_code === 10000) {
    data.teachers = result.data;
  } else {
    ElMessage.error(result.status_msg);
  }
};

onMounted(() => {
  getTeacherSelect();
});
</script>

<style scoped lang="less"></style>
