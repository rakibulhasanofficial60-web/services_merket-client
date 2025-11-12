import { useState, useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import dirhum from '../../assets/icon/dirhum.png'

const ContentModal = ({ setShowModal, property }) => {
    const [quantities, setQuantities] = useState({});

    // ✅ Load from localStorage
    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem("item")) || [];
        const initialQuantities = {};
        savedItems.forEach((id) => {
            initialQuantities[id] = 1;
        });
        setQuantities(initialQuantities);
    }, []);

    // ✅ Add item (always 1)
    const handleAdd = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: 1,
        }));

        const savedItems = JSON.parse(localStorage.getItem("item")) || [];
        if (!savedItems.includes(id)) {
            savedItems.push(id);
            localStorage.setItem("item", JSON.stringify(savedItems));
        }
    };

    // ✅ Remove item (back to Add button)
    const handleRemove = (id) => {
        setQuantities((prev) => {
            const updated = { ...prev };
            delete updated[id];

            const savedItems = JSON.parse(localStorage.getItem("item")) || [];
            const filtered = savedItems.filter((itemId) => itemId !== id);
            localStorage.setItem("item", JSON.stringify(filtered));

            return updated;
        });
    };

    if (!property) {
        return (
            <div className="fixed inset-0 text-[#5D4F52] bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-md shadow-md text-center">
                    <p>No property data found.</p>
                    <button
                        onClick={() => setShowModal(false)}
                        className="mt-4 px-4 py-2 bg-[#01788E] text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    const items = Array.isArray(property.propertyItems) ? property.propertyItems : [];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white border-4 rounded-lg shadow-lg w-[90%] md:w-[600px] p-6 relative">
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
                        items.map((item) => {
                            const qty = quantities[item.id] || 0;
                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center border-b pb-2.5 border-gray-300"
                                >
                                    {/* Image */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-24 h-24 object-cover rounded-sm"
                                    />

                                    {/* Content */}
                                    <div className="ml-5 space-y-2 flex-1">
                                        <h3 className="text-[16px] font-semibold">{item.title}</h3>
                                        <p className="text-gray-600 text-[13px]">{item.description}</p>

                                        <div className="flex justify-between items-center">
                                            <p className="text-[#382F31] font-bold text-[14px] flex items-center gap-1">
                                                <img className="h-[15px] w-[15px]" src={dirhum} alt="" /> {item.price}
                                            </p>

                                            {/* Add / Quantity Controller */}
                                            {qty === 0 ? (
                                                <button
                                                    onClick={() => handleAdd(item.id)}
                                                    className="cursor-pointer border px-2 py-1 flex items-center gap-2 text-[#01788E] rounded-xs hover:bg-gray-100 transition text-[13px]"
                                                >
                                                    Add <IoAddSharp />
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-3 border px-2 py-1 rounded-md">
                                                    <button
                                                        onClick={() => handleRemove(item.id)}
                                                        className="text-[#01788E] font-bold text-lg px-2"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="font-semibold text-gray-700">
                                                        {qty}
                                                    </span>
                                                    {/* + button disabled */}
                                                    <button
                                                        disabled
                                                        className="text-gray-400 font-bold text-lg px-2 cursor-not-allowed"
                                                        title="Maximum quantity reached"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500">No options available.</p>
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















// import { IoAddSharp } from "react-icons/io5";

// const ContentModal = ({ setShowModal, property }) => {
//     if (!property) return null;

//     const items = Array.isArray(property.propertyItems)
//         ? property.propertyItems
//         : [];

//     return (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-white border-4 rounded-lg shadow-lg w-[90%] md:w-[600px] p-6 relative">
//                 {/* Close Button */}
//                 <button
//                     onClick={() => setShowModal(false)}
//                     className="absolute top-3 font-bold cursor-pointer right-3 text-gray-500 hover:text-black"
//                 >
//                     ✕
//                 </button>

//                 <h2 className="text-xl font-semibold mb-4 text-center border-dashed border-b pb-3">
//                     {property.title}
//                 </h2>

//                 {/* 🔹 List of Property Items */}
//                 <div className="max-h-[400px] overflow-y-auto space-y-4">
//                     {items.length > 0 ? (
//                         items.map((item, idx) => (
//                             <div
//                                 key={idx}
//                                 className="flex items-center border-b pb-2.5 border-gray-300"
//                             >
//                                 {/* Left Side: Image */}
//                                 <img
//                                     src={item.image}
//                                     alt={item.title}
//                                     className="w-24 h-24 object-cover rounded-sm"
//                                 />

//                                 {/* Right Side: Content */}
//                                 <div className="ml-5 space-y-2 flex-1">
//                                     <h3 className="text-[16px] font-semibold">
//                                         {item.title}
//                                     </h3>
//                                     <p className="text-gray-600 text-[13px]">
//                                         {item.description}
//                                     </p>
//                                     <div className="flex justify-between items-center">
//                                         <p className="text-gray-700 font-bold text-[14px]">
//                                             AED {item.price}
//                                         </p>
//                                         <button className="cursor-pointer border px-2 py-1 flex items-center gap-2 text-[#01788E] rounded-xs hover:bg-gray-100 transition text-[13px]">
//                                             Add <IoAddSharp />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-500">
//                             No options available.
//                         </p>
//                     )}
//                 </div>

//                 <button className="mt-5 btn w-full bg-[#ED6329] border-0 uppercase text-white font-semibold py-2 rounded-md">
//                     Continue
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ContentModal;