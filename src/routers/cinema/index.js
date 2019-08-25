export default {
    path: '/cinema',
    component: () =>
        import ('@/views/Cinema'),
    children: [{
        path: 'cilist',
        component: () =>
            import ('@/components/Cilist')
    }]
}