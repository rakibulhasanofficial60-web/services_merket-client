import  { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

const AddressSelection = ({ setAddress }) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({
    id: 1,
    name: "Jessy",
    details: "dfgdfgfdgdfgdfgdfg, dgdfgfdgsg, Jumeirah 1, Dubai"
  });

  // ❗ Common FIX — send selectedAddress to parent safely
  useEffect(() => {
    setAddress('ECB-Chattar Dhaka');
  }, [setAddress]);

  const existingAddresses = [
    { id: 1, name: "Jessy", details: "dfgdfgfdgdfgdfgdfg, dgdfgfdgsg, Jumeirah 1, Dubai" },
  ];

  const handleAddNewAddress = () => setShowMap(true);
  const handleBackToAddressList = () => setShowMap(false);

  const handleMapLocationSelect = (newLocation) => {
    // console.log("Selected from Map:", newLocation);
  };

  return (
    <div className="p-4 sm:p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Where do you need the service?
      </h2>

      {!showMap ? (
        <>
          <p className="text-gray-600 mb-4">
            Please select your current address or add a new address
          </p>

          {existingAddresses.map((address) => (
            <div
              key={address.id}
              className={`p-4 mb-3 border rounded-lg cursor-pointer transition-colors ${selectedAddress.id === address.id
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-200 hover:bg-gray-50"
                }`}
              onClick={() => setSelectedAddress(address)}
            >
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress.id === address.id}
                    onChange={() => setSelectedAddress(address)}
                    className="form-radio h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">{address.name}</p>
                    <p className="text-sm text-gray-500">{address.details}</p>
                  </div>
                </div>
              </label>
            </div>
          ))}

          <button
            onClick={handleAddNewAddress}
            className="w-full flex items-center justify-between p-4 mb-6 border border-gray-200 rounded-lg text-teal-600 hover:bg-teal-50 transition-colors"
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-medium">Add New Address</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      ) : (
        <MapComponent
          onBack={handleBackToAddressList}
          onSelectLocation={handleMapLocationSelect}
        />
      )}
    </div>
  );
};

export default AddressSelection;










// import React, { useEffect, useState } from 'react';
// import MapComponent from './SelectMap';
// // ম্যাপ কম্পোনেন্টের জন্য একটি ডামি কম্পোনেন্ট ধরে নেওয়া হলো
// // import MapComponent from './MapComponent';

// const AddressSelection = ({ setAddress }) => {
//   const [showMap, setShowMap] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState({
//     name: "Jessy",
//     details: "dfgdfgfdgdfgdfgdfg, dgdfgfdgsg, Jumeirah 1, Dubai"
//   });

//   useEffect(() => {
//     setAddress(selectedAddress);
//   }, [setAddress, selectedAddress]);


//   // ডামি ডেটা - রিয়াল অ্যাপ্লিকেশনে এটি API থেকে আসবে
//   const existingAddresses = [
//     { id: 1, name: "Jessy", details: "dfgdfgfdgdfgdfgdfg, dgdfgfdgsg, Jumeirah 1, Dubai" },
//     // আরও ঠিকানা থাকতে পারে
//   ];

//   const handleAddNewAddress = () => {
//     setShowMap(true);
//   };

//   const handleBackToAddressList = () => {
//     setShowMap(false);
//   };

//   // ম্যাপ থেকে একটি নতুন ঠিকানা নির্বাচন করার ডামি ফাংশন
//   const handleMapLocationSelect = (newLocation) => {
//     // এখানে নতুন ঠিকানাটি সেভ করার লজিক থাকবে (যেমন - API কল)
//     // উদাহরণস্বরূপ:
//     // setSelectedAddress(newLocation);
//     // setShowMap(false);
//     console.log("Selected from Map:", newLocation);
//     // আপনি চাইলে ম্যাপ সিলেক্ট হওয়ার পর আবার অ্যাড্রেস লিস্টে ফিরে যেতে পারেন
//   };

//   return (
//     <div className="p-4 sm:p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6">Where do you need the service?</h2>

//       {/* ম্যাপ ভিউ বা অ্যাড্রেস লিস্ট এর মধ্যে যেকোনো একটি কন্ডিশনালি রেন্ডার হবে */}
//       {!showMap ? (
//         // --- অ্যাড্রেস লিস্ট ভিউ ---
//         <div>
//           <p className="text-gray-600 mb-4">Please select your current address or add a new address</p>

//           {/* বিদ্যমান ঠিকানা */}
//           {existingAddresses.map((address) => (
//             <div
//               key={address.id}
//               className={`p-4 mb-3 border rounded-lg cursor-pointer transition-colors ${selectedAddress.id === address.id
//                 ? 'border-teal-500 bg-teal-50'
//                 : 'border-gray-200 hover:bg-gray-50'
//                 }`}
//               onClick={() => setSelectedAddress(address)}
//             >
//               <label className="flex items-center justify-between cursor-pointer">
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     name="address"
//                     checked={selectedAddress.id === address.id}
//                     onChange={() => setSelectedAddress(address)}
//                     className="form-radio h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
//                   />
//                   <div className="ml-3">
//                     <p className="font-medium text-gray-800">{address.name}</p>
//                     <p className="text-sm text-gray-500">{address.details}</p>
//                   </div>
//                 </div>
//               </label>
//             </div>
//           ))}

//           {/* নতুন ঠিকানা যোগ করার বাটন */}
//           <button
//             onClick={handleAddNewAddress}
//             className="w-full flex items-center justify-between p-4 mb-6 border border-gray-200 rounded-lg text-teal-600 hover:bg-teal-50 transition-colors"
//           >
//             <div className="flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//               <span className="font-medium">Add New Address</span>
//             </div>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>

//           {/* NEXT বাটন */}
//           {/* <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition duration-200">
//             NEXT →
//           </button> */}
//         </div>
//       ) : (
//         // --- ম্যাপ ভিউ (Add New Address ক্লিক করার পর) ---
//         <MapComponent
//           onBack={handleBackToAddressList}
//           onSelectLocation={handleMapLocationSelect}
//         />
//       )}
//     </div>
//   );
// };

// export default AddressSelection;