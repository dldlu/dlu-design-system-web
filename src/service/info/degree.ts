import { requests } from "@/service/axios";

export interface degree {
  id: number;
  name: string;
  is_delete: number;
}
//degree
export const getDegree = (id: string) => requests.get<degree>(`/info/degree/${id}`);

export const getAllDegrees = () => requests.get<Array<degree>>("/info/degrees");
