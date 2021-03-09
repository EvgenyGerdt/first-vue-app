import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import Vuelidate from "vuelidate";
import axios from "axios"

import router from './router/router'
import store from './store/store'

Vue.config.productionTip = false

Vue.prototype.$http = axios
const token = localStorage.getItem('token')

if(token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(Vuelidate)
Vue.use(VueRouter)

new Vue({
    render: h => h(App),
    el: "#app",
    router,
    store
})

