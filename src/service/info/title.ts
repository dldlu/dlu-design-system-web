import { requests } from "@/service/axios";
export interface title {
  id: number;
  name: string;
  is_delete: number;
}
//title
export const getTitle = (id: string) => requests.get<title>(`/info/title/${id}`);

export const getAllTitles = () => requests.get<Array<title>>("/info/titles");
