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

export interface SubjectDetail {
  abstract: string;
  feasibility: string;
  first_teacher_id: number;
  first_teacher_major_name: string;
  first_teacher_name: string;
  first_teacher_office_name: string;
  first_teacher_title_name: string;
  headline: string;
  id: number;
  identical: number;
  necessity: string;
  need_total: number;
  origin_id: number;
  origin_name: string;
  second_teacher_id: number;
  second_teacher_name: string;
  select_major_id: number[];
  select_major_name: string[];
  student_class_name: string;
  student_id: number;
  student_major_name: string;
  student_name: string;
  student_number: string;
  type_id: number;
  type_name: string;
}

export interface serialRequest {
  year: number;
  majorId: number;
}
export interface subjectType {
  id: number;
  name: string;
  is_delete: number;
}
export interface originType {
  id: number;
  name: string;
  is_delete: number;
}
//apply
export const postApply = (data: applyRequest) => requests.post(`/subject/apply`, data);

export const putApply = (data: applyRequest) => requests.put(`/subject/apply`, data);

export const delApply = (subjectId: number) => requests.delete<null>(`/subject/apply/${subjectId}`);

export const genSerial = (data: serialRequest) => requests.post(`/subject/apply/serial`, data);

export const getSubjectTypes = () => requests.get<subjectType[]>(`/subject/apply/types`);

export const getSubjectOrigins = () => requests.get<originType[]>("/subject/apply/origins");

export const getSubjectDetail = (subjectId: number) =>
  requests.get<SubjectDetail>(`/subject/apply/${subjectId}`);
