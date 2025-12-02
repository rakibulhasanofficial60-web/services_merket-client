import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoBrowser } from "react-icons/go";
import { IoAddOutline, IoTrashOutline, IoCloseOutline } from "react-icons/io5";
import { MdAccessTime, MdDateRange } from "react-icons/md";

const AdminDateTime = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const [appliedRecords, setAppliedRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const addSlot = () => {
        setTimeSlots([...timeSlots, { start: "", end: "" }]);
    };

    const updateSlot = (index, field, value) => {
        const updated = [...timeSlots];
        updated[index][field] = value;
        setTimeSlots(updated);
    };

    const removeSlot = (index) => {
        setTimeSlots(timeSlots.filter((_, i) => i !== index));
    };

    const handleApply = async () => {
        if (!fromDate || !toDate) {
            toast.error("Please select both start and end dates");
            return;
        }

        if (timeSlots.length === 0) {
            toast.error("Please add at least one time slot");
            return;
        }

        // Validate all time slots
        const invalidSlots = timeSlots.filter(slot => !slot.start || !slot.end);
        if (invalidSlots.length > 0) {
            toast.error("Please fill in all time slots");
            return;
        }

        const formattedSlots = timeSlots.map(
            (slot) => `${slot.start} - ${slot.end}`
        );

        const payload = {
            startDate: fromDate,
            endDate: toDate,
            timeSlots: formattedSlots,
        };

        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/date-time/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (data.success) {
                toast.success('Date & Time slots added successfully');
                
                // Reset form
                setFromDate("");
                setToDate("");
                setTimeSlots([]);
                
                // Refresh records
                fetchDateTimeData();
            } else {
                toast.error(data.message || "Failed to add time slots");
            }
        } catch (error) {
            console.error("Error sending data:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDateTimeData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/date-time`);
            const data = await response.json();
            if (data.success) {
                setAppliedRecords(data.Data || []);
            }
        } catch (error) {
            console.error("GET Error:", error);
            toast.error("Failed to fetch time slots");
        }
    };

    const deleteTimeSlot = async (id) => {
        if (!window.confirm("Are you sure you want to delete this time slot?")) {
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/date-time/delete/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();
            if (data.success) {
                toast.success("Time slot deleted successfully");
                fetchDateTimeData();
            } else {
                toast.error(data.message || "Failed to delete time slot");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to delete time slot");
        }
    };

    useEffect(() => {
        fetchDateTimeData();
    }, []);

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <GoBrowser className="text-xl text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Date & Time Management</h2>
                            <p className="text-sm text-gray-500 mt-1">Configure available time slots for appointments</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                            {appliedRecords.length} Active Slots
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Input Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <MdDateRange className="text-blue-600" />
                        Add New Time Slots
                    </h3>

                    {/* Date Range */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Start Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                                <div className="absolute right-3 top-3 text-gray-400">
                                    📅
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                End Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    min={fromDate || new Date().toISOString().split('T')[0]}
                                />
                                <div className="absolute right-3 top-3 text-gray-400">
                                    📅
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Time Slots Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-base font-medium text-gray-700 flex items-center gap-2">
                                <MdAccessTime className="text-blue-600" />
                                Time Slots
                            </h4>
                            <button
                                onClick={addSlot}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <IoAddOutline className="text-lg" />
                                Add Slot
                            </button>
                        </div>

                        <div className="space-y-3">
                            {timeSlots.map((slot, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                                            <input
                                                type="time"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                                                value={slot.start}
                                                onChange={(e) => updateSlot(index, "start", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">End Time</label>
                                            <input
                                                type="time"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                                                value={slot.end}
                                                onChange={(e) => updateSlot(index, "end", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeSlot(index)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove slot"
                                    >
                                        <IoCloseOutline className="text-xl" />
                                    </button>
                                </div>
                            ))}

                            {timeSlots.length === 0 && (
                                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                                    <MdAccessTime className="text-4xl text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">No time slots added yet</p>
                                    <p className="text-sm text-gray-400 mt-1">Click "Add Slot" to create new time slots</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="mt-8 pt-6 border-t border-blue-100">
                        <button
                            onClick={handleApply}
                            disabled={isLoading || timeSlots.length === 0 || !fromDate || !toDate}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Applying...
                                </>
                            ) : (
                                <>
                                    <span>Apply Time Slots</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Applied Records Table */}
                {appliedRecords.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Active Time Slots
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                                            Date Range
                                        </th>
                                        <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                                            Time Slots
                                        </th>
                                        <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                                            Status
                                        </th>
                                        <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {appliedRecords.map((record) => (
                                        <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {formatDate(record.startDate)}
                                                        </span>
                                                        <span className="text-gray-400">→</span>
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {formatDate(record.endDate)}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {Math.ceil((new Date(record.endDate) - new Date(record.startDate)) / (1000 * 60 * 60 * 24)) + 1} days
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-wrap gap-2">
                                                    {record.timeSlots?.map((slot, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                        >
                                                            {slot}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Active
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => deleteTimeSlot(record.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <IoTrashOutline className="text-lg" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Showing <span className="font-medium">{appliedRecords.length}</span> time slot configurations
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        Export
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {appliedRecords.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <MdAccessTime className="text-3xl text-gray-400" />
                        </div>
                        <h4 className="text-lg font-medium text-gray-700 mb-2">No Time Slots Configured</h4>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Start by adding date ranges and time slots above. Your configurations will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDateTime;











// main component 
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { GoBrowser } from "react-icons/go";

// const AdminDateTime = () => {
//     const [fromDate, setFromDate] = useState("");
//     const [toDate, setToDate] = useState("");
//     const [timeSlots, setTimeSlots] = useState([]);
//     const [appliedRecords, setAppliedRecords] = useState([]);


//     const addSlot = () => {
//         setTimeSlots([...timeSlots, { start: "", end: "" }]);
//     };

//     const updateSlot = (index, field, value) => {
//         const updated = [...timeSlots];
//         updated[index][field] = value;
//         setTimeSlots(updated);
//     };

//     const removeSlot = (index) => {
//         setTimeSlots(timeSlots.filter((_, i) => i !== index));
//     };

//     const handleApply = async () => {
//         if (!fromDate || !toDate)
//             return alert("দয়া করে তারিখ নির্বাচন করুন");


//         if (timeSlots.length === 0)
//             return alert("কমপক্ষে একটি টাইম স্লট দিন");

//         const formattedSlots = timeSlots.map(
//             (slot) => `${slot.start} - ${slot.end}`
//         );

//         const payload = {
//             startDate: fromDate,
//             endDate: toDate,
//             timeSlots: formattedSlots,
//         };
//         // console.log(payload);
//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/date-time/create`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 setAppliedRecords([
//                     ...appliedRecords,
//                     {
//                         id: Date.now(),
//                         startDate: fromDate,
//                         endDate: toDate,
//                         timeSlots: formattedSlots,
//                     },
//                 ]);
//                 toast.success('Data & Time slots added successfully');
//             }
//         } catch (error) {
//             console.error("Error sending data:", error);
//             alert("something wrong");
//         }
//     };

//     const fetchDateTimeData = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/date-time`);
//             const data = await response.json();
//             setAppliedRecords(data.Data);

//         } catch (error) {
//             console.error("GET Error:", error);
//         }
//     };

//     useEffect(() => {
//         fetchDateTimeData();
//     }, []);


//     return (
//         <div className="border border-[#E5E7EB] px-2 md:px-6 py-4 rounded-lg bg-white w-full max-w-4xl mx-auto">

//             {/* Header */}
//             <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
//                 <h2 className="flex items-center gap-2.5 text-xl font-semibold text-[#5D4F52]">
//                     <GoBrowser className="text-[#01788E]" /> Date & Time
//                 </h2>

//                 <button className="btn btn-outline" onClick={handleApply}>
//                     Apply
//                 </button>
//             </div>

//             {/* Date Fields */}
//             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
//                     <input
//                         type="date"
//                         className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//                         value={fromDate}
//                         onChange={(e) => setFromDate(e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
//                     <input
//                         type="date"
//                         className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//                         value={toDate}
//                         onChange={(e) => setToDate(e.target.value)}
//                     />
//                 </div>
//             </div>

//             {/* Time Slots */}
//             <div className="mt-6">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-3">Time Slots</h3>

//                 {timeSlots.map((slot, index) => (
//                     <div key={index} className="flex items-center gap-3 mb-3">
//                         <input
//                             type="time"
//                             className="border border-gray-300 rounded-lg px-3 py-2"
//                             value={slot.start}
//                             onChange={(e) => updateSlot(index, "start", e.target.value)}
//                         />

//                         <span>-</span>

//                         <input
//                             type="time"
//                             className="border border-gray-300 rounded-lg px-3 py-2"
//                             value={slot.end}
//                             onChange={(e) => updateSlot(index, "end", e.target.value)}
//                         />

//                         <button className="btn btn-outline" onClick={() => removeSlot(index)}>
//                             X
//                         </button>
//                     </div>
//                 ))}

//                 <button className="btn btn-outline mt-4" onClick={addSlot}>
//                     Add Time Slot
//                 </button>
//             </div>

//             {/* Applied Records Table */}
//             <div className="mt-6 overflow-x-auto">
//                 <table className="min-w-full border-collapse border border-gray-300 text-sm">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             {/* Left title column */}
//                             <th className="border px-4 py-2 text-left font-semibold bg-gray-100">Date</th>
//                             {/* Right columns: Dates dynamically */}
//                             {appliedRecords?.map((item) => (
//                                 <th
//                                     key={item.id}
//                                     className="border px-4 py-2 text-center font-semibold text-gray-700 whitespace-nowrap"
//                                 >
//                                     {item.date}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {/* Time Slots Row */}
//                         <tr className="bg-white hover:bg-gray-50">
//                             {/* Left title */}
//                             <td className="border px-4 py-2 font-medium bg-gray-50">Time Slots</td>
//                             {/* Time slots for each date */}
//                             {appliedRecords?.map((item) => (
//                                 <td key={item.id} className="border px-4 py-2 align-top whitespace-nowrap">
//                                     <div className="flex flex-wrap gap-2">
//                                         {item.time?.length > 0 ? (
//                                             item.time.map((slot, idx) => (
//                                                 <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">
//                                                     {slot}
//                                                 </span>
//                                             ))
//                                         ) : (
//                                             <span className="text-gray-400 italic">No slots</span>
//                                         )}
//                                     </div>
//                                 </td>
//                             ))}
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AdminDateTime;