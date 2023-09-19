<template>
  <el-select
    :model-value="props.grade"
    @change="
      (val) => {
        $emit('update:grade', val);
      }
    "
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
  const year = now.getFullYear();
  emit("update:grade", year);
  let i = 0;
  while (year - i !== 2018) {
    grades.push({
      value: year - i,
    });
    i++;
  }
};
onMounted(() => {
  getGrades();
});
</script>

<style scoped lang="less"></style>
