<template>
  <div class="main">
    <div class="board">
      <div class="left">
        <div class="title">登录</div>
        <el-form class="loginForm">
          <div class="loginFormItem">
            <div class="label">账号</div>
            <el-form-item>
              <el-input v-model="form.number" placeholder="请输入账号" class="loginInput"/>
            </el-form-item>
          </div>
          <div class="loginFormItem">
            <div class="label">密码</div>
            <el-form-item>
              <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password class="loginInput"/>
            </el-form-item>
          </div>

        </el-form>
        <div>
          <button class="loginBtn" @click="Login">登录</button>
        </div>

      </div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store'
import { ElMessage } from 'element-plus'

const router=useRouter()

let form = reactive({
  number: '',
  password: ''
})

const Login = async () => {
  const {number ,password}=form
  const res = await store.dispatch('user/userLogin', { number, password })
  if (res.status_code===10000) {
    ElMessage.success(res.status_msg)
    router.push('/system')
  } else {
    ElMessage.error(res.status_msg)
  }
}

</script>
<style lang="less" scoped>
.main {
  background: linear-gradient(180deg, rgba(56, 148, 255, 0.3) 37%, rgba(255, 255, 255, 0) 100%);
  height: 100%;
  position: relative;
}

.board {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 66%;
  height: 75%;
  min-height: 500px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(16, 16, 16, 1);
  display: flex;
  flex-direction: row;
}

.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.right {
  flex: 1;
  background-image: url(@/assets/dlu.png);
  background-size: 100% 100%;

}

.title {
  height: 100px;
  color: rgba(16, 16, 16, 1);
  font-size: 30px;
  font-family: SourceHanSansSC-regular;

}

.loginForm {
  width: 332px;
  height: 150px;
}

/deep/.el-form-item{
  margin: 0;
}
.label{
  width: 70px;
}
.loginFormItem {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;

}

.loginInput{
  width: 260px;
}
.loginBtn {
  width: 332px;
  height: 40px;
  border-radius: 3px;
  background-color: rgba(56, 148, 255, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(56, 148, 255, 1);
  cursor: pointer;
}
</style>