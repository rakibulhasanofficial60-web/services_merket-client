import { Link } from "react-router-dom";
import logo from "../../../../assets/logo/logo.png";
import { useState } from "react";
import LoginModal from "../../../../components/LoginModal/LoginModal";

const Navbar = () => {
    const user = false;
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md md:px-12 navbar md:flex md:justify-center md:items-center">
                <div className="navbar-start flex items-center">
                    <div className="dropdown">
                        {/* <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        >
                            
                            <Link className="hidden lg:block" to="/">
                                <img
                                    className="w-[133px] h-[33px]"
                                    src={logo}
                                    alt="Logo"
                                />
                            </Link>
                        </ul> */}
                        <Link className="block lg:hidden" to="/">
                            <img
                                className="w-[133px] h-[33px]"
                                src={logo}
                                alt="Logo"
                            />
                        </Link>

                    </div>

                    <Link className="hidden lg:block" to="/">
                        <img
                            className="w-[133px] h-[33px]"
                            src={logo}
                            alt="Logo"
                        />
                    </Link>
                </div>

                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {/* {links} */}
                    </ul>
                </div>

                <div className="navbar-end mr-4 md:w-[100px]">
                    {user ? (
                        <button className="btn bg-white text-gray-500 border-0 shadow-xs">
                            Log Out
                        </button>
                    ) : (
                        <button onClick={() => setOpenModal(true)} className="btn bg-white text-[#5D4F52] border-0 shadow-xs font-bold">
                            Login
                        </button>
                    )}
                </div>
            </div>

            {/* 🔹 Spacer div — so content doesn’t go under navbar */}
            <div className="h-10 md:h-[70px]"></div>
            <LoginModal open={openModal} onClose={() => setOpenModal(false)} />
        </>
    );
};

export default Navbar;