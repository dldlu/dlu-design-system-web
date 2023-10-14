export const asyncRouterMap = [
  {
    name: "system",
    path: "/system",
    meta: { title: "系统管理", role: 1 },
    component: () => import("@/views/Main/index.vue"),
    redirect: () => {
      return { name: "user" };
    },
    children: [
      {
        name: "user",
        path: "user",
        component: () => import("@/views/Main/System/User/index.vue"),
        meta: { title: "用户管理", role: 1 },
        children: [
          {
            name: "manager",
            path: "manager",
            component: () => import("@/views/Main/System/Manager/index.vue"),
            meta: { title: "管理员名单", role: 1 },
          },
        ],
      },
      {
        name: "role",
        path: "role",
        component: () => import("@/views/Main/System/Role/index.vue"),
        meta: { title: "角色管理", role: 2 },
      },
      {
        name: "school",
        path: "school",
        component: () => import("@/views/Main/System/School/index.vue"),
        meta: { title: "学校管理", role: 2 },
      },
      {
        name: "college",
        path: "college",
        component: () => import("@/views/Main/System/College/index.vue"),
        meta: { title: "学院管理", role: 2 },
      },
      {
        name: "major",
        path: "major",
        component: () => import("@/views/Main/System/Major/index.vue"),
        meta: { title: "专业管理", role: 2 },
      },
      {
        name: "class",
        path: "class",
        component: () => import("@/views/Main/System/Class/index.vue"),
        meta: { title: "班级管理", role: 2 },
      },
      {
        name: "log",
        path: "log",
        component: () => import("@/views/Main/System/Log/index.vue"),
        meta: { title: "日志管理", role: 2 },
      },
    ],
  },
  {
    name: "paper",
    path: "/paper",
    meta: { title: "论文管理", role: 1 },
    component: () => import("@/views/Main/index.vue"),
    redirect: () => {
      return { name: "approval" };
    },
    children: [
      {
        name: "approval",
        path: "approval",
        component: () => import("@/views/Main/Paper/Approval/index.vue"),
        meta: { title: "题目审批表", role: 1 },
        children: [
          {
            name: "approve",
            path: "approve",
            component: () => import("@/views/Main/Paper/Approval/approve.vue"),
            meta: { title: "题目审批表审批", role: 1 },
          },
          {
            name: "appointManage",
            path: "appointManage",
            component: () => import("@/views/Main/Paper/Approval/approve.vue"),
            meta: { title: "委托设置", role: 1 },
          },
          {
            name: "myAppoint",
            path: "myAppoint",
            component: () => import("@/views/Main/Paper/Approval/approve.vue"),
            meta: { title: "我的委托", role: 1 },
          },
        ],
      },
      {
        name: "select",
        path: "select",
        component: () => import("@/views/Main/Paper/Select/index.vue"),
        meta: { title: "选题管理", role: 1 },
        children: [
          {
            name: "selectApprove",
            path: "selectApprove",
            component: () => import("@/views/Main/Paper/Select/selectApprove.vue"),
            meta: { title: "选题审批", role: 3 },
          },
        ],
      },
      {
        name: "plan",
        path: "plan",
        component: () => import("@/views/Main/Paper/Plan/index.vue"),
        meta: { title: "计划管理", role: 1 },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];
