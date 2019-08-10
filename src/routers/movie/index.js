export default {
    path: '/movie',
    component: () =>
        import ('@/views/Movie') // 组件懒加载模式
}