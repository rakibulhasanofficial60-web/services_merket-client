import { Outlet } from "react-router-dom";
import Navbar from "../routes/pages/shared/Navbar/Navbar";

const Main = () => {
    return (
        <div className="bg-white">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;