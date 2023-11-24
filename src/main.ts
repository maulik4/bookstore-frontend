import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import store from './store'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)

/**
 * Global variables
 */
app.config.globalProperties.$imageUrl = import.meta.env.VITE_API_URL+'/storage'


/**
 * Set up axios defaults for API calls and authentication headers if token is present in local storage
 */
axios.defaults.baseURL = import.meta.env.VITE_API_URL + '/' + import.meta.env.VITE_API_VERSION
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Access-Control-Allow-Methods'] =
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'

/**
 * use router and store
 */
app.use(router)
app.use(store)


/**
 * Mount the app
 */
app.mount('#app')
