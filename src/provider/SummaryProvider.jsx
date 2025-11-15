import { createContext, useContext, useEffect, useRef, useState } from "react";
import useAllServices from "../hooks/useAllServices";
import useCoverContent from "../hooks/useCoverContent";
import useButton from "../hooks/useButton";
import { useItem } from "./ItemProvider";
import { useQueries } from "@tanstack/react-query";



const SummaryContext = createContext();

export const SummaryProvider = ({ children }) => {
    const [services] = useAllServices();
    const [content] = useCoverContent();
    const [button] = useButton();
    const [showInput, setShowInput] = useState(false);

    const [activeId, setActiveId] = useState(null);
    const observer = useRef(null);
    const { data } = useItem();

    useEffect(() => {
        const sections = document.querySelectorAll("[id^='content-']");
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const visibleId = entry.target.getAttribute("id").replace("content-", "");
                        setActiveId(visibleId);
                    }
                });
            },
            { threshold: 0.5 }
        );
        sections.forEach((section) => observer.current.observe(section));
        return () => {
            if (observer.current) {
                sections.forEach((section) => observer.current.unobserve(section));
            }
        };
    }, [content]);

    const itemQueries = useQueries({
        queries: data.map((id) => ({
            queryKey: ["item-summary", id],
            queryFn: async () => {
                const res = await fetch(
                    `https://job-task-nu.vercel.app/api/v1/property-items/${id}`
                );
                const json = await res.json();
                return json?.Data;
            },
            enabled: !!id,
        })),
    });

    const itemSummary = itemQueries.map((q) => q.data).filter(Boolean);

    const subtotal = itemSummary.reduce((acc, item) => acc + Number(item?.price || 0), 0);
    const serviceCharge = subtotal > 0 ? 20 : 0;
    const vat = subtotal * 0.05;
    const total = subtotal + serviceCharge + vat;

    const summeryInfo = { services, button, setActiveId, activeId, content, itemSummary, total, showInput, setShowInput, vat, serviceCharge };
    return (
        <SummaryContext.Provider value={summeryInfo}>
            {children}
        </SummaryContext.Provider>
    );
};

export const useSummary = () => useContext(SummaryContext);
