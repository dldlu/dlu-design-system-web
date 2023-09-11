import { requests } from "@/service/axios.ts";

export interface subjectInfo {
  first_teacher_id: number;
  first_teacher_name: string;
  first_teacher_phone: string;
  first_teacher_title_name: string;
  headline: string;
  progress_id: number;
  progress_name: string;
  student_id: number;
  student_name: string;
  student_number: string;
  student_phone: string;
  subject_id: number;
}

export const getSelfSubject = (year: number) =>
  requests.get<subjectInfo[]>(`/subject/selfsubject/${year}`);
