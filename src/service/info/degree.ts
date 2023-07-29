import { requests } from "@/service/axios";

//degree
export const getDegree = (id: string) => requests.get(`/info/degree/${id}`);
