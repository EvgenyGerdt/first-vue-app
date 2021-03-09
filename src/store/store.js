import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import API_ENDPOINTS from '../../config/api.config'

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
        },

        forget_password_request(state) {
            state.status = 'loading'
        },
        forget_password_success(state, resetToken) {
            state.status = 'success'
            state.resetToken = resetToken
        },
        verify_error(state) {
            state.status = 'error'
        },

        reset_password_request(state) {
            state.status = 'loading'
        },
        reset_password_success(state) {
            state.status = 'success'
        },
        reset_password_error(state) {
            state.status = 'error'
        }
    },
    actions: {
        async login({ commit }, user) {
            return new Promise(((resolve, reject) => {
                commit('auth_request')
                axios.post(`${API_ENDPOINTS.BASE_API.LOGIN}`, user)
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
                axios.post(`${API_ENDPOINTS.BASE_API.REGISTER}`, user)
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
        },

        async forget_password({ commit }, email) {
            return new Promise(((resolve, reject) => {
                commit('forget_password_request')
                axios.post(`${API_ENDPOINTS.BASE_API.FORGET_PASSWORD}`, email)
                    .then(res => {
                        const resetToken = res.data.token
                        localStorage.setItem('resetToken', resetToken)
                        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
                        axios.defaults.headers.common['Authorization'] = resetToken
                        commit('forget_password_success')
                        resolve(res)
                    })
                    .catch(err => {
                        commit('verify_error')
                        localStorage.removeItem('resetToken')
                        reject(err)
                    })
            }))
        },

        async reset_password({ commit }, data) {
            return new Promise(((resolve, reject) => {
                commit('reset_password_request')
                axios.post(`${API_ENDPOINTS.BASE_API.RESET_PASSWORD}`, data)
                    .then(res => {
                        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
                        commit('reset_password_success')
                        resolve(res)
                    })
                    .catch(err => {
                        commit('reset_password_error')
                        reject(err)
                    })
            }))
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
    }
})
