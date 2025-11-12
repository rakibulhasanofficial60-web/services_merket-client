import { useState, useEffect } from "react";

const useStgInformation = (key = "item") => {
  const [data, setData] = useState([]);

  // 🔹 Initial load
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    setData(stored);
  }, [key]);

  // 🔹 Listen to "storage" events (cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        const updated = JSON.parse(event.newValue) || [];
        setData(updated);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  // ✅ Custom event listener for *same-tab updates*
  useEffect(() => {
    const handleCustomUpdate = () => {
      const stored = JSON.parse(localStorage.getItem(key)) || [];
      setData(stored);
    };
    window.addEventListener("localStorageUpdated", handleCustomUpdate);
    return () => window.removeEventListener("localStorageUpdated", handleCustomUpdate);
  }, [key]);

  // 🔸 Save data and trigger re-render manually
  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);

    // 🔥 Fire custom event so other components know data changed
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  const addItem = (id) => {
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    if (!stored.includes(id)) {
      const updated = [...stored, id];
      saveData(updated);
    }
  };

  const removeItem = (id) => {
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    const updated = stored.filter((itemId) => itemId !== id);
    saveData(updated);
  };

  const clearData = () => saveData([]);

  return { data, addItem, removeItem, clearData };
};

export default useStgInformation;