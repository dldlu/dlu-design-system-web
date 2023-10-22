import { requests } from "@/service/axios.ts";
import { approveRequest } from "@/service/subject/approve.ts";

export interface middleTerm {
  //调整情况
  arrange: string;
  //调整时间
  arrange_date: string;
  // 学习态度 1表示好 2表示一般 3表示差
  attitude: number;
  // 中期工作结论 1表示优 2表示良 3表示中 4表示差
  conclude: number;
  //难易程度 1表示偏难 2表示适中 3表示偏易
  difficulty: number;
  //初稿完成时间
  first_draft_date: string;
  //任务书 1表示无 2表示有
  has_assignment: number;
  //开题报告 1表示无 2表示有
  has_open_report: number;
  //文献数
  literature_quantity: number;
  //题目id
  subject_id: number;
  //工作进度 1表示快 2表示按计划进行 3表示慢
  working_speed: number;
  //工作量 1表示较少 2表示适中 3表示较多
  workload: number;
}

export const postMiddleTerm = (data: middleTerm) =>
  requests.post<null>("/subject/middleterm", data);

export const getMiddleTerm = (subjectId: number) =>
  requests.get<middleTerm>(`/subject/middleterm/${subjectId}`);

export const postMiddleTermApprove = (data: approveRequest) =>
  requests.post("/subject/middlerterm/approve", data);

export const postMiddleTermAppointApprove = (data: approveRequest) =>
  requests.post("/subject/middleterm/appoint", data);
