import { useState } from "react";
import { motion } from "framer-motion";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1 } }
};

const ChatBot = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = async (): Promise<void> => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessages((prev) => [...prev, { text: "I'm sorry, I don't understand.", isUser: false }]);
    }
  };

  return (
    <section className="bg-light min-h-screen dark:bg-gray-900 flex flex-col justify-center items-center p-4">
      <motion.div
        className="py-28 flex flex-col items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={fadeVariants}
      >
        <h1 className="py-1 text-4xl text-center my-4 font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Ask <span className="text-sky-500">Lexscribe AI</span> about Law</h1>
        <p className="text-center text-pretty text-xl font-medium text-gray-700 sm:text-xl/8">World's First Law Chatbot designed for law students</p>
      </motion.div>
      <div className="my-1 py-8 w-full max-w-md">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.isUser ? "text-right" : "text-left"}`}>
            <div className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <motion.div
        className="flex flex-row justify-center items-center w-full max-w-md mt-36"
        initial="hidden"
        animate="visible"
        variants={fadeVariants}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-grow p-4 mr-2 sm:mb-0 sm:mr-2 border h-16 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
          placeholder="Ask Lexscribe AI about Law"
        />
        <button
          onClick={handleSend}
          className="p-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </motion.div>
    </section>
  );
};

export default ChatBot;