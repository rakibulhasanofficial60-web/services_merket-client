// import { useState } from "react";
// import Card from "../../../components/Card/Card";
// import useAllServices from "../../../hooks/useAllServices";
// import { IoInformationCircleOutline } from "react-icons/io5";
// import Cover from "../../../components/Cover/Cover";
// import { MdOutlineArrowRightAlt } from "react-icons/md";


// const Services = () => {
//     const [services] = useAllServices();
//     const [showInput, setShowInput] = useState(false);
//     const [promo, setPromo] = useState("");

//     const handleApply = () => {
//         if (promo.trim() === "") {
//             alert("Please enter a promo code!");
//             return;
//         }
//         alert(`Promo "${promo}" applied successfully!`);
//         setPromo("");
//         setShowInput(false);
//     };

//     return (
//         <div>
//             <div className="md:flex gap-10 mt-5">
//                 <div className="md:w-[60%] mb-4 space-y-4">
//                     <div>
//                         <input className="py-3 border w-full rounded-md px-7 focus:outline-none" type="text" />
//                     </div>
//                     <div className="shadow-md">
//                         <div>
//                             {
//                                 services.slice(0, 1).map((service, idx) => <Card key={idx} service={service}></Card>)
//                             }
//                         </div>

//                         {/* ------------------------------------------- */}

//                                     {/* aikane slider hobe   */}

//                         {/* ----------------------------------------------- */}
//                         {/* content card  */}
//                         {/* ----------------------------------- */}
//                         <div className="p-6">
//                             <Cover image='https://i.postimg.cc/KvhGvKSF/pexels-asadphoto-1450360.jpg' title='General' />
//                             {/* ----------------------------------cover content   */}
//                             <div className="mt-4">
//                                 <div className="flex items-center border-b pb-2.5 border-gray-400">
//                                     {/* Left Side: Image */}
//                                     <img
//                                         src="https://i.postimg.cc/zXc0ZJSk/pexels-pixabay-258154.jpg"
//                                         alt="Card Image"
//                                         className="w-28 h-28 object-cover rounded-sm"
//                                     />

//                                     {/* Right Side: Content */}
//                                     <div className="ml-5 space-y-3">
//                                         <h2 className="text-[18px] font-semibold mb-2">Card Title</h2>
//                                         <p className="text-gray-600 text-[14px]">
//                                             This is a sample description for your card content. You can put any text or details here.
//                                         </p>
//                                         <div className="flex justify-between items-center">
//                                             <p className="text-gray-600 text-[14px]">Starting from <span className="font-bold">AED299</span></p>
//                                             <button className="cursor-pointer border px-2 py-1 flex items-center gap-2 text-[#01788E] rounded-xs">6 Options <MdOutlineArrowRightAlt /></button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>


//                             <div className="space-y-4 mt-5">
//                                 <h3 className="text-xl font-semibold">Do you have any special instructions? (Optional)</h3>
//                                 <textarea className="textarea bg-white w-full focus:outline-none border border-black" placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"></textarea>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="md:w-[35%] h-[300px]">
//                     <div className="p-4">
//                         <h2 className="mb-2">Summary</h2>
//                         <div className="flex justify-between items-center border-b border-gray-400 pb-2">
//                             <h3 className="text-[13px] font-semibold">Service Details</h3>
//                             <h3 className="text-[13px] font-semibold">ABC</h3>
//                         </div>
//                         <div className="mt-2 flex justify-between items-center border-b border-gray-400 pb-3">
//                             <h3 className="text-[13px] font-semibold">Date & Time</h3>
//                             <h3 className="text-[13px] font-semibold">Nov,12/25</h3>
//                         </div>
//                         <div className="mt-2 flex justify-between items-center border-b border-gray-400 pb-3">
//                             <h3 className="text-[13px] font-semibold">Payment Details</h3>
//                             <h3 className="text-[13px] font-semibold">$ 200</h3>
//                         </div>
//                         <div className="mt-2 border-b border-gray-400 pb-3">
//                             {!showInput && (
//                                 <div className="flex justify-between items-center">
//                                     <h3 className="text-[11px] font-semibold">Discount</h3>
//                                     <h3
//                                         className="text-[11px] cursor-pointer font-semibold text-[#01788E] underline"
//                                         onClick={() => setShowInput(true)}
//                                     >
//                                         Apply Promo
//                                     </h3>
//                                 </div>
//                             )}

//                             {showInput && (
//                                 <div className="mt-2 flex items-center gap-2">
//                                     <input
//                                         type="text"
//                                         value={promo}
//                                         onChange={(e) => setPromo(e.target.value)}
//                                         placeholder="Enter Promo Discount"
//                                         className="w-full border border-gray-300 rounded-md px-2 py-1 text-[11px] focus:ring-2 focus:ring-[#01788E] outline-none"
//                                     />
//                                     <button
//                                         onClick={handleApply}
//                                         className="bg-[#01788E] text-white text-[11px] px-3 py-1 rounded-md hover:opacity-90 transition"
//                                     >
//                                         Apply
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="mt-2 flex justify-between items-center border-b border-gray-400 pb-3">
//                             <h3 className="text-[13px] font-semibold">Total To Pay</h3>
//                             <h3 className="text-[13px] font-semibold">AED0.00</h3>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Services;




import { useState } from "react";
import Card from "../../../components/Card/Card";
import useAllServices from "../../../hooks/useAllServices";
import Cover from "../../../components/Cover/Cover";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const Services = () => {
  const [services] = useAllServices();
  const [showInput, setShowInput] = useState(false);
  const [promo, setPromo] = useState("");

  const handleApply = () => {
    if (promo.trim() === "") {
      alert("Please enter a promo code!");
      return;
    }
    alert(`Promo "${promo}" applied successfully!`);
    setPromo("");
    setShowInput(false);
  };

  return (
    <div>
      <div className="md:flex gap-10 mt-5">
        <div className="md:w-[60%] mb-4 space-y-4">
          <div>
            <input
              className="py-3 border w-full rounded-md px-7 focus:outline-none"
              type="text"
              placeholder="Search services..."
            />
          </div>

          <div className="shadow-md">
            <div>
              {services
                .slice(0, 1)
                .map((service, idx) => (
                  <Card key={idx} service={service}></Card>
                ))}
            </div>

            {/* ------------------------------------------- */}
            {/* 👉 Slider Section */}
            <div className="px-6">
              <div className="w-full flex items-center gap-3">
                {/* left arrow */}
                <button
                  onClick={() => {
                    const scroller = document.getElementById("btn-slider");
                    scroller.scrollBy({ left: -300, behavior: "smooth" });
                  }}
                  className="p-2 rounded-md shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* slider container */}
                <div
                  id="btn-slider"
                  className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3 py-2 px-1 w-full"
                >
                  {Array.from({ length: 7 }).map((_, i) => (
                    <button
                      key={i}
                      className="snap-start flex-shrink-0 min-w-[120px] md:min-w-[140px] lg:min-w-[160px] px-4 py-2 rounded-full border border-gray-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 bg-white flex items-center gap-2.5"
                    >
                      <img className="w-[30px] h-[30px] rounded-full" src="https://i.postimg.cc/KvhGvKSF/pexels-asadphoto-1450360.jpg" alt="" /> Button {i + 1}
                    </button>
                  ))}
                </div>

                {/* right arrow */}
                <button
                  onClick={() => {
                    const scroller = document.getElementById("btn-slider");
                    scroller.scrollBy({ left: 300, behavior: "smooth" });
                  }}
                  className="p-2 rounded-md shadow-sm bg-gray-100 hover:bg-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* ----------------------------------------------- */}

            {/* content card */}
            <div className="p-6">
              <Cover
                image="https://i.postimg.cc/KvhGvKSF/pexels-asadphoto-1450360.jpg"
                title="General"
              />

              {/* cover content */}
              <div className="mt-4">
                <div className="flex items-center border-b pb-2.5 border-gray-400">
                  {/* Left Side: Image */}
                  <img
                    src="https://i.postimg.cc/zXc0ZJSk/pexels-pixabay-258154.jpg"
                    alt="Card Image"
                    className="w-28 h-28 object-cover rounded-sm"
                  />

                  {/* Right Side: Content */}
                  <div className="ml-5 space-y-3">
                    <h2 className="text-[18px] font-semibold mb-2">
                      Card Title
                    </h2>
                    <p className="text-gray-600 text-[14px]">
                      This is a sample description for your card content. You
                      can put any text or details here.
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 text-[14px]">
                        Starting from <span className="font-bold">AED299</span>
                      </p>
                      <button className="cursor-pointer border px-2 py-1 flex items-center gap-2 text-[#01788E] rounded-xs">
                        6 Options <MdOutlineArrowRightAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-5">
                <h3 className="text-xl font-semibold">
                  Do you have any special instructions? (Optional)
                </h3>
                <textarea
                  className="textarea bg-white w-full focus:outline-none border border-black"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[35%] h-[300px]">
          <div className="p-4">
            <h2 className="mb-2">Summary</h2>
            <div className="flex justify-between items-center border-b border-gray-400 pb-2">
              <h3 className="text-[13px] font-semibold">Service Details</h3>
              <h3 className="text-[13px] font-semibold">ABC</h3>
            </div>
            <div className="mt-2 flex justify-between items-center border-b border-gray-400 pb-3">
              <h3 className="text-[13px] font-semibold">Date & Time</h3>
              <h3 className="text-[13px] font-semibold">Nov,12/25</h3>
            </div>
            <div className="mt-2 flex justify-between items-center border-b border-gray-400 pb-3">
              <h3 className="text-[13px] font-semibold">Payment Details</h3>
              <h3 className="text-[13px] font-semibold">$ 200</h3>
            </div>
            <div className="mt-2 border-b border-gray-400 pb-3">
              {!showInput && (
                <div className="flex justify-between items-center">
                  <h3 className="text-[11px] font-semibold">Discount</h3>
                  <h3
                    className="text-[11px] cursor-pointer font-semibold text-[#01788E] underline"
                    onClick={() => setShowInput(true)}
                  >
                    Apply Promo
                  </h3>
                </div>
              )}

              {showInput && (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Enter Promo Discount"
                    className="w-full border border-gray-300 rounded-md px-2 py-1 text-[11px] focus:ring-2 focus:ring-[#01788E] outline-none"
                  />
                  <button
                    onClick={handleApply}
                    className="bg-[#01788E] text-white text-[11px] px-3 py-1 rounded-md hover:opacity-90 transition"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
            <div className="mt-2 flex justify-between items-center border-b border-gray-400 pb-3">
              <h3 className="text-[13px] font-semibold">Total To Pay</h3>
              <h3 className="text-[13px] font-semibold">AED0.00</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;