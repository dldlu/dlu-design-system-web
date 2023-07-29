import { requests } from "@/service/axios";
import { pageData } from "@/service/type.ts";

export interface collegeRequest {
  id: number;
  name: string;
  is_delete?: number;
}

//college
export const getColleges = (size: number, num: number) =>
  requests.get<pageData<collegeRequest>>(`/info/colleges/${size}/${num}`);

export const postCollege = (data: collegeRequest) => requests.post<null>(`/info/college`, data);

export const delCollege = (id: number) => requests.delete<null>(`/info/college/${id}`);

export const putCollege = (data: collegeRequest) => requests.put<null>(`/info/college`, data);

export const getCollege = (id: string) => requests.get<collegeRequest>(`/info/college/${id}`);
