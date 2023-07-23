import { requests } from "@/service/axios";

//用户角色（5）
export interface roleRes {
  id: number;
  name: string;
  is_delete: number;
}

export interface roleBody {
  id: number;
  name: string;
}

export const getRoleList = () => requests.get<Array<roleRes>>(`/user/roles`);

export const getRoleDetail = (roleId: string) =>
  requests.get<roleRes>(`/user/role/${roleId}`);

export const deleteRole = (roleId: string) =>
  requests.delete<null>(`/user/role/${roleId}`);

export const changeRole = (body: roleBody) =>
  requests.put<null>(`/user/role`, body);

export const addRole = (body: { name: string }) =>
  requests.post<null>("/user/role", body);
