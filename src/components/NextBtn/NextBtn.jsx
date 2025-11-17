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
        <div
            className="
                w-full
                p-2
                flex justify-center

                /* Mobile (normal, NOT sticky) */
                

                /* md and up = sticky bottom */
                md:fixed md:bottom-0 md:left-0 md:bg-white 
                md:shadow-[0_-2px_10px_rgba(0,0,0,0.06)]
                md:z-50
            "
        >
            <button
                onClick={() => navigate(nextPath)}
                disabled={isDisabled}
                className={`
                    flex items-center justify-center gap-2
                    px-6 py-3 rounded-sm cursor-pointer font-semibold 
                    text-white transition-all duration-200 text-xl uppercase

                    /* width rules */
                    w-[90%]
                    md:w-[60%]
                    lg:w-60

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










// import { useLocation, useNavigate } from "react-router-dom";
// import { useSummary } from "../../provider/SummaryProvider";
// import { steps } from "./FlowSteps";

// const NextBtn = ({ name = "Next", disabled }) => {
//     const navigate = useNavigate();
//     const { pathname } = useLocation();
//     const { itemSummary, address, date, time } = useSummary();
//     const currentIndex = steps.indexOf(pathname);
//     const nextPath = steps[currentIndex + 1];
//     let isDisabled = disabled ?? false;

//     if (pathname === "/services" && itemSummary.length === 0) isDisabled = true;
//     if (pathname === "/address" && !address) isDisabled = true;
//     if (pathname === "/date-time" && (!date || !time)) isDisabled = true;

//     return (
//         <div className="flex justify-center my-4">
//             <button
//                 onClick={() => navigate(nextPath)}
//                 disabled={isDisabled}
//                 className={`
//             flex items-center justify-center gap-2
//             px-6 py-3 rounded-md font-semibold 
//             text-white text-base
//             transition-all duration-200

//             w-full          /* mobile full width */
//             md:w-[60%]      /* medium screens = 60% */
//             lg:w-60    /* large screens = 240px */

//             ${isDisabled ? "bg-gray-300" : "bg-[#ED6329] hover:bg-[#d4541f]"}
//         `}
//             >
//                 {name}
//                 <span className="text-xl">→</span>
//             </button>
//         </div>

//     );
// };

// export default NextBtn;