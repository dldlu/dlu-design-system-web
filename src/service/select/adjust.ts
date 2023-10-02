import { requests } from "@/service/axios.ts";

export interface UncertainList {
  firstList: StudentList[] | null;
  secondList: StudentList[] | null;
  headline: string;
  subjectId: number;
}

export interface StudentList {
  studentClassName: string;
  studentMajorId: number;
  studentId: number;
  studentName: string;
  studentNumber: string;
  studentPhone: string;
}

export interface CertainList {
  headline: string;
  studentClassName: string;
  studentId: number;
  studentMajorName: string;
  studentName: string;
  studentNumber: string;
  studentPhone: string;
  subjectId: number;
}

export interface TeacherSelect {
  majorId: number;
  studentId: number;
  subjectId: number;
}
export const getUncertainList = (year: number) =>
  requests.get<UncertainList[]>(`/selection/adjust/uncertain/${year}`);

export const getCertainList = (year: number) =>
  requests.get<CertainList[]>(`/selection/adjust/certain/${year}`);

export const postTeacherSelect = (data: TeacherSelect) =>
  requests.post<null>("/selection/adjust/tearcherselect", data);
