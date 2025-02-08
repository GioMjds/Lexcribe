import React, { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  drawerBtnClick: (action: string) => void;
}

// Fallback loader for fetching chat history
const ChatHistorySkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="h-12 bg-gray-700 rounded-lg"
        />
      ))}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, drawerBtnClick }) => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sidebarVariants = {
    hidden: { x: '-100%', transition: { duration: 0.2 } },
    visible: { x: 0, transition: { duration: 0.2 } }
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/chat-history');
        const data = await response.json();
        setChatHistory(data);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
            className="fixed left-0 top-0 bottom-0 w-72 bg-violet-900/40 z-50 shadow-lg p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={onClose}
                className="text-white hover:bg-indigo-700/50 p-2 rounded-full transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <nav className="space-y-4">
              <button
                onClick={() => drawerBtnClick('newChat')}
                className="w-full text-left text-white hover:bg-indigo-700/50 p-3 rounded-lg transition-all duration-200 flex items-center backdrop-blur-sm bg-white/5"
              >
                <i className="fas fa-plus mr-3"></i>
                New Chat
              </button>

              <div className="mt-6">
                <h3 className="text-indigo-200 text-sm font-medium mb-3">Chat History</h3>
                <Suspense fallback={<ChatHistorySkeleton />}>
                  {isLoading ? (
                    <ChatHistorySkeleton />
                  ) : (
                    <div className="space-y-2">
                      {chatHistory.map((chat) => (
                        <motion.button
                          key={chat.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-full text-left text-white hover:bg-indigo-700/50 p-3 rounded-lg transition-all duration-200 flex items-center justify-between group backdrop-blur-sm bg-white/5"
                          onClick={() => drawerBtnClick(`chat-${chat.id}`)}
                        >
                          <div className="flex items-center">
                            <i className="fas fa-message mr-3 text-indigo-300"></i>
                            <span className="truncate">{chat.title}</span>
                          </div>
                          <span className="text-xs text-indigo-300 group-hover:text-white transition-colors">
                            {new Date(chat.timestamp).toLocaleDateString()}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </Suspense>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;