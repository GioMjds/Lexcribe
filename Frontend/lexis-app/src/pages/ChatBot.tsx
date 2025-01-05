/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { FC, useState, useRef, useEffect } from "react";
import { fadeVariants, textTypography } from "../constants/motionVariants";
import { sendPrompt } from "../services/axios";

const ChatBot: FC = () => {
  const [promptError, setPromptError] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; text: string; id: number }[]>([]);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiUrl = import.meta.env.VITE_API_URL2;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleUpdate = async (id: number) => {
    const messageIndex = messages.findIndex(msg => msg.id === id);
    if (messageIndex === -1) return;

    const updatedMessages = [...messages];
    updatedMessages[messageIndex].text = editText;

    updatedMessages.splice(messageIndex + 1);
    setMessages(updatedMessages);

    setEditingId(null);
    setEditText("");

    try {
      const response = await sendPrompt(apiUrl, editText);
      if (response.status === 200) {
        const aiResponse = response.data.result;
        setMessages(prev => [...prev, {
          type: 'ai',
          text: aiResponse,
          id: Date.now()
        }]);
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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setPromptError("");

    setMessages(prev => [...prev, { type: 'user', text: input, id: Date.now() }]);
    setHasStarted(true);
    setInput("");

    try {
      const response = await sendPrompt(apiUrl, input);
      if (response.status === 200) {
        const aiResponse = response.data.result;
        setMessages(prev => [...prev, { type: 'ai', text: aiResponse, id: Date.now() }]);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section className="bg-spotlight min-h-[93.2vh] dark:bg-gray-900 flex flex-col items-center">
      {!hasStarted ? (
        <motion.div
          className="h-[calc(100vh-200px)] flex flex-col items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
        >
          <h1 className="text-3xl text-center font-bold tracking-tight leading-none text-light-high md:text-5xl lg:text-6xl dark:text-white">Ask <span className="text-purple-600 text-opacity-60">Lexcribe AI</span> about Law</h1>
          <p className="mt-4 text-center text-lg font-normal text-light-medium">World's First AI Chatbot for law students</p>
        </motion.div>
      ) : (
        <div className="flex flex-col w-full max-w-screen-xl mt-8 space-y-4 p-2 overflow-y-auto max-h-[calc(100vh-210px)] scrollbar-none">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex items-center gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              initial="hidden"
              animate="visible"
              variants={textTypography}
            >
              {message.type === 'user' && (
                <button
                  onClick={() => handleEdit(message.id, message.text)}
                  className="text-gray-400 hover:bg-gray-500/50 p-2 rounded-full w-10 h-10 transition-colors"
                >
                  <i className="fas fa-edit"></i>
                </button>
              )}

              <div className={`p-3 rounded-lg text-base ${message.type === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-900 w-4/6'
                }`} ref={messagesEndRef}  
              >
                {editingId === message.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full px-2 py-1 text-gray-900 bg-transparent border-none rounded focus:outline-none"
                    />
                    <button
                      onClick={() => handleUpdate(message.id)}
                      className="text-white hover:bg-gray-600/20 p-1 rounded transition-colors duration-200"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-white hover:bg-gray-600/20 p-1 rounded transition-colors duration-200"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <motion.span
                    initial="hidden"
                    animate="visible"
                    variants={textTypography}
                  >
                    {message.type === 'user' ? (
                      <motion.span
                        initial="hidden"
                        animate="visible"
                        variants={textTypography}
                      >
                        {message.text}
                      </motion.span>
                    ) : (
                      <motion.span
                        initial="hidden"
                        animate="visible"
                        variants={textTypography}
                      >
                        {message.text.split('').map((char, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.05, delay: index * 0.03 }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </motion.span>
                    )}
                  </motion.span>
                )}
              </div>
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
        <form onSubmit={handleSend} className="flex flex-row justify-center items-center w-full p-1">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-grow p-4 text-base sm:mb-0 sm:mr-2 h-14 rounded-full caret-purple-600 text-gray-900"
            placeholder="Ask Lexcribe"
          />
          <button
            type="submit"
            className="p-3 ml-1 text-gray-700 text-2xl bg-gradient-to-br from-teal to-sky-600 border border-gray-500 rounded-full w-14 h-14 transition duration-200"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
        <div className="text-center mt-1 text-xs text-gray-400/70">
          <p>Lexcribe may occasionally provide inaccurate information. Please verify any legal advice with authoritative sources.</p>
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