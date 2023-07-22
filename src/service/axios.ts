import axios from "axios";
// @ts-ignore
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import type {AxiosInstance ,AxiosRequestConfig} from "axios";



export interface response<T=any> {
    status_code: number,
    status_msg: string,
    data:T
}

const service:AxiosInstance = axios.create({
    baseURL: "/api",
    timeout: 5000
});
service.interceptors.request.use(((config) => {
    nprogress.start();
    if(localStorage.getItem('TOKEN')){
        config.headers.Authorization=localStorage.getItem('TOKEN')
    }
    return config;
}));

service.interceptors.response.use((res) => {
    nprogress.done();
    return res.data;

}, (error) => {
    return Promise.reject(error);
});

export const requests = {
    get<T>(url: string, config?: AxiosRequestConfig) : Promise<response<T>> {
        return service.get(url, config)
    },

    post<T>(url: string, data?: any, config?: AxiosRequestConfig) :Promise<response<T>> {
        return service.post(url, data, config)
    },

    put<T>(url: string, data?: any, config?: AxiosRequestConfig) :Promise<response<T>> {
        return service.put(url, data, config)
    },

    delete<T>(url: string, config?: AxiosRequestConfig) : Promise<response<T>> {
        return service.delete(url, config)
    }
}
