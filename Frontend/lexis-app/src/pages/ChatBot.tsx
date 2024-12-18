import { useState } from "react";
import { motion } from "framer-motion";
import { sendPrompt } from "../services/axios";
import { send } from "process";
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1 } }
};

const ChatBot = () => {
  {/* This will receive the prompt result from the server.
  Use the result state to display generated data with animation. */}
  const [result, setResult] = useState<string>("")
  const [promptError, setPromptError] =  useState<string>("")
  const [input, setInput] = useState<string>("");
  const apiUrl = import.meta.env.VITE_API_URL2;
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setPromptError("")
    
    try {
      const response = await sendPrompt(apiUrl,input);

      if(response.status === 200){
        setResult(response.data.result);
        console.log(response.data);
      }

    } catch(error:any) {
      const {status , data } =error.response;
   

      switch(status) {
        case 403:
          setInput(data.error);
          break;

        case 400:
          setInput(data.error);
          break;

        default:
          alert("Lexscribe is under maintenance. Please try again later.")
      }
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
      <motion.div
        className="flex flex-row justify-center items-center w-full max-w-md mt-36"
        initial="hidden"
        animate="visible"
        variants={fadeVariants}
      >
        <form onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-grow p-4 mr-2 sm:mb-0 sm:mr-2 border h-16 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
          placeholder="Ask Lexscribe AI about Law"
        />
        <button
          type="submit"
          className="p-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
        </form>

        {promptError && (
            <p className="text-red-500 font-bold text-lg">{promptError}</p>
        )}
       
      </motion.div>
    </section>
  );
};

export default ChatBot;