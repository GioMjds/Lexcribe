import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-spotlight min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-white text-center mb-8"
        >
          About Lexcribe
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-gray-200 mb-6">
            Lexcribe AI is designed to revolutionize legal education by providing law students with an intelligent AI chatbot companion. Our mission is to make legal learning more accessible, interactive, and efficient.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
            <ul className="text-gray-200 space-y-2">
              <li>• Intelligent legal concept explanations</li>
              <li>• Case law analysis assistance</li>
              <li>• Legal terminology clarification</li>
              <li>• Practice question generation</li>
              <li>• 24/7 learning support</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Benefits</h3>
            <ul className="text-gray-200 space-y-2">
              <li>• Enhanced understanding of legal concepts</li>
              <li>• Personalized learning experience</li>
              <li>• Time-efficient study support</li>
              <li>• Improved exam preparation</li>
              <li>• Practical legal knowledge application</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
          <p className="text-gray-200 mb-6">
            Simply sign up, start a conversation with our AI chatbot, and ask any legal-related questions. Our advanced AI system, powered by cutting-edge language models, will provide you with accurate, relevant, and easy-to-understand responses to help you master legal concepts and excel in your studies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-blue-400 text-xl">✓</span>
              <div>
                <h3 className="text-white font-semibold mb-2">Cutting-edge Technology</h3>
                <p className="text-gray-200 text-sm">Powered by the latest AI advancements in natural language processing</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-400 text-xl">✓</span>
              <div>
                <h3 className="text-white font-semibold mb-2">Expert-Verified Content</h3>
                <p className="text-gray-200 text-sm">All responses are validated by legal professionals</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <h2 className="text-2xl font-semibold text-white mb-8">Ready to Get Started?</h2>
          <Link to='/signup' className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Sign Up Now
          </Link>
          <p className="text-gray-200 mt-8">Join thousands of law students already using Lexcribe AI</p>
        </motion.div>

      </div>
    </section>
  );
};

export default About;