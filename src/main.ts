import { createApp } from "vue";
import "./global.less";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import { has } from "@/utils/permission.ts";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
app.directive("has", {
  mounted(el, binding) {
    // 获取按钮权限
    const btnPermissionsArr = binding.value;
    if (!has(btnPermissionsArr)) {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  },
});
