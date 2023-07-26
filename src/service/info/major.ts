import { requests } from "@/service/axios";

export interface majorRequest {
  id: number;
  name: string;
  college_id: number;
  is_delete?: number;
}

//major
export const getMajors = (size: number, num: number) =>
  requests.get(`/info/majors/${size}/${num}`);

export const postMajor = (data: majorRequest) =>
  requests.post(`/info/major`, data);

export const delMajor = (id: number) => requests.delete(`/info/major/${id}`);

export const putMajor = (data: majorRequest) =>
  requests.put(`/info/major`, data);

export const getMajor = (id: number) => requests.get(`/info/major/${id}`);

export const getMajorsCollege = (
  collegeId: number,
  size: number,
  num: number,
) => requests.get(`/info/majors/college/${collegeId}/${size}/${num}`);
