import { Outlet } from "react-router-dom";
import Navbar from "../routes/pages/shared/Navbar/Navbar";

const Main = () => {
    return (
        <div className="mx-auto bg-white text-gray-600">
            <Navbar></Navbar>
            <div className="max-w-[950px] mx-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;