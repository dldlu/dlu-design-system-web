<template>
  <div class="header">
    <div class="font title">网站首页</div>
    <div class="font user">
      <el-dropdown>
        <span style="outline: none !important">
          你好,<span class="name">{{ userName }}</span
          >{{ type }}
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const userName = "邱少明";
const type = "老师";
const logOut = () => {
  localStorage.removeItem("TOKEN");
  router.push({ name: "login" });
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  min-width: 1180px;
  height: 72px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 3px 6px 0 #d7d6d6;
  display: flex;
  justify-content: end;
  align-items: center;
  z-index: 100;
  border-radius: 0 0 0 20px;
}

.font {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}
.title {
  margin-right: 32px;
  cursor: pointer;
}
.user {
  margin-right: 25px;
}
.name {
  color: #b7e0f7;
}
</style>
