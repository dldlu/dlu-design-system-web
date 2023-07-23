import { requests } from "@/service/axios";

//title
export const getTitle = (id: string) => requests.get(`/info/title/${id}`)
