import { useState, useEffect } from "react";


const useStgInformation = (key = "item") => {
    const [data, setData] = useState([]);

    // 🔸 Load data from localStorage on mount
    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(key)) || [];
            setData(stored);
        } catch (err) {
            console.error("Error reading from localStorage:", err);
            setData([]);
        }

        // 🔸 Listen for localStorage updates across tabs
        const handleStorageChange = (event) => {
            if (event.key === key) {
                try {
                    const updated = JSON.parse(event.newValue) || [];
                    setData(updated);
                } catch {
                    setData([]);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key]);

    // 🔹 Helper to save and sync data
    const saveData = (newData) => {
        try {
            localStorage.setItem(key, JSON.stringify(newData));
            setData(newData);
        } catch (err) {
            console.error("Error writing to localStorage:", err);
        }
    };

    // 🔹 Add a new item ID (avoid duplicates)
    const addItem = (id) => {
        if (!data.includes(id)) {
            const updated = [...data, id];
            saveData(updated);
        }
    };

    // 🔹 Remove an item by ID
    const removeItem = (id) => {
        const updated = data.filter((itemId) => itemId !== id);
        saveData(updated);
    };

    // 🔹 Clear all saved data
    const clearData = () => {
        saveData([]);
    };

    return { data, addItem, removeItem, clearData };
};

export default useStgInformation;