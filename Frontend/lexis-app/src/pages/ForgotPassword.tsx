import { FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { sendEmailForReset } from "../services/axios";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NotificationBox from "../components/NotificationBox";


const ForgotPassword: FC = () => {
  // Taking the current email address from the user and sending it to the back end
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);


  // Connect the back end functionality for the forgot password feature
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    
    try {
      const response = await sendEmailForReset(apiUrl,email);
      if(response.status === 200) {
        sessionStorage.setItem("email", email);
        navigate('/reset');
      };



    } catch(error: any) {
      const {status ,data } = error.response;
      setLoading(false);
      switch(status) {
        case 400:
          setMessage(data.error);
          break;
        case 404:
          setMessage(data.error);
          break;
        default:
          alert("Lexscribe is under maintenance. Please try again later")
      }

    }

  };

  return (
    <section className="bg-spotlight dark:bg-gray-900 min-h-screen flex justify-center items-center">
      <motion.div
        className="w-full max-w-lg max-h-min bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Forgot Password</h1>
        <p className="mt-2 text-center text-gray-800 dark:text-gray-900">Enter your email address below to reset your password:</p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
              placeholder="Enter your email"
            />
          </div>
          <motion.button
            type="submit"
            className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Sending..." : "Reset Password"}
          </motion.button>
        </form>
        {message && (
          <p className="mt-4 text-center text-red-600">{message}</p>
        )}
        <div className="mt-4 text-center">
          <Link to="/login" className="text-base font-light text-blue-500 hover:underline">Back to Login</Link>
        </div>
      </motion.div>

      <AnimatePresence>
        {isNotificationOpen && (
          <NotificationBox 
            isOpen={isNotificationOpen}
            message="Password reset link has been sent to your email address."
            onClose={() => setIsNotificationOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default ForgotPassword