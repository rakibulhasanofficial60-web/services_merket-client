

export default function LoginModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg relative p-6">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900">Log in or sign up</h2>
        <p className="text-gray-600 text-sm mt-1">
          Please enter your mobile number to proceed.
        </p>

        {/* Mobile Number Input */}
        <div className="mt-5">
          <label className="text-sm font-semibold text-gray-700">Mobile Number</label>

          <div className="flex items-center mt-2 border rounded-xl bg-gray-50 px-3 py-3 gap-2">

            {/* UAE Flag */}
            <img
              src="https://flagcdn.com/w20/ae.png"
              alt="UAE Flag"
              className="w-6 h-4 object-cover"
            />

            {/* +971 Code */}
            <span className="text-gray-700 font-medium">+971</span>

            {/* Divider */}
            <span className="text-gray-300">|</span>

            {/* Phone Input */}
            <input
              type="tel"
              placeholder="Phone Number"
              className="flex-1 bg-transparent focus:outline-none text-gray-900"
            />

            {/* Icon (as in screenshot) */}
            <span className="text-gray-400 text-xl">📱</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          className="w-full mt-6 bg-[#F26822] text-white font-semibold py-3 rounded-xl hover:bg-[#e05c18] transition"
        >
          CONTINUE
        </button>

      </div>
    </div>
  );
}