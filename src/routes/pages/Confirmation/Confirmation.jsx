import { useState } from "react";
import NextBtn from "../../../components/NextBtn/NextBtn";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import { GoCreditCard } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiMoneyWavy } from "react-icons/pi";
import { IoBagRemoveSharp, IoLocation } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import dirhum from "../../../assets/icon/color_dirhum.png";
import { SiTicktick } from "react-icons/si";

export default function Confirmation() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="pb-24">
            <ServiceDetails title="Review & Confirm" currentStep={4} />

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-5 md:p-7 text-[#4E4E4E]">
                <h2 className="text-lg font-semibold mb-4">Booking Details</h2>

                <div className="flex items-start gap-3 mb-3">
                    <IoBagRemoveSharp className="text-2xl" />
                    <p className="font-medium">Pest control</p>
                </div>

                <div className="flex items-start gap-3 mb-3">
                    <FaCalendar className="text-2xl" />
                    <p className="font-medium">Wed, Nov 19, between 10AM – 10:30AM</p>
                </div>

                <div className="flex items-start gap-3 mb-3">
                    <IoLocation className="text-2xl" />
                    <p className="font-medium">dgdfgfdasg, dfgdfgfdgdfgdfgdfg, Jumeirah 1, Dubai, UAE</p>
                </div>

                <div className="w-full h-44 mt-8 overflow-hidden rounded-lg border">
                    <img src="/mapsample.png" className="w-full h-full object-cover" />
                </div>

                <div className="h-4 w-full my-8 bg-[#F5F5F5]"></div>

                <h2 className="text-lg font-semibold mb-3">Offers</h2>
                <div className="flex items-center justify-between p-3 bg-[#FDFDFD]">
                    <div className="text-sm font-medium text-gray-600 flex items-center gap-2">Discount</div>

                    <div className="flex items-center gap-2.5 text-[#ff7a00]">
                        <div className="text-[15px] bg-[#FCDFD5] text-[#ED6329] px-3 py-1 rounded-lg font-semibold flex items-center gap-1">
                            <img className="h-4 w-4 filter invert sepia saturate-200 hue-rotate-20" src={dirhum} />
                            30% off
                        </div>
                        <SiTicktick className="text-xl" />
                    </div>

                    <RxCrossCircled className="text-xl text-[#007C92] cursor-pointer" />
                </div>

                <h2 className="text-lg font-semibold mt-6 mb-3">Pay with</h2>

                <div className="space-y-3">
                    {/* OPEN MODAL TRIGGER */}
                    <div
                        onClick={() => setOpenModal(true)}
                        className="border rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <GoCreditCard className="text-xl text-[#1f8bf0]" />
                            <span className="font-medium">Add New Card</span>
                        </div>
                        <MdKeyboardArrowRight className="text-xl text-gray-400" />
                    </div>

                    <div className="border rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <PiMoneyWavy className="text-xl text-green-600" />
                            <span className="font-medium">Cash On Delivery</span>
                        </div>
                        <span className="bg-orange-200 text-orange-600 text-xs px-2 py-1 rounded-md">+5%</span>
                    </div>
                </div>

                <h2 className="text-lg font-semibold mt-6 mb-3">Payment Summary</h2>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Service Charges</span><span className="font-medium">₱ 349.00</span></div>
                    <div className="flex justify-between"><span>Service Fee</span><span className="font-medium">₱ 29.00</span></div>
                    <div className="flex justify-between text-green-600 font-semibold"><span>Discount</span><span>- ₱ 30.00</span></div>
                    <div className="flex justify-between"><span>Sub Total</span><span className="font-medium">₱ 312.00</span></div>
                    <div className="flex justify-between"><span>VAT (5%)</span><span className="font-medium">₱ 32.40</span></div>

                    <hr className="my-3" />

                    <div className="flex justify-between text-lg font-bold">
                        <span>Total to pay</span>
                        <span className="text-[#F26822]">₱ 344.40</span>
                    </div>
                </div>
            </div>

            <NextBtn name="Book Now" />

            {/* ================= MODAL ================= */}
            {openModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-6 relative">
                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute right-4 top-4 text-gray-500 text-2xl"
                        >
                            ×
                        </button>

                        <h2 className="text-center text-xl font-semibold mb-6">Add New Card</h2>

                        <label className="block text-sm font-medium mb-1">Card Holder Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="w-full border rounded-xl px-4 py-3 mb-4"
                        />

                        <label className="block text-sm font-medium mb-1">Card Number</label>
                        <input
                            type="text"
                            placeholder="Enter Number"
                            className="w-full border rounded-xl px-4 py-3 mb-4"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Expiry</label>
                                <input type="text" placeholder="MM/YY" className="w-full border rounded-xl px-4 py-3" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">CVV</label>
                                <input type="text" placeholder="CVV" className="w-full border rounded-xl px-4 py-3" />
                            </div>
                        </div>

                        <div className="flex items-center bg-gray-100 text-gray-600 text-sm p-3 rounded-xl mt-5">
                            <span className="mr-2">⚠️</span>
                            We will reserve and release ₱1 to confirm your card.
                        </div>

                        <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold mt-6">
                            BOOK NOW
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}