import { useState } from "react";
import dirhum from '../../assets/icon/dirhum.png';
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { IoAddSharp } from "react-icons/io5";

const CoverContent = ({ content }) => {
    const [showModal, setShowModal] = useState(false);
    console.log(content.propertyType);
    return (
        <div>
            {
                content.propertyType.map((property, idx) => <div key={idx} className="flex border-b pb-2.5 border-gray-400 mb-6">

                    {/* Left Side: Image */}
                    <img
                        src={property.image}
                        alt={property.title}
                        className="w-20 h-20 object-cover rounded-sm"
                    />

                    {/* Right Side: Content */}
                    <div className="ml-5 space-y-1">
                        <h2 className="text-[18px] font-semibold mb-2">
                           {property.title}
                        </h2>
                        <p className="text-gray-600 text-[13px]">
                            {property.description}
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
                </div>)
            }

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
        </div>
    );
};

export default CoverContent;