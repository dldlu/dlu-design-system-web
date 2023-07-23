
import { requests } from "@/service/axios";

export interface request {
    id: number;
    name: string;
    address: string;
    is_delete: number;
}

//class
export const getClasses = (majorId: string, year: string, size: string, num: string) => requests.get(`/info/classes/${majorId}/${year}/${size}/${num}`)

export const postClass = (data: request) => requests.post(`/info/major`, data)

export const delClass = (id: string) => requests.delete(`/info/major/${id}`)

export const putClass = (data: request) => requests.put(`/info/major`, data)

export const getClass = (id: string) => requests.get(`/info/major/${id}`)

