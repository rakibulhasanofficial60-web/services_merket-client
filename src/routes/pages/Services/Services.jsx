import { useSummary } from "../../../provider/SummaryProvider";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Summery from "../../../components/Summery/Summery";
import Cover from "../../../components/Cover/Cover";
import CoverContent from "../../../components/CoverContent/CoverContent";
import Card from "../../../components/Card/Card";
import NextBtn from "../../../components/NextBtn/NextBtn";
import { useEffect, useRef } from "react";

const Services = () => {
    const { services, button, setActiveId, activeId, content, itemSummary, total, vat, serviceCharge, showInput, setShowInput, serviceTitle } = useSummary();

    const sectionRefs = useRef({});
    console.log(itemSummary);


    useEffect(() => {
        if (activeId && sectionRefs.current[activeId]) {
            const section = sectionRefs.current[activeId];
            const yOffset = -120;
            const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    }, [activeId]);

    return (
        <div>
            <ServiceDetails title="Service Details" currentStep={1} />
            <div className="md:flex gap-8 mt-5">
                {/* ---------- Left Section services ---------- */}
                <div className="md:w-[60%] md:mb-4 md:space-y-4">
                    <div className="p-4 md:p-0">
                        <input
                            className="py-2 md:py-3 px-3 border border-[#01788E] w-full rounded-md md:px-7 focus:outline-none"
                            type="text"
                            placeholder="Search services..."
                        />
                    </div>

                    <div className="shadow-md rounded-xl">
                        {/* ---------- SERVICE LIST ---------- */}
                        <div>
                            {services?.map((service) => (
                                <div key={service.id}>
                                    <Card service={service} />

                                    {/* ---------- BUTTON SLIDER (filtered by serviceId) ---------- */}
                                    <div className="px-2 md:px-9 bg-white py-3 sticky top-16 z-10">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => {
                                                    const scroller = document.getElementById(`btn-slider-${service.id}`);
                                                    scroller?.scrollBy({ left: -300, behavior: "smooth" });
                                                }}
                                                className="text-3xl font-bold text-[#01788E]"
                                            >
                                                <IoIosArrowBack />
                                            </button>

                                            <div
                                                id={`btn-slider-${service.id}`}
                                                className="flex items-center overflow-x-auto no-scrollbar snap-x snap-mandatory gap-2 py-2 w-full"
                                            >
                                                {button
                                                    ?.filter((b) => b.serviceId === service.id)
                                                    .map((b) => (
                                                        <button
                                                            key={b.id}
                                                            onClick={() => setActiveId(b.id)}
                                                            className={`snap-start shrink-0 min-w-[140px] px-4 py-1 rounded-full border flex items-center gap-2 transition
                                                                ${activeId === b.id
                                                                    ? "text-[#ED6329] border-[#ED6329] border-2 bg-[#FFF2EE]"
                                                                    : "text-[#01788E] border-[#01788E] bg-white"}
                                                            `}
                                                        >
                                                            <img
                                                                className="w-7 h-7 rounded-full"
                                                                src={b.image}
                                                                alt={b.title}
                                                            />
                                                            {b.title}
                                                        </button>
                                                    ))}
                                            </div>

                                            <button
                                                onClick={() => {
                                                    const scroller = document.getElementById(`btn-slider-${service.id}`);
                                                    scroller?.scrollBy({ left: 300, behavior: "smooth" });
                                                }}
                                                className="text-3xl font-bold text-[#01788E]"
                                            >
                                                <IoIosArrowForward />
                                            </button>
                                        </div>
                                    </div>

                                    {/* ---------- CONTENT (filtered by serviceId → match with button) ---------- */}
                                    <div className="px-3 md:px-9 mt-3 space-y-6">
                                        {content
                                            ?.filter((c) => c.serviceId === service.id)
                                            .map((c) => (
                                                <div
                                                    key={c.id}
                                                    ref={(el) => (sectionRefs.current[c.id] = el)}
                                                    className="scroll-mt-24"
                                                >
                                                    <Cover content={c} />
                                                    <CoverContent content={c} />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Special Instructions */}
                        <div className="space-y-2 px-3 pb-4 md:px-9 md:pb-6">
                            <h3 className="font-medium">Do you have any special instructions? (Optional)</h3>
                            <textarea
                                className="textarea text-sm bg-white w-full focus:outline-none border border-black"
                                placeholder="Example: Please mention any sensitivities, allergies or any particular requirements you may have."
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* ---------- Right Section summery ---------- */}
                <Summery
                    serviceTitle={serviceTitle}
                    itemSummary={itemSummary}
                    total={total}
                    showInput={showInput}
                    setShowInput={setShowInput}
                    vat={vat}
                    serviceCharge={serviceCharge}
                />
            </div>

            {/* ---------- Bottom NEXT Button ---------- */}
            <div className="hidden md:block">
                <NextBtn disabled={itemSummary.length === 0} />
            </div>
        </div>
    );
};
export default Services
