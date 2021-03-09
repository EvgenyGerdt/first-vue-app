import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import apiBase from '../../config/api.config'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        }
    },
    actions: {
        async login({ commit }, user) {
            return new Promise(((resolve, reject) => {
                commit('auth_request')
                axios.post(`${apiBase.BASE_API}` + 'auth/login', user)
                    .then(res => {
                        const token = res.data.token
                        const user = res.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(res)
                    }).catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            }))
        },
        async register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post(`${apiBase.BASE_API}` + 'auth/register', user)
                    .then(res => {
                        const token = res.data.token
                        const user = res.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(res)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
    }
})
