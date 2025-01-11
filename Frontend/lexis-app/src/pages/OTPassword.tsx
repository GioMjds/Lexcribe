import React, { useState, useEffect, FC } from "react"
import { registerUser } from "../services/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMyContext } from '../context/MyContext';
import Loading from "../components/Loading";

const OTPassword: FC = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [timer, setTimer] = useState(120);
    const [otpError, setOtpError] = useState("");
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    
    const navigate = useNavigate();

    const { setIsAuthenticated, setTermsAccepted } = useMyContext();
    
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(0, 1);
        setOtp(newOtp);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-input-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const resendOTP = async () => {
        setOtpError("")
        const email = sessionStorage.getItem("email");
        try {
            const response = await axios.post(`${apiUrl}/email-otp/resend/`, {
                email: email
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                setIsResendDisabled(true);
                setTimer(120);
            }
        } catch (error) {
            alert(`Lexscribe is under maintenance. Please try again later: ${error}`);
        }
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isResendDisabled && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setIsResendDisabled(false);
                        if (interval) clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isResendDisabled, timer]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOtpError("");
        setIsVerifying(true);

        const otpCode = otp.join('');
        if (otpCode.length === 6) {
            try {
                const response = await registerUser(otpCode, apiUrl);
                if (response.status === 200) {
                    console.log(response.data);
                    localStorage.setItem("access_token", response.data.access);
                    localStorage.setItem("refresh_token", response.data.refresh);
                    setIsAuthenticated(true);
                    setTermsAccepted(true);
                    navigate('/survey');
                }
            } catch (error: any) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setOtpError(data.error);
                        break;
                    case 404:
                        setOtpError(data.error);
                        break;
                    case 500:
                        setOtpError(data.error);
                        break;
                        default:
                            alert("Lexscribe is under maintenance. Please try again later.")
                    }
            } finally {
                setIsVerifying(false);
            }
        } else {
            setOtpError("OTP should be in 6 digits");
            return;
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-spotlight dark:bg-gray-900">
            <h2 className="mb-6 text-4xl text-center font-semibold text-light">Your OTP has been sent to your email</h2>
            <p className="mb-4 text-2xl font-normal text-light">Enter your 6-digit OTP</p>
            <form onSubmit={handleSubmit}>
                <div className="flex space-x-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-20 h-20 text-center border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-4xl sm:w-10 sm:h-10 md:w-20 md:h-20 flex flex-col justify-center"
                            maxLength={1}
                        />
                    ))}
                </div>

                {otpError && (
                    <p className="text-red-500 font-bold text-lg">{otpError}</p>
                )}

                <div className="mt-4 flex justify-center space-x-4">
                    <button 
                        type="submit" 
                        disabled={isVerifying}
                        className={`mt-4 px-4 py-2 text-white ${isVerifying ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'} rounded-2xl flex items-center justify-center min-w-[120px]`}
                    >
                        {isVerifying ? <Loading text='Verifying...' /> : 'Verify OTP'}
                    </button>
                    <button
                        onClick={resendOTP}
                        disabled={isResendDisabled}
                        className={`mt-4 px-4 py-2 text-white ${isResendDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'} rounded-2xl`}
                    >
                        {isResendDisabled ? `Resend OTP in (${timer}s)` : 'Resend OTP'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default OTPassword