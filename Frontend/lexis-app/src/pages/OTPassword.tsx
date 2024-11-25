import React, { useState, useEffect } from "react"

const OTPassword = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [timer, setTimer] = useState(60);

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

    const resendOTP = () => {
        setIsResendDisabled(true);
        setTimer(60);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isResendDisabled && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setIsResendDisabled(false);
                        clearInterval(interval!);
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-light dark:bg-gray-900">
            <h2 className="mb-6 text-4xl text-center font-semibold text-gray-900">Your OTPassword has been sent to your email</h2>
            <p className="mb-4 text-3xl font-normal text-gray-500">Enter your OTP</p>
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
            <div className="mt-4 flex justify-center space-x-4">
                <button className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-2xl hover:bg-slate-800">
                    Verify OTP
                </button>
                <button
                    onClick={resendOTP}
                    disabled={isResendDisabled}
                    className={`mt-4 px-4 py-2 text-white ${isResendDisabled ? 'bg-gray-400' : 'bg-blue-600'} rounded-2xl`}
                >
                    {isResendDisabled ? `Resend OTP in (${timer}s)` : 'Resend OTP'}
                </button>
            </div>
        </div>
    )
}

export default OTPassword