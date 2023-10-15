<template>
  <el-pagination
    v-model:current-page="num"
    layout="prev, pager, next"
    :page-count="props.page_total"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

interface Props {
  size: number;
  num: number;
  page_total: number;
}
const emit = defineEmits(["getData"]);
let props = withDefaults(defineProps<Props>(), {
  size: 10,
  num: 1,
  page_total: 1,
});
let size = ref<number>(props.size);
let num = ref<number>(props.num);
watch([num, size], () => {
  comGetData();
});
const comGetData = () => {
  emit("getData", { size: size.value, num: num.value });
};
const reset = () => {
  size.value = 10;
  num.value = 1;
};
const handleCurrentChange = (val: number) => {
  num.value = val;
};
defineExpose({ comGetData, reset });
onMounted(() => {
  comGetData();
});
</script>

<style scoped lang="less"></style>
