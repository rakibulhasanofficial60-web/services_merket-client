import { FaArrowRight } from "react-icons/fa";
import dirhum from '../../assets/icon/dirhum.png'

const BookingCard = ({ item }) => {
    const { serviceName, status, date, timeRange, price } = item;
    return (
        <div className="w-full max-w-xl border rounded-2xl p-2 md:p-5 shadow-sm bg-white">
            {/* Top Section */}
            <div className="md:flex justify-between items-start">
                <div>
                    <h2 className="text-[18px] font-semibold text-[#1B1B1B]">
                        {serviceName}
                    </h2>
                    <p className="text-[14px] text-[#555] mt-1">
                        {date}, Between {timeRange}
                    </p>
                </div>

                {/* Status Badge */}
                <span className="text-[13px] px-3 py-1 rounded-full bg-[#22C55E] text-white font-medium">
                    {status}
                </span>
            </div>

            {/* Separator */}
            <div className="w-full border-b my-4"></div>

            {/* Bottom Section */}
            <div className="md:flex justify-between items-center">
                {/* Price */}
                <p className="text-[20px] font-semibold text-[#1B1B1B]">
                    <span className="text-[20px] flex items-center"><img className="h-5 w-5" src={dirhum} alt="" />{price}</span>
                </p>

                {/* Manage Button */}
                <button className="cursor-pointer flex items-center gap-1 text-[14px] font-semibold text-[#01788E] border border-[#01788E] px-4 py-2 rounded-lg hover:bg-[#F3FAFB] transition">
                    MANAGE
                    <span className="text-[12px]"><FaArrowRight /></span>
                </button>
            </div>
        </div>
    );
};

export default BookingCard;