import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

const EditModal = ({ service, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: service?.title,
            des1: service?.des1,
            des2: service?.des2,
            des3: service?.des3,
            rated: service?.rated,
            totalBooking: service?.totalBooking,
        }
    });
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (data) => {
        setLoading(true);
        try {
            let imageUrl = service.image;
            // If a new image is selected, upload it
            if (data.image && data.image.length > 0) {
                const formData = new FormData();
                formData.append("image", data.image[0]);

                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
                    { method: "POST", body: formData }
                );

                const imgResult = await res.json();
                if (imgResult.success) {
                    imageUrl = imgResult.data.url;
                } else {
                    toast.error("Image upload failed");
                    return;
                }
            }

            const updatedData = {
                ...data,
                image: imageUrl,
            };

            const updateRes = await fetch(
                `https://job-task-nu.vercel.app/api/v1/service/update/${service._id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData),
                }
            );

            const result = await updateRes.json();

            if (result.success) {
                toast.success("Service updated successfully");
                onClose(false);
            } else {
                toast.error("Failed to update");
            }
        } catch (error) {
            toast.error(`Error: ${error?.message}`);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (!service) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
            onClick={() => onClose(false)}
        >
            <div
                className="relative bg-white p-8 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto w-full max-w-3xl"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={() => onClose(false)}
                    className="cursor-pointer absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl font-bold"
                >
                    ×
                </button>

                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Edit Service
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="md:col-span-2">
                            <label className="font-medium">Service Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("image")}
                                className="border p-3 w-full rounded-lg"
                            />
                            <p className="text-gray-500 text-sm mt-1">
                                (Leave empty to keep old image)
                            </p>
                        </div>

                        <div>
                            <label className="font-medium">Title</label>
                            <input
                                type="text"
                                {...register("title", { required: true })}
                                className="border p-3 w-full rounded-lg"
                                placeholder="Enter title"
                            />
                            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                        </div>

                        <div>
                            <label className="font-medium">Description 1</label>
                            <input
                                type="text"
                                {...register("des1", { required: true })}
                                className="border p-3 w-full rounded-lg"
                                placeholder="Short description..."
                            />
                        </div>

                        <div>
                            <label className="font-medium">Description 2</label>
                            <input
                                type="text"
                                {...register("des2", { required: true })}
                                className="border p-3 w-full rounded-lg"
                                placeholder="Short description..."
                            />
                        </div>

                        <div>
                            <label className="font-medium">Description 3</label>
                            <input
                                type="text"
                                {...register("des3", { required: true })}
                                className="border p-3 w-full rounded-lg"
                                placeholder="Short description..."
                            />
                        </div>

                        <div>
                            <label className="font-medium">Rated</label>
                            <input
                                type="text"
                                {...register("rated", { required: true })}
                                className="border p-3 w-full rounded-lg"
                                placeholder="e.g. 4.5"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Total Booking</label>
                            <input
                                type="text"
                                {...register("totalBooking", { required: true })}
                                className="border p-3 w-full rounded-lg"
                                placeholder="e.g. 350"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#01788E] text-white py-3 rounded-xl font-semibold text-lg"
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditModal;