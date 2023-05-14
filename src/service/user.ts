import { requests } from "@/service/axios";

export interface LoginRes{
    token:string
}

export interface LoginBody{
    number: string,
    password: string
}

export interface checkRoleRes{
    isStudent:boolean
}

export interface userDesc{
    id: number
    number: string
    name: string
    phone: string
    email: string
    college_id: number
    college_name: string
    major_id: number
    major_name: string
    class_id: number
    is_stu: number
    roleId: number
}

export const stuLogin = (data: LoginBody) => requests.post<LoginRes>('/user/login/student', data)

export const tchLogin = (data: LoginBody) => requests.post<LoginRes>('/user/login/teacher', data)

export const checkRole = (number: string) => requests.get<checkRoleRes>(`/user/login/role/${number}`)

export const queryUserbyId = (id: string, isStu: string) => requests.get<userDesc>(`/user/info/id/${id}/${isStu}`)

export const queryUserbyNumber = (number: string, isStu: string) => requests.get<userDesc>(`/user/info/number/${number}/${isStu}`)

export const queryUserbyMajor = (majorId: string, isStu: string,size:string,num:string) => requests.get<userDesc>(`/user/info/major/${majorId}/${isStu}/${size}/${num}`)

export const queryUserbyCollege = (collegeId: string, isStu: string, size: string, num: string) => requests.get<userDesc>(`/user/info/college/${collegeId}/${isStu}/${size}/${num}`)

