import {requests} from "@/service/axios";

//登录（3）
export interface LoginRes {
    token: string
}

export interface LoginBody {
    number: string,
    password: string
}

export interface checkRoleRes {
    isStudent: boolean
}

export const stuLogin = (data: LoginBody) => requests.post<LoginRes>('/user/login/student', data)

export const tchLogin = (data: LoginBody) => requests.post<LoginRes>('/user/login/teacher', data)

export const checkRole = (number: string) => requests.get<checkRoleRes>(`/user/login/role/${number}`)
