import { FC } from 'react';
import axios from 'axios';
import { useMyContext } from '../context/MyContext';
import { useGoogleLogin } from '@react-oauth/google';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const GoogleButton: FC = () => {
    const { setIsAuthenticated } = useMyContext();
    const apiUrl = import.meta.env.VITE_API_URL as string;
    const nav = useNavigate();

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
                nav('/chat');
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
                className=" border pt-2 pb-2 pl-8 pr-8 border-black rounded-lg"
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