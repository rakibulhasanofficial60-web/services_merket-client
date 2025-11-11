import { useState } from "react";
import Card from "../../../components/Card/Card";
import useAllServices from "../../../hooks/useAllServices";
import { IoArrowForward } from "react-icons/io5";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import dirhum from '../../../assets/icon/dirhum.png';
import useButton from "../../../hooks/useButton";
import CoverContent from "../../../components/CoverContent/CoverContent";
import Cover from "../../../components/Cover/Cover";
import useCoverContent from "../../../hooks/useCoverContent";

const Services = () => {
    const [services] = useAllServices();
    const [content] = useCoverContent();
    const [button] = useButton();
    const [showInput, setShowInput] = useState(false);
    const [promo, setPromo] = useState("");

    const handleApply = () => {
        if (promo.trim() === "") {
            alert("Please enter a promo code!");
            return;
        }
        alert(`Promo "${promo}" applied successfully!`);
        setPromo("");
        setShowInput(false);
    };

    return (
        <div>
            <ServiceDetails></ServiceDetails>
            <div className="md:flex gap-8 mt-5">
                <div className="md:w-[60%] mb-4 space-y-4">

                    {/* search bar input  */}
                    <div>
                        <input
                            className="py-3 border border-[#01788E] w-full rounded-md px-7 focus:outline-none"
                            type="text"
                            placeholder="Search services..."
                        />
                    </div>

                    <div className="shadow-md">
                        {/* main card cover || main services */}
                        <div>
                            {
                                services?.map(service => <Card key={service.id} service={service}> </Card>)
                            }
                        </div>

                        {/* Slider Section for button */}
                        <div className="px-6 sticky top-16 z-10 bg-white shadow-sm py-2">
                            <div className="w-full flex items-center justify-center">
                                {/* left arrow btn */}
                                <button
                                    onClick={() => {
                                        const scroller = document.getElementById("btn-slider");
                                        scroller.scrollBy({ left: -300, behavior: "smooth" });
                                    }}
                                    className="text-3xl font-bold cursor-pointer text-[#01788E]"
                                >
                                    <IoIosArrowBack />
                                </button>


                                {/* slider button main */}
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
                                                className="snap-start shrink-0 min-w-[120px] md:min-w-[140px] lg:min-w-40 px-3 py-1 rounded-full border border-[#01788E] text-[#01788E] focus:outline-none flex items-center gap-2.5 cursor-pointer bg-white hover:bg-[#01788E] hover:text-white transition-colors duration-300"
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

                                {/* right arrow btn*/}
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

                        {/* content card | btn data === load data */}
                        <div className="p-6">
                            {
                                content.map((content, idx) => <div key={idx} className="space-y-6">
                                    <Cover content={content}></Cover>
                                    <CoverContent content={content}></CoverContent>
                                </div>)
                            }
                        </div>


                        {/* Do you have any special instructions? (Optional) */}
                        < div className="space-y-2 p-6" >
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

                {/* 🔹 Summary Section */}
                <div className="md:w-[35%] h-[300px] sticky top-20 self-start shadow-md rounded-md">
                    <div className="p-4">
                        <h2 className="text-xl font-medium mb-1.5">Summary</h2>
                        <div className="flex justify-between items-center border-b border-gray-400 pb-2">
                            <h3 className="font-semibold text-sm">Service Details</h3>
                            <h3 className="text-[13px] font-semibold">ABC</h3>
                        </div>
                        <div className="mt-2 flex justify-between items-center border-b border-gray-400 pb-3">
                            <h3 className="font-semibold text-sm">Date & Time</h3>
                            <h3 className="font-semibold text-sm">Nov,12/25</h3>
                        </div>
                        <div className="mt-2 flex justify-between items-center border-b border-gray-400 pb-3">
                            <h3 className="font-semibold text-sm">Payment Details</h3>
                            <h3 className="font-semibold text-sm">$ 200</h3>
                        </div>
                        <div className="mt-2 border-b border-gray-400 pb-3">
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
                        <div className="mt-2 flex justify-between items-center border-b border-gray-400 pb-3">
                            <h3 className="font-semibold">Total To Pay</h3>
                            <p className="text-gray-600 gap-2 text-[17px]"><span className="font-bold flex items-center"><img className="h-[17px] w-[17px] mt-[3px]" src={dirhum} alt="" /> 299</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* button next  */}
            <div className="pb-20 md:pb-[70px]">
                <div className="bottom-0 fixed left-0 w-full z-50 bg-white shadow-md flex justify-center py-4">
                    <button className="btn text-lg font-medium w-full md:w-[270px] border-0 bg-[#ED6329] text-white">NEXT <IoArrowForward className="text-xl" /></button>
                </div>
            </div>
        </div>
    );
};

export default Services;