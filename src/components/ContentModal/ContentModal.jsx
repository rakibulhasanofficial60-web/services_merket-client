import { IoAddSharp } from "react-icons/io5";

const ContentModal = ({ setShowModal, property }) => {
    if (!property) return null;

    const items = Array.isArray(property.propertyItems)
        ? property.propertyItems
        : [];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[600px] p-6 relative">
                {/* Close Button */}
                <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-3 font-bold cursor-pointer right-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center border-dashed border-b pb-3">
                    {property.title}
                </h2>

                {/* 🔹 List of Property Items */}
                <div className="max-h-[400px] overflow-y-auto space-y-4">
                    {items.length > 0 ? (
                        items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center border-b pb-2.5 border-gray-300"
                            >
                                {/* Left Side: Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-24 h-24 object-cover rounded-sm"
                                />

                                {/* Right Side: Content */}
                                <div className="ml-5 space-y-2 flex-1">
                                    <h3 className="text-[16px] font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-[13px]">
                                        {item.description}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-700 font-bold text-[14px]">
                                            AED {item.price}
                                        </p>
                                        <button className="cursor-pointer border px-2 py-1 flex items-center gap-2 text-[#01788E] rounded-xs hover:bg-gray-100 transition text-[13px]">
                                            Add <IoAddSharp />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            No options available.
                        </p>
                    )}
                </div>

                <button className="mt-5 btn w-full bg-[#ED6329] border-0 uppercase text-white font-semibold py-2 rounded-md">
                    Continue
                </button>
            </div>
        </div>
    );
};

export default ContentModal;