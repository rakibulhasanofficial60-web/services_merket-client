import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { PiBookThin } from "react-icons/pi";
import { SlHandbag } from "react-icons/sl";
import { useState } from "react";

export default function UserBooking() {
  const [activeTab, setActiveTab] = useState("delivered");

  const tabs = [
    { id: "upcoming", label: "Upcoming", icon: <MdOutlineWatchLater /> },
    { id: "delivered", label: "Delivered", icon: <MdOutlineWatchLater /> },
    { id: "cancelled", label: "Cancelled", icon: <MdOutlineWatchLater /> },
    { id: "unpaid", label: "Unpaid", icon: <PiBookThin /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "upcoming":
        return (
          <div className="border border-[#E5E7EB] rounded-md mt-10 w-full max-w-xl py-16 flex flex-col items-center text-center">
            <SlHandbag className="text-4xl text-[#5D4F52] mb-4" />
            <p className="font-semibold text-[#5D4F52] text-lg">No upcoming jobs!</p>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">Check again later.</p>
          </div>
        );

      case "delivered":
        return (
          <div className="border border-[#E5E7EB] rounded-md mt-10 w-full max-w-xl py-16 flex flex-col items-center text-center">
            <SlHandbag className="text-4xl text-[#5D4F52] mb-4" />
            <p className="font-semibold text-[#5D4F52] text-lg">No delivered jobs!</p>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">Book a service or quote today through the Home tab</p>
          </div>
        );

      case "cancelled":
        return (
          <div className="border border-[#E5E7EB] rounded-md mt-10 w-full max-w-xl py-16 flex flex-col items-center text-center">
            <SlHandbag className="text-4xl text-[#5D4F52] mb-4" />
            <p className="font-semibold text-[#5D4F52] text-lg">No cancelled jobs!</p>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">You currently have no cancelled bookings.</p>
          </div>
        );

      case "unpaid":
        return (
          <div className="border border-[#E5E7EB] rounded-md mt-10 w-full max-w-xl py-16 flex flex-col items-center text-center">
            <SlHandbag className="text-4xl text-[#5D4F52] mb-4" />
            <p className="font-semibold text-[#5D4F52] text-lg">No unpaid jobs!</p>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">Make sure to complete your payments.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="border border-[#E5E7EB] px-6 py-4 rounded-lg bg-white w-full max-w-4xl mx-auto">
      <h2 className="flex items-center gap-2.5 text-xl font-semibold border-b border-[#E5E7EB] pb-3 text-[#5D4F52]">
        <FaCalendarAlt className="text-[#01788E]" /> My Bookings
      </h2>

      <div className="mt-10 flex flex-col items-center">
        <nav
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 px-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 text-[14px] cursor-pointer rounded-3xl px-4 py-1 transition
                ${activeTab === tab.id
                  ? "bg-[#01788E] text-white"
                  : "border border-[#01788E] text-[#5D4F52] bg-white hover:bg-[#eef8fa]"}
              `}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        {renderContent()}
      </div>
    </div>
  );
}