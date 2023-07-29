import { requests } from "@/service/axios";
import { pageData } from "@/service/type.ts";

export interface schoolRequest {
  id: number;
  name: string;
  address: string;
  is_delete?: number;
}

//school
export const getSchools = (size: number, num: number) =>
  requests.get<pageData<schoolRequest>>(`/info/schools/${size}/${num}`);

export const postSchool = (data: schoolRequest) => requests.post<null>(`/info/school`, data);

export const delSchool = (id: number) => requests.delete<null>(`/info/school/${id}`);

export const putSchool = (data: schoolRequest) => requests.put<null>(`/info/school`, data);

export const getSchool = (id: string) => requests.get<schoolRequest>(`/info/school/${id}`);
