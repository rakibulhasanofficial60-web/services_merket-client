import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useCoverContent from "../hooks/useCoverContent";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPropertyType = () => {
    const [content] = useCoverContent();
    const propertyItems = content[0]?.propertyType?.[0] || [];

    console.log(propertyItems);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (data) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("image", data.image[0]);

        try {
            const uploadRes = await fetch(image_hosting_api, {
                method: "POST",
                body: formData,
            });

            const uploadResult = await uploadRes.json();

            if (uploadResult.success) {
                const imageUrl = uploadResult.data.url;

                const finalData = {
                    title: data.title,
                    description: data.description,
                    startFrom: data.startFrom,
                    serviceTypeId: propertyItems?.serviceTypeId,
                    image: imageUrl,
                };

                const postRes = await fetch(
                    "https://job-task-nu.vercel.app/api/v1/property-type/create",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(finalData),
                    }
                );

                const result = await postRes.json();

                if (result.success) {
                    toast.success("Property Type added successfully");
                    reset();
                }
            } else {
                toast.error("Image upload failed");
            }
        } catch (error) {
            toast.error("Error uploading image", error?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Add Property Type</h2>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        className="w-full border p-2 rounded"
                        placeholder="Enter title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        className="w-full border p-2 rounded"
                        placeholder="Enter description"
                    />
                    {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
                </div>

                {/* Start From */}
                <div>
                    <label className="block mb-1 font-medium">Start From</label>
                    <input
                        type="number"
                        {...register("startFrom", { required: true })}
                        className="w-full border p-2 rounded"
                        placeholder="Starting price"
                    />
                    {errors.startFrom && <p className="text-red-500 text-sm">Start price is required</p>}
                </div>

                {/* Dropdown (Service Type) */}
                <div>
                    <label className="block mb-1 font-medium">Select Service Type</label>
                    <select
                        {...register("serviceTypeId", { required: true })}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select Service Type</option>
                        <option value={propertyItems.id}>
                            {propertyItems.title}
                        </option>
                    </select>
                    {errors.serviceTypeId && (
                        <p className="text-red-500 text-sm">Service Type is required</p>
                    )}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block mb-1 font-medium">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", { required: true })}
                        className="w-full border p-2 rounded"
                    />
                    {errors.image && <p className="text-red-500 text-sm">Image is required</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default AddPropertyType;