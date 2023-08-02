import { requests } from "@/service/axios";
import { pageData } from "@/service/type.ts";

export interface logRequest {
  end: null | string;
  methodId: number;
  num: number;
  size: number;
  start: null | string;
  stateId: number;
}
export interface log {
  content: string;
  created_at: string;
  id: number;
  method: number;
  operator: string;
  operator_ip: string;
  state: number;
}

export const getLog = (body: logRequest) => requests.post<pageData<log>>(`/log`, body);
