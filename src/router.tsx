import { createBrowserRouter } from 'react-router'
import type { RouteObject } from 'react-router'
import { CardBook } from './components/card-book'
import { BookList } from './components/book-list'
import { Navigate } from 'react-router';


const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="/books/react" replace />
    },

    {
        path: '/books/:query/:page?',
        element: <BookList />
    },

];

export const router = createBrowserRouter(routes)