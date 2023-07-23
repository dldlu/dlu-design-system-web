import { requests } from "@/service/axios";

export interface collegeRequest {
    id: number;
    name: string;
    address: string;
    is_delete: number;
}

//college
export const getColleges = (size: string, num: string) => requests.get(`/info/colleges/${size}/${num}`)

export const postCollege = (data: collegeRequest) => requests.post(`/info/college`, data)

export const delCollege = (id: string) => requests.delete(`/info/college/${id}`)

export const putCollege = (data: collegeRequest) => requests.put(`/info/college`, data)

export const getCollege = (id: string) => requests.get(`/info/college/${id}`)
