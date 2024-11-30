import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import GoogleButton from '../components/GoogleButton';

type FocusState = {
    username: boolean;
    email: boolean;
    password: boolean;
    confirmPass: boolean;
};

const SignUp: FC = () => {
    const [focus, setFocus] = useState<FocusState>({
        username: false,
        email: false,
        password: false,
        confirmPass: false,
    });

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
    const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; confirmPass?: string }>({});

    const handleFocus = (field: string) => setFocus({ ...focus, [field]: true });

    const handleBlur = (field: string) => setFocus({ ...focus, [field]: false });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPass(e.target.value);

    const validateUsername = (username: string) => {
        const regex = /^[a-zA-Z0-9]{3,}$/;
        return regex.test(username);
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = (e: React.FormEvent) => {
        // Implement / revise the other logic for the sign-up page here if you implement the back-end for it
        e.preventDefault();
        const newErrors: any = {};

        if (!validateUsername(username)) newErrors.username = "Username must be at least 3 characters long and alphanumeric."
        if (!validateEmail(email)) newErrors.email = "Invalid email format."
        if (!validatePassword(password)) newErrors.password = "Password must be at least 8 characters long."
        if (password !== confirmPass) newErrors.confirmPass = "Passwords do not match."

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Implement the logic for signing up here (e.g., API Calls)
    }

    useEffect(() => {
        document.title = "Sign Up | Lexscribe";
    });

    return (
        <section className="bg-light dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-xl shadow-lg shadow-cyan-600/50 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">Sign Up</h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your username
                                </label>
                                <motion.input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onFocus={() => handleFocus('username')}
                                    onBlur={() => handleBlur('username')}
                                    animate={{
                                        scale: focus.username ? 1.05 : 1,
                                    }}
                                    onChange={handleUsernameChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your username" required 
                                />
                                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <motion.input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onFocus={() => handleFocus('email')}
                                    onBlur={() => handleBlur('email')}
                                    animate={{
                                        scale: focus.email ? 1.05 : 1,
                                    }}
                                    onChange={handleEmailChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your email" required
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className="mb-2 relative">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your password
                                </label>
                                <motion.input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onFocus={() => handleFocus('password')}
                                    onBlur={() => handleBlur('password')}
                                    animate={{
                                        scale: focus.password ? 1.05 : 1,
                                    }}
                                    onChange={handlePasswordChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your password" required
                                />
                                <FontAwesomeIcon 
                                    icon={passwordVisible ? faEyeSlash : faEye} 
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-1/2 pt-2"
                                    style={{ cursor: "pointer" }}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div className="mb-2 relative">
                                <label
                                    htmlFor="confirm"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirm password
                                </label>
                                <motion.input
                                    type="password"
                                    name="confirmPass"
                                    value={confirmPass}
                                    onFocus={() => handleFocus('confirmPass')}
                                    onBlur={() => handleBlur('confirmPass')}
                                    animate={{
                                        scale: focus.confirmPass ? 1.05 : 1,
                                    }}
                                    onChange={handleConfirmChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Confirm your password" required
                                />
                                <FontAwesomeIcon 
                                    icon={passwordVisible ? faEyeSlash : faEye} 
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-1/2 pt-2"
                                    style={{ cursor: "pointer" }}
                                />
                                {errors.confirmPass && <p className="text-red-500 text-sm">{errors.confirmPass}</p>}
                            </div>
                            <motion.button
                                className="w-full text-white bg-sky-500 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{ type: "spring", stiffness: 400 }}
                            >
                                Sign Up
                            </motion.button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">Or Via</p>
                            <div className="flex justify-between space-x-2">
                                <motion.button
                                    className="w-full text-white bg-sky-500 hover:bg-primary-700 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{ type: "spring", stiffness: 400 }}
                                >
                                    {/* <FontAwesomeIcon
                                        icon={faGoogle}
                                        className="mr-2"
                                    /> Google */}
                                    <GoogleButton />
                                </motion.button>
                                <motion.button
                                    className="w-full text-white bg-sky-500 hover:bg-primary-700 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{ type: "spring", stiffness: 400 }}
                                >
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        className="mr-2"
                                    /> Facebook
                                    {/* Replace the <FacebookButton /> component */}
                                </motion.button>
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;