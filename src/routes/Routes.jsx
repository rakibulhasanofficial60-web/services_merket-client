import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "./pages/Home/Home/Home";
import Address from "./pages/Address/Address";
import DateTime from "./pages/DateTime/DateTime";
import Confirmation from "./pages/Confirmation/Confirmation";

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
                element: <DateTime></DateTime>
            },
            {
                path: '/confirmation',
                element: <Confirmation></Confirmation>
            },
        ]
    }
])