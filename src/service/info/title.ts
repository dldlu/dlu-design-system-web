import { requests } from "@/service/axios";

export interface request {
    id: number;
    name: string;
    address: string;
    is_delete: number;
}

//title
export const getTitles = () => requests.get(`/info/titles/`)

export const getTitle = (id: string) => requests.get(`/info/title/${id}`)
