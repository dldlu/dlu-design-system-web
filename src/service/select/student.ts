import { requests } from "@/service/axios.ts";

export interface GetStuSelect {
  condition: string;
  grade: number;
  majorId: number;
  num: number;
  size: number;
}

export interface StuSelectList {
  item_total: number;
  page_total: number;
  array: {
    firstSubjectId: number;
    secondSubjectId: number;
    subjectList: SubjectList[];
  };
}

export interface SubjectList {
  first_teacher_id: number;
  first_teacher_name: string;
  first_teacher_title_name: string;
  headline: string;
  id: number;
}

export const getStuSelectList = (data: GetStuSelect) =>
  requests.post<StuSelectList>("/selection/student/subjectlist", data);
