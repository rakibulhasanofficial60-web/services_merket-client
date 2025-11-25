// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import useCoverContent from "../hooks/useCoverContent";
// import useDashboardPropertyItem from "../hooks/useDashboardPropertyItem";
// import { RiDeleteBin5Line, RiEditBoxLine } from "react-icons/ri";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const AddPropertyItem = () => {
//     const { register, handleSubmit, formState: { errors }, reset } = useForm();
//     const [loading, setLoading] = useState(false);
//     const [content] = useCoverContent();
//     const [propertyItem] = useDashboardPropertyItem();

//     const propertyTypes = content.flatMap(c =>
//         c.propertyType?.map(pt => ({
//             id: pt.id,
//             title: pt.title
//         })) || []
//     );


//     const handleFormSubmit = async (data) => {
//         setLoading(true);

//         const formData = new FormData();
//         formData.append("image", data.image[0]);

//         try {
//             // 1. Upload image
//             const res = await fetch(image_hosting_api, {
//                 method: "POST",
//                 body: formData,
//             });
//             const imgResult = await res.json();

//             if (!imgResult.success) {
//                 toast.error("Image upload failed");
//                 setLoading(false);
//                 return;
//             }

//             // 2. Final data
//             const finalData = {
//                 image: imgResult.data.url,
//                 title: data.title,
//                 description: data.description,
//                 price: Number(data.price),
//                 serviceCharge: 0,
//                 vat: 0,
//                 feature1: data.featured1,
//                 feature2: data.featured2,
//                 feature3: data.featured3,
//                 feature4: data.featured4,
//                 propertyTypeId: data.propertyTypeId,
//             };

//             console.log(finalData);

//             // 3. Save to DB
//             const postRes = await fetch(
//                 "https://job-task-nu.vercel.app/api/v1/property-items/create",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(finalData),
//                 }
//             );

//             const postResult = await postRes.json();

//             if (postResult.success) {
//                 toast.success("Property item added successfully!");
//                 reset();
//             }
//         } catch (error) {
//             toast.error("Error submitting form", error?.message);
//         } finally {
//             setLoading(false);
//         }
//     };


//     console.log(propertyItem.map(p => p.propertyType.serviceType.service.title));
//     return (

//         <div className="overflow-x-auto rounded-xl shadow">
//             <table className="table w-full">
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>Service Type</th>
//                         <th>Edit</th>
//                         <th>Delete</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {propertyItem.map((propitem, idx) => (
//                         <tr key={idx}>
//                             <td>{idx + 1}</td>

//                             <td>
//                                 <div className="flex items-center gap-3">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-12 w-12">
//                                             <img src={propitem.image} />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         {propitem.title} - {propitem.propertyType.title} - {propitem.propertyType.serviceType.title} - {propitem.propertyType.serviceType.service.title}
//                                     </div>
//                                 </div>
//                             </td>

//                             <td>
//                                 <button
//                                     className="btn btn-ghost btn-xs"
//                                     onClick={() => openEditModal(propitem)}
//                                 >
//                                     <RiEditBoxLine className="text-xl" />
//                                 </button>
//                             </td>

//                             <td>
//                                 <button className="btn btn-ghost btn-xs">
//                                     <RiDeleteBin5Line className="text-xl" />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>


//         // <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow">
//         //     <h2 className="text-xl font-bold mb-4">Add Property Item</h2>

//         //     <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
//         //         {/* Image */}
//         //         <div>
//         //             <label className="block mb-1 font-medium">Image</label>
//         //             <input
//         //                 type="file"
//         //                 accept="image/*"
//         //                 {...register("image", { required: true })}
//         //                 className="w-full border p-2 rounded"
//         //             />
//         //             {errors.image && <p className="text-red-500 text-sm">Image is required</p>}
//         //         </div>

//         //         {/* Title */}
//         //         <div>
//         //             <label className="block mb-1 font-medium">Title</label>
//         //             <input
//         //                 type="text"
//         //                 {...register("title", { required: true })}
//         //                 className="w-full border p-2 rounded"
//         //                 placeholder="Title"
//         //             />
//         //             {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
//         //         </div>

//         //         {/* Description */}
//         //         <div>
//         //             <label className="block mb-1 font-medium">Description</label>
//         //             <textarea
//         //                 {...register("description", { required: true })}
//         //                 className="w-full border p-2 rounded"
//         //                 placeholder="Description"
//         //             ></textarea>
//         //             {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
//         //         </div>

//         //         {/* Price */}
//         //         <div>
//         //             <label className="block mb-1 font-medium">Price</label>
//         //             <input
//         //                 type="number"
//         //                 {...register("price", { required: true })}
//         //                 className="w-full border p-2 rounded"
//         //                 placeholder="Price"
//         //             />
//         //             {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
//         //         </div>

//         //         {/* Features */}
//         //         <div className="grid grid-cols-2 gap-3">
//         //             <div>
//         //                 <label className="block mb-1 font-medium">Featured 1</label>
//         //                 <input
//         //                     type="text"
//         //                     {...register("featured1")}
//         //                     className="w-full border p-2 rounded"
//         //                     placeholder="Feature 1"
//         //                 />
//         //             </div>

//         //             <div>
//         //                 <label className="block mb-1 font-medium">Featured 2</label>
//         //                 <input
//         //                     type="text"
//         //                     {...register("featured2")}
//         //                     className="w-full border p-2 rounded"
//         //                     placeholder="Feature 2"
//         //                 />
//         //             </div>

//         //             <div>
//         //                 <label className="block mb-1 font-medium">Featured 3</label>
//         //                 <input
//         //                     type="text"
//         //                     {...register("featured3")}
//         //                     className="w-full border p-2 rounded"
//         //                     placeholder="Feature 3"
//         //                 />
//         //             </div>

//         //             <div>
//         //                 <label className="block mb-1 font-medium">Featured 4</label>
//         //                 <input
//         //                     type="text"
//         //                     {...register("featured4")}
//         //                     className="w-full border p-2 rounded"
//         //                     placeholder="Feature 4"
//         //                 />
//         //             </div>
//         //         </div>

//         //         {/* Property Type ID */}
//         //         <div>
//         //             <label className="block mb-1 font-medium">Property Type</label>
//         //             <select
//         //                 {...register("propertyTypeId", { required: true })}
//         //                 className="w-full border p-2 rounded"
//         //             >
//         //                 <option value="">Select Property Type</option>

//         //                 {propertyTypes.map(pt => (
//         //                     <option key={pt.id} value={pt.id}>
//         //                         {pt.title}
//         //                     </option>
//         //                 ))}
//         //             </select>

//         //             {errors.propertyTypeId && (
//         //                 <p className="text-red-500 text-sm">Property Type is required</p>
//         //             )}
//         //         </div>

//         //         {/* Submit */}
//         //         <button
//         //             type="submit"
//         //             disabled={loading}
//         //             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
//         //         >
//         //             {loading ? "Submitting..." : "Submit"}
//         //         </button>
//         //     </form>
//         // </div>
//     );
// };

// export default AddPropertyItem;





import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useCoverContent from "../hooks/useCoverContent";
import useDashboardPropertyItem from "../hooks/useDashboardPropertyItem";
import { RiDeleteBin5Line, RiEditBoxLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPropertyItem = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { register: registerComment, handleSubmit: handleCommentSubmit, reset: resetComment, formState: { errors: commentErrors } } = useForm();

    const [loading, setLoading] = useState(false);
    const [content] = useCoverContent();
    const [propertyItem] = useDashboardPropertyItem();

    // MODAL STATES
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openCommentModal = (item) => {
        setSelectedItem(item);
        setIsCommentModalOpen(true);
    };

    const closeCommentModal = () => {
        setIsCommentModalOpen(false);
        setSelectedItem(null);
        resetComment();
    };

    const handleFormSubmit = async (data) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("image", data.image[0]);

        try {
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

            const finalData = {
                image: imgResult.data.url,
                title: data.title,
                description: data.description,
                price: Number(data.price),
                serviceCharge: 0,
                vat: 0,
                feature1: data.feature1,
                feature2: data.feature2,
                feature3: data.feature3,
                feature4: data.feature4,
                propertyTypeId: data.propertyTypeId,
            };

            const postRes = await fetch(
                "https://job-task-nu.vercel.app/api/v1/property-items/create",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(finalData),
                }
            );

            const result = await postRes.json();

            if (result.success) {
                toast.success("Property item added successfully");
                reset();
            }
        } catch (error) {
            toast.error("Error submitting form");
        } finally {
            setLoading(false);
        }
    };

    const submitComment = async (data) => {
        console.log("COMMENT SUBMITTED:", data.comment);
        toast.success("Comment saved!");

        closeCommentModal();
    };

    return (
        <div>
            {/* TABLE */}
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
                        {propertyItem.map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={item.image} />
                                            </div>
                                        </div>
                                        <div>
                                            {item.title} - {item.propertyType.title} -{" "}
                                            {item.propertyType.serviceType.title} -{" "}
                                            {item.propertyType.serviceType.service.title}
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <button
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => openCommentModal(item)}
                                    >
                                        <RiEditBoxLine className="text-xl" />
                                    </button>
                                </td>

                                <td>
                                    <button className="btn btn-ghost btn-xs">
                                        <RiDeleteBin5Line className="text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* COMMENT / EDIT MODAL */}
            {isCommentModalOpen && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={closeCommentModal}
                        className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    />

                    {/* Modal Box */}
                    <div className="fixed inset-0 z-50 flex justify-center items-center px-3">
                        <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow relative animate-scaleIn">

                            {/* Close button */}
                            <button
                                className="absolute top-3 right-3 text-xl"
                                onClick={closeCommentModal}
                            >
                                <IoClose size={26} />
                            </button>

                            <h2 className="text-xl font-bold mb-4">
                                Edit: {selectedItem?.title}
                            </h2>

                            <form
                                onSubmit={handleCommentSubmit(submitComment)}
                                className="space-y-4"
                            >
                                {/* COMMENT INPUT */}
                                <div>
                                    <label className="block mb-1 font-medium">Comment</label>
                                    <textarea
                                        {...registerComment("comment", { required: true })}
                                        className="w-full border p-2 rounded"
                                        placeholder="Write your comment..."
                                        rows="4"
                                    ></textarea>

                                    {commentErrors.comment && (
                                        <p className="text-red-500 text-sm">
                                            Comment is required
                                        </p>
                                    )}
                                </div>

                                {/* SUBMIT */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
                                >
                                    Save Comment
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddPropertyItem;
