import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import GoogleButton from "../components/GoogleButton";
import { handleSignUp } from "../services/axios";

const SignUp: FC = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");
    const [errors, setErrors] = useState<{
        username?: string;
        email?: string;
        password?: string;
        confirmPass?: string;
        general?: string;
    }>({});

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const validateUsername = (username: string) =>
        /^[a-zA-Z0-9]{3,}$/.test(username);

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            password
        );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Client-side validation
        const validationErrors: { [key: string]: string } = {};
        if (!validateUsername(username))
            validationErrors.username =
                "Username must be at least 3 characters long and alphanumeric.";
        if (!validateEmail(email))
            validationErrors.email = "Invalid email format.";
        if (!validatePassword(password))
            validationErrors.password =
                "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.";
        if (password !== confirmPass)
            validationErrors.confirmPass = "Passwords do not match.";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Backend API call
        try {
            const response = await handleSignUp(
                username,
                email,
                password,
                confirmPass,
                apiUrl
            );
            if (response.data.success) {
                console.log(response.data);
                localStorage.setItem("username", username);
                navigate("/otp");
            }
        } catch (error: any) {
            if (error.response) {
                const { data, status } = error.response;
                console.log(data);

                if (status === 500) {
                    setErrors({ general: "Server is under maintenance. Please try again later." });
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        username: data.user || "",
                        email: data.email || "",
                        password: data.password || "",
                        general: data.invalid || "",
                    }));
                }
            }
        }
    };

    useEffect(() => {
        document.title = "Sign Up | Lexscribe";
    }, []);

    return (
        <section className="bg-light dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-xl shadow-lg shadow-cyan-600/50 dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">
                            Sign Up
                        </h1>
                        {errors.general && (
                            <p className="text-red-500 text-center">{errors.general}</p>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                    className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5"
                                    placeholder="Enter your username"
                                    required
                                />
                                {errors.username && (
                                    <p className="text-red-500">{errors.username}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5"
                                    placeholder="Enter your email"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500">{errors.email}</p>
                                )}
                            </div>
                            <div className="mb-4 relative">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={(e: any) => setPassword(e.target.value)}
                                        className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5 pr-10 h-12"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <FontAwesomeIcon
                                        icon={passwordVisible ? faEyeSlash : faEye}
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-red-500">{errors.password}</p>
                                )}
                            </div>
                            <div className="mb-4 relative">
                                <label
                                    htmlFor="confirmPass"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm password
                                </label>
                                <div className="relative flex items-center">

                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        name="confirmPass"
                                        value={confirmPass}
                                        onChange={(e: any) => setConfirmPass(e.target.value)}
                                        className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                    <FontAwesomeIcon
                                        icon={passwordVisible ? faEyeSlash : faEye}
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                {errors.confirmPass && (
                                    <p className="text-red-500">{errors.confirmPass}</p>
                                )}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                animate={{ type: "spring", stiffness: 400 }}
                                type="submit"
                                className="w-full text-white bg-sky-500 hover:bg-sky-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Sign Up
                            </motion.button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                Or Via
                            </p>
                            <div className="flex justify-center space-x-2">
                                <GoogleButton />
                            </div>
                            <p className="text-md font-light text-gray-500 dark:text-gray-400 text-center">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-sky-500 hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;