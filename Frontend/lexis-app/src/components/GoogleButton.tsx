import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/MyContext';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleButton: React.FC = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useMyContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSuccess = (response: any) => {
        const code = response.code;
        handleGoogleLogin(code);
    };

    const login = useGoogleLogin({
        onSuccess: codeResponse => handleSuccess(codeResponse),
        flow: 'auth-code',
    });

    const handleGoogleLogin = async (code: string) => {
        try {
            const response = await axios.post(`${apiUrl}/google-signin/`, {
                code: code,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (response.data.Success) {
                setIsAuthenticated(true);
                const accessToken = response.data.access_token;
                const refreshToken = response.data.refresh_token;
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);
                navigate('/generate');
            }
        } catch (error) {
            console.error("Error during Google login:", error);
            alert("Qualitysense is under maintenance. Please wait.");
        }
    };

    return (
        <div className="flex justify-center">
            <button
                onClick={login}
                type="button"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
            >
                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                    <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                </svg>
                Sign in with Google
            </button>
        </div>
    );
};

export default GoogleButton;