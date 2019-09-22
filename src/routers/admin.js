export default {
    path: '/admin',
    component: () => import('@/views/Admin.vue'),
    children: [
        {path: 'users', component: () => import('@/views/AdminUsers')},
        {path: 'movie', component: () => import('@/views/AdminMovie')},
        {path: 'cinema', component: () => import('@/views/AdminCinema')},
        {path: '/admin', redirect: 'users'}
    ]
}