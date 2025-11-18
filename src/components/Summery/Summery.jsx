import { useState } from "react";
import dirhum from "../../assets/icon/dirhum.png";
import NextBtn from "../NextBtn/NextBtn";

export default function Summery({ total, showInput, setShowInput, vat, itemSummary, serviceCharge, address, date, time }) {
    const [promo, setPromo] = useState("");
    const [open, setOpen] = useState(false);

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
        <>
            {/* DESKTOP SUMMARY */}
            <div className="hidden md:block w-[35%] text-gray-600 sticky top-20 self-start shadow-md rounded-md">
                <div className="p-4">
                    <h2 className="text-xl font-medium mb-1.5">Summary</h2>

                    {/* Service Details */}
                    <div className="border-b border-gray-400 pb-1.5">
                        <h3 className="font-semibold text-sm mb-2">Service Details</h3>
                        <ul className="space-y-1">
                            {itemSummary.map((item) => (
                                <li key={item.id} className="flex justify-between text-sm">
                                    <span className="font-medium text-[14px]">{item.title} X 1</span>
                                    <span className="flex items-center gap-1 font-semibold">
                                        <img src={dirhum} alt="" className="w-3.5 h-3.5 mt-px" />
                                        {item.price}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Date & Time */}
                    <div className="border-b border-gray-400 mt-2">
                        <h3 className="font-semibold text-sm mb-2">Date & Time</h3>
                        {(date || time) && (
                            <div className="space-y-1">
                                {date && (
                                    <div className="flex items-center justify-between">
                                        <p className="text-[14px] text-gray-700">Date</p>
                                        <p className="text-[14px] text-gray-700">{date}</p>
                                    </div>
                                )}
                                {time && (
                                    <div className="flex items-center justify-between">
                                        <p className="text-[14px] text-gray-700">Time</p>
                                        <p className="text-[14px] text-gray-700">{time}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Address */}
                    {address && (
                        <div className="border-b border-gray-400 mt-2">
                            <h3 className="font-semibold text-sm mb-2">Address</h3>
                            <p className="text-[14px] font-medium text-gray-700">{address}</p>
                        </div>
                    )}

                    {/* Discount Section */}
                    <div className="mt-2 border-b border-gray-400 pb-3">
                        <h2 className="font-semibold text-sm mb-2.5">Payment Details</h2>
                        {!showInput && (
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-semibold">Discount</h3>
                                <h3 className="text-[13px] cursor-pointer font-semibold text-[#01788E] underline" onClick={() => setShowInput(true)}>
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

                    {/* Charges */}
                    {itemSummary.length > 0 && (
                        <div className="mt-2 border-b border-gray-400 pb-3 space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold">Service Charges</span>
                                <span className="flex items-center gap-1 font-semibold">
                                    <img src={dirhum} className="w-3.5 h-3.5" /> {serviceCharge}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold">VAT (5%)</span>
                                <span className="flex items-center gap-1 font-semibold">
                                    <img src={dirhum} className="w-3.5 h-3.5" /> {vat}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Total */}
                    <div className="mt-2 flex justify-between items-center">
                        <h3 className="font-semibold">Total To Pay</h3>
                        <p className="gap-2 text-[17px]">
                            <span className="font-bold flex items-center">
                                <img className="h-[17px] w-[17px] mt-[3px]" src={dirhum} /> {total}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* MOBILE BOTTOM BAR */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.15)] px-3 flex items-center justify-between z-50">
                <div onClick={() => setOpen(true)} className="cursor-pointer select-none">
                    <p className="text-[12px] line-through text-gray-400">৳ {(total + serviceCharge + vat).toFixed(2)}</p>
                    <p className="text-[20px] font-bold flex items-center gap-1 text-gray-700">
                        <img src={dirhum} className="w-4 h-4" /> {total.toFixed(2)}
                        <span className="text-[18px]">^</span>
                    </p>
                </div>
                
                <NextBtn />
            </div>

            {/* SLIDE-UP PANEL */}
            <div
                className={`md:hidden fixed left-0 w-full bg-white shadow-xl rounded-t-2xl transition-all duration-300 z-50 p-4
        ${open ? "bottom-0" : "-bottom-full"}`}
            >
                <div className="flex justify-between items-center pb-2 border-b">
                    <h2 className="text-lg font-semibold">Summary</h2>
                    <button onClick={() => setOpen(false)} className="text-xl">×</button>
                </div>

                <div className="mt-3 space-y-2 text-sm">
                    {itemSummary.map((item) => (
                        <div key={item.id} className="flex justify-between">
                            <span>{item.title} x 1</span>
                            <span className="flex items-center gap-1 font-semibold">
                                <img src={dirhum} className="w-3.5 h-3.5" /> {item.price}
                            </span>
                        </div>
                    ))}

                    {(date || time) && (
                        <div className="pt-2 border-t">
                            {date && <p className="flex justify-between"><span>Date:</span> <span>{date}</span></p>}
                            {time && <p className="flex justify-between"><span>Time:</span> <span>{time}</span></p>}
                        </div>
                    )}

                    {address && <p className="pt-2 border-t">Address: {address}</p>}

                    <div className="pt-2 border-t space-y-1">
                        <p className="flex justify-between"><span>Service Charge:</span><span className="flex items-center gap-1"><img src={dirhum} className="w-3.5 h-3.5" /> {serviceCharge}</span></p>
                        <p className="flex justify-between"><span>VAT (5%):</span><span className="flex items-center gap-1"><img src={dirhum} className="w-3.5 h-3.5" /> {vat.toFixed(2)}</span></p>
                    </div>

                    <div className="pt-2 border-t flex justify-between text-base font-semibold">
                        <span>Total</span>
                        <span className="flex items-center gap-1"><img src={dirhum} className="w-4 h-4" /> {total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </>
    );
}











// import { useState } from 'react';
// import dirhum from '../../assets/icon/dirhum.png'


// const Summery = ({ total, showInput, setShowInput, vat, itemSummary, serviceCharge, address, date, time }) => {
//     const [promo, setPromo] = useState("");

//     const handleApply = () => {
//         if (promo.trim() === "") {
//             alert("Please enter a promo code!");
//             return;
//         }
//         alert(`Promo "${promo}" applied successfully!`);
//         setPromo("");
//         setShowInput(false);
//     };

//     return (
//         <div className="md:w-[35%] text-gray-600 sticky top-20 self-start shadow-md rounded-md">
//             <div className="p-4">
//                 <h2 className="text-xl font-medium mb-1.5">Summary</h2>

//                 {/* 🔹 Service Details */}
//                 <div className="border-b border-gray-400 pb-1.5">
//                     <h3 className="font-semibold text-sm mb-2">Service Details</h3>
//                     <ul className="space-y-1">
//                         {itemSummary.map((item) => (
//                             <li
//                                 key={item.id}
//                                 className="flex justify-between text-sm"
//                             >
//                                 <span className="font-medium text-[14px]">{item.title} X 1</span>
//                                 <span className="flex items-center gap-1 font-semibold">
//                                     <img
//                                         src={dirhum}
//                                         alt=""
//                                         className="w-3.5 h-3.5 mt-px"
//                                     />
//                                     {item.price}
//                                 </span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* date and time  */}
//                 {/* Date & Time */}
// <div className="border-b border-gray-400 mt-2">
//     <h3 className="font-semibold text-sm mb-2">Date & Time</h3>

//     {/* If both empty → hide */}
//     {(!date && !time) ? null : (
//         <div className="space-y-1">
//             {date && (
//                 <div className="flex items-center justify-between">
//                     <p className="text-[14px] text-gray-700">Date</p>
//                     <p className="text-[14px] text-gray-700">{date}</p>
//                 </div>
//             )}

//             {time && (
//                 <div className="flex items-center justify-between">
//                     <p className="text-[14px] text-gray-700">Time</p>
//                     <p className="text-[14px] text-gray-700">{time}</p>
//                 </div>
//             )}
//         </div>
//     )}
// </div>


//                 {/* Address Section */}
//                 {address && (
//                     <div className="border-b border-gray-400 mt-2">
//                         <h3 className="font-semibold text-sm mb-2">Address</h3>
//                         <p className="text-[14px] text-gray-700">{address}</p>
//                     </div>
//                 )}


//                 {/* 🔹 Discount Section */}
//                 <div className="mt-2 border-b border-gray-400 pb-3">
//                     <h2 className="font-semibold text-sm mb-2.5">Payment Details</h2>
//                     {!showInput && (
//                         <div className="flex justify-between items-center">
//                             <h3 className="text-sm font-semibold">Discount</h3>
//                             <h3
//                                 className="text-[13px] cursor-pointer font-semibold text-[#01788E] underline"
//                                 onClick={() => setShowInput(true)}
//                             >
//                                 Apply Promo
//                             </h3>
//                         </div>
//                     )}

//                     {showInput && (
//                         <div className="mt-2 flex items-center gap-2">
//                             <input
//                                 type="text"
//                                 value={promo}
//                                 onChange={(e) => setPromo(e.target.value)}
//                                 placeholder="Enter Promo Discount"
//                                 className="w-full border border-gray-300 rounded-md px-2 py-1 text-[11px] focus:ring-2 focus:ring-[#01788E] outline-none"
//                             />
//                             <button
//                                 onClick={handleApply}
//                                 className="bg-[#01788E] text-white text-[11px] px-3 py-1 rounded-md hover:opacity-90 transition"
//                             >
//                                 Apply
//                             </button>
//                         </div>
//                     )}
//                 </div>

//                 {/* 🔹 Service Charges & VAT */}
//                 {
//                     itemSummary.length > 0 && <div className="mt-2 border-b border-gray-400 pb-3 space-y-1">
//                         <div className="flex justify-between text-sm">
//                             <span className="font-semibold">Service Charges</span>
//                             <span className="flex items-center gap-1 font-semibold">
//                                 <img src={dirhum} className="w-3.5 h-3.5" alt="" />
//                                 {serviceCharge}
//                             </span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                             <span className="font-semibold">VAT (5%)</span>
//                             <span className="flex items-center gap-1 font-semibold">
//                                 <img src={dirhum} className="w-3.5 h-3.5" alt="" />
//                                 {vat.toFixed(2)}
//                             </span>
//                         </div>
//                     </div>
//                 }

//                 {/* 🔹 Total */}
//                 <div className="mt-2 flex justify-between items-center">
//                     <h3 className="font-semibold">Total To Pay</h3>
//                     <p className="gap-2 text-[17px]">
//                         <span className="font-bold flex items-center">
//                             <img
//                                 className="h-[17px] w-[17px] mt-[3px]"
//                                 src={dirhum}
//                                 alt=""
//                             />{" "}
//                             {total.toFixed(2)}
//                         </span>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Summery;