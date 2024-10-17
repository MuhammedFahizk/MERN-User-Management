import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import PublicRoutes from '../components/Utils/PublicRoutes';
import ProtectedRoutes from '../components/Utils/ProtectedRoutes';

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <PublicRoutes/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signUp',
                element: <SignUp/>
            },
            
        ]
    },
    {
        path: '/',
        element: <ProtectedRoutes/>,
        children: [
            {
                path: '/home',
                element: <Home/>
            }
        ]
    }

])