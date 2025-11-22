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
import OutstandingPayments from "../UserDashboard/OutstandingPayments";
import SavedLocations from "../UserDashboard/SaveLocations";
import PaymentMethods from "../UserDashboard/PaymentMethods";
import MyWallet from "../UserDashboard/MyWallet";
import DeleteAccount from "../UserDashboard/DeleteAccount";
import InviteFriend from "../UserDashboard/InviteFriend";
import BookingDetails from "./pages/BookingDetails/BookingDetails";
import AddServices from "../AdminDashboard/AddServices";
import AdminBooking from "../AdminDashboard/AdminBooking";
import AddServiceType from "../AdminDashboard/AddServiceType";
import AddPropertyType from "../AdminDashboard/AddPropertyType";
import AddPropertyItem from "../AdminDashboard/AddPropertyItem";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'address', element: <Address /> },
            { path: 'date-time', element: <DateTime /> },
            { path: 'confirmation', element: <Confirmation /> },
            { path: 'booking-success', element: <BookingSuccess /> },
            { path: 'booking-details', element: <BookingDetails /> }
        ]
    },
    {
        path: 'dashboard',
        element: <UserDashboard />,
        children: [
            { path: 'booking', element: <UserBooking /> },
            { path: 'quotes', element: <UserQuotes /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'outstanding-payments', element: <OutstandingPayments /> },
            { path: 'saved-locations', element: <SavedLocations /> },
            { path: 'payment-methods', element: <PaymentMethods /> },
            { path: 'wallet', element: <MyWallet /> },
            { path: 'delete-account', element: <DeleteAccount /> },
            { path: 'invite-friend', element: <InviteFriend /> },

            // admin routes 
            { path: 'add-services', element: <AddServices /> },
            { path: 'admin-booking', element: <AdminBooking /> },
            { path: 'add-service-type', element: <AddServiceType /> },
            { path: 'add-property-type', element: <AddPropertyType /> },
            { path: 'add-property-item', element: <AddPropertyItem /> },
        ]
    }
]);