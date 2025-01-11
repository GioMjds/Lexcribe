import React, { createContext, useState, useContext } from 'react';

interface userData {
    file_name: string;
    generated_at: string;
    result: string;
}

interface UserDetails {
    username: string;
    email: string;
    profileImage?: string; // Optional, to be implemented and must put it in the NavBar.tsx
}

interface UserSignUp {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface UserSignUpRoutes {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    termsAccepted: boolean;
    setTermsAccepted: (value: boolean) => void;
}

const MyContext = createContext<UserSignUpRoutes | any>(null);

export const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [data, setData] = useState<userData[]>([])
    const [userDetails, setUserDetails] = useState<UserDetails>({
        username: "",
        email: "",
        profileImage: "",
    })
    const [sessionExpired, setSessionExpired] = useState(false);
    const [toggleLog, setToggleLog] = useState(false);
    const [toggleSesh, setToggleSesh] = useState(false);

    const [userSignUp, setUserSignUp] = useState<UserSignUp>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',

    })
    const [result, setResult] = useState(0);
    const [runTimer, setRunTimer] = useState(false);

    return (
        <MyContext.Provider value={{ isAuthenticated, setIsAuthenticated, data, setData, result, setResult, userDetails, setUserDetails, userSignUp, setUserSignUp, runTimer, setRunTimer, toggleLog, setToggleLog, sessionExpired, setSessionExpired, toggleSesh, setToggleSesh, termsAccepted, setTermsAccepted }}>
            {children}
        </MyContext.Provider>
    );
};


export const useMyContext = () => {
    return useContext(MyContext);
};