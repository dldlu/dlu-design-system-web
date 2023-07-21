interface BaseInfoState{
    colleges: any[]
    majors: any[]
    users: any[]
    managers: any[]
    roles: any[]
    schools: any[]
    classes: any[]
    logs: any[]
}

export default {
    namespaced: true,
    state(): BaseInfoState {
        return {
            colleges: [],
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
                    is_stu: 86,
                    role_id: 1,
                    is_delete:0
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
                    is_stu: 86,
                    role_id: 7,
                    is_delete:1
                },
                {
                    id: 56,
                    number: "42",
                    name: "梁亮",
                    phone: "18185565868",
                    email: "t.wdnbl@qq.com",
                    college_id: 41,
                    college_name: "万动下张候",
                    major_id: 17,
                    major_name: "称安就生什",
                    class_id: 54,
                    is_stu: 86,
                    role_id: 77,
                    is_delete:1
                },
                {
                    id: 56,
                    number: "42",
                    name: "梁亮",
                    phone: "18185565868",
                    email: "t.wdnbl@qq.com",
                    college_id: 41,
                    college_name: "万动下张候",
                    major_id: 17,
                    major_name: "称安就生什",
                    class_id: 54,
                    is_stu: 86,
                    role_id: 77,
                    is_delete:1
                },
                {
                    id: 56,
                    number: "42",
                    name: "梁亮",
                    phone: "18185565868",
                    email: "t.wdnbl@qq.com",
                    college_id: 41,
                    college_name: "万动下张候",
                    major_id: 17,
                    major_name: "称安就生什",
                    class_id: 54,
                    is_stu: 86,
                    role_id: 77,
                    is_delete:1
                },
                {
                    id: 56,
                    number: "42",
                    name: "梁亮",
                    phone: "18185565868",
                    email: "t.wdnbl@qq.com",
                    college_id: 41,
                    college_name: "万动下张候",
                    major_id: 17,
                    major_name: "称安就生什",
                    class_id: 54,
                    is_stu: 86,
                    role_id: 77,
                    is_delete:1
                },
                {
                    id: 56,
                    number: "42",
                    name: "梁亮",
                    phone: "18185565868",
                    email: "t.wdnbl@qq.com",
                    college_id: 41,
                    college_name: "万动下张候",
                    major_id: 17,
                    major_name: "称安就生什",
                    class_id: 54,
                    is_stu: 86,
                    role_id: 77,
                    is_delete:1
                },
                {
                    id: 56,
                    number: "42",
                    name: "梁亮",
                    phone: "18185565868",
                    email: "t.wdnbl@qq.com",
                    college_id: 41,
                    college_name: "万动下张候",
                    major_id: 17,
                    major_name: "称安就生什",
                    class_id: 54,
                    is_stu: 86,
                    role_id: 77,
                    is_delete:1
                },
                {
                    id: 56,
                    number: "42",
                    name: "梁亮",
                    phone: "18185565868",
                    email: "t.wdnbl@qq.com",
                    college_id: 41,
                    college_name: "万动下张候",
                    major_id: 17,
                    major_name: "称安就生什",
                    class_id: 54,
                    is_stu: 86,
                    role_id: 77,
                    is_delete:1
                },
                {
                    id: 56,
                    number: "42",
                    name: "梁亮",
                    phone: "18185565868",
                    email: "t.wdnbl@qq.com",
                    college_id: 41,
                    college_name: "万动下张候",
                    major_id: 17,
                    major_name: "称安就生什",
                    class_id: 54,
                    is_stu: 86,
                    role_id: 77,
                    is_delete:1
                },
                {
                    id: 56,
                    number: "42",
                    name: "梁亮",
                    phone: "18185565868",
                    email: "t.wdnbl@qq.com",
                    college_id: 41,
                    college_name: "万动下张候",
                    major_id: 17,
                    major_name: "称安就生什",
                    class_id: 54,
                    is_stu: 86,
                    role_id: 77,
                    is_delete:1
                },
            ],
            managers: [],
            roles: [],
            schools: [],
            classes: [],
            logs: [],
      };
    },
    mutations: {
        setColleges(state: BaseInfoState, payload: any) {
            state.colleges=payload.colleges
        },
        setMajor(state: BaseInfoState, payload: any) {
            state.majors=payload.majors
        },
        setUsers(state: BaseInfoState, payload: any) {
            state.users=payload.users
        },
        setManager(state: BaseInfoState, payload: any) {
            state.managers=payload.managers
        },
        setRoles(state: BaseInfoState, payload: any) {
            state.roles=payload.roles
        },
        setSchools(state: BaseInfoState, payload: any) {
            state.schools=payload.schools
        },
        setClasses(state: BaseInfoState, payload: any) {
            state.classes=payload.classes
        },
        setLogs(state: BaseInfoState, payload: any) {
            state.logs=payload.logs
        },
    },
    actions: {
    },
  };
