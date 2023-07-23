import { requests } from "@/service/axios";

//office
export const getOffice= (id: string) => requests.get(`/info/office/${id}`)
