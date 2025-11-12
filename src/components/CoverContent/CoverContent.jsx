// import { useState } from "react";
// import dirhum from '../../assets/icon/dirhum.png';
// import { MdOutlineArrowRightAlt } from "react-icons/md";
// import ContentModal from "../ContentModal/ContentModal";

// const CoverContent = ({ content }) => {
//     const [showModal, setShowModal] = useState(false);
//     const [selectedProperty, setSelectedProperty] = useState(null);

//     console.log("CoverContent data:", content);

//     const properties = Array.isArray(content?.propertyType)
//         ? content.propertyType
//         : [];

//     return (
//         <div>
//             {properties.map((property, idx) => (
//                 <div key={idx} className="flex border-b pb-2.5 border-gray-400 mb-6">
//                     {/* Left Side: Image */}
//                     <img
//                         src={property.image}
//                         alt={property.title}
//                         className="w-20 h-20 object-cover rounded-sm"
//                     />

//                     {/* Right Side: Content */}
//                     <div className="ml-5 space-y-1">
//                         <h2 className="text-[18px] font-semibold mb-2">
//                             {property.title}
//                         </h2>
//                         <p className="text-gray-600 text-[13px]">
//                             {property.description}
//                         </p>

//                         <div className="flex justify-between items-center">
//                             <p className="text-gray-600 flex items-center gap-2 text-[14px]">
//                                 Starting from{" "}
//                                 <span className="font-bold flex items-center">
//                                     <img
//                                         className="h-[15px] w-[15px]"
//                                         src={dirhum}
//                                         alt=""
//                                     />{" "}
//                                     {property.startFrom}
//                                 </span>
//                             </p>

//                             {/* 🔹 Modal Trigger Button */}
//                             <button
//                                 onClick={() => {
//                                     setSelectedProperty(property);
//                                     setShowModal(true);
//                                 }}
//                                 className="cursor-pointer border px-2.5 py-1 flex items-center gap-2 text-[#01788E] rounded-xs hover:bg-gray-100 transition text-[13px]"
//                             >
//                                 {property.propertyItems?.length || 0} Options{" "}
//                                 <MdOutlineArrowRightAlt />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             ))}

//             {/* 🔹 Modal Component */}
//             {showModal && (
//                 <ContentModal
//                     setShowModal={setShowModal}
//                     property={selectedProperty}
//                 />
//             )}
//         </div>
//     );
// };

// export default CoverContent;




import { useState } from "react";
import dirhum from '../../assets/icon/dirhum.png';
import { MdOutlineArrowRightAlt } from "react-icons/md";
import ContentModal from "../ContentModal/ContentModal";

const CoverContent = ({ content }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const properties = Array.isArray(content?.propertyType)
        ? content.propertyType
        : [];

    // 🔹 Function to handle click anywhere on card
    const handleOpenModal = (property) => {
        setSelectedProperty(property);
        setShowModal(true);
    };

    return (
        <div>
            {properties.map((property, idx) => (
                <div
                    key={idx}
                    onClick={() => handleOpenModal(property)} // 🔹 Whole div clickable
                    className="flex border-b pb-2.5 border-gray-400 mb-6 cursor-pointer hover:bg-gray-50 transition"
                >
                    {/* Left Side: Image */}
                    <img
                        src={property.image}
                        alt={property.title}
                        className="w-20 h-20 object-cover rounded-sm"
                    />

                    {/* Right Side: Content */}
                    <div className="ml-5 space-y-1 flex-1">
                        <h2 className="text-[18px] font-semibold mb-2">
                            {property.title}
                        </h2>
                        <p className="text-gray-600 text-[13px]">
                            {property.description}
                        </p>

                        <div className="flex justify-between items-center">
                            <p className="text-gray-600 flex items-center gap-2 text-[14px]">
                                Starting from{" "}
                                <span className="font-bold flex items-center">
                                    <img
                                        className="h-[15px] w-[15px]"
                                        src={dirhum}
                                        alt="AED"
                                    />{" "}
                                    {property.startFrom}
                                </span>
                            </p>

                            {/* 🔹 Small indicator button (non-clickable now) */}
                            <div className="border px-2.5 py-1 flex items-center gap-2 text-[#01788E] rounded-xs text-[13px]">
                                {property.propertyItems?.length || 0} Options{" "}
                                <MdOutlineArrowRightAlt />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* 🔹 Modal */}
            {showModal && (
                <ContentModal
                    setShowModal={setShowModal}
                    property={selectedProperty}
                />
            )}
        </div>
    );
};

export default CoverContent;
