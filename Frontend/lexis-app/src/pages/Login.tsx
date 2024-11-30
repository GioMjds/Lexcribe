import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type FocusState = {
    email: boolean;
    password: boolean;
};

const Login: FC = () => {
    const [focus, setFocus] = useState<FocusState>({
        email: false,
        password: false
    });

    // Set the other logic for the login page here if you implement the back-end for it

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleFocus = (field: string) => setFocus({ ...focus, [field]: true });

    const handleBlur = (field: string) => setFocus({ ...focus, [field]: false });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: any = {};
        
        if (!validateEmail(email)) newErrors.email = "Invalid email address.";
        if (!validatePassword(password)) newErrors.password = "Wrong password. Please try again.";
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    };

    useEffect(() => {
        document.title = "Login | Lexscribe";
    });

    return (
        <section className="bg-light dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-xl shadow-lg shadow-cyan-600/50 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">Login</h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                <motion.input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onFocus={() => handleFocus('email')}
                                    onBlur={() => handleBlur('email')}
                                    onChange={handleEmailChange}
                                    animate={{
                                        scale: focus.email ? 1.05 : 1,
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your email" required />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className="mb-2 relative">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                                <motion.input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onFocus={() => handleFocus('password')}
                                    onBlur={() => handleBlur('password')}
                                    onChange={handlePasswordChange}
                                    animate={{
                                        scale: focus.password ? 1.05 : 1,
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your password" required />
                                <FontAwesomeIcon 
                                    icon={passwordVisible ? faEyeSlash : faEye} 
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-1/2 pt-2"
                                    style={{ cursor: "pointer" }}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input type="checkbox" name="remember" id="remember" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember Me</label>
                                    </div>
                                </div>
                                <Link to='/forgot' className="text-sm font-medium text-blue-500 hover:underline dark:text-blue-500">Forgot Password?</Link>
                            </div>
                            <motion.button
                                className="w-full text-white bg-sky-500 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{ type: "spring", stiffness: 400 }}
                            >
                                Login
                            </motion.button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">Or Via</p>
                            <div className="flex justify-between space-x-2">
                                {/* Replace this with a pre-built Google and Facebook button components */}
                                <motion.button
                                    className="w-full text-white bg-sky-500 hover:bg-primary-700 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{ type: "spring", stiffness: 400 }}
                                >
                                    <FontAwesomeIcon
                                        icon={faGoogle}
                                        className="mr-2 text-lg"
                                    /> Google
                                    {/* Replace the <GoogleButton /> component */}
                                </motion.button>
                                <motion.button
                                    className="w-full text-white bg-sky-500 hover:bg-primary-700 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{ type: "spring", stiffness: 400 }}
                                >
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        className="mr-2 text-lg"
                                    /> Facebook
                                    {/* Replace the <FacebookButton /> component */}
                                </motion.button>
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                Don't have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign Up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login