import {requests} from "@/service/axios.ts";


export interface processContent {
    contentOrComment: string;
    subjectId: number;
    week: number;
}

export interface processPoint {
    subject_id: number[];
    //>=4
    week: number[];
}

export interface processItem {
    id:number
    subject_id:number
    week:number
    content:string
    content_date:string
    comment:string
    comment_date:string
    is_delete:number
}

export const postProcessContent = (data:processContent)=>requests.post<null>('/subject/process/save',data)

export const postProcessPoint = (data:processPoint)=>requests.post<null>('/subject/process',data)

export const getProcessDetail = (id:number)=>requests.get<processItem[]>(`/subject/process/${id}`)