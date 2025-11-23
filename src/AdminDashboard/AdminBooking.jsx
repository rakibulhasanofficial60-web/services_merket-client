import { useQuery } from "@tanstack/react-query";
import { useSummary } from "../provider/SummaryProvider";

const AdminBooking = () => {
    const { serviceTitle } = useSummary();

    const { data: booking = [], isLoading } = useQuery({
        queryKey: ["booking"],
        queryFn: async () => {
            const res = await fetch("/booking-card.json");
            return res.json();
        },
    });
    console.log(booking);
    if (isLoading) return <p className="text-center md:mt-10">Loading...</p>;
    return (
        <div className="">
            <div className="mx-auto md:flex items-center justify-around md:my-6">
                <p className="text-xl font-medium md:text-3xl md:font-bold">Total Booking: {booking.length}</p>
            </div>
            {/*             
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
            </div> */}
        </div>
    );
};

export default AdminBooking;

//    <div className="p-5">
//             <h2 className="text-2xl font-semibold mb-4">Bookings</h2>

//             <div className="overflow-x-auto shadow-md rounded-lg">
//                 <table className="min-w-full border border-gray-300">
//                     <thead>
//                         <tr className="bg-gray-100 text-left">
//                             <th className="p-3 shadow-md">No</th>
//                             <th className="p-3 shadow-md">Service Name</th>
//                             <th className="p-3 shadow-md">Date & Time</th>
//                             <th className="p-3 shadow-md">Location</th>
//                             <th className="p-3 shadow-md">Status</th>
//                             <th className="p-3 shadow-md">Action</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {booking.map((item, idx) => (
//                             <tr key={idx} className="hover:bg-gray-50">
//                                 <td className="p-3 shadow-md">{idx + 1}</td>
//                                 <td className="p-3 shadow-md">{item.serviceName} <br />{serviceTitle[idx]}</td>
//                                 <td className="p-3 shadow-md">
//                                     {item.date} <br /> {item.timeRange}
//                                 </td>
//                                 <td className="p-3 shadow-md">{item.location || "N/A"}</td>
//                                 <td className="p-3 shadow-md">
//                                     <span
//                                         className={`
//                                             px-3 py-1 rounded text-white text-sm
//                                             ${item.status === "Confirmed" ? "bg-green-600" : ""}
//                                             ${item.status === "Pending" ? "bg-yellow-500" : ""}
//                                             ${item.status === "Cancelled" ? "bg-red-600" : ""}
//                                             ${item.status === "Delivered" ? "bg-blue-600" : ""}
//                                         `}
//                                     >
//                                         {item.status}
//                                     </span>
//                                 </td>
//                                 <td className="p-3 shadow-md">
//                                     <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
//                                         View
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>