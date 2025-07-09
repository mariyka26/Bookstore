import { createBrowserRouter } from 'react-router'
import type { RouteObject } from 'react-router'
import { Main } from './page/main'
import { Navigate } from 'react-router';
import { Layout } from './components/layout'
import { FavoriteBooks } from './page/favorite-books'
import { BookDetailsPage } from './page/book-details'


const routes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/books/react" replace />
            },
            {
                path: '/books/:query/:page?',
                element: <Main />
            },
            {
                path: '/favorites',
                element: <FavoriteBooks />
            },
            {
                path: '/book/:isbn13',
                element: <BookDetailsPage />
            }
        ]
    },

];

export const router = createBrowserRouter(routes)