import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "./pages/Home/Home/Home";
import Address from "./pages/Address/Address";
import DateTime from "./pages/DateTime/DateTime";
import Confirmation from "./pages/Confirmation/Confirmation";
import UserDashboard from "../layout/UserDashboard";
import UserBooking from "../UserDashboard/UserBooking";
import UserQuotes from "../UserDashboard/UserQuotes";
import UserProfile from "../UserDashboard/UserProfile";
import BookingSuccess from "./pages/BookingSuccess/BookingSuccess";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'address', element: <Address /> },
            { path: 'date-time', element: <DateTime /> },
            { path: 'confirmation', element: <Confirmation /> },
            { path: 'booking-success', element: <BookingSuccess /> }
        ]
    },
    {
        path: 'dashboard',
        element: <UserDashboard />,
        children: [
            { path: 'booking', element: <UserBooking /> },
            { path: 'quotes', element: <UserQuotes /> },
            { path: 'profile', element: <UserProfile /> },
        ]
    }
]);