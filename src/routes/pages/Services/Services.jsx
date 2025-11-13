import { useEffect, useState, useRef } from "react";
import Card from "../../../components/Card/Card";
import useAllServices from "../../../hooks/useAllServices";
import { IoArrowForward } from "react-icons/io5";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import dirhum from "../../../assets/icon/dirhum.png";
import useButton from "../../../hooks/useButton";
import CoverContent from "../../../components/CoverContent/CoverContent";
import Cover from "../../../components/Cover/Cover";
import useCoverContent from "../../../hooks/useCoverContent";
import { useQueries } from "@tanstack/react-query";
import { useItem } from "../../../provider/ItemProvider";

const Services = () => {
    const [services] = useAllServices();
    const [content] = useCoverContent();
    const [button] = useButton();
    const [showInput, setShowInput] = useState(false);
    const [promo, setPromo] = useState("");
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

    const handleApply = () => {
        if (promo.trim() === "") {
            alert("Please enter a promo code!");
            return;
        }
        alert(`Promo "${promo}" applied successfully!`);
        setPromo("");
        setShowInput(false);
    };

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
            <ServiceDetails />
            <div className="md:flex gap-8 mt-5">
                {/* ---------- Left Section ---------- */}
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

                {/* ---------- Right Summary Section ---------- */}
                <div className="md:w-[35%] text-gray-600 sticky top-20 self-start shadow-md rounded-md">
                    <div className="p-4">
                        <h2 className="text-xl font-medium mb-1.5">Summary</h2>

                        {/* 🔹 Service Details */}
                        <div className="border-b border-gray-400 pb-1.5">
                            <h3 className="font-semibold text-sm mb-2">Service Details</h3>
                            <ul className="space-y-1">
                                {itemSummary.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex justify-between text-sm"
                                    >
                                        <span className="font-medium text-[14px]">{item.title} X 1</span>
                                        <span className="flex items-center gap-1 font-semibold">
                                            <img
                                                src={dirhum}
                                                alt=""
                                                className="w-3.5 h-3.5 mt-px"
                                            />
                                            {item.price}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* date and time  */}
                        <div className="border-b border-gray-400 mt-2">
                            <h3 className="font-semibold text-sm mb-2">Date & Time</h3>

                        </div>



                        {/* 🔹 Discount Section */}
                        <div className="mt-2 border-b border-gray-400 pb-3">
                            <h2 className="font-semibold text-sm mb-2.5">Payment Details</h2>
                            {!showInput && (
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-semibold">Discount</h3>
                                    <h3
                                        className="text-[13px] cursor-pointer font-semibold text-[#01788E] underline"
                                        onClick={() => setShowInput(true)}
                                    >
                                        Apply Promo
                                    </h3>
                                </div>
                            )}

                            {showInput && (
                                <div className="mt-2 flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={promo}
                                        onChange={(e) => setPromo(e.target.value)}
                                        placeholder="Enter Promo Discount"
                                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-[11px] focus:ring-2 focus:ring-[#01788E] outline-none"
                                    />
                                    <button
                                        onClick={handleApply}
                                        className="bg-[#01788E] text-white text-[11px] px-3 py-1 rounded-md hover:opacity-90 transition"
                                    >
                                        Apply
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 🔹 Service Charges & VAT */}
                        {
                            itemSummary.length > 0 && <div className="mt-2 border-b border-gray-400 pb-3 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold">Service Charges</span>
                                    <span className="flex items-center gap-1 font-semibold">
                                        <img src={dirhum} className="w-3.5 h-3.5" alt="" />
                                        {serviceCharge}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold">VAT (5%)</span>
                                    <span className="flex items-center gap-1 font-semibold">
                                        <img src={dirhum} className="w-3.5 h-3.5" alt="" />
                                        {vat.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        }

                        {/* 🔹 Total */}
                        <div className="mt-2 flex justify-between items-center">
                            <h3 className="font-semibold">Total To Pay</h3>
                            <p className="gap-2 text-[17px]">
                                <span className="font-bold flex items-center">
                                    <img
                                        className="h-[17px] w-[17px] mt-[3px]"
                                        src={dirhum}
                                        alt=""
                                    />{" "}
                                    {total.toFixed(2)}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------- Bottom NEXT Button ---------- */}
            <div className="pb-20 md:pb-[70px]">
                <div className="bottom-0 fixed left-0 w-full z-50 bg-white shadow-md flex justify-center py-4">
                    <button className="btn text-lg font-medium w-full md:w-[270px] border-0 bg-[#ED6329] text-white">
                        NEXT <IoArrowForward className="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Services;