import { requests } from "@/service/axios";

export interface appointRequest {
    number: string;
    subjectIds: number[];
}

//appoint
export const postAppoint = (data: appointRequest) => requests.post(`/subject/appoint`, data)

