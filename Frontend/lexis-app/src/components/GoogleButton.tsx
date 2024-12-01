import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/MyContext';
import { useGoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GoogleButton: React.FC = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useMyContext();
    const apiUrl = import.meta.env.VITE_API_URL as string;

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
            const response = await axios.post(`${apiUrl}/google-auth/`, {
                code: code,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (response.data.success) {
                console.log(response.data);
                setIsAuthenticated(true);
                const accessToken = response.data.access_token;
                const refreshToken = response.data.refresh_token;
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);
            }
        } catch (error) {
            console.error("Error during Google login:", error);
            alert("Lexsribe AI is under maintenance. Please wait.");
        }
    };

    return (
        <div className="flex justify-center">
            <button
                onClick={login}
                type="button"
            // className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
            >
                <FontAwesomeIcon
                    icon={faGoogle}
                    className="mr-2"
                /> Google
            </button>
        </div>
    );
};

export default GoogleButton;