import { useEffect, useState, useRef } from "react";
import Card from "../../../components/Card/Card";
import useAllServices from "../../../hooks/useAllServices";
import { IoArrowForward } from "react-icons/io5";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useButton from "../../../hooks/useButton";
import CoverContent from "../../../components/CoverContent/CoverContent";
import Cover from "../../../components/Cover/Cover";
import useCoverContent from "../../../hooks/useCoverContent";
import { useQueries } from "@tanstack/react-query";
import { useItem } from "../../../provider/ItemProvider";
import { useNavigate } from "react-router-dom";
import Summery from "../../../components/Summery/Summery";

const Services = () => {
    const navigate = useNavigate();
    const [services] = useAllServices();
    const [content] = useCoverContent();
    const [button] = useButton();
    const [showInput, setShowInput] = useState(false);

    const [activeId, setActiveId] = useState(null);
    const observer = useRef(null);
    const { data } = useItem();


    useEffect(() => {
        const sections = document.querySelectorAll("[id^='content-']");
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const visibleId = entry.target.getAttribute("id").replace("content-", "");
                        setActiveId(visibleId);
                    }
                });
            },
            { threshold: 0.5 }
        );
        sections.forEach((section) => observer.current.observe(section));
        return () => {
            if (observer.current) {
                sections.forEach((section) => observer.current.unobserve(section));
            }
        };
    }, [content]);



    // 🔹 LocalStorage IDs অনুযায়ী API ফেচ
    const itemQueries = useQueries({
        queries: data.map((id) => ({
            queryKey: ["item-summary", id],
            queryFn: async () => {
                const res = await fetch(
                    `https://job-task-nu.vercel.app/api/v1/property-items/${id}`
                );
                const json = await res.json();
                return json?.Data;
            },
            enabled: !!id,
        })),
    });

    // 🔹 সব ফেচকৃত ডাটা সংগ্রহ
    const itemSummary = itemQueries.map((q) => q.data).filter(Boolean);

    // 🔹 হিসাব
    const subtotal = itemSummary.reduce((acc, item) => acc + Number(item?.price || 0), 0);
    const serviceCharge = subtotal > 0 ? 20 : 0;
    const vat = subtotal * 0.05;
    const total = subtotal + serviceCharge + vat;

    return (
        <div>
            <ServiceDetails title="Service Details" currentStep={1} />
            <div className="md:flex gap-8 mt-5">
                {/* ---------- Left Section services ---------- */}
                <div className="md:w-[60%] mb-4 space-y-4">
                    <input
                        className="py-3 border border-[#01788E] w-full rounded-md px-7 focus:outline-none"
                        type="text"
                        placeholder="Search services..."
                    />
                    <div className="shadow-md">
                        {/* Main Card Cover */}
                        <div>
                            {services?.map((service) => (
                                <Card key={service.id} service={service} />
                            ))}
                        </div>

                        {/* Slider Button Section */}
                        <div className="px-6 sticky top-16 z-10 bg-white shadow-sm py-2">
                            <div className="w-full flex items-center justify-center">
                                <button
                                    onClick={() => {
                                        const scroller = document.getElementById("btn-slider");
                                        scroller.scrollBy({ left: -300, behavior: "smooth" });
                                    }}
                                    className="text-3xl font-bold cursor-pointer text-[#01788E]"
                                >
                                    <IoIosArrowBack />
                                </button>

                                <div
                                    id="btn-slider"
                                    className="flex items-center overflow-x-auto no-scrollbar snap-x snap-mandatory gap-2 py-2 w-full"
                                >
                                    {button
                                        ?.filter((btn) =>
                                            services.some((service) => service.id === btn.serviceId)
                                        )
                                        .map((btn, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setActiveId(btn.id);
                                                    const section = document.getElementById(`content-${btn.id}`);
                                                    if (section) {
                                                        const yOffset = -100;
                                                        const y =
                                                            section.getBoundingClientRect().top +
                                                            window.scrollY +
                                                            yOffset;
                                                        window.scrollTo({ top: y, behavior: "smooth" });
                                                    }
                                                }}
                                                className={`snap-start shrink-0 min-w-[120px] md:min-w-[140px] lg:min-w-40 px-3 py-1 rounded-full border border-[#01788E] text-[#01788E] flex items-center gap-2.5 cursor-pointer transition-colors duration-300
                                                     ${activeId === btn.id
                                                        ? "bg-red-500 text-white"
                                                        : "bg-white hover:bg-[#01788E] hover:text-white"
                                                    }`}
                                            >
                                                <img
                                                    className="w-[30px] h-[30px] rounded-full"
                                                    src={btn.image}
                                                    alt={btn.title}
                                                />
                                                {btn.title}
                                            </button>
                                        ))}
                                </div>

                                <button
                                    onClick={() => {
                                        const scroller = document.getElementById("btn-slider");
                                        scroller.scrollBy({ left: 300, behavior: "smooth" });
                                    }}
                                    className="text-3xl font-bold cursor-pointer text-[#01788E]"
                                >
                                    <IoIosArrowForward />
                                </button>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                            {content.map((item, idx) => (
                                <div
                                    key={idx}
                                    id={`content-${item.id}`}
                                    className="space-y-6 scroll-mt-24"
                                >
                                    <Cover content={item} />
                                    <CoverContent content={item} />
                                </div>
                            ))}
                        </div>

                        {/* Special Instructions */}
                        <div className="space-y-2 p-6">
                            <h3 className="font-medium">
                                Do you have any special instructions? (Optional)
                            </h3>
                            <textarea
                                className="textarea text-sm bg-white w-full focus:outline-none border border-black"
                                placeholder="Example: Please mention any sensitivities, allergies or any particular requirements you may have."
                            ></textarea>
                        </div>
                    </div>
                </div>



                {/* ---------- Right Section summery ---------- */}
                <Summery itemSummary={itemSummary} total={total} showInput={showInput} setShowInput={setShowInput} vat={vat} serviceCharge={serviceCharge}></Summery>
            </div>

            {/* ---------- Bottom NEXT Button ---------- */}
            <div className="pb-20 md:pb-[70px]">
                <div className="bottom-0 fixed left-0 w-full z-30 bg-white shadow-md flex justify-center py-4">
                    <button onClick={() => navigate("/address")} className="btn text-lg font-medium w-full md:w-[270px] border-0 bg-[#ED6329] text-white">
                        NEXT <IoArrowForward className="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Services;