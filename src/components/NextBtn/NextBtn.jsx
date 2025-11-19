import { useLocation, useNavigate } from "react-router-dom";
import { useSummary } from "../../provider/SummaryProvider";
import { steps } from "./FlowSteps";

const NextBtn = ({ name = "Next", disabled, onClick }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { itemSummary, address, date, time } = useSummary();
    const currentIndex = steps.indexOf(pathname);
    const nextPath = steps[currentIndex + 1];
    let isDisabled = disabled ?? false;

    if (pathname === "/services" && itemSummary.length === 0) isDisabled = true;
    if (pathname === "/address" && !address) isDisabled = false;
    if (pathname === "/date-time" && (!date || !time)) isDisabled = true;

    const isLastStep = !nextPath;

    const handleClick = () => {
        if (isLastStep && onClick) {
            onClick(); // ONLY ON LAST STEP FIRE
            return;    // no navigation
        }
        navigate(nextPath);
    };

    return (
        <div className="w-full p-2 flex justify-center md:fixed md:bottom-0 md:left-0 md:bg-white md:shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:z-50">
            <button
                onClick={handleClick}
                disabled={isDisabled}
                className={`
                    flex items-center justify-center gap-2
                    px-6 py-3 rounded-sm cursor-pointer font-semibold 
                    text-white transition-all duration-200 text-xl uppercase
                    w-[90%] md:w-[60%] lg:w-60
                    ${isDisabled ? "bg-gray-300" : "bg-[#ED6329] hover:bg-[#d4541f]"}
                `}
            >
                {name}
                <span className="text-xl">→</span>
            </button>
        </div>
    );
};

export default NextBtn;