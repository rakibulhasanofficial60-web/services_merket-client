import NextBtn from "../../../components/NextBtn/NextBtn";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import useAllServices from "../../../hooks/useAllServices";
import { GoCreditCard } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiMoneyWavy } from "react-icons/pi";
import { useSummary } from "../../../provider/SummaryProvider";

const Confirmation = () => {
    const { total, vat, serviceCharge, address, date, time } = useSummary();
    const [services] = useAllServices();

    return (
        <div className="pb-24">
            <ServiceDetails title="Review & Confirm" currentStep={4} />

            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-5 md:p-7 text-[#4E4E4E]">

                {/* ----------------- BOOKING DETAILS ----------------- */}
                <h2 className="text-lg font-semibold mb-4">Booking Details</h2>

                {/* Service */}
                <div className="flex items-start gap-3 mb-3">
                    <img className="w-5" src="https://cdn-icons-png.flaticon.com/512/684/684908.png" />
                    <div>
                        <p className="font-medium">Pest control</p>
                    </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3 mb-3">
                    <img className="w-5" src="https://cdn-icons-png.flaticon.com/512/747/747310.png" />
                    <div>
                        <p className="font-medium">Wed, Nov 19, between 10AM – 10:30AM</p>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 mb-3">
                    <img className="w-5" src="https://cdn-icons-png.flaticon.com/512/535/535239.png" />
                    <div>
                        <p className="font-medium">
                            dgdfgfdasg, dfgdfgfdgdfgdfgdfg, Jumeirah 1, Dubai, UAE
                        </p>
                    </div>
                </div>

                {/* Map */}
                <div className="w-full h-44 overflow-hidden rounded-lg border">
                    <img
                        src="/mapsample.png"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* ----------------- OFFERS ----------------- */}
                <h2 className="text-lg font-semibold mt-6 mb-3">Offers</h2>
                <div className="flex items-center justify-between p-3 border rounded-xl bg-[#FDFDFD]">
                    <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        Discount
                    </div>

                    <button className="text-xs bg-[#ffefe3] text-[#ff7a00] px-3 py-1 rounded-lg font-semibold">
                        🔥 30% off
                    </button>
                </div>

                {/* ----------------- PAY WITH ----------------- */}
                <h2 className="text-lg font-semibold mt-6 mb-3">Pay with</h2>

                <div className="space-y-3">

                    {/* Add New Card */}
                    <div className="border rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <GoCreditCard className="text-xl text-[#1f8bf0]" />
                            <span className="font-medium">Add New Card</span>
                        </div>
                        <MdKeyboardArrowRight className="text-xl text-gray-400" />
                    </div>

                    {/* Tabby */}
                    <div className="border rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <img className="h-6" src="https://cdn.tabby.ai/logo.svg" />
                            <span className="font-medium">Tabby</span>
                        </div>
                    </div>

                    {/* Cash On Delivery */}
                    <div className="border rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <PiMoneyWavy className="text-xl text-green-600" />
                            <span className="font-medium">Cash On Delivery</span>
                        </div>
                        <span className="bg-orange-200 text-orange-600 text-xs px-2 py-1 rounded-md">
                            +5%
                        </span>
                    </div>
                </div>

                {/* ----------------- PAYMENT SUMMARY ----------------- */}
                <h2 className="text-lg font-semibold mt-6 mb-3">Payment Summary</h2>

                <div className="space-y-2 text-sm">

                    <div className="flex justify-between">
                        <span>Service Charges</span>
                        <span className="font-medium">₱ 349.00</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Service Fee</span>
                        <span className="font-medium">₱ 29.00</span>
                    </div>

                    <div className="flex justify-between text-green-600 font-semibold">
                        <span>Discount</span>
                        <span>- ₱ 30.00</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Sub Total</span>
                        <span className="font-medium">₱ 312.00</span>
                    </div>

                    <div className="flex justify-between">
                        <span>VAT (5%)</span>
                        <span className="font-medium">₱ 32.40</span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between text-lg font-bold">
                        <span>Total to pay</span>
                        <span className="text-[#F26822]">₱ 344.40</span>
                    </div>

                </div>
            </div>

            {/* Next button bottom fixed */}
            <NextBtn name="Book Now" />
        </div>
    );
};

export default Confirmation;





// import NextBtn from "../../../components/NextBtn/NextBtn";
// import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
// import { useSummary } from "../../../provider/SummaryProvider";

// import { CreditCard, Wallet, ChevronRight } from "lucide-react";

// const Confirmation = () => {
//     const { total, vat, serviceCharge, address, date, time, } = useSummary();

//     return (
//         <div className="pb-24">
//             <ServiceDetails title="Review & Confirm" currentStep={4} />

//             <div className="w-full max-w-2xl mx-auto p-4 space-y-5">

//                 {/* ===================== BOOKING DETAILS ===================== */}
//                 <div className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
//                     <h2 className="font-semibold text-lg">Booking Details</h2>

//                     <div className="flex items-center gap-2 text-sm text-gray-700">
//                         <span>📅</span>
//                         {date && time ? (
//                             <p>{date}, between {time}</p>
//                         ) : (
//                             <p className="text-red-500">Date & Time not selected</p>
//                         )}
//                     </div>

//                     {address && (
//                         <div className="flex items-center gap-2 text-sm text-gray-700">
//                             <span>📍</span> {address}
//                         </div>
//                     )}

//                     <img
//                         src="/map.jpg"
//                         alt="map"
//                         className="w-full h-40 rounded-lg object-cover mt-2"
//                     />
//                 </div>



//                 {/* ====================== PAYMENT METHODS ====================== */}
//                 <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">

//                     {/* New Card */}
//                     <button className="w-full flex justify-between items-center p-3 rounded-xl border hover:bg-gray-50 transition">
//                         <div className="flex items-center gap-2 text-gray-700">
//                             <CreditCard size={18} /> Add New Card
//                         </div>
//                         <ChevronRight size={18} className="text-gray-400" />
//                     </button>

//                     {/* Tabby */}
//                     <button className="w-full flex justify-between items-center p-3 rounded-xl border hover:bg-gray-50 transition">
//                         <div className="flex items-center gap-2 text-gray-700">
//                             <img src="/tabby.png" alt="tabby" className="h-5" /> Tabby
//                         </div>
//                         <ChevronRight size={18} className="text-gray-400" />
//                     </button>

//                     {/* Cash On Delivery */}
//                     <button className="w-full flex justify-between items-center p-3 rounded-xl border hover:bg-gray-50 transition">
//                         <div className="flex items-center gap-2 text-gray-700">
//                             <Wallet size={18} /> Cash On Delivery
//                         </div>
//                         <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-medium">
//                             +5
//                         </span>
//                     </button>

//                 </div>



//                 {/* ====================== PAYMENT SUMMARY ====================== */}
//                 <div className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
//                     <div className="font-semibold mb-2">Payment Summary</div>

//                     <div className="flex justify-between text-sm text-gray-700">
//                         <span>Service Charges</span>
//                         <span>฿ {serviceCharge}</span>
//                     </div>

//                     <div className="flex justify-between text-sm text-gray-700">
//                         <span>VAT (5%)</span>
//                         <span>฿ {vat.toFixed(2)}</span>
//                     </div>

//                     <div className="flex justify-between text-sm text-gray-700">
//                         <span>Subtotal</span>
//                         <span>฿ {total.toFixed(2)}</span>
//                     </div>

//                     <hr className="my-2" />

//                     <div className="flex justify-between text-lg font-semibold">
//                         <span>Total to Pay</span>
//                         <span className="text-orange-600">
//                             ฿ {(total + vat).toFixed(2)}
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             {/* Next button bottom fixed */}
//             <NextBtn name="Book Now" />
//         </div>
//     );
// };

// export default Confirmation;