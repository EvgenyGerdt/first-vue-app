import VueRouter from "vue-router";
import HomePage from "@/views/HomePage";
import AuthPage from "@/views/AuthViews/AuthPage";
import RegistrationPage from "@/views/AuthViews/RegistrationPage";
import ChangePasswordPage from "@/views/AuthViews/ChangePasswordPage";
import ProfilePage from "@/views/UserViews/ProfilePage";

import store from '../store/store'

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: HomePage,
            name: 'homePage'
        },
        {
            path: '/login',
            component: AuthPage,
            name: 'authPage'
        },
        {
            path: '/registration',
            component: RegistrationPage,
            name: 'registrationPage'
        },
        {
            path: '/change_password',
            component: ChangePasswordPage,
            name: 'changePasswordPage'
        },
        {
            path: '/profile',
            component: ProfilePage,
            name: 'profilePage',
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router
