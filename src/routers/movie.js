export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    children: [
        {path: 'city', component: () => import('@/components/City')},
        {path: 'nowplaying', component: () => import('@/components/NowPlaying')},
        {path: 'comingsoon', component: () => import('@/components/ComingSoon')},
        {path: 'search', component: () => import('@/components/Search')},
        {path: 'nowplaying/detail/:movieId', components: {
                default: () => import('@/components/NowPlaying'),
                detail: () => import('@/views/Detail')
            },
            props: {detail: true}
        },
        {
            path: 'comingsoon/detail/:movieId', components: {
                default: () => import('@/components/ComingSoon'),
                detail: () => import('@/views/Detail')
            },
            props: {detail: true}
        },
        {path: '/movie', redirect: '/movie/nowplaying'}
    ]
}