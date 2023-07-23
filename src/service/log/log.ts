import { requests } from "@/service/axios";

export interface request {
    id: number;
    name: string;
    address: string;
    is_delete: number;
}

export interface Data {
    array: ArrayElement[];
    item_total: number;
    page_total: number;
}

export interface ArrayElement {
    content?: string;
    created_at?: string;
    id?: number;
    method?: number;
    operator?: string;
    operator_ip?: string;
    state?: number;
}

export const getLog = (size: string, num: string) => requests.get<Data>(`/log/${size}/${num}`)

export const getLogData = (start:string,end:string,size: string, num: string) => requests.get<Data>(`/log/date/${start}/${end}/${size}/${num}`)

export const getLogMethod = (methodId:string,size: string, num: string) => requests.get<Data>(`/log/method/${methodId}/${size}/${num}`)

export const getLogState = (stateId:string,size: string, num: string) => requests.get<Data>(`/log/state/${stateId}/${size}/${num}`)
