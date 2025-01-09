import { createContext, useContext } from "react";

const SurveyContext = createContext({});

export const SurveyProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SurveyContext.Provider value={{}}>
            {children}
        </SurveyContext.Provider>
    )
};

export const useSurveyContext = () => useContext(SurveyContext);