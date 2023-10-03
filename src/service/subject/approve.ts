import { requests } from "@/service/axios";
import { pageData } from "@/service/type.ts";
import { subjectInfo } from "@/service/subject/self.ts";
import { pageBody } from "@/store/modules/baseInfo.ts";

export interface approveListRequest {
  collegeId: number;
  condition: string;
  majorId: number;
  year: number;
}

export interface approveRequest {
  subjectIds: number[];
}

//approve
export const postApprovelist = (data: approveListRequest & pageBody) =>
  requests.post<pageData<subjectInfo>>(`/subject/approve/approvelist`, data);

export const postApprove = (data: approveRequest) => requests.post(`/subject/approve/`, data);

export const postApproveAppoint = (data: approveRequest) =>
  requests.post(`/subject/approve/appoint`, data);
