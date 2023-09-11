import { getSelfSubject, subjectInfo } from "@/service/subject/self.ts";

interface SubjectState {
  selfSubject: subjectInfo[];
}

export default {
  namespaced: true,
  state(): SubjectState {
    return {
      selfSubject: [],
    };
  },
  mutations: {
    setSelfSubject(state: SubjectState, payload: any) {
      state.selfSubject = payload.selfSubject;
    },
  },
  actions: {
    async getSelfSubjectAction({ commit }: any, data: number) {
      try {
        let result = await getSelfSubject(data);
        console.log(result);
        commit("setSelfSubject", { selfSubject: result.data });
        return result;
      } catch (error: any) {
        return error.response.data;
      }
    },
  },
};
