import { useQuery } from "@tanstack/react-query";

const BookingCard = () => {

    const { data: booking = [], isLoading, error, refetch } = useQuery({
        queryKey: ["all-booking"],
        queryFn: async () => {
            const res = await fetch("/booking-card");
            const data = await res.json();
            return data.Data;
        },
    });
console.log(booking);
    return (
        <div className="w-full max-w-xl border rounded-2xl p-5 shadow-sm bg-white">
            {/* Top Section */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-[18px] font-semibold text-[#1B1B1B]">
                        Pest control
                    </h2>
                    <p className="text-[14px] text-[#555] mt-1">
                        Thu, 20 Nov, Between 11AM - 11:30AM
                    </p>
                </div>

                {/* Status Badge */}
                <span className="text-[13px] px-3 py-1 rounded-full bg-[#22C55E] text-white font-medium">
                    Confirmed
                </span>
            </div>

            {/* Separator */}
            <div className="w-full border-b my-4"></div>

            {/* Bottom Section */}
            <div className="flex justify-between items-center">
                {/* Price */}
                <p className="text-[20px] font-semibold text-[#1B1B1B]">
                    <span className="text-[22px]">Đ</span>1233.75
                </p>

                {/* Manage Button */}
                <button className="flex items-center gap-1 text-[14px] font-semibold text-[#01788E] border border-[#01788E] px-4 py-2 rounded-lg hover:bg-[#F3FAFB] transition">
                    MANAGE
                    <span className="text-[16px]">›</span>
                </button>
            </div>
        </div>
    );
};

export default BookingCard;