import { createRouter, createWebHistory } from 'vue-router'
import CustomerLayout from '../views/layouts/CustomerLayout.vue'
import AdminLayout from '../views/layouts/AdminLayout.vue'
import store from '../store'
import adminRoutes from './adminRoutes'
import customerRoutes from './customerRoutes'

/**
 * Define routes and their components
 */
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: CustomerLayout,
			children: customerRoutes
		},
		{
			path: '/admin',
			component: AdminLayout,
			children: adminRoutes
		}
		// Add more routes as needed
	]
})

/**
 * Check if user is authenticated before each route change
 */
router.beforeEach((to, from, next) => {
	if (
		to.name &&
		to.name.startsWith('Admin') &&
		to.meta.requiresAuth &&
		!store.getters.isAuthenticated
	) {
		// Redirect to login if trying to access a protected route without authentication
		next('/admin/login')
	} else if (
		to.name &&
		to.name.startsWith('Admin') &&
		!to.meta.requiresAuth &&
		store.getters.isAuthenticated
	) {
		next('/admin/books')
	} else {
		next()
	}
})
export default router
