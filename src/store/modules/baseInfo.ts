import { getRoleList, roleRes } from "@/service/user/userRole.ts";
import { queryUserbyMajor, queryUserByNumber, userDesc } from "@/service/user/userInfo.ts";
import { getSchools } from "@/service/info/school.ts";
import { schoolRequest } from "@/service/info/school.ts";
import { getColleges, collegeRequest } from "@/service/info/college.ts";
import { getMajors, getMajorsCollege, majorRequest } from "@/service/info/major.ts";
import { classRequest, getClasses } from "@/service/info/class.ts";
import { pageData } from "@/service/type.ts";
import { getLog, log } from "@/service/log/log.ts";
import { getManagersByRole } from "@/service/user/userManage.ts";

interface BaseInfoState {
  colleges: pageData<collegeRequest>;
  majors: pageData<majorRequest>;
  users: pageData<userDesc>;
  managers: pageData<userDesc>;
  roles: roleRes[];
  schools: pageData<schoolRequest>;
  classes: pageData<classRequest>;
  logs: pageData<log>;
}

export interface pageBody {
  size: number;
  num: number;
}

export default {
  namespaced: true,
  state(): BaseInfoState {
    return {
      colleges: {} as pageData<collegeRequest>,
      majors: {} as pageData<majorRequest>,
      users: {} as pageData<userDesc>,
      managers: {} as pageData<userDesc>,
      roles: [],
      schools: {} as pageData<schoolRequest>,
      classes: {} as pageData<classRequest>,
      logs: {} as pageData<log>,
    };
  },
  mutations: {
    setColleges(state: BaseInfoState, payload: any) {
      state.colleges = payload.colleges;
    },
    setMajor(state: BaseInfoState, payload: any) {
      state.majors = payload.majors;
    },
    setUsers(state: BaseInfoState, payload: any) {
      state.users = payload.users;
    },
    setManager(state: BaseInfoState, payload: any) {
      state.managers = payload.managers;
    },
    setRoles(state: BaseInfoState, payload: any) {
      state.roles = payload.roles;
    },
    setSchools(state: BaseInfoState, payload: any) {
      state.schools = payload.schools;
    },
    setClasses(state: BaseInfoState, payload: any) {
      state.classes = payload.classes;
    },
    setLogs(state: BaseInfoState, payload: any) {
      state.logs = payload.logs;
    },
  },
  actions: {
    async getRoles({ commit }: any) {
      try {
        let result = await getRoleList();
        commit("setRoles", { roles: result.data });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getSchools({ commit }: any, data: pageBody) {
      try {
        let result = await getSchools(data.size, data.num);
        commit("setSchools", { schools: result.data });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getColleges({ commit }: any, data: pageBody) {
      try {
        let result = await getColleges(data.size, data.num);
        commit("setColleges", { colleges: result.data });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getAllMajors({ commit }: any, data: pageBody) {
      try {
        let result = await getMajors(data.size, data.num);
        commit("setMajor", { majors: result.data });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getMajorsByCollege({ commit }: any, data: pageBody & { collegeId: number }) {
      try {
        let result = await getMajorsCollege(data.collegeId, data.size, data.num);
        commit("setMajor", { majors: result.data });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getClasses({ commit }: any, data: pageBody & { majorId: number; grade: number }) {
      try {
        let result = await getClasses(data.majorId, data.grade, data.size, data.num);
        commit("setClasses", { classes: result.data });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getLogs({ commit }: any, data: pageBody) {
      try {
        let result = await getLog(data.size, data.num);
        commit("setLogs", { logs: result.data });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getManagers({ commit }: any, data: pageBody & { roleId: number }) {
      try {
        let result = await getManagersByRole(data.roleId, data.size, data.num);
        commit("setManager", { managers: result.data });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getUserByNumber({ commit }: any, data: { number: string; isStu: number }) {
      try {
        let result = await queryUserByNumber(data.number, data.isStu);
        commit("setUsers", {
          users: {
            array: [result.data],
            item_total: 1,
            page_total: 1,
          },
        });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getUserByMajor({ commit }: any, data: pageBody & { majorId: number; isStu: number }) {
      try {
        let result = await queryUserbyMajor(data.majorId, data.isStu, data.size, data.num);
        commit("setUsers", { users: result.data });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
  },
};
