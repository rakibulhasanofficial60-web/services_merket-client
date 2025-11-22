import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddServices = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", data.image[0]);
        try {
            const res = await fetch(image_hosting_api, {
                method: "POST",
                body: formData
            });
            const result = await res.json();
            if (result.success) {
                const imageUrl = result.data.url;
                const finalData = {
                    ...data,
                    image: imageUrl,
                };

                const postData = await fetch("https://job-task-nu.vercel.app/api/v1/service/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(finalData),
                });

                const postResult = await postData.json();
                if (postResult.success === true) {
                    toast.success('Service added successfully');
                }

            } else {
                toast.error("Image upload failed");
            }
        } catch (error) {
            toast.error("Image Upload Error", error?.message);
        } finally {
            setLoading(false);
        }
    };


    //  const uploadImageToVPS = async (file) => {
    //         const data = new FormData();
    //         data.append("image", file);
    //         try {
    //             const res = await fetch(`${process.env.VITE_BACKEND_API_URL}/upload-image`, {
    //                 method: "POST",
    //                 body: data,
    //             });

    //             if (!res.ok) {
    //                 throw new Error("Failed to upload image");
    //             }

    //             const result = await res.json();
    //             return result.url;
    //         } catch (err) {
    //             toast.error("Image upload failed");
    //             throw err;
    //         }
    //     };
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-100"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Add New Service
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Image Upload */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="font-medium text-gray-700">Service Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", { required: true })}
                            className="border border-gray-300 p-3 w-full rounded-lg bg-gray-50 cursor-pointer"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm">Image is required</p>
                        )}
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            placeholder="Enter title..."
                            {...register("title", { required: true })}
                            className="border border-gray-300 p-3 w-full rounded-lg"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">Title is required</p>
                        )}
                    </div>

                    {/* Description 1 */}
                    <div className="space-y-2">
                        <label className="font-medium text-gray-700">Description 1</label>
                        <input
                            type="text"
                            placeholder="Short description..."
                            {...register("des1", { required: true })}
                            className="border border-gray-300 p-3 w-full rounded-lg"
                        />
                        {errors.des1 && (
                            <p className="text-red-500 text-sm">Description is required</p>
                        )}
                    </div>

                    {/* Description 2 */}
                    <div className="space-y-2">
                        <label className="font-medium text-gray-700">Description 2</label>
                        <input
                            type="text"
                            placeholder="Short description..."
                            {...register("des2", { required: true })}
                            className="border border-gray-300 p-3 w-full rounded-lg"
                        />
                        {errors.des2 && (
                            <p className="text-red-500 text-sm">Description is required</p>
                        )}
                    </div>

                    {/* Description 3 */}
                    <div className="space-y-2">
                        <label className="font-medium text-gray-700">Description 3</label>
                        <input
                            type="text"
                            placeholder="Short description..."
                            {...register("des3", { required: true })}
                            className="border border-gray-300 p-3 w-full rounded-lg"
                        />
                        {errors.des3 && (
                            <p className="text-red-500 text-sm">Description is required</p>
                        )}
                    </div>

                    {/* Rated */}
                    <div className="space-y-2">
                        <label className="font-medium text-gray-700">Rated</label>
                        <input
                            type="text"
                            placeholder="e.g. 4.5"
                            {...register("rated", { required: true })}
                            className="border border-gray-300 p-3 w-full rounded-lg"
                        />
                        {errors.rated && (
                            <p className="text-red-500 text-sm">Rating is required</p>
                        )}
                    </div>

                    {/* Total Booking */}
                    <div className="space-y-2">
                        <label className="font-medium text-gray-700">Total Booking</label>
                        <input
                            type="text"
                            placeholder="e.g. 350"
                            {...register("totalBooking", { required: true })}
                            className="border border-gray-300 p-3 w-full rounded-lg"
                        />
                        {errors.totalBooking && (
                            <p className="text-red-500 text-sm">Total booking is required</p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#01788E] text-white py-3 rounded-xl font-semibold text-lg transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddServices;