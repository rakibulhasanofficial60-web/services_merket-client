import { useState } from "react";
import Card from "../../../components/Card/Card";
import useAllServices from "../../../hooks/useAllServices";
import { IoInformationCircleOutline } from "react-icons/io5";
import Cover from "../../../components/Cover/Cover";

const Services = () => {
    const [services] = useAllServices();
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
            <div className="md:flex gap-10 mt-5">
                <div className="md:w-[60%] mb-4 space-y-4">
                    <div>
                        <input className="py-3 border w-full rounded-md px-7 focus:outline-none" type="text" />
                    </div>
                    <div>
                        {
                            services.slice(0, 1).map((service, idx) => <Card key={idx} service={service}></Card>)
                        }
                    </div>
                </div>

                <div className="md:w-[35%] shadow-md h-[300px]">
                    <div className="p-4">
                        <h2 className="mb-2">Summary</h2>
                        <div className="flex justify-between items-center border-b border-gray-400 pb-2">
                            <h3 className="text-[13px] font-semibold">Service Details</h3>
                            <h3 className="text-[13px] font-semibold">ABC</h3>
                        </div>
                        <div className="mt-2 flex justify-between items-center border-b border-gray-400 pb-3">
                            <h3 className="text-[13px] font-semibold">Date & Time</h3>
                            <h3 className="text-[13px] font-semibold">Nov,12/25</h3>
                        </div>
                        <div className="mt-2 flex justify-between items-center border-b border-gray-400 pb-3">
                            <h3 className="text-[13px] font-semibold">Payment Details</h3>
                            <h3 className="text-[13px] font-semibold">$ 200</h3>
                        </div>
                        <div className="mt-2 border-b border-gray-400 pb-3">
                            {!showInput && (
                                <div className="flex justify-between items-center">
                                    <h3 className="text-[11px] font-semibold">Discount</h3>
                                    <h3
                                        className="text-[11px] cursor-pointer font-semibold text-[#01788E] underline"
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
                            <h3 className="text-[13px] font-semibold">Total To Pay</h3>
                            <h3 className="text-[13px] font-semibold">AED0.00</h3>
                        </div>
                    </div>
                    <p className="bg-[#F2F8F9] flex items-center gap-1.5 justify-center tex-[12px] font-semibold py-2
                ">0.00/month for 4 months with <span className="bg-[#3BFFA5] rounded-md px-1 font-bold">tabby</span> <IoInformationCircleOutline className="text-xl font-bold" />
                    </p>
                </div>
            </div>

            {/* content card  */}
            {/* ----------------------------------- */}
            <div className="md:w-[60%]">
                <Cover image='https://i.postimg.cc/KvhGvKSF/pexels-asadphoto-1450360.jpg' title='General' />

                {/* ---------------------content  */}
                <div>
                    <div className="flex items-center border rounded-xl p-4 shadow-md max-w-xl bg-white">
                        {/* Left Side: Image */}
                        <img
                            src="https://i.postimg.cc/zXc0ZJSk/pexels-pixabay-258154.jpg"
                            alt="Card Image"
                            className="w-28 h-28 rounded-lg object-cover"
                        />

                        {/* Right Side: Content */}
                        <div className="ml-5">
                            <h2 className="text-xl font-semibold mb-2">Card Title</h2>
                            <p className="text-gray-600">
                                This is a sample description for your card content. You can put any text or details here.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Services;