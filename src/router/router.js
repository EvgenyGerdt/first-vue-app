import VueRouter from "vue-router"
import HomePage from "@/views/HomePage"
import AuthPage from "@/views/AuthViews/AuthPage"
import RegistrationPage from "@/views/AuthViews/RegistrationPage"
import ChangePasswordPage from "@/views/AuthViews/ChangePasswordPage"
import ProfilePage from "@/views/UserViews/ProfilePage"
import ChatPage from "@/views/UserViews/ChatPage"

import store from '../store/index'

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: HomePage,
            name: 'homePage',
            meta: {
                requiresUnauthorized: true
            }
        },
        {
            path: '/login',
            component: AuthPage,
            name: 'authPage',
            meta: {
                requiresUnauthorized: true,
                title: 'Login'
            }
        },
        {
            path: '/registration',
            component: RegistrationPage,
            name: 'registrationPage',
            meta: {
                requiresUnauthorized: true
            }
        },
        {
            path: '/change_password',
            component: ChangePasswordPage,
            name: 'changePasswordPage',
            meta: {
                requiresUnauthorized: true
            }
        },
        {
            path: '/profile',
            component: ProfilePage,
            name: 'profilePage',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile/chat',
            component: ChatPage,
            name: 'chatPage',
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(store.getters.isAuthenticated) {
            next()
            return
        }
        next('/login')
    } else if(to.matched.some(record => record.meta.requiresUnauthorized)) {
        if(!store.getters.isAuthenticated) {
            next()
            return
        }
        next('/profile')
    } else {
        next()
    }
})

export default router
