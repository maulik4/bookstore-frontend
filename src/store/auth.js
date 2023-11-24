// store/auth.js
import axios from 'axios'

/**
 * This Vuex module handles authentication
 */
export default {
    state: {
        token: null,
        user: null
    },
    mutations: {
        /**
         * Set the token in the state and local storage
         * 
         * @param {*} state 
         * @param {*} token 
         */
        async setToken(state, token) {
            state.token = token
            await localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        },
        /**
         * Set the user in the state
         * 
         * @param {*} state 
         * @param {*} user 
         */
        setUser(state, user) {
            state.user = user
        },
        /**
         * Clear the token and user from the state and local storage
         * 
         * @param {*} state 
         */
        clearAuthData(state) {
            state.token = null
            state.user = null
            localStorage.removeItem('token')
        }
    },
    actions: {
        /**
         * Try to login the user
         */
        async login({ commit, dispatch }, { email, password }) {
            commit('clearAuthData') // Clear previous auth data
            await axios.get(import.meta.env.VITE_API_URL + '/sanctum/csrf-cookie')
            const loginResponse = await axios.post('login', { email, password })
            const { token, user } = loginResponse.data.data
            commit('setToken', token)
            commit('setUser', user)
            return loginResponse
        },
        /**
         * Try to register the user
         */
        async register({ commit, dispatch }, form) {
            commit('clearAuthData') // Clear previous auth data
            await axios.get(import.meta.env.VITE_API_URL + '/sanctum/csrf-cookie')
            const registerResponse = await axios.post('register', form)
            console.log('registerResponse', registerResponse)
            const { token, user } = registerResponse.data.data
            commit('setToken', token)
            commit('setUser', user)
        },
        /**
         * Try to logout the user
         */
        async logout({ commit }) {
            await axios.post('logout')
            commit('clearAuthData')
        }
    },
    getters: {
        /**
         * Check if the user is authenticated
         * 
         * @param {*} state 
         */
        isAuthenticated(state) {
            return !!state.token
        }
    }
}
