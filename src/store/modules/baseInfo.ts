import { getRoleList, roleRes } from "@/service/user/userRole.ts";
import { userDesc } from "@/service/user/userInfo.ts";
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
  users: userDesc[];
  managers: userDesc[];
  roles: roleRes[];
  schools: pageData<schoolRequest>;
  classes: pageData<classRequest>;
  logs: pageData<log>;
}

interface pageBody {
  size: number;
  num: number;
}

export default {
  namespaced: true,
  state(): BaseInfoState {
    return {
      colleges: {} as pageData<collegeRequest>,
      majors: {} as pageData<majorRequest>,
      users: [
        {
          id: 56,
          number: "21391006",
          name: "张芸搏",
          phone: "18185565868",
          email: "t.wdnbl@qq.com",
          college_id: 41,
          college_name: "万动下张候",
          major_id: 17,
          major_name: "称安就生什",
          class_id: 54,
          class_name: "软件211",
          is_stu: 86,
          role_id: 1,
          is_delete: 0,
        },
        {
          id: 56,
          number: "21391021",
          name: "梁亮",
          phone: "18185565868",
          email: "t.wdnbl@qq.com",
          college_id: 41,
          college_name: "万动下张候",
          major_id: 17,
          major_name: "称安就生什",
          class_id: 54,
          class_name: "软件211",
          is_stu: 86,
          role_id: 7,
          is_delete: 1,
        },
        {
          id: 56,
          number: "21391006",
          name: "张芸搏",
          phone: "18185565868",
          email: "t.wdnbl@qq.com",
          college_id: 41,
          college_name: "万动下张候",
          major_id: 17,
          major_name: "称安就生什",
          class_id: 54,
          class_name: "软件211",
          is_stu: 86,
          role_id: 1,
          is_delete: 0,
        },
        {
          id: 56,
          number: "21391021",
          name: "梁亮",
          phone: "18185565868",
          email: "t.wdnbl@qq.com",
          college_id: 41,
          college_name: "万动下张候",
          major_id: 17,
          major_name: "称安就生什",
          class_id: 54,
          class_name: "软件211",
          is_stu: 86,
          role_id: 7,
          is_delete: 1,
        },
        {
          id: 56,
          number: "21391006",
          name: "张芸搏",
          phone: "18185565868",
          email: "t.wdnbl@qq.com",
          college_id: 41,
          college_name: "万动下张候",
          major_id: 17,
          major_name: "称安就生什",
          class_id: 54,
          class_name: "软件211",
          is_stu: 86,
          role_id: 1,
          is_delete: 0,
        },
        {
          id: 56,
          number: "21391021",
          name: "梁亮",
          phone: "18185565868",
          email: "t.wdnbl@qq.com",
          college_id: 41,
          college_name: "万动下张候",
          major_id: 17,
          major_name: "称安就生什",
          class_id: 54,
          class_name: "软件211",
          is_stu: 86,
          role_id: 7,
          is_delete: 1,
        },
        {
          id: 56,
          number: "21391006",
          name: "张芸搏",
          phone: "18185565868",
          email: "t.wdnbl@qq.com",
          college_id: 41,
          college_name: "万动下张候",
          major_id: 17,
          major_name: "称安就生什",
          class_id: 54,
          class_name: "软件211",
          is_stu: 86,
          role_id: 1,
          is_delete: 0,
        },
        {
          id: 56,
          number: "21391021",
          name: "梁亮",
          phone: "18185565868",
          email: "t.wdnbl@qq.com",
          college_id: 41,
          college_name: "万动下张候",
          major_id: 17,
          major_name: "称安就生什",
          class_id: 54,
          class_name: "软件211",
          is_stu: 86,
          role_id: 7,
          is_delete: 1,
        },
        {
          id: 56,
          number: "21391006",
          name: "张芸搏",
          phone: "18185565868",
          email: "t.wdnbl@qq.com",
          college_id: 41,
          college_name: "万动下张候",
          major_id: 17,
          major_name: "称安就生什",
          class_id: 54,
          class_name: "软件211",
          is_stu: 86,
          role_id: 1,
          is_delete: 0,
        },
        {
          id: 56,
          number: "21391021",
          name: "梁亮",
          phone: "18185565868",
          email: "t.wdnbl@qq.com",
          college_id: 41,
          college_name: "万动下张候",
          major_id: 17,
          major_name: "称安就生什",
          class_id: 54,
          class_name: "软件211",
          is_stu: 86,
          role_id: 7,
          is_delete: 1,
        },
      ],
      managers: [],
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
  },
};
