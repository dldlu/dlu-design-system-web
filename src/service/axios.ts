import axios from "axios";
// @ts-ignore
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import Store from '../stores/index';
import type {AxiosInstance ,AxiosRequestConfig} from "axios";



type response<T=any> = {
    success:boolean,
    msg:string,
    data:T,
    code:number
}

const service:AxiosInstance = axios.create({
    baseURL: "/api",
    timeout: 5000
});
service.interceptors.request.use(((config) => {
    const store=Store()
    nprogress.start();
    if(store.user.token){
        config.headers.Authorization=store.user.token
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
    get<T=response>(url: string, config?: AxiosRequestConfig) : Promise<T> {
        return service.get(url, config)
    },

    post<T=response>(url: string, data?: any, config?: AxiosRequestConfig) :Promise<T> {
        return service.post(url, data, config)
    },

    put<T=response>(url: string, data?: any, config?: AxiosRequestConfig) :Promise<T> {
        return service.put(url, data, config)
    },

    delete<T=response>(url: string, config?: AxiosRequestConfig) : Promise<T> {
        return service.delete(url, config)
    }
}
