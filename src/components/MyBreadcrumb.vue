<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in routers" :key="item.path">
            {{ item?.meta?.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { computed } from "vue";
const router = useRouter()
const routers = computed(() => {
    return router.currentRoute.value.matched.filter(item=>item.meta.title)
})


</script>

<style lang="less" scoped></style>