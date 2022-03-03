/* 对网络请求再做一层封装，针对首页的请求都放在这里 */
import { request } from "./request";

export function getHomeMultidata(){
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type,page){
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}