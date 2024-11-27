
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import React, { FC, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

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

    // If regex codes below are not working, you can change them with the regex codes you want to use for form validation

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
        } else {
            setErrors((prev) => ({ ...prev, email: undefined }));

import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import GoogleButton from '../components/GoogleButton';
import { Link } from 'react-router-dom';
import { useMyContext } from '../context/MyContext';
import axios from 'axios'


const Login: React.FC = () => {
  const [show, setShow] = useState(false);
  const { setIsAuthenticated } = useMyContext();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const toggleIcon = () => {
    setShow(!show);
  };


  const loginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/login/`, {
        email: email,
        password: password
      }, {
        headers: {
          "Content-Type": 'application/json'

        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (!validatePassword(value)) {
            setErrors((prev) => ({
                ...prev,
                password: "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.",
            }));
        } else {
            setErrors((prev) => ({ ...prev, password: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email) || !validatePassword(password)) {
            return;
        }
        console.log("Login successful");
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
                                    animate={{
                                        scale: focus.email ? 1.05 : 1,
                                    }}
                                    onChange={handleEmailChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your email" required />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                                <motion.input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onFocus={() => handleFocus('password')}
                                    onBlur={() => handleBlur('password')}
                                    animate={{
                                        scale: focus.password ? 1.05 : 1,
                                    }}
                                    onChange={handlePasswordChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your password" required />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    checked={passwordVisible}
                                    onChange={togglePasswordVisibility}
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 drk:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                />
                                <label htmlFor="showPassword" className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300">Show Password</label>
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
                                </motion.button>
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign Up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

      }
    }

  };

 
}

export default Login