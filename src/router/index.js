//定义路由

import Vue from "vue";
import VueRouter from "vue-router";

//动态导入路由组件
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
//1.安装插件
Vue.use(VueRouter)

//2.创建路由对象
const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
]

const router = new VueRouter({
    routes
})

export default router