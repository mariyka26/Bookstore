import { createBrowserRouter } from 'react-router'
import type { RouteObject } from 'react-router'
import { AllNewBooks } from './page/main'
import { Navigate } from 'react-router';
import { Layout } from './components/container/layout'
import { FavoriteBooks } from './page/favorite-books'
import { BookDetailsPage } from './page/book-details'
import { CartBooks } from './page/cart-books'
import { AllBooks } from './page/all-books'

const routes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/books/new" replace />
            },

            {
                path: '/books/new/:page?',
                element: <AllNewBooks />
            },

            {
                path: '/books/:query/:page?',
                element: <AllBooks />
            },

            {
                path: '/favorites',
                element: <FavoriteBooks />
            },

            {
                path: '/cart',
                element: <CartBooks />
            },

            {
                path: '/book/:isbn13',
                element: <BookDetailsPage />
            }
        ]
    },

];

export const router = createBrowserRouter(routes)