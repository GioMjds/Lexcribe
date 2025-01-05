import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEnvelope, FaHeadset } from 'react-icons/fa';
import NotificationBox from '../components/NotificationBox';
import { validateEmail } from '../utils/validation';

interface IFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const contactOptions = [
  {
    title: "Email Us At",
    description: "thelexcribe@gmail.com",
    icon: <FaEnvelope className="w-6 h-6 lg:w-8 lg:h-8 text-teal-500" />,
  },
  {
    title: "Support",
    description: "Get instant help from our support team",
    icon: <FaHeadset className="w-6 h-6 lg:w-8 lg:h-8 text-teal-500" />,
  }
];

const Contact = () => {
  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const emailError = validateEmail(data.email);
    if (emailError) {
      setNotification({
        isOpen: true,
        message: emailError,
        type: "error",
      });
      return;
    }

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
    <section className="bg-spotlight min-h-screen py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='text-white max-w-2xl mx-auto text-center text-base md:text-lg mb-8'
        >
          Do you have any questions or feedback? Do you have any suggestions for the website? Let us know!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/10 backdrop-blur rounded-xl p-6 md:p-8 mb-8"
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-white text-base md:text-lg font-medium mb-2">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                id="name"
                className="w-full px-4 py-3 text-base rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-white text-base md:text-lg font-medium mb-2">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => {
                    const error = validateEmail(value);
                    return error ? error : true;
                  }
                })}
                type="email"
                id="email"
                className="w-full px-4 py-3 text-base rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="subject" className="block text-white text-base md:text-lg font-medium mb-2">Subject</label>
              <input
                {...register("subject", { required: "Subject is required" })}
                type="text"
                id="subject"
                className="w-full px-4 py-3 text-base rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="Your subject"
              />
              {errors.subject && <p className="text-red-500 text-sm mt-2">{errors.subject.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-white text-base md:text-lg font-medium mb-2">Message</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                id="message"
                rows={6}
                className="w-full px-4 py-3 text-base rounded-lg bg-white/5 text-white resize-none focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="Your message"
              />
              {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-br from-teal to-sky-600 text-white py-3 px-6 rounded-lg text-base md:text-lg font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-70"
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
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8"
        >
          {contactOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 2) }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 flex flex-col items-center text-center"
            >
              {option.icon}
              <h2 className="text-2xl md:text-3xl font-semibold text-white mt-4 mb-2">
                {option.title}
              </h2>
              <p className="text-gray-300 text-base md:text-lg">
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