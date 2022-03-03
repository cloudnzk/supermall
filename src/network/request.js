import axios from 'axios'

export function request(config){
    const instance = axios.create({
        // baseURL: 'http://123.207.32.32:8000',
        // 使用别人搭建好的本地接口
        baseURL: 'http://localhost:3000/',
        timeout: 5000
    })
    // /* 请求拦截器 */
    // instance.interceptors.request.use(config => {
    //     console.log(config);
    //     return config
    // },err => {
    //     console.log(err);
    // })
    // /* 响应拦截 */
    // instance.interceptors.response.use(res => {
    //     return res.data
    // }, err => {
    //     console.log(err);
    // })
    // 返回的实例本身就是promise类型，直接return
    return instance(config)
}