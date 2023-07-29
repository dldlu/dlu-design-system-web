<template>
  <el-select
    :model-value="college_id"
    @change="
      (val) => {
        $emit('update:college_id', val);
      }
    "
  >
    <el-option v-for="item in colleges.array" :key="item.id" :label="item.name" :value="item.id" />
  </el-select>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
interface Props {
  college_id: number;
}
const store = useStore();
let { college_id } = defineProps<Props>();
let colleges = computed(() => {
  return store.state.baseInfo.colleges;
});
onMounted(() => {
  store.dispatch("baseInfo/getColleges", { size: 0, num: 0 });
});
</script>

<style scoped lang="less"></style>
