import {requests} from "@/service/axios.ts";
import {approveRequest} from "@/service/subject/approve.ts";

export interface reportComment {
    subject_id: number;
    teacher_comment: string;
}

export const getReportComment = (id: number) => requests.get(`/subject/report/${id}`);

export const postReportComment = (data: reportComment) => requests.post('/subject/report/comment', data)

export const postReportApprove = (data: approveRequest) => requests.post('/subject/report/approve', data)

export const postReportAppointApprove = (data: approveRequest) => requests.post('/subject/report/appoint', data)
