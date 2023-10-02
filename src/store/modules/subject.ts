import { getSelfSubject, subjectBody, subjectInfo } from "@/service/subject/self.ts";
import { pageData } from "@/service/type.ts";
import { approveListRequest, postApprovelist } from "@/service/subject/approve.ts";
import { getSelfAppoint } from "@/service/subject/appoint.ts";
import {
  CertainList,
  getCertainList,
  getUncertainList,
  UncertainList,
} from "@/service/select/adjust.ts";
import { GetStuSelect, getStuSelectList, StuSelectList } from "@/service/select/student.ts";

interface SubjectState {
  selfSubject: pageData<subjectInfo>;
  approveList: pageData<subjectInfo>;
  teacherSelectList: Array<CertainList | UncertainList>;
  studentSelectList: StuSelectList;
}

export default {
  namespaced: true,
  state(): SubjectState {
    return {
      selfSubject: {
        array: [],
        item_total: 0,
        page_total: 0,
      },
      approveList: {
        array: [],
        item_total: 0,
        page_total: 0,
      },
      teacherSelectList: [],
      studentSelectList: {
        item_total: 0,
        page_total: 0,
        array: {
          subjectList: [],
          firstSubjectId: 0,
          secondSubjectId: 0,
        },
      },
    };
  },
  mutations: {
    setSelfSubject(state: SubjectState, payload: any) {
      state.selfSubject = payload.selfSubject;
    },
    setApproveList(state: SubjectState, payload: any) {
      state.approveList = payload.approveList;
    },
    setTeacherSelectList(state: SubjectState, payload: any) {
      state.teacherSelectList = payload.list;
    },
    setStudentSelectList(state: SubjectState, payload: any) {
      state.studentSelectList = payload.list;
    },
  },
  actions: {
    async getSelfSubjectAction({ commit }: any, data: subjectBody) {
      try {
        let result = await getSelfSubject(data);
        if (result.data) {
          commit("setSelfSubject", { selfSubject: result.data });
        }
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getApproveListAction({ commit }: any, data: approveListRequest) {
      try {
        let result = await postApprovelist(data);
        if (result.data) {
          commit("setApproveList", { approveList: result.data });
        }
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getAppointListAction({ commit }: any, data: subjectBody) {
      try {
        let result = await getSelfAppoint(data);
        if (result.data) {
          commit("setApproveList", { approveList: result.data });
        }
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getTeacherSelectList({ commit }: any, year: number) {
      try {
        let result1 = await getUncertainList(year);
        let result2 = await getCertainList(year);
        let list = [...result1.data, ...result2.data];
        commit("setTeacherSelectList", { list });
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getStudentSelectList({ commit }: any, data: GetStuSelect) {
      try {
        let result = await getStuSelectList(data);
        if (result.data) {
          commit("setStudentSelectList", { list: result.data });
        }
      } catch (error: any) {
        return error.response.data;
      }
    },
  },
};
