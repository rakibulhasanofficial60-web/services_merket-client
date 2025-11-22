import { useState } from "react";
import { useForm } from "react-hook-form";
import useAllServices from "../hooks/useAllServices";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddServiceType = () => {
  const [services] = useAllServices();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
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

        const postData = await fetch(
          "https://job-task-nu.vercel.app/api/v1/service-type/create",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalData),
          }
        );
        console.log(data);

        const postResult = await postData.json();

        if (postResult.success === true) {
          toast.success("Service added successfully");
          reset();
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

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Add Service Type</h2>

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
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}
        </div>

        {/* Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Select Option</label>
          <select
            {...register("serviceId", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Service</option>
            {services?.map((srv, idx) => (
              <option key={idx} value={srv.id}>
                {srv.title}
              </option>
            ))}
          </select>
          {errors.option && (
            <p className="text-red-500 text-sm">Option is required</p>
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
          {errors.image && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
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

export default AddServiceType;