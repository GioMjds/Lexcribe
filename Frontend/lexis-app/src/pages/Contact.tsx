import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaHeadset } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';
import NotificationBox from '../components/NotificationBox';

interface IFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const contactOptions = [
  {
    title: "Email Us",
    description: "Send us an email and we'll get back to you within 24 hours",
    icon: <FaEnvelope className="w-8 h-8 text-teal-500" />,
  },
  {
    title: "Support",
    description: "Get instant help from our support team",
    icon: <FaHeadset className="w-8 h-8 text-teal-500" />,
  }
];

const Contact = () => {
  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<IFormInputs>();

  // Create the back-end functionality to send their email to our email
  // Also 
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotification({
        isOpen: true,
        message: "Thank you for your message. We'll get back to you as soon as possible.",
        type: "success",
      });
      reset();
    } catch {
      setNotification({
        isOpen: true,
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };
  
  return (
    <section className="bg-spotlight min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-white text-center mb-2"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='text-white max-w-md mx-auto text-center text-md mb-8'
        >
          Do you have any questions or feedback? Do you have any suggestions for the website? Let us know!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8"
        >
          {/* I add the form functionality to send the email to our email using React Hook Form (v19) */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                id="name"
                className="w-full px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email</label>
              <input
                {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })}
                type="email"
                id="email"
                className="w-full px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Subject</label>
              <input
                {...register("subject", { required: "Subject is required" })}
                type="text"
                id="name"
                className="w-full px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your subject"
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-white text-sm font-medium mb-2">Message</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                id="message"
                rows={4}
                className="w-full px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your message"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-400 to-sky-700 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        <AnimatePresence>
          {notification.isOpen && (
            <NotificationBox 
              isOpen={notification.isOpen}
              message={notification.message}
              onClose={() => setNotification(prev => ({ ...prev, isOpen: false }))}
            />
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {contactOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 2) }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-8 flex flex-col items-center text-center cursor-auto"
            >
              {option.icon}
              <h2 className="text-2xl font-semibold text-white mt-4 mb-2">
                {option.title}
              </h2>
              <p className="text-gray-300">
                {option.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact