import { useState } from "react";
import { GoBrowser } from "react-icons/go";

const AdminDateTime = () => {
    const [dateRange, setDateRange] = useState({ from: "", to: "" });
    const [timeSlots, setTimeSlots] = useState([]);
    const [applied, setApplied] = useState(false);

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

    const handleApply = () => {
        setApplied(true);
    };

    return (
        <div className="border border-[#E5E7EB] px-2 md:px-6 py-4 rounded-lg bg-white w-full max-w-4xl mx-auto">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                <h2 className="flex items-center gap-2.5 text-xl font-semibold text-[#5D4F52]">
                    <GoBrowser className="text-[#01788E]" /> Date & Time
                </h2>

                <button className="btn btn-outline mt-3 md:mt-0" onClick={handleApply}>
                    Apply
                </button>
            </div>

            {/* DATE FIELDS */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    />
                </div>
            </div>

            {/* TIME SLOT SECTION */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Time Slots</h3>

                {timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-3 mb-3">
                        <input
                            type="time"
                            className="border border-gray-300 rounded-lg px-3 py-2"
                            value={slot.start}
                            onChange={(e) => updateSlot(index, "start", e.target.value)}
                        />
                        <span>-</span>
                        <input
                            type="time"
                            className="border border-gray-300 rounded-lg px-3 py-2"
                            value={slot.end}
                            onChange={(e) => updateSlot(index, "end", e.target.value)}
                        />
                        <button
                            className="btn btn-outline"
                            onClick={() => removeSlot(index)}
                        >
                            X
                        </button>
                    </div>
                ))}

                <button className="btn btn-outline mt-4" onClick={addSlot}>Add Time Slot</button>
            </div>

            {/* DISPLAY APPLIED DATE & TIME */}
            {applied && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Selected Output</h3>
                    <p className="text-gray-700"><strong>Date Range:</strong> {dateRange.from || "-"} to {dateRange.to || "-"}</p>
                    <p className="mt-2 text-gray-700"><strong>Time Slots:</strong></p>
                    {timeSlots.length === 0 ? (
                        <p className="text-gray-500">No time slots selected</p>
                    ) : (
                        <ul className="list-disc pl-5 text-gray-700">
                            {timeSlots.map((slot, idx) => (
                                <li key={idx}>{slot.start || "--"} - {slot.end || "--"}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDateTime;







// import { useState } from "react";
// import { GoBrowser } from "react-icons/go";

// const AdminDateTime = () => {
//     // DATE STATE
//     const [dateRange, setDateRange] = useState({ from: "", to: "" });

//     // TIME SLOTS STATE (example: "10:00 AM - 12:00 PM")
//     const [timeSlots, setTimeSlots] = useState([]);

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

//     return (
//         <div className="border border-[#E5E7EB] px-2 md:px-6 py-4 rounded-lg bg-white w-full max-w-4xl mx-auto">
//             <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
//                 <h2 className="flex items-center gap-2.5 text-xl font-semibold text-[#5D4F52]">
//                     <GoBrowser className="text-[#01788E]" /> Date & Time
//                 </h2>

//                 <button className="btn btn-outline mt-3 md:mt-0"
//                     onClick={() => console.log({ dateRange, timeSlots })}>
//                     Apply
//                 </button>
//             </div>

//             {/* DATE FIELDS */}
//             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
//                     <input
//                         type="date"
//                         className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//                         value={dateRange.from}
//                         onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
//                     <input
//                         type="date"
//                         className="border border-gray-300 rounded-lg px-3 py-2 w-full"
//                         value={dateRange.to}
//                         onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
//                     />
//                 </div>
//             </div>

//             {/* TIME SLOT SECTION */}
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

//                         <button
//                             className="btn btn-outline"
//                             onClick={() => removeSlot(index)}
//                         >
//                             X
//                         </button>
//                     </div>
//                 ))}

//                 <button
//                     className="btn btn-outline mt-4"
//                     onClick={addSlot}
//                 >
//                     Add Time Slot
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AdminDateTime;