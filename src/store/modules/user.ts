import { asyncRouterMap, constantRouterMap } from '@/router';
import { checkRole, queryUserbyNumber, stuLogin, tchLogin } from '@/service/user';
import { LoginBody, userDesc } from '@/service/user';

interface UserState {
  token: string | null
  userDesc: userDesc
  routers: any[]
  addRouters: any[]

}

function hasPermission(roleId: any, route: any) {
  if (route.meta && route.meta.role) {
    return roleId >= route.meta.role
  } else {
    return true
  }
}

export default {
  namespaced: true,
  state(): UserState {
    return {
      token: localStorage.getItem('TOKEN'),
      userDesc: {
        id: 0,
        number: '',
        name: '',
        phone: '',
        email: '',
        college_id: 0,
        college_name: '',
        major_id: 0,
        major_name: '',
        class_id: 0,
        is_stu: 0,
        roleId: 0
      },
      routers: constantRouterMap,
      addRouters: []
    };
  },
  mutations: {
    setIsStu(state: any, payload: any) {
      state.userDesc.is_stu = payload.isStudent
    },
    setNumber(state: any, payload: any) {
      state.userDesc.number = payload.number
    },
    setUserDesc(state: any, payload: any) {
      state.userDesc = payload
    },
    setRouters(state: any, payload: any) {
      state.addRouters = payload.addRouters
      state.routers=payload.routers
    }
  },
  actions: {
    async userLogin(context: any, data: LoginBody) {
      try {
        let result = await checkRole(data.number);
        if (result.data.isStudent === true) {
          //学生登录
          let res
          res = await stuLogin(data)
          localStorage.setItem('TOKEN', res.data.token)
          localStorage.setItem('IsStu', '1')
          context.commit('setNumber', data.number)
          return res
        } else {
          //老师登录
          let res
          res = await tchLogin(data)
          localStorage.setItem('TOKEN', res.data.token)
          localStorage.setItem('IsStu', '0')
          localStorage.setItem('Number', data.number)
          return res
        }
      } catch (error: any) {
        return error.response.data
      }

    },
    async getUserDesc(context: any) {
      const number = localStorage.getItem('Number')
      const is_stu=localStorage.getItem('IsStu')
      try {
        let result = await queryUserbyNumber(number as string, is_stu as string);
        context.commit('setUserDesc',result.data)
        return result
      } catch (error: any) {
        console.log(error);
        return error.response.data
      }

    },
    GenerateRoutes(context:any,role: number) {
      return new Promise<void>((resolve) => {      
        const accessedRouters = asyncRouterMap.filter(v => {
          console.log(hasPermission(role, v));
          if (hasPermission(role, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(role, child)) {
                  return child
                }
                return false;
              });
              return v
            } else {
              return v
            }
          }
          return false;
        });
        // @ts-ignore
        const addRouters = accessedRouters;
        // @ts-ignore
        const routers = constantRouterMap.concat(accessedRouters);
        context.commit('setRouters',{addRouters,routers})
        resolve();
      })
    }
  },
};