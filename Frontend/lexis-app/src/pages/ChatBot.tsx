import { useState } from "react";

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
    <section className="bg-light min-h-screen dark:bg-gray-900 flex flex-col justify-center">
      <div className="w-full max-w-4xl mx-auto p-2 text-center flex-grow">
        <div className="flex justify-center mb-4">
          <h1 className="mt-56 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Ask <span className="text-sky-500">Lexscribe AI</span> about Law
          </h1>
        </div>
        <div className="mb-4">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.isUser ? "text-right" : "text-left"}`}>
              <div className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center m-44 w-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-grow p-4 mr-2 border h-16 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
          placeholder="Ask Lexscribe AI about Law"
        />
        <button
          onClick={handleSend}
          className="p-4 text-white bg-blue-500 rounded-xl hover:bg-blue-600"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </section>
  );
};

export default ChatBot;