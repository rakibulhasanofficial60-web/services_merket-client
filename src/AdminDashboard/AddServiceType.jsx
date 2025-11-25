import { useState } from "react";
import { useForm } from "react-hook-form";
import useAllServices from "../hooks/useAllServices";
import toast from "react-hot-toast";
import { RiDeleteBin5Line, RiEditBoxLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import useDashboardServiceType from "../hooks/useDashboardServiceType";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function AddServiceType() {
  const [services] = useAllServices();
  const [serviceType] = useDashboardServiceType();

  const [loading, setLoading] = useState(false);

  // Create modal states
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    register: registerAdd,
    handleSubmit: handleAddSubmit,
    reset: resetAdd,
    formState: { errors: addErrors },
  } = useForm();

  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
    setValue,
    formState: { errors: editErrors },
  } = useForm();

  // ---------------- ADD SERVICE TYPE ----------------
  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const res = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (!result.success) return toast.error("Image upload failed");

      const finalData = { ...data, image: result.data.url };

      const postRes = await fetch(
        "https://job-task-nu.vercel.app/api/v1/service-type/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        }
      );

      const postJson = await postRes.json();
      if (postJson.success) {
        toast.success("Service Type added successfully!");
        resetAdd();
        setAddModalOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong", error?.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- EDIT SERVICE TYPE ----------------
  const openEditModal = (item) => {
    setSelectedItem(item);
    setValue("title", item.title);
    setValue("serviceId", item.serviceId);
    resetEdit({ ...item, image: null });
    setEditModalOpen(true);
  };

  const handleEditForm = async (data) => {
    setLoading(true);
    try {
      let updatedImage = selectedItem.image;

      if (data.image && data.image.length > 0) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const res = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });
        const imgResult = await res.json();

        if (imgResult.success) updatedImage = imgResult.data.url;
      }

      const finalData = {
        title: data.title,
        serviceId: data.serviceId,
        image: updatedImage,
      };

      // https://job-task-nu.vercel.app/api/v1/service/update/${service.id}
      const updateRes = await fetch(
        `https://job-task-nu.vercel.app/api/v1/service-type/update/${selectedItem.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        }
      );

      const updateJson = await updateRes.json();

      if (updateJson.success) {
        toast.success("Updated successfully!");
        setEditModalOpen(false);
      }
    } catch (error) {
      toast.error("Something Wrong", error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold">Service Type ({serviceType.length})</h1>
        <button onClick={() => setAddModalOpen(true)} className="btn btn-outline">
          Add Service Type
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
            {serviceType.map((con, idx) => (
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
                      {con.title} - {con?.service?.title ?? "No Service"}
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

      {/* ---------------- ADD MODAL ---------------- */}
      {isAddModalOpen && (
        <Modal title="Add Service Type" close={() => setAddModalOpen(false)}>
          <form onSubmit={handleAddSubmit(handleFormSubmit)} className="space-y-4">
            <TextInput label="Title" register={registerAdd("title", { required: true })} error={addErrors.title} />
            <ServiceSelect services={services} register={registerAdd("serviceId", { required: true })} error={addErrors.serviceId} />
            <ImageInput register={registerAdd("image", { required: true })} error={addErrors.image} />
            <SubmitButton loading={loading} label="Submit" />
          </form>
        </Modal>
      )}

      {/* ---------------- EDIT MODAL ---------------- */}
      {isEditModalOpen && selectedItem && (
        <Modal title="Edit Service Type" close={() => setEditModalOpen(false)}>
          <form onSubmit={handleEditSubmit(handleEditForm)} className="space-y-4">
            <TextInput label="Title" register={registerEdit("title", { required: true })} error={editErrors.title} />
            <ServiceSelect services={services} register={registerEdit("serviceId", { required: true })} error={editErrors.serviceId} />
            <ImageInput register={registerEdit("image")} error={editErrors.image} />
            <img className="w-12 h-8" src={serviceType.map(s => s.image)} alt="" />
            <SubmitButton loading={loading} label="Update" />
          </form>
        </Modal>
      )}
    </div>
  );
}

// ---------------- REUSABLE COMPONENTS ----------------
function Modal({ title, children, close }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={close}></div>
      <div className="fixed z-50 inset-0 flex justify-center items-center p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
          <button className="absolute right-3 top-3" onClick={close}>
            <IoClose size={25} />
          </button>
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </>
  );
}

function TextInput({ label, register, error }) {
  return (
    <div>
      <label className="font-medium block mb-1">{label}</label>
      <input className="input input-bordered w-full" {...register} />
      {error && <p className="text-red-500 text-sm">This field is required</p>}
    </div>
  );
}

function ServiceSelect({ services, register, error }) {
  return (
    <div>
      <label className="font-medium block mb-1">Select Service</label>
      <select className="select select-bordered w-full" {...register}>
        <option value="">Choose service</option>
        {services.map((srv) => (
          <option key={srv.id} value={srv.id}>
            {srv.title}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">Service is required</p>}
    </div>
  );
}

function ImageInput({ register, error }) {
  return (
    <div>
      <label className="font-medium block mb-1">Image</label>
      <input type="file" accept="image/*" className="file-input file-input-bordered w-full" {...register} />
      {error && <p className="text-red-500 text-sm">Image is required</p>}
    </div>
  );
}

function SubmitButton({ loading, label }) {
  return (
    <button className="btn btn-primary w-full" disabled={loading}>
      {loading ? "Processing..." : label}
    </button>
  );
}