import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    AUTH_LOGOUT,
    REGISTER_REQUEST,
    REGISTER_ERROR,
    CHECK_EMAIL_REQUEST,
    CHECK_EMAIL_SUCCESS,
    CHECK_EMAIL_ERROR } from "@/store/actions/auth.action"
import API_ENDPOINTS from '../../../config/api.config'
import instance from '../../../config/axios.config'

const state = {
    token: localStorage.getItem('token') || '',
    status: '',
    hasLoadedOnce: false,
    emailExists: false
}

const getters = {
    isAuthenticated: state => !!state.token,
    isEmailExists: state => state.emailExists
}

const actions = {
    [AUTH_REQUEST]: async ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST)
            instance.post(`${API_ENDPOINTS.BASE_API.LOGIN}`, data)
                .then(res => {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('id', res.data.user._id)
                    instance.defaults.headers.common['Authorization'] = res.data.token
                    commit(AUTH_SUCCESS, res.data.token)
                    resolve(res)
                })
                .catch(err => {
                    commit(AUTH_ERROR, err)
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },

    [REGISTER_REQUEST]: async ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            commit(REGISTER_REQUEST)
            instance.post(`${API_ENDPOINTS.BASE_API.REGISTER}`, data)
                .then(res => {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('id', res.data.user._id)
                    instance.defaults.headers.common['Authorization'] = res.data.token
                    commit(AUTH_SUCCESS, res.data.token)
                    resolve(res)
                })
                .catch(err => {
                    commit(REGISTER_ERROR, err)
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },

    [CHECK_EMAIL_REQUEST]: async({ commit }, email) => {
        return new Promise((resolve, reject) => {
            commit(CHECK_EMAIL_REQUEST)
            instance.post(`${API_ENDPOINTS.BASE_API.CHECK_EMAIL}`, email)
                .then(res => {
                    commit(CHECK_EMAIL_SUCCESS)
                    resolve(res)
                })
                .catch(err => {
                    commit(CHECK_EMAIL_ERROR)
                    reject(err)
                })
        })
    },

    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise((resolve => {
            commit(AUTH_LOGOUT)
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            resolve()
        }))
    }
}

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success'
        state.token = token
        state.hasLoadedOnce = true
    },
    [AUTH_ERROR]: state => {
        state.status = 'error'
        state.hasLoadedOnce = true
    },
    [AUTH_LOGOUT]: state => {
        state.status = 'success'
        state.token = ''
    },

    [REGISTER_REQUEST]: state => {
        state.status = 'loading'
    },
    [REGISTER_ERROR]: state => {
        state.status = 'error'
        state.token = ''
    },
    [CHECK_EMAIL_REQUEST]: state => {
        state.status = 'searching'
    },
    [CHECK_EMAIL_SUCCESS]: state => {
        state.status = 'exists'
        state.emailExists = true
    },
    [CHECK_EMAIL_ERROR]: state => {
        state.status = 'non-exists'
        state.emailExists = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
