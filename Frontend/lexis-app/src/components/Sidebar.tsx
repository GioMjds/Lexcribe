import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode, Suspense, useEffect, useState } from 'react';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getUserDetails, logOut } from '../services/axios';
import Dropdown from './Dropdown';
import ModalSelector from './ModalSelector';
import { useMyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';

interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  drawerBtnClick: (action: string) => void;
  userDetails?: {
    username: string;
    email: string;
  }
}

interface UserDetails {
  username: string;
  email: string;
}

interface ProfileButtons {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  className?: string;
}

// Fallback loader for fetching chat history
const ChatHistorySkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((index) => (
        <div key={index} className="flex items-center justify-between">
          <Skeleton
            width={200}
            height={40}
            baseColor='#433D88'
            highlightColor="#2E236C"
            borderRadius={8}
          />
        </div>
      ))}
    </div>
  );
};

const UserSkeleton = () => {
  return (
    <div className='flex items-center justify-center'>
      <Skeleton
        count={2}
        height={10}
        baseColor='#433D88'
        highlightColor="#2E236C"
        borderRadius={8}
      />
    </div>
  )
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, drawerBtnClick }) => {
  const { isAuthenticated, setIsAuthenticated } = useMyContext();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: '',
    email: '',
  });
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const sidebarVariants = {
    hidden: { x: '-100%', transition: { duration: 0.2 } },
    visible: { x: 0, transition: { duration: 0.2 } }
  };

  const dropdownButtons: ProfileButtons[] = [
    // { label: 'Profile', icon: "", onClick: () => drawerBtnClick('profile') },
    // { label: 'Settings', icon: "", onClick: () => drawerBtnClick('settings') },
    { label: 'Logout', icon: <FaSignOutAlt className='w-4 h-5' />, onClick: () => setLogoutModal(true), className: 'text-red-600' },
  ];

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logOut(import.meta.env.VITE_API_URL);
      if (response.status === 200) {
        localStorage.removeItem("access_token");;
        localStorage.removeItem("refresh_token");
        setLogoutModal(false);
        setIsAuthenticated(false);
        navigate('/')
      }
    } catch (error) {
      console.error(`Failed to log out: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/chat-history');
        const data = await response.json();
        setChatHistory(data);
      } catch (error) {
        console.error(`Failed to fetch chat history: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    const handleUserDetails = async () => {
      try {
        const response = await getUserDetails();
        if (response.status === 200) {
          setUserDetails({
            username: response.data.username,
            email: response.data.email,
          });
        }
      } catch (error) {
        console.error(`Failed to fetch user details: ${error}`);
      }
    }

    fetchChatHistory();
    if (isAuthenticated) handleUserDetails();
  }, [isAuthenticated]);

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
          <motion.aside
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
            className={`fixed left-0 top-0 bottom-0 bg-dark-violet bg-opacity-90 p-4 z-50 shadow-lg flex flex-col sm:w-72 sm:p-6 ${isOpen ? '' : 'sm:w-24 sm:p-4 overflow-hidden'}`}
          >
            <nav className="space-y-4 flex-1 flex flex-col">
              <button
                onClick={() => drawerBtnClick('newChat')}
                className={`w-full text-left text-white hover:bg-light-violet/50 p-3 rounded-lg transition-all duration-200 flex items-center backdrop-blur-sm bg-white/5 ${isOpen ? 'justify-start' : 'justify-center sm:justify-start'}`}
              >
                <i className="fas fa-plus mr-3"></i>
                {isOpen && <span className='sm:block hidden'>New Chat</span>}
                {!isOpen && <span className='sm:hidden block'>New </span>}
              </button>

              <div className="mt-2 flex-1 overflow-y-auto">
                <h3 className={`text-indigo-200 text-sm font-medium mb-3 ${isOpen ? 'block' : 'hidden sm:block'}`}>Chat History</h3>
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
                          className={`w-full text-left text-white hover:bg-light-violet/50 p-3 rounded-lg transition-all duration-200 flex items-center justify-between group backdrop-blur-sm bg-white/5 ${isOpen ? 'justify-start' : 'justify-center md:justify-start'}`}
                          onClick={() => drawerBtnClick(`chat-${chat.id}`)}
                        >
                          <div className="flex items-center">
                            <i className="fas fa-message mr-3 text-indigo-300"></i>
                            {isOpen && (
                              <span className="truncate" title={chat.title}>
                                {chat.title.length > 26 ? `${chat.title.substring(0, 26)}...` : chat.title}
                              </span>
                            )}
                          </div>
                          <span className={`text-xs text-indigo-300 group-hover:text-white transition-colors ${isOpen ? 'block' : 'hidden sm:block'}`}>
                            {new Date(chat.timestamp).toLocaleDateString()}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </Suspense>
              </div>
            </nav>

            {/* Profile Section w/ Dropdown */}
            <div className={`relative mt-6 pt-6 border-t border-light-violet ${isOpen ? 'flex flex-col' : 'hidden sm:flex flex-col'}`}>
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-10 h-10 rounded-full bg-light-violet flex items-center justify-center">
                  <FaUserCircle className="text-white w-6 h-6" />
                </div>
                <Suspense fallback={<UserSkeleton />}>
                  <div>
                    <p className="text-white font-medium">{userDetails?.username}</p>
                    <p className="text-indigo-200 text-sm">{userDetails?.email}</p>
                  </div>
                </Suspense>
              </div>
              <Dropdown
                isOpen={dropdownOpen}
                onClose={() => setDropdownOpen(false)}
                buttons={dropdownButtons}
                className='bottom-full mb-2'
              />
            </div>
          </motion.aside>
        </>
      )}

      {logoutModal && (
        <ModalSelector
          isOpen={logoutModal}
          onClose={() => setLogoutModal(false)}
          onConfirm={handleLogout}
          h2='Confirm Logout'
          paragraph='Are you sure you want to logout?'
          cancelMsg='Cancel'
          actionMsg={loading ? 'Logging out...' : 'Logout'}
          loading={loading}
          className='px-4 py-2 bg-red-500 text-sm text-white rounded-xl hover:bg-red-700'
        />
      )}
    </AnimatePresence>
  )
};

export default Sidebar;