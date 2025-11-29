import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt } from "react-icons/fa";
import { RiEditBoxLine } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";

const AdminBooking = () => {
    const { data: booking = [], isLoading } = useQuery({
        queryKey: ["bookingAdmin"],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/booking`);
            const bookingRes = await res.json();
            return bookingRes.Data;
        },
    });

    console.log(booking);

    if (isLoading) return <p className="text-center md:mt-10">Loading...</p>;
    return (
        <div className="border border-[#E5E7EB] px-2 md:px-6 py-4 rounded-lg bg-white w-full max-w-4xl mx-auto">
            <h2 className="flex items-center gap-2.5 text-xl font-semibold border-b border-[#E5E7EB] pb-3 text-[#5D4F52]">
                <FaCalendarAlt className="text-[#01788E]" />Bookings: {booking.length}
            </h2>

            <div className="mt-10 flex flex-col items-center">
                <div className="w-full">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Service Name</th>
                                    <th>Date & Time</th>
                                    <th>Total Booking</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {booking.map((book, idx) => (
                                    <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td>
                                            <div className="">
                                                <p className="font-medium">{book.serviceName}</p>
                                                <p className="text-xs font-semibold">Service Charge: {book.serviceCharge}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{book.date}</p>
                                            <p>{book.time}</p>
                                            <br />
                                        </td>
                                        <td>Total Booking: {book.totalBooking}</td>
                                        <td>{book.status}</td>
                                        <td>
                                            <button
                                                title="Edit"
                                                className="btn btn-ghost btn-xs"
                                            >
                                                <RiEditBoxLine className="text-xl text-green-500" />
                                            </button>
                                        </td>
                                        <td>
                                            <button title="Delete" className="btn btn-ghost btn-xs"><RiDeleteBin5Line className="text-xl text-red-500" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBooking;