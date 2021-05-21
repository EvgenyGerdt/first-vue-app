import {
    USER_REQUEST,
    USER_SUCCESS,
    USER_ERROR,
    CHANGE_DATA_REQUEST,
    CHANGE_DATA_SUCCESS,
    CHANGE_DATA_ERROR,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_ERROR,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_ERROR,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    CLEAR_RESET_TOKEN,
    UPDATE_USERNAME,
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_ERROR, GET_MESSAGES, GET_MESSAGES_SUCCESS, GET_MESSAGES_ERROR
} from "@/store/actions/user.action"
import API_ENDPOINTS from '../../../config/api.config'
import { AUTH_LOGOUT } from "@/store/actions/auth.action"
import instance  from "../../../config/axios.config"

const state = {
    status: '',
    session: '',
    users: {},
    id: localStorage.getItem('id') || '',
    messages: {}
}

const getters = {
    getUser: state => state.session,
    isProfileLoaded: state => !!state.session._id,
    getMessages: state => state.messages
}

const actions = {
    [USER_REQUEST]: ({commit, dispatch}, id) => {
        return new Promise((resolve, reject) => {
            commit(USER_REQUEST)
            instance.post(`${API_ENDPOINTS.BASE_API.GET_USER_DATA}`, {userId: id})
                .then(res => {
                    commit(USER_SUCCESS, res.data.session)
                    resolve(res)
                })
                .catch(err => {
                    commit(USER_ERROR)
                    dispatch(AUTH_LOGOUT)
                    reject(err)
                })
        })
    },

    [ALL_USERS_REQUEST]: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit(ALL_USERS_REQUEST)
            instance.get(`${API_ENDPOINTS.BASE_API.GET_ALL_USERS}`)
                .then(res => {
                    commit(ALL_USERS_SUCCESS, res.data.users)
                    resolve(res)
                })
                .catch(err => {
                    commit(ALL_USERS_ERROR)
                    dispatch(AUTH_LOGOUT)
                    reject(err)
                })
        })
    },

    [FORGET_PASSWORD_REQUEST]: ({commit}, email) => {
        return new Promise((resolve, reject) => {
            commit(FORGET_PASSWORD_REQUEST)
            instance.post(`${API_ENDPOINTS.BASE_API.FORGET_PASSWORD}`, email)
                .then(res => {
                    localStorage.setItem('resetToken', res.data.token)
                    commit(FORGET_PASSWORD_SUCCESS)
                    resolve(res)
                })
                .catch(err => {
                    commit(FORGET_PASSWORD_ERROR)
                    reject(err)
                })
        })
    },

    [RESET_PASSWORD_REQUEST]: ({commit}, data) => {
        return new Promise((resolve, reject) => {
            commit(RESET_PASSWORD_REQUEST)
            instance.post(`${API_ENDPOINTS.BASE_API.RESET_PASSWORD}`, data)
                .then(res => {
                    localStorage.removeItem('resetToken')
                    commit(RESET_PASSWORD_SUCCESS)
                    resolve(res)
                })
                .catch(err => {
                    localStorage.removeItem('resetToken')
                    commit(RESET_PASSWORD_ERROR)
                    reject(err)
                })
        })
    },
    [CLEAR_RESET_TOKEN]: ({commit}) => {
        commit(CLEAR_RESET_TOKEN)
        localStorage.removeItem('resetToken')
    },

    [CHANGE_DATA_REQUEST]: ({commit}, data) => {
        return new Promise((resolve, reject) => {
            commit(CHANGE_DATA_REQUEST)
            instance.post(`${API_ENDPOINTS.BASE_API.SET_USERNAME}`, data)
                .then(res => {
                    commit(CHANGE_DATA_SUCCESS, data.username)
                    resolve(res)
                })
                .catch(err => {
                    commit(CHANGE_DATA_ERROR)
                    reject(err)
                })
        })
    },

    [SEND_MESSAGE]: ({commit}, data) => {
        return new Promise((resolve, reject) => {
            commit(SEND_MESSAGE)
            instance.post(`${API_ENDPOINTS.BASE_API.SEND_MESSAGE}`, data)
                .then(res => {
                    commit(SEND_MESSAGE_SUCCESS)
                    resolve(res)
                })
                .catch(err => {
                    commit(SEND_MESSAGE_ERROR)
                    reject(err)
                })
        })
    },

    [GET_MESSAGES]: ({commit}, data) => {
        return new Promise((resolve, reject) => {
            commit(GET_MESSAGES)
            instance.post(`${API_ENDPOINTS.BASE_API.GET_MESSAGES}`, data)
                .then(res => {
                    commit(GET_MESSAGES_SUCCESS, res.data.messages)
                    resolve(res)
                })
                .catch(err => {
                    commit(GET_MESSAGES_ERROR)
                    reject(err)
                })
        })
    }
}

const mutations = {
    [USER_REQUEST]: state => {
        state.status = 'loading'
    },
    [USER_SUCCESS]: (state, session) => {
        state.status = 'success'
        state.session = session
    },
    [USER_ERROR]: state => {
        state.status = 'error'
    },

    [ALL_USERS_REQUEST]: state => {
        state.status = 'loading'
    },
    [ALL_USERS_SUCCESS]: (state , users) => {
        state.status = 'success'
        state.users = users
    },
    [ALL_USERS_ERROR]: state => {
        state.status = 'error'
        state.users = {}
    },

    [FORGET_PASSWORD_REQUEST]: state => {
        state.status = 'loading'
    },
    [FORGET_PASSWORD_SUCCESS]: state => {
        state.status = 'success'
    },
    [FORGET_PASSWORD_ERROR]: state => {
        state.status = 'error'
    },

    [RESET_PASSWORD_REQUEST]: state => {
        state.status = 'loading'
    },
    [RESET_PASSWORD_SUCCESS]: state => {
        state.status = 'success'
    },
    [RESET_PASSWORD_ERROR]: state => {
        state.status = 'error'
    },

    [CHANGE_DATA_REQUEST]: state => {
        state.status = 'loading'
    },
    [CHANGE_DATA_SUCCESS]: (state) => {
        state.status = 'success'
    },
    [CHANGE_DATA_ERROR]: state => {
        state.status = 'error'
    },

    [CLEAR_RESET_TOKEN]: state => {
        state.status = 'success'
    },

    [UPDATE_USERNAME]: (state, username) => {
        state.status = 'updated'
        state.session.username = username
    },

    [AUTH_LOGOUT]: state => {
        state.session = {}
    },

    [SEND_MESSAGE]: state => {
        state.status = "sending"
    },

    [SEND_MESSAGE_SUCCESS]: state => {
        state.status = "success"
    },

    [SEND_MESSAGE_ERROR]: state => {
        state.status = "error"
    },

    [GET_MESSAGES]: state => {
        state.status = "loading"
    },

    [GET_MESSAGES_SUCCESS]: (state, messages) => {
        state.status = "success"
        state.messages = messages
    },

    [GET_MESSAGES_ERROR]: state => {
        state.status = "error"
        state.messages = {}
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
