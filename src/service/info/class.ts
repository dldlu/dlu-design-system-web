import { requests } from "@/service/axios";
import { pageData } from "@/service/type.ts";

export interface classRequest {
  id: number;
  name: string;
  major_id: number;
  grade: number;
  is_delete?: number;
}

//class
export const getClasses = (majorId: number, grade: number, size: number, num: number) =>
  requests.get<pageData<classRequest>>(`/info/classes/${majorId}/${grade}/${size}/${num}`);

export const postClass = (data: classRequest) => requests.post<null>(`/info/class`, data);

export const delClass = (id: number) => requests.delete<null>(`/info/class/${id}`);

export const putClass = (data: classRequest) => requests.put<null>(`/info/class`, data);

export const getClass = (id: number) => requests.get<classRequest>(`/info/class/${id}`);
