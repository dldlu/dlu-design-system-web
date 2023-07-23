import { requests } from "@/service/axios";

export interface request {
    id: number;
    name: string;
    address: string;
    is_delete: number;
}

//office
export const getOffice= (id: string) => requests.get(`/info/office/${id}`)
