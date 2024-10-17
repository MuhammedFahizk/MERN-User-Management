import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

export const routes = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signUp',
                element: <SignUp/>
            },
            {
                path: '/home',
                element: <Home/>
            }
        ]
    }
])