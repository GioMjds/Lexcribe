import { motion } from "framer-motion";
import { FC, useState } from "react";
import { fadeVariants, textTypography } from "../constants/motionVariants";
import { sendPrompt } from "../services/axios";

const ChatBot: FC = () => {
  const [promptError, setPromptError] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; text: string; id: number }[]>([]);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const apiUrl = import.meta.env.VITE_API_URL2;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleUpdate = async (id: number) => {
    // Find the index of the message being edited
    const messageIndex = messages.findIndex(msg => msg.id === id);
    if (messageIndex === -1) return;

    // Update the user message
    const updatedMessages = [...messages];
    updatedMessages[messageIndex].text = editText;

    // Remove all messages after this one
    updatedMessages.splice(messageIndex + 1);
    setMessages(updatedMessages);

    // Reset editing state
    setEditingId(null);
    setEditText("");

    // Get new AI response
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
          <h1 className="p-2 text-3xl text-center my-4 font-bold tracking-tight leading-none text-light-high md:text-5xl lg:text-6xl dark:text-white">Ask <span className="text-purple-600 text-opacity-60">Lexcribe AI</span> about Law</h1>
          <p className="text-center text-pretty text-lg font-normal text-light-medium sm:text-lg/8">World's First AI Chatbot for law students</p>
        </motion.div>
      ) : (
        <div className="flex flex-col w-full max-w-screen-xl mt-4 space-y-4 rounded-lg p-4">
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
                }`}>
                {editingId === message.id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full text-left text-white rounded px-3 py-2 focus:outline-none border-none bg-transparent"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleUpdate(message.id)}
                        className="text-white px-2 rounded-full hover:bg-gray-600/20 transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-white px-2 rounded-full hover:bg-gray-600/20 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
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
            className="flex-grow p-4 text-base sm:mb-0 sm:mr-2 h-14 border-gray-300 rounded-lg text-gray-900"
            placeholder="Ask Lexcribe"
          />
          <button
            type="submit"
            className="p-3 ml-1 text-gray-700 text-2xl bg-gradient-to-br from-teal to-sky-600 border border-gray-500 rounded-lg transition duration-200"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
        <div className="text-center mt-1 text-xs text-gray-400/70">
          <p>By using Lexcribe, you agree to our Terms and Conditions and Privacy Policy.</p>
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