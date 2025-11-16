import { useEffect, useRef, useState } from "react";
import NextBtn from "../../../components/NextBtn/NextBtn";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import Summery from "../../../components/Summery/Summery";
import { useSummary } from "../../../provider/SummaryProvider";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const days = [
    { id: 1, short: "Sat", label: "Nov 15", extra: 5 },
    { id: 2, short: "Sun", label: "Nov 16", extra: 5 },
    { id: 3, short: "Mon", label: "Nov 17", extra: 9 },
    { id: 4, short: "Tue", label: "Nov 18" },
    { id: 5, short: "Wed", label: "Nov 19" },
    { id: 6, short: "Thu", label: "Nov 20" },
];

const times = [
    "12:00 PM - 12:30 PM",
    "1:00 PM - 1:30 PM",
    "2:00 PM - 2:30 PM",
    "3:00 PM - 3:30 PM",
    "4:00 PM - 4:30 PM",
    "5:00 PM - 5:30 PM",
    "6:00 PM - 6:30 PM",
];

const DateTime = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const scrollerRef = useRef(null);

    const { itemSummary, total, vat, serviceCharge, showInput, setShowInput, address, date, setDate, time, setTime } = useSummary();

    const scroll = (dir) => {
        if (!scrollerRef.current) return;
        const amount = 200;

        scrollerRef.current.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        setDate(selectedDay);
        setTime(selectedTime);
    }, [selectedDay, selectedTime]);

    return (
        <div>
            <ServiceDetails title="Date & Time" currentStep={3} />

            <div className="flex gap-8 mt-5">
                <div className="md:w-[60%] mb-4 space-y-4">
                    <div className="p-6 bg-white rounded-lg shadow-sm">

                        {/* Day Selector */}
                        <h3 className="text-lg font-semibold mb-4">
                            Which day would you like us to come?
                        </h3>

                        <div className="relative max-w-[300px] mx-auto md:max-w-4xl">
                            {/* Left Scroll Button */}
                            <button
                                onClick={() => scroll("left")}
                                className="hidden absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10  md:flex items-center justify-center"
                            >
                                <IoIosArrowBack className="text-3xl font-bold" />
                            </button>

                            {/* Day List */}
                            <div
                                ref={scrollerRef}
                                className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-10"
                            >
                                {days.map((d) => {
                                    const isActive = selectedDay === d.label;

                                    return (
                                        <div
                                            key={d.id}
                                            onClick={() => setSelectedDay(d.label)}
                                            className={`snap-start min-w-[100px] md:min-w-[85px] px-2 py-1 rounded-lg border cursor-pointer flex flex-col items-center gap-1 transition
                ${isActive ? "bg-[#B2D7DE] border-transparent shadow" : "bg-white border-gray-200 hover:bg-gray-50"}
            `}
                                        >
                                            {d.extra && (
                                                <span className="self-start -mt-4 -ml-1 bg-orange-500 text-white text-[11px] font-semibold rounded-full px-2 py-0.5">
                                                    +฿{d.extra}
                                                </span>
                                            )}

                                            <div className="text-sm text-gray-600">{d.short}</div>
                                            <div className="text-sm font-medium">{d.label}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right Scroll Button */}
                            <button
                                onClick={() => scroll("right")}
                                className="hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10  md:flex items-center justify-centerv cursor-pointer"
                            >
                                <IoIosArrowForward className="text-3xl font-bold" />
                            </button>
                        </div>

                        {/* Time Selector */}
                        <h3 className="text-lg font-semibold mt-8 mb-4">
                            What time would you like us to arrive?
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {times.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedTime(t)}
                                    className={`w-full text-left rounded-lg border px-6 py-4 transition
                                        ${selectedTime === t ? "bg-[#E6F6F6] border-teal-300 shadow-sm" : "bg-white border-gray-200 hover:bg-gray-50"}
                                    `}
                                >
                                    <span className="text-sm font-medium">{t}</span>
                                </button>
                            ))}
                        </div>

                        {/* Note */}
                        <div className="mt-8 p-4 bg-gray-50 border rounded-md flex gap-4 text-sm text-gray-700">
                            <svg className="w-5 h-5 text-gray-500 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 9v2m0 4h.01M21 12A9 9 0 1112 3a9 9 0 019 9z" strokeWidth="1.5" />
                            </svg>

                            <div>
                                Free cancellation up to 6 hours before your booking start time.{" "}
                                <a href="#" className="text-teal-600 underline">View cancellation policy</a>
                            </div>
                        </div>
                    </div>
                </div>

                <Summery
                    address={address}
                    itemSummary={itemSummary}
                    total={total}
                    showInput={showInput}
                    setShowInput={setShowInput}
                    vat={vat}
                    serviceCharge={serviceCharge}
                    date={date}
                    time={time}
                />
            </div>
            <div className="hidden md:block">
                <NextBtn />
            </div>
        </div>
    );
};

export default DateTime;