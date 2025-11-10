import { useState } from "react";
import Card from "../../../components/Card/Card";
import useAllServices from "../../../hooks/useAllServices";
import Cover from "../../../components/Cover/Cover";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { IoAddSharp, IoArrowForward } from "react-icons/io5";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import dirhum from '../../../assets/icon/dirhum.png';

const Services = () => {
    const [services] = useAllServices();
    const [showInput, setShowInput] = useState(false);
    const [promo, setPromo] = useState("");
    const [showModal, setShowModal] = useState(false);

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
                    <div>
                        <input
                            className="py-3 border border-[#01788E] w-full rounded-md px-7 focus:outline-none"
                            type="text"
                            placeholder="Search services..."
                        />
                    </div>

                    <div className="shadow-md">
                        <div>
                            {
                                services.map(service => <Card key={service.id} service={service.service}> </Card>)
                            }
                        </div>

                        {/* 👉 Slider Section */}
                        <div className="px-6 sticky top-16 z-40 bg-white shadow-sm py-2">
                            <div className="w-full flex items-center justify-center">
                                {/* left arrow */}
                                <button
                                    onClick={() => {
                                        const scroller = document.getElementById("btn-slider");
                                        scroller.scrollBy({ left: -300, behavior: "smooth" });
                                    }}
                                    className="text-3xl font-bold cursor-pointer text-[#01788E]"
                                >
                                    <IoIosArrowBack />
                                </button>

                                {/* slider container */}
                                <div
                                    id="btn-slider"
                                    className="flex items-center overflow-x-auto    no-scrollbar snap-x snap-mandatory gap-2 py-2 w-full"
                                >
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <button
                                            key={i}
                                            className="snap-start shrink-0 min-w-[120px] md:min-w-[140px] lg:min-w-40 px-3 py-1 rounded-full border border-[#01788E] text-[#01788E] focus:outline-none flex items-center gap-2.5 cursor-pointer bg-white hover:bg-[#01788E] hover:text-white transition-colors duration-300"
                                        >
                                            <img
                                                className="w-[30px] h-[30px] rounded-full"
                                                src="https://sm-voucherify.imgix.net/org_SrqsCH8kZnYvfL7HaV5WvLgQXSm2q24v/img_RklW8OH70i1ND5VJ02aowwbS.jpeg?auto=format,compress&q=46&fit=crop&w=28&h=28"
                                                alt=""
                                            />{" "}
                                            Button {i + 1}
                                        </button>
                                    ))}
                                </div>

                                {/* right arrow */}
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



                        {/* content card */}
                        <div className="p-6">
                            <Cover
                                image="https://sm-voucherify.imgix.net/org_SrqsCH8kZnYvfL7HaV5WvLgQXSm2q24v/img_RklW8OH70i1ND5VJ02aowwbS.jpeg?auto=format,compress&q=46&fit=crop&w=490&h=180&quot"
                                title="General"
                            />

                            {/* cover content */}
                            <div className="mt-4">
                                <div className="flex border-b pb-2.5 border-gray-400">
                                    {/* Left Side: Image */}
                                    <img
                                        src="https://sm-voucherify.imgix.net/org_SrqsCH8kZnYvfL7HaV5WvLgQXSm2q24v/img_p0lYxObH5UVbOr3dwW5Gy0ip.jpeg?auto=format,compress&q=46&fit=crop&w=150&h=150"
                                        alt="Card Image"
                                        className="w-20 h-20 object-cover rounded-sm"
                                    />

                                    {/* Right Side: Content */}
                                    <div className="ml-5 space-y-1">
                                        <h2 className="text-[18px] font-semibold mb-2">
                                            Apartment
                                        </h2>
                                        <p className="text-gray-600 text-[13px]">
                                            Get rid of common pests and keep your home safe with our easy and effective General Pest Control service.
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <p className="text-gray-600 flex items-center gap-2 text-[14px]">
                                                Starting from <span className="font-bold flex items-center"><img className="h-[15px] w-[15px]" src={dirhum} alt="" /> 299</span>
                                            </p>
                                            {/* 🔹 Modal Trigger Button */}
                                            <button
                                                onClick={() => setShowModal(true)}
                                                className="cursor-pointer border px-2.5 py-1 flex items-center gap-2 text-[#01788E] rounded-xs hover:bg-gray-100 transition text-[13px]"
                                            >
                                                6 Options <MdOutlineArrowRightAlt />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mt-7">
                                <h3 className="font-medium">
                                    Do you have any special instructions? (Optional)
                                </h3>
                                <textarea
                                    className="textarea text-sm bg-white w-full focus:outline-none border border-black"
                                    placeholder="Example: Please mention any sensitivities, allergies or any particular requirements you may have."
                                ></textarea>
                            </div>
                        </div>
                        <div className="p-6">
                            <Cover
                                image="https://sm-voucherify.imgix.net/org_SrqsCH8kZnYvfL7HaV5WvLgQXSm2q24v/img_RklW8OH70i1ND5VJ02aowwbS.jpeg?auto=format,compress&q=46&fit=crop&w=490&h=180&quot"
                                title="General"
                            />

                            {/* cover content */}
                            <div className="mt-4">
                                <div className="flex border-b pb-2.5 border-gray-400">
                                    {/* Left Side: Image */}
                                    <img
                                        src="https://sm-voucherify.imgix.net/org_SrqsCH8kZnYvfL7HaV5WvLgQXSm2q24v/img_p0lYxObH5UVbOr3dwW5Gy0ip.jpeg?auto=format,compress&q=46&fit=crop&w=150&h=150"
                                        alt="Card Image"
                                        className="w-20 h-20 object-cover rounded-sm"
                                    />

                                    {/* Right Side: Content */}
                                    <div className="ml-5 space-y-1">
                                        <h2 className="text-[18px] font-semibold mb-2">
                                            Apartment
                                        </h2>
                                        <p className="text-gray-600 text-[13px]">
                                            Get rid of common pests and keep your home safe with our easy and effective General Pest Control service.
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <p className="text-gray-600 flex items-center gap-2 text-[14px]">
                                                Starting from <span className="font-bold flex items-center"><img className="h-[15px] w-[15px]" src={dirhum} alt="" /> 299</span>
                                            </p>
                                            {/* 🔹 Modal Trigger Button */}
                                            <button
                                                onClick={() => setShowModal(true)}
                                                className="cursor-pointer border px-2.5 py-1 flex items-center gap-2 text-[#01788E] rounded-xs hover:bg-gray-100 transition text-[13px]"
                                            >
                                                6 Options <MdOutlineArrowRightAlt />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mt-7">
                                <h3 className="font-medium">
                                    Do you have any special instructions? (Optional)
                                </h3>
                                <textarea
                                    className="textarea text-sm bg-white w-full focus:outline-none border border-black"
                                    placeholder="Example: Please mention any sensitivities, allergies or any particular requirements you may have."
                                ></textarea>
                            </div>
                        </div>
                        <div className="p-6">
                            <Cover
                                image="https://sm-voucherify.imgix.net/org_SrqsCH8kZnYvfL7HaV5WvLgQXSm2q24v/img_RklW8OH70i1ND5VJ02aowwbS.jpeg?auto=format,compress&q=46&fit=crop&w=490&h=180&quot"
                                title="General"
                            />

                            {/* cover content */}
                            <div className="mt-4">
                                <div className="flex border-b pb-2.5 border-gray-400">
                                    {/* Left Side: Image */}
                                    <img
                                        src="https://sm-voucherify.imgix.net/org_SrqsCH8kZnYvfL7HaV5WvLgQXSm2q24v/img_p0lYxObH5UVbOr3dwW5Gy0ip.jpeg?auto=format,compress&q=46&fit=crop&w=150&h=150"
                                        alt="Card Image"
                                        className="w-20 h-20 object-cover rounded-sm"
                                    />

                                    {/* Right Side: Content */}
                                    <div className="ml-5 space-y-1">
                                        <h2 className="text-[18px] font-semibold mb-2">
                                            Apartment
                                        </h2>
                                        <p className="text-gray-600 text-[13px]">
                                            Get rid of common pests and keep your home safe with our easy and effective General Pest Control service.
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <p className="text-gray-600 flex items-center gap-2 text-[14px]">
                                                Starting from <span className="font-bold flex items-center"><img className="h-[15px] w-[15px]" src={dirhum} alt="" /> 299</span>
                                            </p>
                                            {/* 🔹 Modal Trigger Button */}
                                            <button
                                                onClick={() => setShowModal(true)}
                                                className="cursor-pointer border px-2.5 py-1 flex items-center gap-2 text-[#01788E] rounded-xs hover:bg-gray-100 transition text-[13px]"
                                            >
                                                6 Options <MdOutlineArrowRightAlt />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mt-7">
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

            {/* 🔹 Modal Section */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[600px] p-6 relative">
                        <div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-3 font-bold cursor-pointer right-3 text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-semibold mb-4 text-center border-dashed border-b pb-3">Villa</h2>
                            <div>
                                <div className="flex items-center border-b pb-2.5 border-gray-400">
                                    {/* Left Side: Image */}
                                    <img
                                        src="https://i.postimg.cc/zXc0ZJSk/pexels-pixabay-258154.jpg"
                                        alt="Card Image"
                                        className="w-28 h-28 object-cover rounded-sm"
                                    />

                                    {/* Right Side: Content */}
                                    <div className="ml-5 space-y-3">
                                        <h2 className="text-[18px] font-semibold mb-2">
                                            Card Title
                                        </h2>
                                        <p className="text-gray-600 text-[14px]">
                                            This is a sample description for your card content. You
                                            can put any text or details here.
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <p className="text-gray-600 text-[14px] font-bold">AED299</p>
                                            {/* 🔹 Modal Trigger Button */}
                                            <button
                                                onClick={() => setShowModal(true)}
                                                className="cursor-pointer border px-2 py-1 flex items-center gap-2 text-[#01788E] rounded-xs hover:bg-gray-100 transition"
                                            >
                                                Add <IoAddSharp />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="mt-4 btn w-full bg-[#ED6329] border-0 uppercase">Continue</button>
                    </div>
                </div>
            )}
            <div className="bottom-0 fixed left-0 w-full bg-white shadow-md flex justify-center py-4">
                <button className="btn text-lg font-medium w-[270px] border-0 z-50 bg-[#ED6329]">NEXT <IoArrowForward className="text-xl" /></button>
            </div>
        </div>
    );
};

export default Services;