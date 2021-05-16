const API_ENDPOINTS = {
    BASE_API: {
        LOGIN: 'http://localhost:3030/api/auth/login',
        REGISTER: 'http://localhost:3030/api/auth/register',
        FORGET_PASSWORD: 'http://localhost:3030/api/auth/forget_password',
        RESET_PASSWORD: 'http://localhost:3030/api/auth/reset_password',
        CHECK_EMAIL: 'http://localhost:3030/api/auth/check_email',
        GET_USER_DATA: 'http://localhost:3030/api/auth/get_user',
        SET_USERNAME: 'http://localhost:3030/api/user/set_username',
        GET_ALL_USERS: 'http://localhost:3030/api/user/get_all_users',
        SEND_MESSAGE: 'http://localhost:3030/api/user/send_message',
        GET_MESSAGES: 'http://localhost:3030/api/user/get_messages'
    }
}

module.exports = API_ENDPOINTS
