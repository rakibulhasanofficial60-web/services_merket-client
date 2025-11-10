import { Link, NavLink } from "react-router-dom";
import logo from '../../../../assets/logo/logo.png'


const Navbar = () => {
    const user = false;

    // const links = <div className='md:flex justify-end items-center'>
    //     <li className="text-[18px]"><NavLink to="/" className={({ isActive }) => isActive ? "text-cyan-400 font-bold underline" : "text-cyan-500"}>Home</NavLink></li>
    //     <li className="text-[18px]"><NavLink to="/menu" className={({ isActive }) => isActive ? "text-cyan-400 font-bold underline" : "text-cyan-500"}>Menu</NavLink></li>

    //     <li className="text-[18px]"><NavLink to="/reservation" className={({ isActive }) => isActive ? "text-cyan-400 font-bold underline" : "text-cyan-500"}>Reservation</NavLink></li>
    // </div>

    return (
        <div className="md:px-12 navbar shadow-md md:flex md:justify-center md:items-center">
            <div className="navbar-start flex items-center">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {/* {links} */}
                    </ul>
                </div>
                <Link className="hidden lg:block" to='/'><img className="w-[133px] h-[33px]" src={logo} alt="" /></Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {/* {links} */}
                </ul>
            </div>


            <div className="navbar-end mr-4 md:w-[100px]">
                {user ? <button className="btn bg-white text-gray-500 border-0 shadow-xs">Log Out</button> : <button className="btn bg-white text-[#5D4F52] border-0 shadow-xs font-bold">Login</button>}
            </div>
        </div >
    );
};

export default Navbar;