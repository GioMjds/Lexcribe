import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import GoogleButton from "../components/GoogleButton";
import { handleSignUp } from "../services/axios";

// Types for focus and error states
type FocusState = {
  username: boolean;
  email: boolean;
  password: boolean;
  confirmPass: boolean;
};

type ErrorState = {
  username?: string;
  email?: string;
  password?: string;
  confirmPass?: string;
  general?: string;
};

const SignUp: FC = () => {
  const [focus, setFocus] = useState<FocusState>({
    username: false,
    email: false,
    password: false,
    confirmPass: false,
  });

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [errors, setErrors] = useState<ErrorState>({});
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL || ""; // Fallback for API URL

  // Handle focus animations
  const handleFocus = (field: keyof FocusState) =>
    setFocus((prev) => ({ ...prev, [field]: true }));

  const handleBlur = (field: keyof FocusState) =>
    setFocus((prev) => ({ ...prev, [field]: false }));

  // Validation Functions
  const validateUsername = (username: string) =>
    /^[a-zA-Z0-9]{3,}$/.test(username);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Client-side validation
    const validationErrors: ErrorState = {};
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

        if (status === 500) {
          setErrors({ general: "Server is under maintenance. Please try again later." });
        } else {
          setErrors({
            username: data.user || "",
            email: data.email || "",
            password: data.password || "",
            general: data.invalid || "",
          });
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
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
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
                <motion.input
                  type="text"
                  id="username"
                  value={username}
                  onFocus={() => handleFocus("username")}
                  onBlur={() => handleBlur("username")}
                  animate={{ scale: focus.username ? 1.05 : 1 }}
                  onChange={(e:any) => setUsername(e.target.value)}
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
                <motion.input
                  type="email"
                  id="email"
                  value={email}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  animate={{ scale: focus.email ? 1.05 : 1 }}
                  onChange={(e:any) => setEmail(e.target.value)}
                  className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5"
                  placeholder="Enter your email"
                  required
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <motion.input
                  type="password"
                  id="password"
                  value={password}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  animate={{ scale: focus.password ? 1.05 : 1 }}
                  onChange={(e:any) => setPassword(e.target.value)}
                  className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5"
                  placeholder="Enter your password"
                  required
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPass"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <motion.input
                  type="password"
                  id="confirmPass"
                  value={confirmPass}
                  onFocus={() => handleFocus("confirmPass")}
                  onBlur={() => handleBlur("confirmPass")}
                  animate={{ scale: focus.confirmPass ? 1.05 : 1 }}
                  onChange={(e:any) => setConfirmPass(e.target.value)}
                  className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5"
                  placeholder="Confirm your password"
                  required
                />
                {errors.confirmPass && (
                  <p className="text-red-500">{errors.confirmPass}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-sky-500 hover:bg-sky-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Or Via
              </p>
              <div className="flex justify-center space-x-2">
                <GoogleButton />
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
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
