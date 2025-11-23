import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAllServices from "../hooks/useAllServices";
import { RiEditBoxLine } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
import EditModal from "../components/EditModal/EditModal";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddServices = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [services, isLoading, refetch] = useAllServices();
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);


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
                    toast.success("Service added successfully");
                    setIsModalOpenAdd(false);
                    refetch();
                }
            } else {
                toast.error("Image upload failed");
            }
        } catch (error) {
            toast.error(`Something wrong: ${error?.message || error}`);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    return (
        <div>
            {/* Header */}
            <div className="mx-auto md:flex items-center justify-around my-10">
                <p className="text-xl font-medium md:text-3xl md:font-bold">Total Services: {services.length}</p>
                <button
                    onClick={() => setIsModalOpenAdd(true)}
                    className="btn btn-outline"
                >
                    Add services
                </button>
            </div>

            {/* Service Table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Service Name</th>
                                <th>Description</th>
                                <th>Total Booking</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, idx) => (
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={service.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{service.title}</div>
                                                <div className="text-sm opacity-50">Rated: {service.rated}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {service.des1}
                                        <br />
                                    </td>
                                    <td>Total Booking: {service.totalBooking}</td>
                                    <th>
                                        <button
                                            title="Edit"
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => {
                                                setSelectedService(service);
                                                setIsModalOpenEdit(true);
                                            }}
                                        >
                                            <RiEditBoxLine className="text-xl" />
                                        </button>
                                    </th>
                                    <th>
                                        <button title="Delete" className="btn btn-ghost btn-xs"><RiDeleteBin5Line className="text-xl" /></button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ------------------ MODAL ADD SERVICE ------------------ */}
            {isModalOpenAdd && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
                    onClick={() => setIsModalOpenAdd(false)}
                >
                    <div
                        className="relative bg-white p-8 rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto w-full max-w-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            onClick={() => setIsModalOpenAdd(false)}
                            className="cursor-pointer absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl font-bold"
                        >
                            ×
                        </button>

                        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                            Add New Service
                        </h2>

                        {/* Form */}
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="md:col-span-2">
                                    <label className="font-medium">Service Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register("image", { required: true })}
                                        className="border p-3 w-full rounded-lg"
                                    />
                                    {errors.image && (
                                        <p className="text-red-500 text-sm">Image is required</p>
                                    )}
                                </div>

                                <div>
                                    <label className="font-medium">Title</label>
                                    <input
                                        type="text"
                                        {...register("title", { required: true })}
                                        className="border p-3 w-full rounded-lg"
                                        placeholder="Enter title"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm">Title is required</p>
                                    )}
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
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ------------------ MODAL Edit SERVICE ------------------ */}
            {isModalOpenEdit && (
                <EditModal
                    service={selectedService}
                    onClose={() => setIsModalOpenEdit(false)}
                />
            )}

        </div>
    );
};

export default AddServices;