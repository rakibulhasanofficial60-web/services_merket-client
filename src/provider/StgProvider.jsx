import { createContext, useEffect, useState } from "react";

export const StgContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [data, setData] = useState([]);


     useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(key)) || [];
        setData(stored);
      }, [key]);


    const stgInfo = { data, setData };
    return (
        <StgContext.Provider value={stgInfo}>
            {children}
        </StgContext.Provider>
    );
};

export default AuthProvider;