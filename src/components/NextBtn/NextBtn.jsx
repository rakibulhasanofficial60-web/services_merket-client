import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NextBtn = ({ path }) => {
    const navigate = useNavigate();

    return (
        <div className="pb-20 md:pb-[70px]">
            <div className="bottom-0 fixed left-0 w-full z-30 bg-white shadow-md flex justify-center py-4">
                <button
                    onClick={() => navigate(path)}
                    className="btn text-lg font-medium w-full md:w-[270px] border-0 bg-[#ED6329] text-white"
                >
                    NEXT <IoArrowForward className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default NextBtn;