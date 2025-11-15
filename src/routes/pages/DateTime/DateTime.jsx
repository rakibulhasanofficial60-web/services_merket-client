import { useEffect, useRef, useState } from "react";
import NextBtn from "../../../components/NextBtn/NextBtn";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import Summery from "../../../components/Summery/Summery";
import { useSummary } from "../../../provider/SummaryProvider";

const days = [
    { id: 1, short: "Sat", label: "Nov 15", extra: 5 },
    { id: 2, short: "Sun", label: "Nov 16", extra: 5 },
    { id: 3, short: "Mon", label: "Nov 17" },
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
                    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">

                        {/* Day Selector */}
                        <h3 className="text-lg font-semibold mb-4">
                            Which day would you like us to come?
                        </h3>

                        <div className="relative">
                            {/* Left Scroll Button */}
                            <button
                                onClick={() => scroll("left")}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white border shadow-sm flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                        transform="rotate(180 10 10)"
                                    />
                                </svg>
                            </button>

                            {/* Day List */}
                            <div
                                ref={scrollerRef}
                                className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-10 snap-x snap-mandatory"
                            >
                                {days.map((d) => {
                                    const isActive = selectedDay === d.label;

                                    return (
                                        <div
                                            key={d.id}
                                            onClick={() => setSelectedDay(d.label)}
                                            className={`snap-start min-w-[110px] md:min-w-[140px] px-3 py-3 rounded-lg border cursor-pointer flex flex-col items-center gap-2 transition
                ${isActive ? "bg-slate-200 border-transparent shadow" : "bg-white border-gray-200 hover:bg-gray-50"}
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
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white border shadow-sm flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M7.707 3.707a1 1 0 010 1.414L4.414 9H16a1 1 0 110 2H4.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" />
                                </svg>
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
            <NextBtn path="/confirmation" disabled={!selectedDay || !selectedTime} />
        </div>
    );
};

export default DateTime;