import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        movieRouter,
        cinemaRouter,
        mineRouter,
        {
            path: '/*',
            redirect: '/movie' // 重定向，当找不到输入的路由地址时，自动回到主页面
        }
    ]
})