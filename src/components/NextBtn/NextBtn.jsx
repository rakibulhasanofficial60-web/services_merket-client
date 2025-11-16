import { useLocation, useNavigate } from "react-router-dom";
import { useSummary } from "../../provider/SummaryProvider";
import { steps } from "./FlowSteps";

const NextBtn = ({ name = "Next", disabled }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { itemSummary, address, date, time } = useSummary();
    const currentIndex = steps.indexOf(pathname);
    const nextPath = steps[currentIndex + 1];
    let isDisabled = disabled ?? false;

    if (pathname === "/services" && itemSummary.length === 0) isDisabled = true;
    if (pathname === "/address" && !address) isDisabled = true;
    if (pathname === "/date-time" && (!date || !time)) isDisabled = true;

    return (
        <div className="border">
            <button
                onClick={() => navigate(nextPath)}
                disabled={isDisabled}
                className={`
                flex items-center justify-center gap-2
                px-6 py-3 rounded-md font-semibold 
                text-white text-base
                transition-all duration-200

                /* Mobile full width */
                w-full sm:w-auto
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