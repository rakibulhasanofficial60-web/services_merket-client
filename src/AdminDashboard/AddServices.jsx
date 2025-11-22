import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAllServices from "../hooks/useAllServices";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function AddServices() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [services, isLoading] = useAllServices();
    const [openModal, setOpenModal] = useState(false);

    const handleFormSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", data.image[0]);

        try {
            const res = await fetch(image_hosting_api, {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            if (result.success) {
                const imageUrl = result.data.url;
                const finalData = { ...data, image: imageUrl };

                const postData = await fetch(
                    "https://job-task-nu.vercel.app/api/v1/service/create",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(finalData),
                    }
                );

                const postResult = await postData.json();
                if (postResult.success) {
                    toast.success("Service added successfully");
                    setOpenModal(false);
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

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    return (
        <div>
            <div className="md:flex items-center justify-between my-10 px-4">
                <p className="text-xl md:text-3xl font-bold">
                    Total service: {services.length}
                </p>
                <button
                    className="btn bg-[#01788E] text-white"
                    onClick={() => setOpenModal(true)}
                >
                    Add Service
                </button>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto px-4">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Service Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, idx) => (
                            <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={service.image} alt={service.title} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{service.title}</div>
                                            <div className="text-sm opacity-50">
                                                Total Booking: {service.totalBooking}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>Random Job</td>
                                <td>Purple</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">Details</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {openModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 p-4"
                    onClick={() => setOpenModal(false)}
                >
                    <div
                        className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute right-4 top-4 text-xl"
                            onClick={() => setOpenModal(false)}
                        >
                            ✕
                        </button>

                        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                                Add New Service
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <label>Service Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register("image", { required: true })}
                                        className="border p-3 w-full rounded-lg bg-gray-50"
                                    />
                                    {errors.image && (
                                        <p className="text-red-500 text-sm">Image is required</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        {...register("title", { required: true })}
                                        className="border p-3 w-full rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label>Description 1</label>
                                    <input
                                        type="text"
                                        {...register("des1", { required: true })}
                                        className="border p-3 w-full rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label>Description 2</label>
                                    <input
                                        type="text"
                                        {...register("des2", { required: true })}
                                        className="border p-3 w-full rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label>Description 3</label>
                                    <input
                                        type="text"
                                        {...register("des3", { required: true })}
                                        className="border p-3 w-full rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label>Rated</label>
                                    <input
                                        type="text"
                                        {...register("rated", { required: true })}
                                        className="border p-3 w-full rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label>Total Booking</label>
                                    <input
                                        type="text"
                                        {...register("totalBooking", { required: true })}
                                        className="border p-3 w-full rounded-lg"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-[#01788E] text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}