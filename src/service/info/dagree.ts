import { requests } from "@/service/axios";

export interface request {
    id: number;
    name: string;
    address: string;
    is_delete: number;
}

//degree
export const getDegrees = () => requests.get(`/info/degrees/`)

export const getDegree= (id: string) => requests.get(`/info/degree/${id}`)
