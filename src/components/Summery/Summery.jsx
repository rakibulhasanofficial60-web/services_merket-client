import { useState } from 'react';
import dirhum from '../../assets/icon/dirhum.png'


const Summery = ({ total, showInput, setShowInput, vat, itemSummary, serviceCharge, address }) => {
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

                {/* Address Section */}
                {address && (
                    <div className="mt-2 border-b border-gray-400 pb-2">
                        <h3 className="font-semibold text-sm mb-1">Address</h3>
                        <p className="text-[14px] text-gray-700">{address}</p>
                    </div>
                )}


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
    );
};

export default Summery;