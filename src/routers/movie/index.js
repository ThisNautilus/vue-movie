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
            path: '/movie',
            redirect: '/movie/nowplaying'
        }
    ]
}