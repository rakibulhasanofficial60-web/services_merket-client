import { useNavigate } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";

const NextBtn = ({ path, disabled }) => {
    const navigate = useNavigate();

    return (
        <div className="pb-20 md:pb-[70px]">
            <div className="bottom-0 fixed left-0 w-full z-30 bg-white shadow-md flex justify-center py-4">
                <button
                    disabled={disabled}
                    onClick={() => !disabled && navigate(path)}
                    className={`btn text-lg font-medium w-full md:w-[270px] border-0 
                        ${disabled ? "bg-gray-300 cursor-not-allowed" : "bg-[#ED6329] text-white"}
                    `}
                >
                    NEXT <IoArrowForward className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default NextBtn;