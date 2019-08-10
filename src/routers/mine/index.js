export default {
    path: '/mine',
    component: () =>
        import ('@/views/Mine') // @代表src目录下，为vue中的特定用法
}