import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoBrowser } from "react-icons/go";

const AdminDateTime = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const [appliedRecords, setAppliedRecords] = useState([]);


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
        if (!fromDate || !toDate)
            return alert("দয়া করে তারিখ নির্বাচন করুন");


        if (timeSlots.length === 0)
            return alert("কমপক্ষে একটি টাইম স্লট দিন");

        const formattedSlots = timeSlots.map(
            (slot) => `${slot.start} - ${slot.end}`
        );

        const payload = {
            startDate: fromDate,
            endDate: toDate,
            timeSlots: formattedSlots,
        };
        console.log(payload);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/date-time/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (data.success) {
                setAppliedRecords([
                    ...appliedRecords,
                    {
                        id: Date.now(),
                        startDate: fromDate,
                        endDate: toDate,
                        timeSlots: formattedSlots,
                    },
                ]);
                toast.success('Data & Time slots added successfully');
            }
        } catch (error) {
            console.error("Error sending data:", error);
            alert("something wrong");
        }
    };

    const fetchDateTimeData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/date-time`);
            const data = await response.json();
            setAppliedRecords(data.Data);

        } catch (error) {
            console.error("GET Error:", error);
        }
    };

    useEffect(() => {
        fetchDateTimeData();
    }, []);


    return (
        <div className="border border-[#E5E7EB] px-2 md:px-6 py-4 rounded-lg bg-white w-full max-w-4xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                <h2 className="flex items-center gap-2.5 text-xl font-semibold text-[#5D4F52]">
                    <GoBrowser className="text-[#01788E]" /> Date & Time
                </h2>

                <button className="btn btn-outline" onClick={handleApply}>
                    Apply
                </button>
            </div>

            {/* Date Fields */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
            </div>

            {/* Time Slots */}
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

                        <button className="btn btn-outline" onClick={() => removeSlot(index)}>
                            X
                        </button>
                    </div>
                ))}

                <button className="btn btn-outline mt-4" onClick={addSlot}>
                    Add Time Slot
                </button>
            </div>

            {/* Applied Records Table */}
            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            {/* Left title column */}
                            <th className="border px-4 py-2 text-left font-semibold bg-gray-100">Date</th>
                            {/* Right columns: Dates dynamically */}
                            {appliedRecords?.map((item) => (
                                <th
                                    key={item.id}
                                    className="border px-4 py-2 text-center font-semibold text-gray-700 whitespace-nowrap"
                                >
                                    {item.date}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Time Slots Row */}
                        <tr className="bg-white hover:bg-gray-50">
                            {/* Left title */}
                            <td className="border px-4 py-2 font-medium bg-gray-50">Time Slots</td>
                            {/* Time slots for each date */}
                            {appliedRecords?.map((item) => (
                                <td key={item.id} className="border px-4 py-2 align-top whitespace-nowrap">
                                    <div className="flex flex-wrap gap-2">
                                        {item.time?.length > 0 ? (
                                            item.time.map((slot, idx) => (
                                                <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">
                                                    {slot}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-400 italic">No slots</span>
                                        )}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDateTime;