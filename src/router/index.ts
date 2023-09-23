import { createRouter, createWebHistory } from "vue-router";
// @ts-ignore
import { useStore } from "vuex";
import { constantRouterMap } from "@/router/constantRouterMap.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap,
});

router.beforeEach(async (to, _, next) => {
  const store = useStore();
  let hasToken = store.state.user.token || localStorage.getItem("TOKEN");
  let hasInfo = Object.keys(store.state.user.userDesc).length !== 0;
  if (hasToken) {
    if (hasInfo) {
      next();
    } else {
      let result = await store.dispatch("user/getUserDesc");
      if (result.status_code === 10000) {
        await store.dispatch("user/GenerateRoutes", store.state.user.userDesc.role_id);
        await store.state.user.addRouters.forEach((x: any) => {
          router.addRoute(x);
        }); // 动态添加可访问路由表
        next({ ...to, replace: true });
      } else {
        if (to.name === "login") {
          next();
        } else {
          alert("身份已过期");
          await router.push("/login");
        }
      }
    }
  } else {
    if (to.name === "login") {
      next();
    } else {
      alert("请先登录");
      await router.push("/login");
    }
  }
});

router.afterEach((to) => {
  document.title = (to.meta.title as string) || "大连大学毕设系统";
});

export default router;
