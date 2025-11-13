// import { createContext, useContext, useEffect, useState } from "react";
// import { useItem } from "./ItemProvider";
// import { useQueries } from "@tanstack/react-query";


// const SummaryContext = createContext();

// export const SummaryProvider = ({ children }) => {
//     const { data } = useItem(); // ✅ selected item IDs
//     const [summary, setSummary] = useState({
//         items: [],
//         subtotal: 0,
//         serviceCharge: 0,
//         vat: 0,
//         total: 0,
//     });

//     // 🔹 Fetch all item details
//     const itemQueries = useQueries({
//         queries: data.map((id) => ({
//             queryKey: ["item-summary", id],
//             queryFn: async () => {
//                 const res = await fetch(`https://job-task-nu.vercel.app/api/v1/property-items/${id}`);
//                 const json = await res.json();
//                 return json?.Data;
//             },
//             enabled: !!id,
//         })),
//     });

//     const itemSummary = itemQueries.map((q) => q.data).filter(Boolean);

//     useEffect(() => {
//         const subtotal = itemSummary.reduce((acc, item) => acc + Number(item?.price || 0), 0);
//         const serviceCharge = subtotal > 0 ? 20 : 0;
//         const vat = subtotal * 0.05;
//         const total = subtotal + serviceCharge + vat;

//         setSummary({
//             items: itemSummary,
//             subtotal,
//             serviceCharge,
//             vat,
//             total,
//         });
//     }, [itemQueries.map((q) => q.data)]); // 👈 updates when fetched

//     return (
//         <SummaryContext.Provider value={summary, itemSummary}>
//             {children}
//         </SummaryContext.Provider>
//     );
// };

// export const useSummary = () => useContext(SummaryContext);
