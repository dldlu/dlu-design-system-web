import { requests } from "@/service/axios.ts";
import { SubjectInfo } from "@/service/select/student.ts";

export interface UncertainList {
  firstList: Student[] | null;
  secondList: Student[] | null;
  headline: string;
  subjectId: number;
}

export interface Student {
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

export interface AdjustRes {
  majorId: number;
  studentId: number;
  subjectId: number;
}
export interface OverStu {
  firstSubject: SubjectInfo;
  secondSubject: SubjectInfo;
  student: Student;
}

export interface OverSub {
  first_teacher_id: number;
  first_teacher_name: string;
  firstTeacherOffice: string;
  firstTeacherPhone: string;
  headline: string;
  subjectId: number;
}

export const getUncertainList = (year: number) =>
  requests.get<UncertainList[]>(`/selection/adjust/uncertain/${year}`);

export const getCertainList = (year: number) =>
  requests.get<CertainList[]>(`/selection/adjust/certain/${year}`);

export const postTeacherSelect = (data: AdjustRes) =>
  requests.post<null>("/selection/adjust/tearcherselect", data);

export const getOverStuList = (majorId: number, grade: number) =>
  requests.get<OverStu[]>(`/selection/adjust/unselectstudent/${majorId}/${grade}`);

export const getOverSubList = (majorId: number, grade: number) =>
  requests.get<OverSub[]>(`/selection/adjust/unselectsubject/${majorId}/${grade}`);

export const postAdjustRes = (data: AdjustRes) =>
  requests.post<null>("/selection/adjust/student", data);
