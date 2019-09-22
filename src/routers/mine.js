export default {
    path: '/mine',
    component : () => import('@/views/Mine.vue'),
    children: [
        {path: 'center', component: () => import('@/views/Center.vue')},
        {path: 'login', component: () => import('@/components/Login.vue')},
        {path: 'register', component: () => import('@/components/Register.vue')},
        {path: 'findpassword', component: () => import('@/components/FindPassword.vue')},
        {path: '/mine', redirect: '/mine/center'}
    ]
}