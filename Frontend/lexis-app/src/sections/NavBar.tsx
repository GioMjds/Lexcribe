import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalSelector from '../components/ModalSelector';
import { useMyContext } from '../context/MyContext';
import { logOut } from '../services/axios';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useMyContext();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const goToNavigate = () => navigate('/login');

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    const response = await logOut(apiUrl);
    if (response.status === 200) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setIsAuthenticated(false);
      setLogoutModal(false);
      navigate('/');
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="bg-spotlight dark:bg-gray-900 fixed top-0 left-0 right-0 z-50 shadow-xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-off-white text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">
              Lexcribe
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to='/' className='text-light hover:text-purple-500 transition-all duration-300'>
              HOME
            </Link>
            <Link to='/about' className='text-light hover:text-purple-500 transition-all duration-300'>
              ABOUT
            </Link>
            <Link to='/contact' className='text-light hover:text-purple-500 transition-all duration-300'>
              CONTACT US
            </Link>
          </div>

          <div className="flex items-center md:order-2 space-x-2 md:space-x-3">
            {isAuthenticated ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 text-white hover:bg-gray-400 focus:outline-none transition-colors"
                  >
                    <img alt="User Avatar" className='w-full h-full object-cover rounded-full' />
                  </button>
                </div>
              </>
            ) : (
              <motion.button
                className="text-white bg-gradient-to-br from-teal to-sky-600 font-medium rounded-lg text-sm px-3 py-1.5 md:px-4 md:py-2 text-center transition-colors flex items-center gap-2"
                onClick={goToNavigate}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Login
              </motion.button>
            )}

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex md:hidden items-center justify-center p-2 w-8 h-8 text-gray-200 rounded-lg hover:bg-white/10 focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Toggle menu</span>
              <motion.svg
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </motion.svg>
            </motion.button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-spotlight shadow-lg md:hidden z-50 border-t border-white/10"
              >
                <div className="px-4 py-4 space-y-3">
                  <Link
                    to="/"
                    className="block py-2 text-base font-medium text-light hover:text-purple-500 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    HOME
                  </Link>
                  <Link
                    to="/about"
                    className="block py-2 text-base font-medium text-light hover:text-purple-500 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ABOUT
                  </Link>
                  <Link
                    to="/contact"
                    className="block py-2 text-base font-medium text-light hover:text-purple-500 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    CONTACT US
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className="h-16"></div>

      <AnimatePresence>
        {logoutModal && (
          <ModalSelector
            isOpen={logoutModal}
            onClose={() => setLogoutModal(false)}
            onConfirm={handleLogout}
            h2='Confirm Logout'
            paragraph='Are you sure you want to logout?'
            cancelMsg="Cancel"
            actionMsg={loading ? "Logging out..." : "Logout"}
            loading={loading}
            className='px-4 py-2 bg-red-500 text-sm text-white rounded-xl hover:bg-red-700'
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;