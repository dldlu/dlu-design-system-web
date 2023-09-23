import { requests } from "@/service/axios";
import { pageData } from "@/service/type.ts";
import { subjectBody, subjectInfo } from "@/service/subject/self.ts";

export interface appointRequest {
  number: string;
  subjectIds: number[];
}

//appoint
export const postAppoint = (data: appointRequest) => requests.post(`/subject/appoint`, data);

export const getSelfAppoint = (body: subjectBody) =>
  requests.get<pageData<subjectInfo>>(`/subject/appoint/${body.year}/${body.size}/${body.num}`);
