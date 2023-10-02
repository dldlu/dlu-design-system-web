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

export interface StuSelect {
  firstSubjectId: number;
  secondSubjectId: number;
}

export interface SelectedData {
  firstChangeCount: number;
  firstSubject: FirstSubject | undefined;
  secondSubject: SecondSubject | undefined;
  secondChangeCount: number;
}

export interface FirstSubject {
  first_teacher_id: number;
  first_teacher_name: string;
  first_teacher_title_name: string;
  headline: string;
  id: number;
  origin_id: number;
  origin_name: string;
  type_id: number;
  type_name: string;
}

export interface SecondSubject {
  first_teacher_id: number;
  first_teacher_name: string;
  first_teacher_title_name: string;
  headline: string;
  id: number;
  origin_id: number;
  origin_name: string;
  type_id: number;
  type_name: string;
}

export const getStuSelectList = (data: GetStuSelect) =>
  requests.post<StuSelectList>("/selection/student/subjectlist", data);

export const postStuSelect = (data: StuSelect) =>
  requests.post<null>("/selection/student/submit", data);

export const getStuSelected = () => requests.get<SelectedData>("/selection/student/selectlist");
