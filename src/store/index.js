import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user.module'
import auth from './modules/auth.module'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        auth
    }
})
