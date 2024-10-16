import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

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
            }
        ]
    }
])