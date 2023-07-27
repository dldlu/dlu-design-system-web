import { asyncRouterMap, constantRouterMap } from "@/router";
import { checkRole, LoginBody, stuLogin, tchLogin } from "@/service/user/login.ts";
import { queryUserByNumber, userDesc } from "@/service/user/userInfo.ts";

interface UserState {
  token: string | null;
  userDesc: userDesc;
  routers: any[];
  addRouters: any[];
}

function hasPermission(roleId: any, route: any) {
  if (route.meta && route.meta.role) {
    return roleId >= route.meta.role;
  } else {
    return true;
  }
}

function filterRouter(role: any, routers: any) {
  return routers.filter((v: any) => {
    if (hasPermission(role, v)) {
      if (v.children && v.children.length > 0) {
        v.children = filterRouter(role, v.children);
        return v;
      } else {
        return v;
      }
    } else {
      return false;
    }
  });
}

export default {
  namespaced: true,
  state(): UserState {
    return {
      token: localStorage.getItem("TOKEN"),
      userDesc: {
        id: 0,
        number: "",
        name: "",
        phone: "",
        email: "",
        college_id: 0,
        college_name: "",
        major_id: 0,
        major_name: "",
        class_id: 0,
        class_name: "",
        is_stu: 0,
        role_id: 0,
        is_delete: 0,
      },
      routers: constantRouterMap,
      addRouters: [],
    };
  },
  mutations: {
    setIsStu(state: UserState, payload: any) {
      state.userDesc.is_stu = payload.isStudent;
    },
    setNumber(state: UserState, payload: any) {
      state.userDesc.number = payload.number;
    },
    setUserDesc(state: UserState, payload: userDesc) {
      state.userDesc = payload;
    },
    setRouters(state: UserState, payload: any) {
      state.addRouters = payload.addRouters;
      state.routers = payload.routers;
    },
  },
  actions: {
    async userLogin({}: any, data: LoginBody) {
      try {
        let result = await checkRole(data.number);
        if (result.data.isStudent) {
          //学生登录
          let res;
          res = await stuLogin(data);
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("IsStu", "1");
          localStorage.setItem("Number", data.number);
          return res;
        } else {
          //老师登录
          let res;
          res = await tchLogin(data);
          console.log(res.data.token);
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("IsStu", "2");
          localStorage.setItem("Number", data.number);
          return res;
        }
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getUserDesc({ commit }: any) {
      const number = localStorage.getItem("Number");
      const is_stu = localStorage.getItem("IsStu");
      try {
        let result = await queryUserByNumber(number as string, is_stu as string);
        commit("setUserDesc", result.data);
        return result;
      } catch (error: any) {
        localStorage.removeItem("TOKEN");
        return error.response.data;
      }
    },
    GenerateRoutes({ commit }: any, role: number) {
      return new Promise<void>((resolve) => {
        const accessedRouters = filterRouter(role, asyncRouterMap);
        // @ts-ignore
        const addRouters = accessedRouters;
        // @ts-ignore
        const routers = constantRouterMap.concat(accessedRouters);
        commit("setRouters", { addRouters, routers });
        resolve();
      });
    },
  },
};
