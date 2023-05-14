import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import { useStore } from "vuex"

export const constantRouterMap = [
  {
    name: "login",
    path: '/login',
    component: () => import('../views/Login/index.vue'),
    meta: { title: '登录' }
  }
]

export const asyncRouterMap = [
  {
    name: "system",
    path: '/system',
    meta: { title: '系统管理', role: 1 },
    component: () => import('@/views/Main/index.vue'),
    redirect: () => {
      return { name: 'user' }
    },
    children: [
      {
        name: 'user',
        path: 'user',
        component: () => import('@/views/Main/System/User/index.vue'),
        meta: { title: '用户管理', role: 1 },
      },
      {
        name: 'manager',
        path: 'manager',
        component: () => import('@/views/Main/System/Manager/index.vue'),
        meta: { title: '管理员名单', role: 1 },
      },
      {
        name: 'role',
        path: 'role',
        component: () => import('@/views/Main/System/Role/index.vue'),
        meta: { title: '角色管理', role: 1 },
      },
      {
        name: 'school',
        path: 'school',
        component: () => import('@/views/Main/System/School/index.vue'),
        meta: { title: '学校管理', role: 1 },
      },
      {
        name: 'college',
        path: 'college',
        component: () => import('@/views/Main/System/College/index.vue'),
        meta: { title: '学院管理', role: 1 },
      },
      {
        name: 'major',
        path: 'major',
        component: () => import('@/views/Main/System/Role/index.vue'),
        meta: { title: '专业管理', role: 1 },
      },
      {
        name: 'class',
        path: 'class',
        component: () => import('@/views/Main/System/Class/index.vue'),
        meta: { title: '班级管理', role: 1 },
      },
      {
        name: 'log',
        path: 'log',
        component: () => import('@/views/Main/System/Log/index.vue'),
        meta: { title: '日志管理', role: 1 },
      },
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap
})

router.beforeEach(async (to, _, next) => {
  const store = useStore()
  let hasToken = store.state.user.token
  let hasInfo = store.state.user.userDesc.number !== ''
  if (hasToken) {
    if (hasInfo) {
      next()
    } else {
      let result = await store.dispatch('user/getUserDesc')
      if (result.status_code === 10000) {
        await store.dispatch('user/GenerateRoutes', store.state.user.userDesc.role_id)
        store.state.user.addRouters.forEach((x: any) => {
          router.addRoute(x)
        }) // 动态添加可访问路由表
        next({ ...to, replace: true })
      } else {
        if (to.name === 'login') {
          next()
        } else {
          alert('身份已过期')
          await router.push('/login')

        }
      }
    }
  } else {
    if (to.name === 'login') {
      next()
    } else {
      alert('请先登录')
      await router.push('/login')
    }
  }


})

router.afterEach((to) => {
  document.title = to.meta.title as string || '大连大学毕设系统'
})

export default router