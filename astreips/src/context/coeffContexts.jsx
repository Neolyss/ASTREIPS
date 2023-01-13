import {createContext, useContext, useEffect, useState} from "react";

import coeffJSON from "../datasets/coefficients.json"

const INITIAL_COEFFS  = coeffJSON.slice().sort((a, b) => a.id < b.id ? -1 : 1)

export const CoeffContext = createContext();

export const ContextProvider = ({ children }) => {
    const [coefficients, setCoefficients] = useState(INITIAL_COEFFS);

    const reset = () => {
        location.reload()
    }

    return (
        <CoeffContext.Provider value={{ coefficients, setCoefficients, reset}}>
            {children}
        </CoeffContext.Provider>
    );
};