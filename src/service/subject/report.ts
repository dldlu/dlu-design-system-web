import { requests } from "@/service/axios.ts";

export const getReportComment = (id: number) => requests.get(`/subject/report/${id}`);
