import { getRoleList, roleRes } from "@/service/user/userRole.ts";
import { userDesc } from "@/service/user/userInfo.ts";
import { getSchools } from "@/service/info/school.ts";
import { schoolRequest } from "@/service/info/school.ts";
import { getColleges, collegeRequest } from "@/service/info/college.ts";

interface infoObj<T> {
  array: T[];
  item_total: number;
  page_total: number;
}
interface BaseInfoState {
  colleges: infoObj<collegeRequest>;
  majors: any[];
  users: userDesc[];
  managers: any[];
  roles: roleRes[];
  schools: infoObj<schoolRequest>;
  classes: any[];
  logs: any[];
}

interface pageBody {
  size: number;
  num: number;
}

export default {
  namespaced: true,
  state(): BaseInfoState {
    return {
      colleges: {} as infoObj<collegeRequest>,
      majors: [],
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
      schools: {} as infoObj<schoolRequest>,
      classes: [],
      logs: [],
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
  },
};
