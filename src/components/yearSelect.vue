<template>
  <el-select
    :model-value="props.grade"
    @change="
      (val) => {
        $emit('update:grade', val);
      }
    "
    style="width: 140px; margin-right: 10px"
  >
    <el-option v-for="item in grades" :key="item.value" :label="item.value" :value="item.value" />
  </el-select>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
interface Props {
  grade: number;
}
let props = defineProps<Props>();
const emit = defineEmits(["update:grade"]);
const grades = reactive([]);
let getGrades = () => {
  const now = new Date();
  const year = 2019;
  emit("update:grade", year);
  for (let i = 0; i < 5; i++) {
    grades.push({
      value: year - i,
    });
  }
};
onMounted(() => {
  getGrades();
});
</script>

<style scoped lang="less"></style>
