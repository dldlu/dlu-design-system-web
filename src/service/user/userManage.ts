import { requests } from "@/service/axios";
import { pageData } from "@/service/type.ts";
import { userDesc } from "@/service/user/userInfo.ts";

//用户管理（7）
export interface userBody {
  class_id?: number | null;
  college_id: number;
  degree_id?: number | null;
  email: string;
  gender: number;
  is_stu: number;
  major_id: number;
  name: string;
  number: string;
  office_id?: number | null;
  phone: string;
  title_id?: number | null;
}

export const addUser = (body: userBody) => requests.post<null>("/user/manage", body);

export const getManagersByRole = (roleId: number, size: number, num: number) =>
  requests.get<pageData<userDesc>>(`/user/manager/${roleId}/${size}/${num}`);

export const cancelRole = (id: number) => requests.put<null>(`/user/manager/${id}`);

export const changeTchRole = (body: { roleId: number; id: number }) =>
  requests.put<null>("/user/manage/role", body);

export const initPassword = (id: number, isStu: number) =>
  requests.put<null>(`/user/manage/${id}/${isStu}/password`);

export const deleteUser = (id: number, isStu: number) =>
  requests.delete<null>(`/user/manage/${id}/${isStu}`);

export const changeUserInfo = (body: userBody) => requests.put<null>("/user/manage", body);
