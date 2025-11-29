import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import Summery from "../../../components/Summery/Summery";
import { useSummary } from "../../../provider/SummaryProvider";
import NextBtn from "../../../components/NextBtn/NextBtn";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Address = () => {
    const { itemSummary, total, vat, serviceCharge, showInput, setShowInput, address, serviceTitle, saveAddress } = useSummary();
    const [selectedType, setSelectedType] = useState("Apartment");
    const buttons = ["Apartment", "Villa", "Office", "Other"];

    const { register, handleSubmit, formState: { errors } } = useForm();

    // Form submit handler → Save to context + localStorage
    const onSubmit = (data) => {
        const finalData = { type: selectedType, ...data };
        saveAddress(finalData);
        console.log("Saved Address:", finalData);
    };

    return (
        <div>
            <ServiceDetails title="Address" currentStep={2} />

            <div className="flex gap-8 mt-5">
                <div className="md:w-[60%] mb-4 space-y-4">

                    <div className="bg-white rounded-xl shadow-lg w-full p-8">

                        {/* TYPE BUTTONS */}
                        <div className="flex space-x-2 mb-6">
                            {buttons.map(btn => (
                                <button
                                    key={btn}
                                    onClick={() => setSelectedType(btn)}
                                    type="button"
                                    className={`flex items-center px-4 py-2 rounded-full transition duration-300 border cursor-pointer
                    ${selectedType === btn ? "bg-teal-600 text-white shadow-md" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* City */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Select City</label>
                                <select {...register("city", { required: true })} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                    <option value="">Select City</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Abu Dhabi">Abu Dhabi</option>
                                    <option value="Sharjah">Sharjah</option>
                                </select>
                                {errors.city && <p className="text-red-500 text-sm">City is required</p>}
                            </div>

                            {/* Area */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Area</label>
                                <input {...register("area", { required: true })} type="text" placeholder="Enter Area" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                {errors.area && <p className="text-red-500 text-sm">Area is required</p>}
                            </div>

                            {/* Dynamic Fields */}
                            {selectedType === "Villa" && (
                                <>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Community / Street Name</label>
                                        <input {...register("community", { required: true })} type="text" placeholder="Enter Community / Street Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Villa No</label>
                                        <input {...register("villaNo", { required: true })} type="text" placeholder="Enter Villa Number" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                    </div>
                                </>
                            )}

                            {selectedType === "Other" && (
                                <>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Nickname</label>
                                        <input {...register("nickname", { required: true })} type="text" placeholder="Enter Nickname" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Street / Building Name</label>
                                        <input {...register("streetName", { required: true })} type="text" placeholder="Enter Street / Building Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Apartment / Villa No</label>
                                        <input {...register("otherNo", { required: true })} type="text" placeholder="Enter Apartment / Villa No" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                    </div>
                                </>
                            )}

                            {selectedType !== "Villa" && selectedType !== "Other" && (
                                <>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Building Name</label>
                                        <input {...register("buildingName", { required: true })} type="text" placeholder="Enter Building Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Apartment No</label>
                                        <input {...register("apartmentNo", { required: true })} type="text" placeholder="Enter Apartment No" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                    </div>
                                </>
                            )}

                        </form>

                    </div>
                </div>

                <Summery serviceTitle={serviceTitle} address={address} itemSummary={itemSummary} total={total} showInput={showInput} setShowInput={setShowInput} vat={vat} serviceCharge={serviceCharge} />
            </div>

            <div className="hidden md:block">
                <NextBtn onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};

export default Address;