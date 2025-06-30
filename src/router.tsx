import { createBrowserRouter } from 'react-router'
import type { RouteObject } from 'react-router'


const routes: RouteObject[] = [
    {
        path: '/',
        element: <div>Home</div>,
    },
]

export const router = createBrowserRouter(routes)