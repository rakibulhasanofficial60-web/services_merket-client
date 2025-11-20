import { FaUser } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { useSummary } from "../../../provider/SummaryProvider";


export default function BookingDetails() {
    const { services, button, setActiveId, activeId, content, itemSummary, total, showInput, setShowInput, vat, serviceCharge, address, setAddress, date, setDate, time, setTime } = useSummary();

    return (
        <div className="w-full min-h-screen p-4 flex justify-center items-start">
            <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl p-4 mt-10">
                {/* Booking confirmed */}
                <div className="shadow-md rounded-lg p-4 space-y-1.5 md:space-y-0  md:flex items-center md:justify-between bg-gray-50">
                    <div>
                        <p className="font-semibold">Booking confirmed</p>
                        <p className="text-sm text-gray-500">
                            Your booking is confirmed and will be delivered as per the booked date and time
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"><FaUser /></div>
                            <p className="text-sm font-medium">Supreme P.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 text-gray-600 text-xl">
                        <button className="bg-[#01788E] p-2 rounded-full text-white cursor-pointer"><FiMessageCircle /></button>
                        <button className="bg-[#01788E] p-2 rounded-full text-white cursor-pointer"><FiPhone /></button>
                    </div>
                </div>

                {/* Rate Experience */}
                <div className="mt-6 shadow-md p-4 rounded-lg">
                    <p className="font-medium mb-2">Rate your experience:</p>
                    <div className="rating rating-md">
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" aria-label="2 star" defaultChecked />
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
                    </div>
                </div>

                {/* Job Details */}
                <div className="mt-6 border rounded-lg p-4">
                    <h2 className="font-semibold mb-2">Job Details</h2>

                    <div className="flex justify-between border-b py-2">
                        <p>Booking Ref.</p>
                        <p className="text-gray-500">20251119000426MPDXB</p>
                    </div>

                    <div className="flex justify-between border-b py-2">
                        <p>Start time</p>
                        <p className="text-gray-500">{date}, {time}</p>
                    </div>

                    <div className="flex justify-between py-2">
                        <p>Address</p>
                        <p className="text-gray-500">{address}</p>
                    </div>
                </div>

                {/* Service */}
                <div className="mt-6 border rounded-lg p-4">
                    <h2 className="font-semibold mb-2">Service</h2>

                    <div className="flex justify-between py-2">
                        <p>Studio - General x 1</p>
                        <p className="text-gray-500">Pest control</p>
                    </div>

                    <div className="flex justify-between py-2">
                        <p>Total</p>
                        <p className="font-semibold">₱199</p>
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="mt-6 border rounded-lg p-4">
                    <h2 className="font-semibold mb-2">Payment Summary</h2>

                    <div className="flex justify-between py-2">
                        <p>Payment method</p>
                        <p className="text-gray-500">Cash on Delivery</p>
                    </div>

                    <div className="flex justify-between py-2">
                        <p>Total to Pay</p>
                        <p className="font-semibold">₱228.9</p>
                    </div>
                </div>

                {/* Manage Booking */}
                <div className="flex justify-center mt-6">
                    <button className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition">
                        Manage Booking
                    </button>
                </div>
            </div>
        </div>
    );
}