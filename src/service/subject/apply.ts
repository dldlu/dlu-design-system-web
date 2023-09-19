import { requests } from "@/service/axios";

export interface applyRequest {
  abstract: string;
  college_id: number;
  feasibility: string;
  first_teacher_id: number;
  headline: string;
  id: number;
  identical: number;
  is_delete: null;
  major_id: number[];
  necessity: string;
  need_total: number;
  origin_id: number;
  progress_id: number;
  role_id: number;
  second_teacher_id: number;
  student_id: number;
  type_id: number;
  year: number;
}

export interface serialRequest {
  year: number;
  majorId: number;
}

//apply
export const postApply = (data: applyRequest) => requests.post(`/subject/apply`, data);

export const putApply = (data: applyRequest) => requests.put(`/subject/apply`, data);

export const delApply = (subjectId: string) => requests.put(`/subject/apply/${subjectId}`);

export const genSerial = (data: serialRequest) => requests.post(`/subject/apply/serial`, data);
