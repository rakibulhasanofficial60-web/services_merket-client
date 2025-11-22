import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useCoverContent from "../hooks/useCoverContent";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPropertyItem = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [content] = useCoverContent();
    // const propertyItems = content[0]?.propertyType?.[0] || [];
    const propertyItems = content[0] || [];

    console.log(propertyItems);
    const handleFormSubmit = async (data) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("image", data.image[0]);

        try {
            // 1. Upload image
            const res = await fetch(image_hosting_api, {
                method: "POST",
                body: formData,
            });
            const imgResult = await res.json();

            if (!imgResult.success) {
                toast.error("Image upload failed");
                setLoading(false);
                return;
            }

            // 2. Final data
            const finalData = {
                title: data.title,
                description: data.description,
                price: Number(data.price),
                featured1: data.featured1,
                featured2: data.featured2,
                featured3: data.featured3,
                featured4: data.featured4,
                propertyTypeId: data.propertyTypeId,
                image: imgResult.data.url,
            };

            // 3. Save to DB
            const postRes = await fetch(
                "https://job-task-nu.vercel.app/api/v1/property-item/create",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(finalData),
                }
            );

            const postResult = await postRes.json();

            if (postResult.success) {
                toast.success("Property item added successfully!");
                reset();
            }
        } catch (error) {
            toast.error("Error submitting form", error?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Add Property Item</h2>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                {/* Image */}
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

                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        className="w-full border p-2 rounded"
                        placeholder="Title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        className="w-full border p-2 rounded"
                        placeholder="Description"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="number"
                        {...register("price", { required: true })}
                        className="w-full border p-2 rounded"
                        placeholder="Price"
                    />
                    {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block mb-1 font-medium">Featured 1</label>
                        <input
                            type="text"
                            {...register("featured1")}
                            className="w-full border p-2 rounded"
                            placeholder="Feature 1"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Featured 2</label>
                        <input
                            type="text"
                            {...register("featured2")}
                            className="w-full border p-2 rounded"
                            placeholder="Feature 2"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Featured 3</label>
                        <input
                            type="text"
                            {...register("featured3")}
                            className="w-full border p-2 rounded"
                            placeholder="Feature 3"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Featured 4</label>
                        <input
                            type="text"
                            {...register("featured4")}
                            className="w-full border p-2 rounded"
                            placeholder="Feature 4"
                        />
                    </div>
                </div>

                {/* Property Type ID */}
                <div>
                    <label className="block mb-1 font-medium">Property Type</label>
                    <select
                        {...register("propertyTypeId", { required: true })}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select Property Type</option>
                        {/* {propertyTypes?.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.title}
                            </option>
                        ))} */}
                    </select>
                    {errors.propertyTypeId && (
                        <p className="text-red-500 text-sm">Property Type is required</p>
                    )}
                </div>

                {/* Submit */}
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

export default AddPropertyItem;