export const constantRouterMap = [
  {
    name: "login",
    path: "/login",
    component: () => import("../views/Login/index.vue"),
    meta: { title: "登录" },
  },
];
