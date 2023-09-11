// @ts-ignore
import { createStore } from "vuex";
import user from "./modules/user";
import baseInfo from "./modules/baseInfo";
import subject from "@/store/modules/subject.ts";

export default createStore({
  modules: {
    user,
    baseInfo,
    subject,
  },
});
