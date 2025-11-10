import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

const Card = ({ service }) => {
    console.log(service);
    const { image, title, rating, booking, subHeading, des1, des2, des3 } = service;
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="overflow-hidden bg-white">
            {/* Image Section */}
            <img
                className="object-cover w-full h-64"
                src={image}
                alt={title}
            />

            {/* Content Section */}
            <div className="p-8">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    {/* Left Side Info */}
                    <div>
                        <h2 className="block mt-2 text-xl font-semibold text-gray-700">
                            {title}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <FaStar />
                            <p>{rating}</p>
                            <p>({booking})</p>
                        </div>
                    </div>

                    {/* Info Icon */}
                    <div
                        onClick={() => setShowModal(true)}
                        className="text-black cursor-pointer"
                    >
                        <IoInformationCircleOutline className="text-3xl font-extralight" />
                    </div>
                </div>

                {/* Warning Message */}
                <div className="bg-[#F8D7DA] rounded-md py-2 mt-5">
                    <p className="text-red-500 text-center text-sm">
                        Please select any service to continue
                    </p>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>

                        {/* Modal Content */}
                        <h2 className="text-xl font-semibold text-center mb-4">
                            {subHeading}
                        </h2>
                        <div className="space-y-2 text-gray-700 text-center">
                            <p>{des1}</p>
                            <p>{des2}</p>
                            <p>{des3}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;