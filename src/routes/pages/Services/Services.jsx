import { useSummary } from "../../../provider/SummaryProvider";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Summery from "../../../components/Summery/Summery";
import Cover from "../../../components/Cover/Cover";
import CoverContent from "../../../components/CoverContent/CoverContent";
import Card from "../../../components/Card/Card";
import NextBtn from "../../../components/NextBtn/NextBtn";

const Services = () => {
    const { services, button, setActiveId, activeId, content, itemSummary, total, vat, serviceCharge, showInput, setShowInput } = useSummary();


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
            <NextBtn path='/address'></NextBtn>
        </div>
    );
};

export default Services;