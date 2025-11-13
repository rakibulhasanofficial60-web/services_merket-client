import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "./pages/Home/Home/Home";
import Address from "./pages/Address/Address";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/address',
                element: <Address></Address>
            },
            {
                path: '/date-time',
                element: <Address></Address>
            },
            {
                path: '/confirmation',
                element: <Address></Address>
            },
        ]
    }
])