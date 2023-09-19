import { getSelfSubject, subjectBody, subjectInfo } from "@/service/subject/self.ts";
import { pageData } from "@/service/type.ts";
import { approveListRequest, postApprovelist } from "@/service/subject/approve.ts";

interface SubjectState {
  selfSubject: pageData<subjectInfo>;
  approveList: pageData<subjectInfo>;
}

export default {
  namespaced: true,
  state(): SubjectState {
    return {
      selfSubject: {} as pageData<subjectInfo>,
      approveList: {} as pageData<subjectInfo>,
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
        commit("setSelfSubject", { selfSubject: result.data });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
    async getApproveListAction({ commit }: any, data: approveListRequest) {
      try {
        let result = await postApprovelist(data);
        commit("setApproveList", { approveList: result.data });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
  },
};
