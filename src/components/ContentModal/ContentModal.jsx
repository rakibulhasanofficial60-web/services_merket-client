import { useState, useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import dirhum from '../../assets/icon/dirhum.png'
import { useItem } from "../../provider/ItemProvider";

const ContentModal = ({ setShowModal, property }) => {
    const [quantities, setQuantities] = useState({});
    const { addItem, removeItem } = useItem();
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem("item")) || [];
        const initialQuantities = {};
        savedItems.forEach((id) => {
            initialQuantities[id] = 1;
        });
        setQuantities(initialQuantities);
    }, []);

    const handleAdd = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: 1,
        }));

        addItem(id);
    };

    const handleRemove = (id) => {
        setQuantities((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
        removeItem(id);
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

    const handelDetails = item => {
        setSelectedItem(item);
        setShowDetailModal(true);
    };

    const closeDetailModal = () => {
        setShowDetailModal(false);
        setSelectedItem(null);
    };

    const items = Array.isArray(property.propertyItems) ? property.propertyItems : [];

    return (
        <>
            {/* Main Modal */}
            <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowModal(false)}
            >
                <div
                    className="bg-white rounded-lg shadow-lg w-full max-w-[600px] max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Close Button */}
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl z-10"
                    >
                        ✕
                    </button>

                    <h2 className="text-xl font-semibold p-6 text-center border-dashed border-b">
                        {property.title}
                    </h2>

                    {/* Items List - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {items.length > 0 ? (
                            <div className="space-y-4">
                                {items.map((item) => {
                                    const qty = quantities[item.id] || 0;
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border-b border-gray-300"
                                        >
                                            {/* Image */}
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-24 h-24 object-cover rounded-sm mx-auto md:mx-0"
                                                onClick={() => handelDetails(item)}
                                            />

                                            {/* Content */}
                                            <div className="flex-1 text-center md:text-start">
                                                <div onClick={() => handelDetails(item)} className="cursor-pointer">
                                                    <h3 className="text-[16px] font-semibold">{item.title}</h3>
                                                    <p className="text-gray-600 text-[13px] mt-1">{item.description}</p>
                                                </div>

                                                <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-3">
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
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() => handleRemove(item.id)}
                                                                className="text-[#01788E] border rounded-full font-bold text-lg px-[7px] cursor-pointer"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="font-semibold text-gray-700">
                                                                {qty}
                                                            </span>

                                                            <button
                                                                disabled
                                                                className="text-gray-400 font-bold text-lg px-2 cursor-not-allowed border rounded-full border-[#014855]"
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
                                })}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 py-8">No options available.</p>
                        )}
                    </div>

                    {/* Continue Button - Always visible at bottom */}
                    <div className="p-6 border-t">
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full bg-[#ED6329] border-0 uppercase text-white font-semibold py-3 rounded-md"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedItem && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={closeDetailModal}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg w-full max-w-[600px] max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Close Button */}
                        <button
                            onClick={closeDetailModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl z-10"
                        >
                            ✕
                        </button>

                        {/* Image Section */}
                        <div
                            className="h-48 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${selectedItem.image})`
                            }}
                        >
                        </div>

                        {/* Content Section - Scrollable */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-6">
                                {/* Title and Price */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {selectedItem.title}
                                    </h2>
                                    <span className="text-xl font-bold text-gray-800 mt-2 sm:mt-0">
                                        {selectedItem.price} AED
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-600 mb-6">
                                    {selectedItem.description}
                                </p>

                                <hr className="my-4" />

                                {/* What's Included Section */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">
                                        What's included
                                    </h3>
                                    <div className="max-h-48 overflow-y-auto pr-2 space-y-3">
                                        {/* Feature 1 */}
                                        {selectedItem.feature1 && (
                                            <div className="flex items-start">
                                                <div className="mt-1 w-3 h-3 border border-gray-400 rounded-full mr-3 shrink-0"></div>
                                                <p className="text-sm text-gray-700">{selectedItem.feature1}</p>
                                            </div>
                                        )}
                                        {/* Feature 2 */}
                                        {selectedItem.feature2 && (
                                            <div className="flex items-start">
                                                <div className="mt-1 w-3 h-3 border border-gray-400 rounded-full mr-3 shrink-0"></div>
                                                <p className="text-sm text-gray-700">{selectedItem.feature2}</p>
                                            </div>
                                        )}
                                        {/* Feature 3 */}
                                        {selectedItem.feature3 && (
                                            <div className="flex items-start">
                                                <div className="mt-1 w-3 h-3 border border-gray-400 rounded-full mr-3 shrink-0"></div>
                                                <p className="text-sm text-gray-700">{selectedItem.feature3}</p>
                                            </div>
                                        )}
                                        {/* Feature 4 */}
                                        {selectedItem.feature4 && (
                                            <div className="flex items-start">
                                                <div className="mt-1 w-3 h-3 border border-gray-400 rounded-full mr-3 shrink-0"></div>
                                                <p className="text-sm text-gray-700">{selectedItem.feature4}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="p-6 border-t">
                            {/* Quantity Selector */}
                            <div className="flex items-center justify-center mb-6">
                                <button
                                    onClick={() => handleRemove(selectedItem.id)}
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 text-2xl text-gray-600 rounded-full"
                                >
                                    &minus;
                                </button>
                                <span className="text-xl font-semibold mx-6 w-8 text-center">
                                    {quantities[selectedItem.id] || 0}
                                </span>
                                <button
                                    onClick={() => handleAdd(selectedItem.id)}
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 text-2xl text-gray-600 rounded-full"
                                >
                                    +
                                </button>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => {
                                    if (!quantities[selectedItem.id]) {
                                        handleAdd(selectedItem.id);
                                    }
                                }}
                                className="w-full py-3 flex items-center justify-center border border-[#01788E] text-[#01788E] font-semibold rounded-lg"
                            >
                                <span className="text-xl mr-2 font-medium">+</span>
                                {quantities[selectedItem.id] ? 'Update Basket' : 'Add To Basket'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContentModal;







// import { useState, useEffect } from "react";
// import { IoAddSharp } from "react-icons/io5";
// import dirhum from '../../assets/icon/dirhum.png'
// import { useItem } from "../../provider/ItemProvider";

// const ContentModal = ({ setShowModal, property }) => {
//     const [quantities, setQuantities] = useState({});
//     const { addItem, removeItem } = useItem();
    
//     useEffect(() => {
//         const savedItems = JSON.parse(localStorage.getItem("item")) || [];
//         const initialQuantities = {};
//         savedItems.forEach((id) => {
//             initialQuantities[id] = 1;
//         });
//         setQuantities(initialQuantities);
//     }, []);

//     const handleAdd = (id) => {
//         setQuantities((prev) => ({
//             ...prev,
//             [id]: 1,
//         }));

//         addItem(id);
//     };

//     const handleRemove = (id) => {
//         setQuantities((prev) => {
//             const updated = { ...prev };
//             delete updated[id];
//             return updated;
//         });
//         removeItem(id);
//     };

//     if (!property) {
//         return (
//             <div className="fixed inset-0 text-[#5D4F52] bg-black/50 flex items-center justify-center z-50">
//                 <div className="bg-white p-6 rounded-md shadow-md text-center">
//                     <p>No property data found.</p>
//                     <button
//                         onClick={() => setShowModal(false)}
//                         className="mt-4 px-4 py-2 bg-[#01788E] text-white rounded"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const handelDetails = item => {
//         // console.log(item);
//     }

//     const items = Array.isArray(property.propertyItems) ? property.propertyItems : [];

//     return (
//         <div
//             className="fixed cursor-pointer inset-0 bg-black/50 flex items-center justify-center z-50 mb-[49px]"
//             onClick={() => setShowModal(false)}
//         >
//             <div
//                 className="bg-white rounded-lg shadow-lg w-[90%] md:w-[600px] p-6 relative"
//                 onClick={(e) => e.stopPropagation()}
//             >

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

//                 {/* Items List */}
//                 <div className="h-[250px] md:max-h-[400px] overflow-y-auto space-y-4">
//                     {items.length > 0 ? (
//                         items.map((item) => {
//                             const qty = quantities[item.id] || 0;
//                             return (
//                                 <div
//                                     key={item.id}
//                                     className="md:flex items-center border-b pb-2.5 border-gray-300 space-y-2"
//                                 >
//                                     {/* Image */}
//                                     <img
//                                         src={item.image}
//                                         alt={item.title}
//                                         className="w-24 h-24 mx-auto object-cover rounded-sm"
//                                     />

//                                     {/* Content */}
//                                     <div className="ml-5 space-y-2 flex-1 text-center md:text-start">
//                                         <div onClick={() => handelDetails(item)}>
//                                             <h3 className="text-[16px] font-semibold">{item.title}</h3>
//                                             <p className="text-gray-600 text-[13px]">{item.description}</p>
//                                         </div>

//                                         <div className="flex justify-between items-center">
//                                             <p className="text-[#382F31] font-bold text-[14px] flex items-center gap-1">
//                                                 <img className="h-[15px] w-[15px]" src={dirhum} alt="" /> {item.price}
//                                             </p>

//                                             {/* Add / Quantity Controller */}
//                                             {qty === 0 ? (
//                                                 <button
//                                                     onClick={() => handleAdd(item.id)}
//                                                     className="cursor-pointer border px-2 py-1 flex items-center gap-2 text-[#01788E] rounded-xs hover:bg-gray-100 transition text-[13px]"
//                                                 >
//                                                     Add <IoAddSharp />
//                                                 </button>
//                                             ) : (
//                                                 <div className="flex items-center gap-3">
//                                                     <button
//                                                         onClick={() => handleRemove(item.id)}
//                                                         className="text-[#01788E] border rounded-full font-bold text-lg px-[7px] cursor-pointer"
//                                                     >
//                                                         −
//                                                     </button>
//                                                     <span className="font-semibold text-gray-700">
//                                                         {qty}
//                                                     </span>

//                                                     <button
//                                                         disabled
//                                                         className="text-gray-400 font-bold text-lg px-2 cursor-not-allowed border rounded-full border-[#014855]"
//                                                         title="Maximum quantity reached"
//                                                     >
//                                                         +
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })
//                     ) : (
//                         <p className="text-center text-gray-500">No options available.</p>
//                     )}
//                 </div>

//                 <button
//                     onClick={() => setShowModal(false)}
//                     className="mt-5 btn w-full bg-[#ED6329] border-0 uppercase text-white font-semibold py-2 rounded-md hidden md:block"
//                 >
//                     Continue
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ContentModal;