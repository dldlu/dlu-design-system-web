// @ts-ignore
import { createStore } from 'vuex';
import user from './modules/user';
import baseInfo from './modules/baseInfo';

export default createStore({
    modules: {
        user,
        baseInfo
    },
});