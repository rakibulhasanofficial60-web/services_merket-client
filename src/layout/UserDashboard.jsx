import { FaCalendarAlt } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from '../assets/logo/logo.png';
import dirhum from '../assets/icon/dirhum.png';
import { LuMenu } from "react-icons/lu";
import { FaUser } from "react-icons/fa";

const UserDashboard = () => {
    const links =
        <ul>
            {/* My Bookings */}
            <li className="list-none border-y border-dashed hover:bg-gray-50">
                <NavLink
                    to="/dashboard/booking"
                    className={({ isActive }) =>
                        `text-[14px] font-medium flex items-center gap-2 text-[#157D91] px-3 py-2 transition 
                    ${isActive ? "font-extrabold" : ""}`
                    }>
                    <FaCalendarAlt /> My Bookings
                </NavLink>
            </li>

            {/* My Quotes */}
            <li className="list-none border-b border-dashed hover:bg-gray-50">
                <NavLink
                    to="/dashboard/quotes"
                    className={({ isActive }) =>
                        `text-[14px] font-medium flex items-center gap-2 text-[#157D91] px-3 py-2 transition 
                    ${isActive ? "font-extrabold" : ""}`
                    }>
                    <LuMenu className="text-[17px]" /> My Quotes
                </NavLink>
            </li>

            {/* My Profile */}
            <li className="list-none border-b border-dashed hover:bg-gray-50">
                <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                        `text-[14px] font-medium flex items-center gap-2 text-[#157D91] px-3 py-2 transition 
                    ${isActive ? "font-extrabold" : ""}`
                    }>
                    <FaUser /> My Profile
                </NavLink>
            </li>

            {/* Outstanding Payments */}
            <li className="list-none border-b border-dashed hover:bg-gray-50">
                <NavLink
                    to="/dashboard/outstanding-payments"
                    className={({ isActive }) =>
                        `text-[14px] font-medium flex items-center gap-2 text-[#157D91] px-3 py-2 transition 
                    ${isActive ? "font-extrabold" : ""}`
                    }>
                    <FaCalendarAlt /> Outstanding Payments
                </NavLink>
            </li>

            {/* Saved Locations */}
            <li className="list-none border-b border-dashed hover:bg-gray-50">
                <NavLink
                    to="/dashboard/saved-locations"
                    className={({ isActive }) =>
                        `text-[14px] font-medium flex items-center gap-2 text-[#157D91] px-3 py-2 transition 
                    ${isActive ? "font-extrabold" : ""}`
                    }>
                    <FaCalendarAlt /> Saved Locations
                </NavLink>
            </li>

            {/* Payment Methods */}
            <li className="list-none border-b border-dashed hover:bg-gray-50">
                <NavLink
                    to="/dashboard/payment-methods"
                    className={({ isActive }) =>
                        `text-[14px] font-medium flex items-center gap-2 text-[#157D91] px-3 py-2 transition 
                    ${isActive ? "font-extrabold" : ""}`
                    }>
                    <FaCalendarAlt /> Payment Methods
                </NavLink>
            </li>

            {/* Support */}
            <li className="list-none border-b border-dashed hover:bg-gray-50">
                <NavLink
                    to="/dashboard/support"
                    className={({ isActive }) =>
                        `text-[14px] font-medium flex items-center gap-2 text-[#157D91] px-3 py-2 transition 
                    ${isActive ? "font-extrabold" : ""}`
                    }>
                    <FaCalendarAlt /> Support
                </NavLink>
            </li>

            {/* My Wallet */}
            <li className="list-none border-b border-dashed hover:bg-gray-50">
                <NavLink
                    to="/dashboard/wallet"
                    className={({ isActive }) =>
                        `text-[14px] font-medium flex items-center gap-2 text-[#157D91] px-3 py-2 transition 
                    ${isActive ? "font-extrabold" : ""}`
                    }>
                    <FaCalendarAlt /> My Wallet
                </NavLink>
            </li>

            {/* Delete Account */}
            <li className="list-none border-b border-dashed hover:bg-gray-50">
                <NavLink
                    to="/dashboard/delete-account"
                    className={({ isActive }) =>
                        `text-[14px] font-medium flex items-center gap-2 text-[#157D91] px-3 py-2 transition 
                    ${isActive ? "font-extrabold" : ""}`
                    }>
                    <FaCalendarAlt /> Delete Account
                </NavLink>
            </li>

            {/* Invite a Friend + Credit Badge */}
            <li className="list-none border-b border-dashed hover:bg-gray-50 flex justify-between items-center px-3 py-2">
                <NavLink
                    to="/dashboard/invite"
                    className={({ isActive }) =>
                        `text-[14px] font-medium flex items-center gap-2 text-[#157D91] py-1 transition 
                    ${isActive ? "font-extrabold" : ""}`
                    }>
                    <FaCalendarAlt /> Invite a friend
                </NavLink>

                <span className="bg-[#ED6329] text-white text-[11px] px-2 py-0.5 rounded">
                    Get 30 ৳ credit
                </span>
            </li>

            {/* Logout */}
            <li className="list-none py-3 px-3 hover:underline cursor-pointer text-[#157D91]">
                Logout
            </li>
        </ul>


    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto mt-10 px-4">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar flex justify-between lg:hidden">
                    <div className="flex items-center gap-2">
                        <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                            <MdMenu size={24} />
                        </label>
                    </div>
                </div>

                <div className="px-10">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side border border-[#CED4DA]">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <div className="md:w-72 bg-[#FFFFFF] p-2">
                    <div className="flex flex-col justify-center mb-4">
                        <Link to='/' className="text-5xl">
                            <img src={logo} alt="" />
                        </Link>

                        <div className="text-center flex flex-col items-center mt-5 space-y-3">
                            <h2 className="text-2xl text-[#5D4F52] font-bold">Rakib</h2>
                            <div className="flex items-center justify-center gap-1.5 text-xl w-[70px] bg-[#ED6329] py-1 rounded-md">
                                <img className="h-4 w-4" src={dirhum} alt="" />
                                <p>80</p>
                            </div>
                            <p className="font-medium text-[#01788E]">Al Bada'a, Dubai</p>
                        </div>
                    </div>
                    {links}
                    <div className="w-[140px]">

                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserDashboard;