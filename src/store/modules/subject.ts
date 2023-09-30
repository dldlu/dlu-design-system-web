import { getSelfSubject, subjectBody, subjectInfo } from "@/service/subject/self.ts";
import { pageData } from "@/service/type.ts";
import { approveListRequest, postApprovelist } from "@/service/subject/approve.ts";
import { getSelfAppoint } from "@/service/subject/appoint.ts";

interface SubjectState {
  selfSubject: pageData<subjectInfo>;
  approveList: pageData<subjectInfo>;
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
    };
  },
  mutations: {
    setSelfSubject(state: SubjectState, payload: any) {
      state.selfSubject = payload.selfSubject;
    },
    setApproveList(state: SubjectState, payload: any) {
      state.approveList = payload.approveList;
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
  },
};
