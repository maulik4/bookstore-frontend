
import BookStore from '../views/BookStore.vue'
import BookDetails from '../views/BookDetails.vue'

const customerRoutes = [
    {
        path: '/',
        name: 'Bookstore',
        component: BookStore
    },
    {
        path: '/book/:id',
        name: 'BookDetails',
        component: () => BookDetails,
        props: true
    }
]
export default customerRoutes;