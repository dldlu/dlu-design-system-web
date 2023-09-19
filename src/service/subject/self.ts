import { requests } from "@/service/axios.ts";
import { pageData } from "@/service/type.ts";

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
  serial_number: string;
}

export interface subjectBody {
  year: number;
  size: number;
  num: number;
}

export const getSelfSubject = (body: subjectBody) =>
  requests.get<pageData<subjectInfo>>(`/subject/selfsubject/${body.year}/${body.size}/${body.num}`);
