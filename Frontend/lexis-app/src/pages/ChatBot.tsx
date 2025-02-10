/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useRef, useState, Suspense } from "react";
import Sidebar from "../components/Sidebar";
import { fadeVariants, textTypography } from "../constants/MotionVariants";
import { sendPrompt } from "../services/axios";
import MiniSkeleton from "../motions/MiniSkeleton";

const ChatBot: FC = () => {
  const [promptError, setPromptError] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; text: string; id: number }[]>([]);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [promptStyle, setPromptStyle] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiUrl = import.meta.env.VITE_API_URL2;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleUpdate = async (id: number) => {
    const messageIndex = messages.findIndex(msg => msg.id === id);
    const updatedMessages = [...messages];

    if (messageIndex === -1) return;

    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setPromptError("");
    setIsLoading(true);

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
          alert("Lexcribe is under maintenance. Please try again later.")
      }
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDrawerBtnClick = (action: string) => {
    switch (action) {
      // To be modified in DrawerButtons.ts
      case 'newChat':
        console.log("new chat");
        break;
      case 'chatHistory':
        console.log("chat history");
        break;
      default:
        break;
    }
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <AnimatePresence>
      <section className="bg-spotlight min-h-screen flex flex-col items-center relative">
          <button
            onClick={toggleSidebar}
            className={`absolute left-4 top-4 p-2 bg-black bg-opacity-0 text-white rounded-full transition-all duration-300 hover:bg-opacity-50 focus:outline-none`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          drawerBtnClick={handleDrawerBtnClick}
        />

        {!hasStarted ? (
          <motion.div
            className={`h-[calc(100vh-200px)] flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-52' : ''}`}
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
          >
            <h1 className="text-3xl text-center font-bold tracking-tight leading-none text-light-high md:text-5xl lg:text-6xl dark:text-white">Ask <span className="text-purple-600 text-opacity-60">Lexcribe</span> about Law</h1>
            <p className="mt-4 text-center text-lg font-normal text-light-medium">World's First AI Chatbot for Law Students</p>
          </motion.div>
        ) : (
          <div className={`flex flex-col w-full ${isSidebarOpen ? 'max-w-screen-lg' : 'max-w-screen-xl'} mt-8 space-y-4 p-3 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-none  transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-52' : ''}`}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex items-center gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial="hidden"
                animate="visible"
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
                  ? 'bg-sky-700/15 font-medium text-white'
                  : 'bg-sky-700/15 font-medium text-white w-4/6'
                  }`} ref={messagesEndRef}
                >
                  {editingId === message.id ? (
                    <Suspense fallback={<MiniSkeleton />}>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full px-2 py-1 text-gray-100 bg-transparent border-none rounded focus:outline-none"
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
                    </Suspense>
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
                              transition={{ duration: 0.001, delay: index * 0.01 }}
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
            {isLoading && (
              <Suspense fallback={null}>
                <MiniSkeleton />
              </Suspense>
            )}
          </div>
        )}

        <motion.div
          className={`flex flex-col justify-center items-center w-full max-w-4xl mb-4 p-2 dark:bg-gray-900 fixed bottom-0 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-52' : ''}`}
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
        >
          <div className="flex flex-col justify-start items-start w-full py-3">
            <select
              value={promptStyle}
              onChange={(e) => setPromptStyle(e.target.value)}
              className="w-48 bg-white text-white text-sm bg-opacity-5 border-none rounded-xl sm:mr-2 outline-none active:border-none focus:border-none"
            >
              <option value='default' className='bg-gray-900/90'>Foundation</option>
              <option value="eli5" className='bg-gray-900/90'>Explanation</option>
              <option value="highSchool" className='bg-gray-900/90'>Application</option>
              <option value="college" className='bg-gray-900/90'>Jurisprudence</option>
              <option value="expert" className='bg-gray-900/90'>Citation</option>
            </select>
          </div>
          <form onSubmit={handleSend} className="flex flex-row justify-center items-center w-full p-1">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="flex-grow p-4 text-base sm:mb-0 h-14 rounded-full caret-purple-600 text-gray-900"
              placeholder="Ask Lexcribe"
            />
            <button
              type="submit"
              className="p-3 ml-2 text-gray-900 text-2xl bg-gradient-to-br from-teal to-sky-600 border border-gray-500 rounded-full w-14 h-14 transition duration-200"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
          <p className="text-center mt-1 text-xs text-gray-400/70">Lexcribe may occasionally provide inaccurate information. Please verify any legal advice with authoritative sources.</p>
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
    </AnimatePresence>
  );
};

export default ChatBot;