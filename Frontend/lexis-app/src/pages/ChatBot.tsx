import { FC, useState } from "react";
import { motion } from "framer-motion";
import { sendPrompt } from "../services/axios";
import { fadeVariants, textTypography } from "../constants/motionVariants";

const ChatBot: FC = () => {
  const [result, setResult] = useState<string>("")
  const [promptError, setPromptError] = useState<string>("")
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; text: string }[]>([]);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_API_URL2;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setPromptError("");

    setMessages(prev => [...prev, { type: 'user', text: input }]);
    setHasStarted(true);
    setInput("");

    try {
      const response = await sendPrompt(apiUrl, input);
      if (response.status === 200) {
        const aiResponse = response.data.result;
        setResult(aiResponse);
        setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
        console.log(response.data);
      }
    } catch (error: any) {
      const { status, data } = error.response;
      switch (status) {
        case 403:
          setPromptError(data.error);
          break;
        case 400:
          setPromptError(data.error);
          break;
        default:
          alert("Lexscribe is under maintenance. Please try again later.")
      }
    }
  };

  return (
    <section className="bg-spotlight min-h-screen dark:bg-gray-900 flex flex-col justify-between items-center p-4">
      {!hasStarted ? (
        <motion.div
          className="py-28 flex flex-col items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
        >
          <h1 className="p-2 text-3xl text-center my-4 font-extrabold tracking-tight leading-none text-light-high md:text-5xl lg:text-6xl dark:text-white">Ask <span className="text-purple-600 text-opacity-80">Lexcribe AI</span> about Law</h1>
          <p className="text-center text-pretty text-lg font-medium text-light-medium sm:text-lg/8">World's First AI Chatbot for law students</p>
        </motion.div>
      ) : (
        <div className="flex flex-col w-full max-w-screen-xl mt-4 space-y-4 rounded-lg p-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className={`p-2 rounded-lg text-base ${message.type === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-900 self-start w-4/6'}`}
              initial="hidden"
              animate="visible"
              variants={textTypography}
            >
              {message.text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={textTypography}
                  initial="hidden"
                  animate="visible"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        className="flex flex-col justify-center items-center w-full max-w-4xl mb-4 p-2 dark:bg-gray-900 fixed bottom-0"
        initial="hidden"
        animate="visible"
        variants={fadeVariants}
      >
        <form onSubmit={handleSend} className="flex flex-row justify-center items-center w-full p-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-grow p-4 text-base sm:mb-0 sm:mr-2 h-16 border-gray-300 rounded-lg text-gray-900"
            placeholder="Ask Lexcribe AI about Law"
          />
          <button
            type="submit"
            className="p-5 ml-1 text-white bg-transparent border border-gray-300 rounded-lg transition duration-200"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
        <div className="text-center mt-2 text-sm text-light-medium">
          <p>&copy; Lexcribe AI • 2024 | All rights reserved</p>
        </div>
      </motion.div>

      {promptError && (
        <motion.p
          className="text-red-500 font-bold text-lg"
          initial='hidden'
          animate='visible'
          variants={fadeVariants}
        >
          {promptError}
        </motion.p>
      )}
    </section>
  );
};

export default ChatBot;