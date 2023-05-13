<template>
    <el-menu default-active="1">
        <el-sub-menu index="1">
            <template #title>
                <img src="../assets/md-room@1x.png">
                <span class="font" style="margin-left: 20px;">系统管理</span>
            </template>
            <el-menu-item index="1-1">用户管理</el-menu-item>
            <el-menu-item index="1-2">角色管理</el-menu-item>
            <el-menu-item index="1-3">学校管理</el-menu-item>
            <el-menu-item index="1-4">学院管理</el-menu-item>
            <el-menu-item index="1-5">专业管理</el-menu-item>
            <el-menu-item index="1-6">班级管理</el-menu-item>
            <el-menu-item index="1-7">日志管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <img src="../assets/md-room@1x.png">
                <span class="font" style="margin-left: 20px;">通知管理</span>
            </template>
            <el-menu-item index="1-1">消息管理</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>

</script>
<style lang="less" scoped>
.font {
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
}
</style>