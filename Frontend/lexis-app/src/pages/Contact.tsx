import { motion } from 'framer-motion';
import { FaEnvelope, FaHeadset } from 'react-icons/fa';

const contactOptions = [
  {
    title: "Email Us",
    description: "Send us an email and we'll get back to you within 24 hours",
    icon: <FaEnvelope className="w-8 h-8 text-teal-500" />,
    action: "mailto:support@lexscribe.com"
  },
  {
    title: "Support",
    description: "Get instant help from our support team",
    icon: <FaHeadset className="w-8 h-8 text-teal-500" />,
    action: "#"
  }
];

const Contact = () => {
  return (
    <section className="bg-spotlight min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-white text-center mb-8"
        >
          Contact Us
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8"
        >
          {/* Add some onSubmit functionality that sends the email to our email */}
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-white text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your message"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-400 to-sky-700 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {contactOptions.map((option, index) => (
            <motion.a
              key={index}
              href={option.action}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 2) }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-8 flex flex-col items-center text-center"
            >
              {option.icon}
              <h2 className="text-2xl font-semibold text-white mt-4 mb-2">
                {option.title}
              </h2>
              <p className="text-gray-300">
                {option.description}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact