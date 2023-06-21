import axios from 'axios'
import type {AxiosInstance, AxiosResponse} from 'axios'

// 公共配置
const instance: AxiosInstance = axios.create({
    baseURL: process.env.VITE_GEOSERVER_API, // 配置geoserver接口baseURL
    timeout: 15000
})

// 在Promise中封装get post请求
export const post = <T>(url: string, data = {}): Promise<T> => {
    return new Promise((resolve, reject) => {
        instance.post(url, data, {
            headers: {
                "content-type": "application/json; charset=utf-8"
            }
        }).then((response: AxiosResponse) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}

export const get = <T>(url: string, params = {}): Promise<T> => {
    return new Promise((resolve, reject) => {
        instance.get(url, params).then((response: AxiosResponse): void => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}