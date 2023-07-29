import { requests } from "@/service/axios";
import { pageData } from "@/service/type.ts";

export interface majorRequest {
  id: number;
  name: string;
  college_id: number;
  is_delete?: number;
}

//major
export const getMajors = (size: number, num: number) =>
  requests.get<pageData<majorRequest>>(`/info/majors/${size}/${num}`);

export const postMajor = (data: majorRequest) => requests.post<null>(`/info/major`, data);

export const delMajor = (id: number) => requests.delete<null>(`/info/major/${id}`);

export const putMajor = (data: majorRequest) => requests.put<null>(`/info/major`, data);

export const getMajor = (id: number) => requests.get<majorRequest>(`/info/major/${id}`);

export const getMajorsCollege = (collegeId: number, size: number, num: number) =>
  requests.get<pageData<majorRequest>>(`/info/majors/college/${collegeId}/${size}/${num}`);
