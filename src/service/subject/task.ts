import { requests } from "@/service/axios.ts";
import { approveRequest } from "@/service/subject/approve.ts";

export interface task {
  according: string;
  beginTime: string;
  endTime: string;
  importance: string;
  literature: string;
  require: string;
  subject_id: number;
}

export const postAddTask = (data: task) => requests.post<null>("/subject/task", data);

export const getTaskDetail = (id: number) => requests.get<task>(`/subject/task/${id}`);

export const postTaskApprove = (data: approveRequest) =>
  requests.post<null>(`/subject/task/approve`, data);

export const postTaskAppointApprove = (data: approveRequest) =>
  requests.post<null>("/subject/task/appoint", data);
