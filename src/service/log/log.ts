import { requests } from "@/service/axios";
import { pageData } from "@/service/type.ts";

export interface log {
  content: string;
  created_at: string;
  id: number;
  method: number;
  operator: string;
  operator_ip: string;
  state: number;
}

export const getLog = (size: number, num: number) =>
  requests.get<pageData<log>>(`/log/${size}/${num}`);

export const getLogData = (start: number, end: number, size: number, num: number) =>
  requests.get<pageData<log>>(`/log/date/${start}/${end}/${size}/${num}`);

export const getLogMethod = (methodId: number, size: number, num: number) =>
  requests.get<pageData<log>>(`/log/method/${methodId}/${size}/${num}`);

export const getLogState = (stateId: number, size: number, num: number) =>
  requests.get<pageData<log>>(`/log/state/${stateId}/${size}/${num}`);
