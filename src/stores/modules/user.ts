interface UserState {
    name: string;
    age: number;
}

export default {
    namespaced: true,
    state(): UserState {
        return {
            name: '',
            age: 0,
        };
    },
    mutations: {
        setName(state: UserState, name: string) {
            state.name = name;
        },
        setAge(state: UserState, age: number) {
            state.age = age;
        },
    },
    actions: {
        async setName({ commit }: { commit: any }, name: string) {
            commit('setName', name);
        },
        async setAge({ commit }: { commit: any }, age: number) {
            commit('setAge', age);
        },
    },
};