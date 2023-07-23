
import { requests } from "@/service/axios";

export interface majiorRequest {
    id: number;
    name: string;
    address: string;
    is_delete: number;
}

//major
export const getMajors = (size: string, num: string) => requests.get(`/info/majors/${size}/${num}`)

export const postMajor = (data: majiorRequest) => requests.post(`/info/major`, data)

export const delMajor = (id: string) => requests.delete(`/info/major/${id}`)

export const putMajor = (data: majiorRequest) => requests.put(`/info/major`, data)

export const getMajor = (id: string) => requests.get(`/info/major/${id}`)

export const getMajorsCollege = (collegeId: string) => requests.get(`/info/majors/college/${collegeId}`)

