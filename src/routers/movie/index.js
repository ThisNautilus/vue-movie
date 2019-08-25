export default {
    path: '/movie',
    component: () =>
        import ('@/views/Movie'), // 组件懒加载模式
    children: [{
            path: 'city',
            component: () =>
                import ('@/components/City')
        },
        {
            path: 'nowplaying',
            component: () =>
                import ('@/components/NowPlaying')
        },
        {
            path: 'commingsoon',
            component: () =>
                import ('@/components/CommingSoon')
        },
        {
            path: 'search',
            component: () =>
                import ('@/components/Search')
        },
        {
            path: 'detail/1/:movieId', // 命名视图与路由组件传参
            components: {
                default: () =>
                    import ('@/components/NowPlaying'),
                detail: () =>
                    import ('@/views/Movie/detail.vue')
            },
            props: {
                detail: true
            }
        },
        {
            path: 'detail/2/:movieId', // 命名视图与路由组件传参
            components: {
                default: () =>
                    import ('@/components/CommingSoon'),
                detail: () =>
                    import ('@/views/Movie/detail.vue')
            },
            props: {
                detail: true
            }
        },
        {
            path: '/movie',
            redirect: '/movie/nowplaying'
        }
    ]
}