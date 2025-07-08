import { createBrowserRouter } from 'react-router'
import type { RouteObject } from 'react-router'
import { Main } from './page/main'
import { Navigate } from 'react-router';
import { Layout } from './components/layout'


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
    ]
  },

];

export const router = createBrowserRouter(routes)