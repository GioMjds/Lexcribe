import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/MyContext';
import { handleLogin } from '../services/axios';
import Loading from '../components/Loading';

const Login: FC = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { setIsAuthenticated } = useMyContext();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;  
    }>({});

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            const response = await handleLogin(email, password, apiUrl);
            if (response.status === 200) {
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
                // Apply the user details with profile picure included here
                
                navigate('/');
                setIsAuthenticated(true);
            }
        } catch (error: any) {
            const data = error.response?.data;
            if (data) {
                if (data?.email) {
                    setErrors((prev) => ({
                        ...prev,
                        email: data.email,
                    }));
                } else if (data?.password) {
                    setErrors((prev) => ({
                        ...prev,
                        password: data.password,
                    }));
                } else alert("Invalid Credentials");
            } else alert("Lexscribe is under maintenance. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-spotlight dark:bg-gray-900 min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md bg-black bg-opacity-5 rounded-xl border border-gray-400 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-white md:text-4xl sm:text-3xl dark:text-white">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Your Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Your Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your password"
                                    required
                                />
                                <FontAwesomeIcon
                                    icon={passwordVisible ? faEyeSlash : faEye}
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white bg-sky-500 hover:bg-sky-600 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? <Loading /> : 'Login'}
                        </button>
                        <p className="text-sm font-light text-white dark:text-gray-400 text-center">Or Via</p>
                        <div 
                            className="flex justify-center space-x-2"
                        >
                            <GoogleButton />
                        </div>
                        <div className="flex justify-center">
                            <Link to="/forgot-password" className="text-md font-light text-sky-500 hover:underline">Forgot Password?</Link>
                        </div>
                        <p className="text-md font-light text-white dark:text-gray-400 text-center">
                            Don't have an account? <Link to="/signup" className="font-medium text-sky-500 hover:underline">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>

    );
};

export default Login;