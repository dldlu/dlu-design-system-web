<template>
  <div class="header">
    <div class="font title">网站首页</div>
    <div class="font user">
      <el-dropdown>
        <span style="outline: none !important;">
          你好,<span class="name">{{ userName }}</span>{{ type }}      
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
const userName = '邱少明'
const type = '老师'

</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 72px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px 0px #D7D6D6;
  display: flex;
  justify-content: end;
  align-items: center;
  z-index: 100;
}

.font {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}
.title{
  margin-right: 32px;
  cursor: pointer;
}
.user{
  margin-right: 25px;
}
.name{
  color: #B7E0F7;
}
</style>