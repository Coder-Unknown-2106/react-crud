import React, { createContext, useContext, useState } from "react";


const CustomizeContext = createContext();

export const useCustomizeContext = () => useContext(CustomizeContext);

export const CustomizeProvider = ({ children }) => {
    function logOutSession() {
        localStorage.removeItem('logged')
        window.location.reload()
    }

    const [exhiStartComplete, setExhiStartComplete] = useState("Learn Context");


    const declareState = {
        exhiStartComplete,
        setExhiStartComplete,
        logOutSession,

    };

    return (
        <CustomizeContext.Provider value={{ declareState }} >
            {children}
        </CustomizeContext.Provider>
    );

};


