<template>
  <el-select
    :model-value="props.major_id"
    @change="
      (val) => {
        $emit('update:major_id', val);
      }
    "
  >
    <el-option v-for="item in majors.array" :key="item.id" :label="item.name" :value="item.id" />
  </el-select>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
interface Props {
  major_id: number;
  college_id?: number;
}
const store = useStore();
const emit = defineEmits(["update:major_id"]);
let props = withDefaults(defineProps<Props>(), {
  college_id: 0,
});
let majors = computed(() => {
  return store.state.baseInfo.majors;
});
watch(
  () => props.college_id,
  async () => {
    await store.dispatch("baseInfo/getMajorsByCollege", {
      size: 0,
      num: 0,
      collegeId: props.college_id,
    });
    emit("update:major_id", store.state.baseInfo.majors.array[0].id);
  },
);

onMounted(() => {
  if (props.college_id) {
    store.dispatch("baseInfo/getMajorsByCollege", { size: 0, num: 0, collegeId: props.college_id });
  } else {
    store.dispatch("baseInfo/getAllMajors", { size: 0, num: 0 });
  }
});
</script>

<style scoped lang="less"></style>
