import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Index from '../pages/home/Index'
import Homes from '../pages/home/HomePage'
import Login from '../pages/login/Login'
import Row from '../pages/home/Row'
const routes = [
    {
        path: '/',
        element: <Navigate to='/home/homes'></Navigate>
    },
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/home/homes',
                element: <Homes />
            },
            {
                path: '/home/index',
                element: <Index />
            },
            {
                path: '/home/row',
                element: <Row />
            }
        ]
    }, {
        path: '/login',
        element: <Login />,
    }
]
const router = createBrowserRouter(routes)

export default router