import { FiEdit3, FiTrash2, FiPlus, FiMapPin } from "react-icons/fi";

export default function SavedLocations() {
    const locations = [
        {
            id: 1,
            title: "Apartment",
            address: "xc, xc, Al Bada'a, Dubai",
        },
        {
            id: 2,
            title: "Apartment",
            address: "sdfsdf, sdfsdfsdf, Jumeirah 1, Dubai",
        },
        {
            id: 3,
            title: "Apartment",
            address: "dfgdfgdg, dgdgfdgsg, mirpur, Dubai",
        },
    ];

    return (
        <div className="border border-[#E5E7EB] rounded-md bg-white p-5 w-full max-w-screen-xl mx-auto">
            {/* Header */}
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[#5D4F52] border-b pb-3">
                <FiMapPin className="text-[#01788E]" size={20} />
                Saved Locations
            </h2>

            <div className="mt-6 flex flex-col gap-4">
                {locations.map((item) => (
                    <div
                        key={item.id}
                        className="border border-[#D1E5EA] rounded-md p-4 flex justify-between items-start"
                    >
                        <div>
                            <h3 className="text-[15px] font-medium text-[#5D4F52]">
                                {item.title}
                            </h3>
                            <p className="text-[13px] text-gray-600 mt-1">{item.address}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <FiEdit3
                                size={18}
                                className="text-[#01788E] cursor-pointer hover:opacity-70"
                            />
                            <FiTrash2
                                size={18}
                                className="text-red-500 cursor-pointer hover:opacity-70"
                            />
                        </div>
                    </div>
                ))}

                {/* Add new address */}
                <button className="border border-[#D1E5EA] rounded-md p-4 flex items-center justify-between w-full hover:bg-gray-50 transition">
                    <span className="flex items-center gap-2 text-[14px] text-[#5D4F52]">
                        <FiPlus size={18} className="text-[#01788E]" />
                        Add New Address
                    </span>

                    <span className="text-[#01788E] text-lg">{">"}</span>
                </button>
            </div>
        </div>
    );
}