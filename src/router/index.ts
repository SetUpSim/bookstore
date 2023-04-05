import {createRouter, createWebHistory} from 'vue-router'
import BookDetails from '@/components/BookDetails.vue';
import BooksTable from '@/components/BooksTable.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/books',
            name: 'books',
            component: BooksTable,
            props: route => ({search: route.query.search})
        },
        {
            path: '/books/new',
            name: 'newbook',
            component: BookDetails,
            props: () => ({bookId: -1})
        },
        {
            path: '/books/:id',
            name: 'details',
            component: BookDetails,
            props: route => ({bookId: route.params.id})
        },
        {
            path: '/',
            redirect: to => '/books'
        },
    ]
})

export default router
