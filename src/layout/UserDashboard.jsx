import { FaCalendar } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from '../assets/logo/logo.png';
import dirhum from '../assets/icon/color_dirhum.png'


const UserDashboard = () => {
    const links =
        <div>
            <li className="list-none border-y border-dashed hover:underline hover:bg-gray-100">
                <NavLink to="/dashboard/booking" className={({ isActive }) => `text-[14px] font-medium flex items-center text-[#157D91] gap-2 rounded-md px-3 py-2 transition ${isActive ? "text-[#157D91]" : ""}`} >
                    <FaCalendar /> My Bookings
                </NavLink>
            </li>
            <li className="list-none border-b border-dashed hover:underline hover:bg-gray-100">
                <NavLink to="/dashboard/quotes" className={({ isActive }) => `text-[14px] font-medium flex items-center text-[#157D91] gap-2 rounded-md px-3 py-2 transition ${isActive ? "font-extrabold" : ""}`} >
                    <FaCalendar /> My Quotes
                </NavLink>
            </li>
        </div>

    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto mt-10">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar flex justify-between lg:hidden">
                    <div className="flex items-center gap-2">
                        <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                            <MdMenu size={24} />
                        </label>
                    </div>
                </div>

                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side border border-[#CED4DA]">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <div className="md:w-72 bg-[#FFFFFF] p-2">
                    <div className="flex flex-col justify-center mb-6 md:mb-11">
                        <Link to='/' className="text-5xl">
                            <img src={logo} alt="" />
                        </Link>

                        <div className="text-center mt-5">
                            <h2 className="text-2xl text-[#5D4F52] font-bold">Rakib</h2>
                            <div className="flex items-center gap-1.5 text-xl bg-[#ED6329]">
                                <img className="h-4 w-4" src={dirhum} alt="" />
                                <p>80</p>
                            </div>
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