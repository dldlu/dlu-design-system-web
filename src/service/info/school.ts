
import { requests } from "@/service/axios";

export interface request {
    id: number;
    name: string;
    address: string;
    is_delete: number;
}

//school
export const getSchools = (size: string, num: string) => requests.get(`/info/schools/${size}/${num}`)

export const postSchool = (data: request) => requests.post(`/info/school`, data)

export const delSchool = (id: string) => requests.delete(`/info/school/${id}`)

export const putSchool = (data: request) => requests.put(`/info/school`, data)

export const getSchool = (id: string) => requests.get(`/info/school/${id}`)

