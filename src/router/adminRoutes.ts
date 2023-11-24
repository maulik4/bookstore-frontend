
import AdminLoginView from '../views/Admin/Login.vue'
import AdminRegisterView from '../views/Admin/Register.vue'
import AdminBookListView from '../views/Admin/Book/AdminBookList.vue'
import AdminUpsertBookView from '../views/Admin/Book/AdminUpsertBook.vue'
import AdminShowBookView from '../views/Admin/Book/AdminShowBook.vue'


const adminRoutes =
    [
        {
            path: '/admin',
            redirect: '/admin/login'
        },
        {
            path: '/admin/login',
            name: 'AdminLogin',
            component: AdminLoginView
        },
        {
            path: '/admin/register',
            name: 'AdminRegister',
            component: AdminRegisterView
        },
        {
            path: '/admin/books',
            name: 'AdminBookList',
            component: AdminBookListView,
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/book/create',
            name: 'AdminUpsertBook',
            component: AdminUpsertBookView,
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/book/edit/:id',
            name: 'AdminEditBook',
            component: AdminUpsertBookView,
            props: true,
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/book/view/:id',
            name: 'AdminShowBook',
            component: AdminShowBookView,
            props: true,
            meta: { requiresAuth: true }
        }
    ];

export default adminRoutes;