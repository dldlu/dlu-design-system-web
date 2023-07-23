
import { requests } from "@/service/axios";

export interface request {
    id: number;
    name: string;
    address: string;
    is_delete: number;
}

//major
export const getMajors = (size: string, num: string) => requests.get(`/info/majors/${size}/${num}`)

export const postMajor = (data: request) => requests.post(`/info/major`, data)

export const delMajor = (id: string) => requests.delete(`/info/major/${id}`)

export const putMajor = (data: request) => requests.put(`/info/major`, data)

export const getMajor = (id: string) => requests.get(`/info/major/${id}`)

export const getMajorsCollege = (collegeId: string) => requests.get(`/info/majors/college/${collegeId}`)

