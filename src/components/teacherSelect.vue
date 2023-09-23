<template>
  <el-select
    v-if="props.type === 1"
    :model-value="props.teacher_number"
    @change="
      (val) => {
        $emit('update:teacher_number', val);
      }
    "
  >
    <el-option
      v-for="item in data.teachers"
      :key="item.id"
      :label="item.name"
      :value="item.number"
    />
  </el-select>
  <el-select
    v-else
    :model-value="props.teacher_id"
    @change="
      (val) => {
        $emit('update:teacher_id', val);
      }
    "
  >
    <el-option v-for="item in data.teachers" :key="item.id" :label="item.name" :value="item.id" />
  </el-select>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { queryUserByCollege, queryUserbyMajor } from "@/service/user/userInfo.ts";
interface Props {
  type: number; //1为拿number 2为拿id
  teacher_number: string;
  teacher_id: number;
  college_id: number;
  major_id: number;
  update: boolean;
}
const store = useStore();
const emit = defineEmits(["update:teacher_number", "update:teacher_id"]);
let props = withDefaults(defineProps<Props>(), {
  type: 1,
  teacher_number: "",
  teacher_id: 0,
  major_id: 4205,
  update: true,
});
let data = reactive({
  teachers: [],
});
watch([() => props.major_id, () => props.college_id], async () => {
  await getTeacherSelect();
  if (props.update) {
    if (props.type === 1) {
      emit("update:teacher_number", "");
    } else {
      emit("update:teacher_id", 0);
    }
  }
});
const getTeacherSelect = async () => {
  let result;
  if (props.college_id) {
    result = await queryUserByCollege(props.college_id, 2, 0, 0);
  } else {
    result = await queryUserbyMajor(props.major_id, 2, 0, 0);
  }
  if (result.status_code === 10000) {
    let teachers = [
      {
        id: null,
        name: "请选择",
        number: null,
      },
    ];
    data.teachers = result.data.array ? teachers.concat(result.data.array) : teachers;
  } else {
    ElMessage.error(result.status_msg);
  }
};

onMounted(() => {
  getTeacherSelect();
});
</script>

<style scoped lang="less"></style>
