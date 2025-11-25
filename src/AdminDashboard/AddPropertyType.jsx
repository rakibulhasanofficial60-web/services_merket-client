import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin5Line, RiEditBoxLine } from "react-icons/ri";

import useCoverContent from "../hooks/useCoverContent";
import useDashboardPropertyType from "../hooks/userDashboardPropertyType";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function AddPropertyType() {
    const [content] = useCoverContent();
    const [propertyType, refetch] = useDashboardPropertyType();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register: registerEdit, handleSubmit: handleEditSubmit, setValue } = useForm();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [loading, setLoading] = useState(false);


    // -----------------------
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
            if (!uploadResult.success) return toast.error("Image upload failed");
            const imageUrl = uploadResult.data.url;
            const finalData = {
                title: data.title,
                description: data.description,
                startFrom: data.startFrom,
                serviceTypeId: data.serviceTypeId,
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
                setIsModalOpen(false);
                refetch();
            }
        } catch (error) {
            toast.error("Something went wrong", error?.message);
        } finally {
            setLoading(false);
        }
    };


    // OPEN EDIT MODAL
    // -----------------------
    const openEditModal = (item) => {
        setSelectedItem(item);
        setIsEditModalOpen(true);

        // Prefill form
        setValue("title", item.title);
        setValue("description", item.description);
        setValue("startFrom", item.startFrom);
        setValue("serviceTypeId", item.serviceTypeId);
    };


    // EDIT FORM SUBMIT
    // -----------------------
    const handleEditForm = async (data) => {
        setLoading(true);

        let imageUrl = selectedItem.image;

        // If user selected new image
        if (data.image && data.image.length > 0) {
            const formData = new FormData();
            formData.append("image", data.image[0]);

            const uploadRes = await fetch(image_hosting_api, {
                method: "POST",
                body: formData,
            });

            const uploadResult = await uploadRes.json();
            if (!uploadResult.success) return toast.error("Image upload failed");

            imageUrl = uploadResult.data.url;
        }

        const updatedData = {
            title: data.title,
            description: data.description,
            startFrom: data.startFrom,
            serviceTypeId: data.serviceTypeId,
            image: imageUrl,
        };

        try {
            const res = await fetch(
                `https://job-task-nu.vercel.app/api/v1/property-type/update/${selectedItem.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData),
                }
            );

            const result = await res.json();

            if (result.success) {
                toast.success("Updated successfully");
                setIsEditModalOpen(false);
            }
        } catch (error) {
            toast.error("Update failed", error?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="md:p-6">
            <div className="mx-auto flex flex-col items-center justify-center text-center md:flex-row md:justify-around md:items-center space-y-3 md:my-10">
                <h1 className="text-xl md:text-2xl font-bold">Property Types: {propertyType.length}</h1>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-outline">
                    Add Property Type
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Service Type</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {propertyType.map((con, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={con.image} />
                                            </div>
                                        </div>
                                        <div className="font-bold">
                                            {con.title} - {con.serviceType.title} - {con.serviceType.service.title}
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <button
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => openEditModal(con)}
                                    >
                                        <RiEditBoxLine className="text-xl text-green-500" />
                                    </button>
                                </td>

                                <td>
                                    <button className="btn btn-ghost btn-xs">
                                        <RiDeleteBin5Line className="text-xl text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ADD MODAL */}
            {isModalOpen && (
                <>
                    <div
                        onClick={() => setIsModalOpen(false)}
                        className="fixed inset-0 bg-black/40 z-40"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex justify-center items-center px-2 sm:px-4 md:px-6">
                        <div
                            className="
                                        relative bg-white 
                                        w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl
                                        p-4 sm:p-6 md:p-8 
                                        rounded-md shadow-xl 
                                        max-h-[90vh] overflow-y-auto
                                        "
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl font-bold cursor-pointer"
                            >
                                ×
                            </button>

                            {/* Title */}
                            <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">
                                Add Property Type
                            </h2>

                            {/* Form */}
                            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="block font-medium mb-1">Title</label>
                                    <input
                                        type="text"
                                        {...register("title", { required: true })}
                                        className="border p-3 w-full rounded-md"
                                        placeholder="Title"
                                    />
                                    {errors.title && <p className="text-red-500 text-sm">Required</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block font-medium mb-1">Description</label>
                                    <textarea
                                        {...register("description", { required: true })}
                                        className="border p-3 w-full rounded-md"
                                        placeholder="Description"
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">Required</p>}
                                </div>

                                {/* Start From */}
                                <div>
                                    <label className="block font-medium mb-1">Start From</label>
                                    <input
                                        type="number"
                                        {...register("startFrom", { required: true })}
                                        className="border p-3 w-full rounded-md"
                                        placeholder="Start From"
                                    />
                                    {errors.startFrom && <p className="text-red-500 text-sm">Required</p>}
                                </div>

                                {/* Service Type */}
                                <div>
                                    <label className="block font-medium mb-1">Service Type</label>
                                    <select
                                        {...register("serviceTypeId", { required: true })}
                                        className="border p-3 w-full rounded-md"
                                    >
                                        <option value="">Select Service Type</option>
                                        {content.map((c) => (
                                            <option key={c.id} value={c.id}>{c.title}</option>
                                        ))}
                                    </select>
                                    {errors.serviceTypeId && <p className="text-red-500 text-sm">Required</p>}
                                </div>

                                {/* Image */}
                                <div>
                                    <label className="block font-medium mb-1">Image</label>
                                    <input
                                        type="file"
                                        {...register("image", { required: true })}
                                        className="w-full border p-2 rounded"
                                    />
                                    {errors.image && <p className="text-red-500 text-sm">Required</p>}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn w-full"
                                >
                                    {loading ? "Updating..." : "Update"}
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}

            {/* EDIT MODAL */}
            {isEditModalOpen && (
                <>
                    <div
                        onClick={() => setIsEditModalOpen(false)}
                        className="fixed inset-0 bg-black/40 z-40"
                    />

                    <div className="fixed inset-0 z-50 flex justify-center items-center px-2 sm:px-4 md:px-6">
                        <div
                            className="
          relative bg-white 
          w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl
          p-4 sm:p-6 md:p-8 
          rounded-md shadow-xl 
          max-h-[90vh] overflow-y-auto
        "
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl font-bold cursor-pointer"
                            >
                                ×
                            </button>

                            <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">
                                Edit Property Type
                            </h2>

                            <form onSubmit={handleEditSubmit(handleEditForm)} className="space-y-4">

                                {/* Title */}
                                <div>
                                    <label className="block font-medium mb-1">Title</label>
                                    <input
                                        type="text"
                                        {...registerEdit("title", { required: true })}
                                        className="border p-3 w-full rounded-md"
                                        placeholder="Title"
                                    />
                                    {errors.title && <p className="text-red-500 text-sm">Required</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block font-medium mb-1">Description</label>
                                    <textarea
                                        {...registerEdit("description", { required: true })}
                                        className="border p-3 w-full rounded-md"
                                        placeholder="Description"
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">Required</p>}
                                </div>

                                {/* Start From */}
                                <div>
                                    <label className="block font-medium mb-1">Start From</label>
                                    <input
                                        type="number"
                                        {...registerEdit("startFrom", { required: true })}
                                        className="border p-3 w-full rounded-md"
                                        placeholder="Start From"
                                    />
                                    {errors.startFrom && <p className="text-red-500 text-sm">Required</p>}
                                </div>

                                {/* Service Type */}
                                <div>
                                    <label className="block font-medium mb-1">Service Type</label>
                                    <select
                                        {...registerEdit("serviceTypeId", { required: true })}
                                        className="border p-3 w-full rounded-md"
                                    >
                                        <option value="">Select Service Type</option>
                                        {content.map((c) => (
                                            <option key={c.id} value={c.id}>{c.title}</option>
                                        ))}
                                    </select>
                                    {errors.serviceTypeId && <p className="text-red-500 text-sm">Required</p>}
                                </div>

                                {/* Image */}
                                <div>
                                    <label className="block font-medium mb-1">Image</label>
                                    <input
                                        type="file"
                                        {...registerEdit("image")}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn w-full"
                                >
                                    {loading ? "Updating..." : "Update"}
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import useCoverContent from "../hooks/useCoverContent";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const AddPropertyType = () => {
//     const [content] = useCoverContent();

//     const { register, handleSubmit, formState: { errors }, reset } = useForm();
//     const [loading, setLoading] = useState(false);

//     const handleFormSubmit = async (data) => {
//         setLoading(true);
//         const formData = new FormData();
//         formData.append("image", data.image[0]);

//         try {
//             const uploadRes = await fetch(image_hosting_api, {
//                 method: "POST",
//                 body: formData,
//             });

//             const uploadResult = await uploadRes.json();
//             if (uploadResult.success) {
//                 const imageUrl = uploadResult.data.url;

//                 const finalData = {
//                     title: data.title,
//                     description: data.description,
//                     startFrom: data.startFrom,
//                     serviceTypeId: data.serviceTypeId,
//                     image: imageUrl,
//                 };

//                 const postRes = await fetch(
//                     "https://job-task-nu.vercel.app/api/v1/property-type/create",
//                     {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify(finalData),
//                     }
//                 );

//                 const result = await postRes.json();
//                 if (result.success) {
//                     toast.success("Property Type added successfully");
//                     reset();
//                 }
//             } else {
//                 toast.error("Image upload failed");
//             }
//         } catch (error) {
//             toast.error("Error uploading image", error?.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow">
//             <h2 className="text-xl font-bold mb-4">Add Property Type</h2>

//             <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

//                 {/* Title */}
//                 <div>
//                     <label className="block mb-1 font-medium">Title</label>
//                     <input
//                         type="text"
//                         {...register("title", { required: true })}
//                         className="w-full border p-2 rounded"
//                         placeholder="Enter title"
//                     />
//                     {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
//                 </div>

//                 {/* Description */}
//                 <div>
//                     <label className="block mb-1 font-medium">Description</label>
//                     <textarea
//                         {...register("description", { required: true })}
//                         className="w-full border p-2 rounded"
//                         placeholder="Enter description"
//                     />
//                     {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
//                 </div>

//                 {/* Start From */}
//                 <div>
//                     <label className="block mb-1 font-medium">Start From</label>
//                     <input
//                         type="number"
//                         {...register("startFrom", { required: true })}
//                         className="w-full border p-2 rounded"
//                         placeholder="Starting price"
//                     />
//                     {errors.startFrom && <p className="text-red-500 text-sm">Start price is required</p>}
//                 </div>

//                 {/* Dropdown (Service Type) */}
//                 <div>
//                     <label className="block mb-1 font-medium">Select Service Type</label>
//                     <select
//                         {...register("serviceTypeId", { required: true })}
//                         className="w-full border p-2 rounded"
//                     >
//                         <option value="">Select Service Type</option>

//                         {content.map((c) => (
//                             <option key={c.id} value={c.id}>
//                                 {c.title}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.serviceTypeId && (
//                         <p className="text-red-500 text-sm">Service Type is required</p>
//                     )}
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                     <label className="block mb-1 font-medium">Image</label>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         {...register("image", { required: true })}
//                         className="w-full border p-2 rounded"
//                     />
//                     {errors.image && <p className="text-red-500 text-sm">Image is required</p>}
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-black-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
//                 >
//                     {loading ? "Submitting..." : "Submit"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddPropertyType;