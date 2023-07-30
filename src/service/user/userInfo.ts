import { requests } from "@/service/axios";
//用户信息（5）
export interface userDesc {
  id: number;
  number: string;
  name: string;
  phone: string;
  email: string;
  college_id: number;
  college_name: string;
  major_id: number;
  major_name: string;
  class_id?: number;
  class_name?: string;
  is_stu: number;
  role_id: number;
  title_id?: number;
  title_name?: string;
  degree_id?: number;
  degree_name?: string;
  office_id?: number;
  office_name?: string;
  is_delete: number;
}

export const queryUserById = (id: string, isStu: number) =>
  requests.get<userDesc>(`/user/info/id/${id}/${isStu}`);

export const queryUserByNumber = (number: string, isStu: number) =>
  requests.get<userDesc>(`/user/info/number/${number}/${isStu}`);

export const queryUserbyMajor = (majorId: number, isStu: number, size: number, num: number) =>
  requests.get<userDesc>(`/user/info/major/${majorId}/${isStu}/${size}/${num}`);

export const queryUserByCollege = (collegeId: number, isStu: number, size: number, num: number) =>
  requests.get<userDesc>(`/user/info/college/${collegeId}/${isStu}/${size}/${num}`);

export const queryUserByNumberMajor = (number: string, majorId: number, isStu: number) =>
  requests.get<userDesc>(`/user/info/number/${number}/${majorId}/${isStu}`);
