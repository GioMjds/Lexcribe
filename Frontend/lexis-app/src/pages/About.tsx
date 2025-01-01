import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMyContext } from "../context/MyContext";

const About = () => {
  const { isAuthenticated } = useMyContext();

  return (
    <section className="bg-spotlight min-h-screen py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 md:mb-12"
        >
          About Lexcribe
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 mb-6 md:mb-8"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-sm md:text-base text-gray-200 mb-6">
            Lexcribe AI is designed to revolutionize legal education by providing law students with an intelligent AI chatbot companion. Our mission is to make legal learning more accessible, interactive, and efficient.
          </p>
          <div className="space-y-4 md:space-y-6">
            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Vision</h3>
              <p className="text-sm md:text-base text-gray-200">
                We envision a future where every law student has access to personalized, high-quality legal education support, breaking down barriers to learning and fostering a more inclusive legal education system.
              </p>
            </div>
            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Values</h3>
              <ul className="text-sm md:text-base text-gray-200 space-y-1 md:space-y-2">
                <li>• Excellence in Legal Education</li>
                <li>• Innovation through Technology</li>
                <li>• Accessibility and Inclusivity</li>
                <li>• Continuous Improvement</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Impact</h3>
              <p className="text-sm md:text-base text-gray-200">
                By combining cutting-edge AI technology with expert legal knowledge, we're helping thousands of students master complex legal concepts, prepare for exams more effectively, and build stronger foundations for their legal careers.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3">Key Features</h3>
            <ul className="text-sm md:text-base text-gray-200 space-y-1 md:space-y-2">
              <li>• Intelligent legal concept explanations</li>
              <li>• Case law analysis assistance</li>
              <li>• Legal terminology clarification</li>
              <li>• Practice question generation</li>
              <li>• 24/7 learning support</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3">Benefits</h3>
            <ul className="text-sm md:text-base text-gray-200 space-y-1 md:space-y-2">
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
          className="mt-6 md:mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-blue-400 text-5xl md:text-7xl mb-3">1</div>
              <h3 className="text-white font-semibold mb-2">Create an Account</h3>
              <p className="text-xs md:text-sm text-gray-200">
                Sign up in minutes and get immediate access to our AI legal assistant
              </p>
            </div>
            <div className="text-center">
              <div className="text-blue-400 text-5xl md:text-7xl mb-3">2</div>
              <h3 className="text-white font-semibold mb-2">Ask Questions</h3>
              <p className="text-xs md:text-sm text-gray-200">
                Input your legal queries and receive instant, detailed explanations
              </p>
            </div>
            <div className="text-center">
              <div className="text-blue-400 text-5xl md:text-7xl mb-3">3</div>
              <h3 className="text-white font-semibold mb-2">Learn & Improve</h3>
              <p className="text-xs md:text-sm text-gray-200">
                Track your progress and deepen your understanding of legal concepts
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-6 md:mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-blue-400 text-lg md:text-xl">✓</span>
              <div>
                <h3 className="text-white font-semibold mb-2">Cutting-edge Technology</h3>
                <p className="text-xs md:text-sm text-gray-200">Powered by the latest AI advancements in natural language processing</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-400 text-lg md:text-xl">✓</span>
              <div>
                <h3 className="text-white font-semibold mb-2">Expert-Verified Content</h3>
                <p className="text-xs md:text-sm text-gray-200">All responses are validated by legal professionals</p>
              </div>
            </div>
          </div>
        </motion.div>

        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mt-6 md:mt-8 text-center"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-8">Ready to Get Started?</h2>
            <Link 
              to='/signup' 
              className="inline-block bg-gradient-to-br from-teal to-sky-600 text-white text-sm md:text-base py-2 md:py-3 px-6 md:px-8 rounded-lg transition-colors hover:opacity-90"
            >
              Sign Up Now
            </Link>
            <p className="text-sm md:text-base text-gray-200 mt-6 md:mt-8">Join thousands of law students already using Lexcribe AI</p>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default About;