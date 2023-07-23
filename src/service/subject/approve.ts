import { requests } from "@/service/axios";

export interface approvelistRequest {
    collegeId: number;
    condition: string;
    majorId: number;
    teacherId: number;
    year: number;
}

export interface approveRequest {
    subjectIds: string[];
}

//approve
export const postApprovelist = (data: approvelistRequest) => requests.post(`/subject/approve/approvelist`, data)

export const postApprove = (data: approveRequest) => requests.post(`/subject/approve/`, data)

export const postApproveAppoint = (data: approveRequest) => requests.post(`/subject/approve/appoint`, data)

