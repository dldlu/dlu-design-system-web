import { requests } from "@/service/axios";

export interface schoolRequest {
  id: number | null;
  name: string;
  address: string;
  is_delete: number;
}

//school
export const getSchools = (size: number, num: number) =>
  requests.get<Array<schoolRequest>>(`/info/schools/${size}/${num}`);

export const postSchool = (data: schoolRequest) =>
  requests.post(`/info/school`, data);

export const delSchool = (id: number) => requests.delete(`/info/school/${id}`);

export const putSchool = (data: schoolRequest) =>
  requests.put(`/info/school`, data);

export const getSchool = (id: string) =>
  requests.get<schoolRequest>(`/info/school/${id}`);
