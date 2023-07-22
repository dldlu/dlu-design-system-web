import {requests} from "@/service/axios";

//用户管理（7）
export  interface userBody{
    id:number
    number:string
    name:string
    phone:string
    email:string
    gender:number
    collegeId:number
    majorId:number
    classId:number
    titleId:number
    degreeId:number
    officeId:number
    isStu:number
}

export const addUser=(body:userBody)=>requests.post<null>('/user/manage',body)
