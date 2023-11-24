// store/index.js
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'

/**
 * Create a new Vuex store for our application
 */
export default createStore({
    modules: {
        auth
    },
    plugins: [createPersistedState()]
})
