import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import API_ENDPOINTS from '../../config/api.config'

Vue.use(Vuex)

const defaultState = () => {
    return {
        status: '',
        token: '',
        userId: '',
        resetToken: '',
        user: {}
    }
}

const instance = axios.create({
    timeout: 5000,
    headers: {'Access-Control-Allow-Origin': '*'}
})

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        userId: localStorage.getItem('id'),
        resetToken: '',
        user: {}
    },

    mutations: {
        // AUTH USER MUTATIONS
        AUTH_REQUEST(state) {
            state.status = 'loading'
        },
        AUTH_SUCCESS(state, token) {
            state.status = 'success'
            state.token = token
        },
        AUTH_ERROR(state) {
            state.status = 'error'
            state.token = null
            state.userId = null
        },

        // GET USER MUTATIONS
        GET_USER_REQUEST(state) {
          state.status = 'loading'
        },
        GET_USER_SUCCESS(state, user) {
            state.status = 'success'
            state.user = user
        },
        GET_USER_ERROR(state) {
            state.status = 'error'
            state.user = {}
        },

        //GET ALL USERS MUTATIONS
        GET_ALL_USERS_REQUEST(state) {
            state.status = 'loading'
        },
        GET_ALL_USERS_SUCCESS(state, users) {
            state.status = 'success'
            state.users = users
        },
        GET_ALL_USERS_ERROR(state) {
            state.status = 'error'
        },

        // SAVE USERNAME MUTATIONS
        SET_USERNAME_REQUEST(state) {
            state.status = 'loading'
        },
        SET_USERNAME_SUCCESS(state) {
            state.status = 'success'
        },
        SET_USERNAME_ERROR(state) {
            state.status = 'error'
        },

        // LOGOUT USER MUTATIONS
        LOGOUT(state) {
            state.status = 'success'
            state.token = null
            state.userId = null
        },
        LOGOUT_ERROR(state) {
            state.status = 'error'
        },

        // FORGET PASSWORD MUTATIONS
        FORGET_PASSWORD_REQUEST(state) {
            state.status = 'loading'
        },
        FORGET_PASSWORD_SUCCESS(state, resetToken) {
            state.status = 'success'
            state.resetToken = resetToken
        },
        VERIFY_ERROR(state) {
            state.status = 'error'
        },

        // RESET PASSWORD MUTATIONS
        RESET_PASSWORD_REQUEST(state) {
            state.status = 'loading'
        },
        RESET_PASSWORD_SUCCESS(state) {
            state.status = 'success'
            state.resetToken = null
            state.userId = null
        },
        RESET_PASSWORD_ERROR(state) {
            state.status = 'error'
        },

        // Сбрасываем state
        RESET_STATE(state) {
            Object.assign(state, defaultState())
        }
    },
    actions: {
        async login({ commit }, user) {
            return new Promise(((resolve, reject) => {
                commit('AUTH_REQUEST')
                instance.post(`${API_ENDPOINTS.BASE_API.LOGIN}`, user)
                    .then(res => {
                        const token = res.data.token
                        const userId = res.data.user._id
                        localStorage.setItem('token', token)
                        localStorage.setItem('id', userId)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('AUTH_SUCCESS', token)
                        resolve(res)
                    }).catch(err => {
                        commit('AUTH_ERROR')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            }))
        },

        async logout({ commit }) {
          return new Promise(() => {
              localStorage.removeItem('token')
              localStorage.removeItem('id')
              commit('LOGOUT')
          })
        },

        async register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST')
                instance.post(`${API_ENDPOINTS.BASE_API.REGISTER}`, user)
                    .then(res => {
                        const token = res.data.token
                        const user = res.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('AUTH_SUCCESS', token, user)
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
                commit('FORGET_PASSWORD_REQUEST')
                instance.post(`${API_ENDPOINTS.BASE_API.FORGET_PASSWORD}`, email)
                    .then(res => {
                        const resetToken = res.data.token
                        axios.defaults.headers.common['Authorization'] = resetToken
                        commit('FORGET_PASSWORD_SUCCESS', resetToken)
                        resolve(res)
                    })
                    .catch(err => {
                        commit('VERIFY_ERROR')
                        reject(err)
                    })
            }))
        },

        async reset_password({ commit }, data) {
            return new Promise(((resolve, reject) => {
                commit('RESET_PASSWORD_REQUEST')
                instance.post(`${API_ENDPOINTS.BASE_API.RESET_PASSWORD}`, data)
                    .then(res => {
                        localStorage.removeItem('resetToken')
                        commit('RESET_PASSWORD_SUCCESS')
                        resolve(res)
                    })
                    .catch(err => {
                        commit('RESET_PASSWORD_ERROR')
                        reject(err)
                    })
            }))
        },

        async check_email({ commit }, email) {
            return new Promise(((resolve, reject) => {
                commit('check_email')
                instance.post(`${API_ENDPOINTS.BASE_API.CHECK_EMAIL}`, email)
                    .then(res => {
                        reject(res)
                    })
                    .catch(info => {
                        resolve(info)
                    })
            }))
        },

        async set_username({ commit }, data) {
            return new Promise(((resolve, reject) => {
                commit('SET_USERNAME_REQUEST')
                instance.post(`${API_ENDPOINTS.BASE_API.SET_USERNAME}`, data)
                    .then(res => {
                        commit('SET_USERNAME_SUCCESS')
                        resolve(res)
                    })
                    .catch(err => {
                        commit('SET_USERNAME_ERROR')
                        reject(err)
                    })
            }))
        },

        async get_user({ commit }, id) {
            return new Promise(((resolve, reject) => {
                commit('GET_USER_REQUEST')
                instance.post(`${API_ENDPOINTS.BASE_API.GET_USER_DATA}`, id)
                    .then(res => {
                        let user = res.data.user
                        commit('GET_USER_SUCCESS', user)
                        resolve(res)
                    })
                    .catch(err => {
                        commit('GET_USER_ERROR')
                        reject(err)
                    })
            }))
        },

        async get_all_users({ commit }) {
            return new Promise((resolve, reject) => {
                commit('GET_ALL_USERS_REQUEST')
                instance.get(`${API_ENDPOINTS.BASE_API.GET_ALL_USERS}`)
                    .then(res => {
                        let users = res.data.users
                        commit('GET_ALL_USERS_SUCCESS', users)
                        resolve(res)
                    })
                    .catch(err => {
                        commit('GET_ALL_USERS_ERROR')
                        reject(err)
                    })
            })
        },

        async reset_state({commit}) {
            commit('RESET_STATE')
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        userId: state => state.userId
    }
})
