import { requests } from "@/service/axios";

export interface classRequest {
  id: number;
  name: string;
  major_id: number;
  grade: number;
  is_delete?: number;
}

//class
export const getClasses = (majorId: number, grade: number, size: number, num: number) =>
  requests.get(`/info/classes/${majorId}/${grade}/${size}/${num}`);

export const postClass = (data: classRequest) => requests.post(`/info/class`, data);

export const delClass = (id: number) => requests.delete(`/info/class/${id}`);

export const putClass = (data: classRequest) => requests.put(`/info/class`, data);

export const getClass = (id: number) => requests.get(`/info/class/${id}`);
