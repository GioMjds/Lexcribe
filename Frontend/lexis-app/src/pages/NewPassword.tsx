import { useState, FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
import { handleNewPassword } from "../services/axios";

const NewPassword: FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await handleNewPassword(newPassword, apiUrl);
      if (response.status === 200) {
        setSuccessMessage("Password reset successfully.");
        // Delay when they are successfully reset their password
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  return (
    <section className="bg-spotlight dark:bg-gray-900 min-h-screen flex justify-center items-center">
      <motion.div 
        className="w-full max-w-md bg-white rounded-xl shadow-cyan-600/50 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Set New Password</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                New Password
              </label>
              <input 
                type="password" 
                name="newPassword" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                placeholder="Enter your new password"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm Password
              </label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                placeholder="Enter your new password"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full text-white bg-sky-500 hover:bg-sky-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Set New Password
            </motion.button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Remember your password?{" "}
              <Link to='/login' className="font-medium text-sky-500 hover:underline dark:text-sky-400">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  )
}

export default NewPassword