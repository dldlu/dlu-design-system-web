import { requests } from "@/service/axios.ts";

export interface plan {
  content: string;
  subjectId: number;
  week: number;
}

export const postPlans = (data: Array<plan>) => requests.post<null>("/subject/plan", data);

export const getPlans = (id: number) =>
  requests.get<Array<plan & { is_delete: number }>>(`/subject/plan/${id}`);
