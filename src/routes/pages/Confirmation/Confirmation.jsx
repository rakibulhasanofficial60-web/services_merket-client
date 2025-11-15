import NextBtn from "../../../components/NextBtn/NextBtn";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import { useSummary } from "../../../provider/SummaryProvider";

import { CreditCard, Wallet, ChevronRight } from "lucide-react";

const Confirmation = () => {
    const {
        itemSummary,
        total,
        vat,
        serviceCharge,
        showInput,
        setShowInput,
        address,
        date,
        time,
    } = useSummary();

    return (
        <div className="pb-24">
            <ServiceDetails title="Review & Confirm" currentStep={4} />

            <div className="w-full max-w-2xl mx-auto p-4 space-y-5">

                {/* ===================== BOOKING DETAILS ===================== */}
                <div className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
                    <h2 className="font-semibold text-lg">Booking Details</h2>

                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span>📅</span>
                        {date && time ? (
                            <p>{date}, between {time}</p>
                        ) : (
                            <p className="text-red-500">Date & Time not selected</p>
                        )}
                    </div>

                    {address && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <span>📍</span> {address}
                        </div>
                    )}

                    <img
                        src="/map.jpg"
                        alt="map"
                        className="w-full h-40 rounded-lg object-cover mt-2"
                    />
                </div>



                {/* ====================== PAYMENT METHODS ====================== */}
                <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">

                    {/* New Card */}
                    <button className="w-full flex justify-between items-center p-3 rounded-xl border hover:bg-gray-50 transition">
                        <div className="flex items-center gap-2 text-gray-700">
                            <CreditCard size={18} /> Add New Card
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>

                    {/* Tabby */}
                    <button className="w-full flex justify-between items-center p-3 rounded-xl border hover:bg-gray-50 transition">
                        <div className="flex items-center gap-2 text-gray-700">
                            <img src="/tabby.png" alt="tabby" className="h-5" /> Tabby
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>

                    {/* Cash On Delivery */}
                    <button className="w-full flex justify-between items-center p-3 rounded-xl border hover:bg-gray-50 transition">
                        <div className="flex items-center gap-2 text-gray-700">
                            <Wallet size={18} /> Cash On Delivery
                        </div>
                        <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-medium">
                            +5
                        </span>
                    </button>

                </div>



                {/* ====================== PAYMENT SUMMARY ====================== */}
                <div className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
                    <div className="font-semibold mb-2">Payment Summary</div>

                    <div className="flex justify-between text-sm text-gray-700">
                        <span>Service Charges</span>
                        <span>฿ {serviceCharge}</span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-700">
                        <span>VAT (5%)</span>
                        <span>฿ {vat.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-700">
                        <span>Subtotal</span>
                        <span>฿ {total.toFixed(2)}</span>
                    </div>

                    <hr className="my-2" />

                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total to Pay</span>
                        <span className="text-orange-600">
                            ฿ {(total + vat).toFixed(2)}
                        </span>
                    </div>
                </div>


                {/* PAY NOW BUTTON */}
                <button className="w-full bg-orange-600 text-white py-4 text-lg rounded-2xl shadow-md hover:opacity-90 transition">
                    Pay Now
                </button>
            </div>

            {/* Next button bottom fixed */}
            <NextBtn name="Book Now" path="/success" />
        </div>
    );
};

export default Confirmation;
