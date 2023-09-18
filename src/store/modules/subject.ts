import { getSelfSubject, subjectBody, subjectInfo } from "@/service/subject/self.ts";
import { pageData } from "@/service/type.ts";

interface SubjectState {
  selfSubject: pageData<subjectInfo>;
}

export default {
  namespaced: true,
  state(): SubjectState {
    return {
      selfSubject: {} as pageData<subjectInfo>,
    };
  },
  mutations: {
    setSelfSubject(state: SubjectState, payload: any) {
      state.selfSubject = payload.selfSubject;
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
  },
};
