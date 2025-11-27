import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import Summery from "../../../components/Summery/Summery";
import { useSummary } from "../../../provider/SummaryProvider";
import NextBtn from "../../../components/NextBtn/NextBtn";
import { useForm } from "react-hook-form";

const Address = () => {
    const { itemSummary, total, vat, serviceCharge, showInput, setShowInput, address,  serviceTitle } = useSummary();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        localStorage.setItem("addressInfo", JSON.stringify(data));
        console.log("Form Data:", data);
    };


    return (
        <div>
            <ServiceDetails title="Address" currentStep={2} />
            <div className="flex gap-8 mt-5">
                <div className="md:w-[60%] mb-4 space-y-4">

                    <div className="bg-white rounded-xl shadow-lg w-full p-8">
                        <div className="flex space-x-2 mb-6">
                            <button className="flex items-center px-4 py-2 text-white bg-teal-600 rounded-full shadow-md transition duration-300">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 8h6m-6 4h6m-6 4h6"></path></svg>
                                Apartment
                            </button>

                            <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                Villa
                            </button>

                            <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21v-2a2 2 0 00-2-2H7a2 2 0 00-2 2v2m7-12V7m0 0V5m0 2v2m0 0h-3m3 0h3"></path></svg>
                                Office
                            </button>

                            <button className="flex items-center px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Other
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Select City */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Select City</label>
                                <div className="relative">
                                    <select
                                        {...register("city", { required: "City is required" })}
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 
                        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white pr-10"
                                    >
                                        <option value="">Select City</option>
                                        <option value="Dubai">Dubai</option>
                                        <option value="Abu Dhabi">Abu Dhabi</option>
                                        <option value="Sharjah">Sharjah</option>
                                    </select>

                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                            </div>

                            {/* Area */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Area</label>
                                <div className="relative">
                                    <input
                                        {...register("area", { required: "Area is required" })}
                                        type="text"
                                        placeholder="Start typing to find your area"
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 
                        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white placeholder-gray-400 pr-10"
                                    />
                                </div>
                                {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
                            </div>

                            {/* Building Name */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Building Name</label>
                                <input
                                    {...register("buildingName", { required: "Building name is required" })}
                                    type="text"
                                    placeholder="Enter Building Name"
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 
                    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400"
                                />
                                {errors.buildingName && <p className="text-red-500 text-sm">{errors.buildingName.message}</p>}
                            </div>

                            {/* Apartment No */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Apartment No.</label>
                                <input
                                    {...register("apartmentNo", { required: "Apartment number is required" })}
                                    type="text"
                                    placeholder="Enter Apartment No."
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 
                    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400"
                                />
                                {errors.apartmentNo && <p className="text-red-500 text-sm">{errors.apartmentNo.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-4 w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
                            >
                                Save & Continue
                            </button>

                        </form>
                    </div>
                </div>

                <Summery serviceTitle={serviceTitle} address={address} itemSummary={itemSummary} total={total} showInput={showInput} setShowInput={setShowInput} vat={vat} serviceCharge={serviceCharge}></Summery>
            </div>

            <div className="hidden md:block">
                <NextBtn />
            </div>
        </div>
    );
};

export default Address;