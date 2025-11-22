import { useQuery } from "@tanstack/react-query";

const AdminBooking = () => {

    const { data: booking = [], isLoading } = useQuery({
        queryKey: ["booking"],
        queryFn: async () => {
            const res = await fetch("/booking-card.json");
            return res.json();
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Bookings</h2>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3 border">No</th>
                            <th className="p-3 border">Service Name</th>
                            <th className="p-3 border">Date & Time</th>
                            <th className="p-3 border">Location</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {booking.map((item, idx) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{idx + 1}</td>
                                <td className="p-3 border">{item.serviceName}</td>
                                <td className="p-3 border">
                                    {item.date} <br /> {item.timeRange}
                                </td>
                                <td className="p-3 border">{item.location || "N/A"}</td>
                                <td className="p-3 border">
                                    <span
                                        className={`
                                            px-3 py-1 rounded text-white text-sm
                                            ${item.status === "Confirmed" ? "bg-green-600" : ""}
                                            ${item.status === "Pending" ? "bg-yellow-500" : ""}
                                            ${item.status === "Cancelled" ? "bg-red-600" : ""}
                                            ${item.status === "Delivered" ? "bg-blue-600" : ""}
                                        `}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-3 border">
                                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBooking;