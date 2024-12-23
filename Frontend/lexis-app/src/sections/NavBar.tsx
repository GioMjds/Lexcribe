import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import ModalSelector from '../components/ModalSelector';
import { useMyContext } from '../context/MyContext';
import { logOut } from '../services/axios';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useMyContext();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const goToNavigate = () => navigate('/login');
  const [logoutModal, setLogoutModal] = useState<boolean>(false);

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

  // Implementing an separate page for the change password feature
  const handleChangePassword = () => navigate('/change-password');

  // Dropdown buttons that passes into the Dropdown component, here we can add some more buttons and their onClick functionalities
  const profileButtons = [
    // Either add the username and email fetched data from the backend or add that in the Dropdown.tsx component
    { label: 'Change Password', onClick: handleChangePassword },
    { label: 'Logout', onClick: () => setLogoutModal(true) },
  ]

  return (
    <nav className="bg-spotlight border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-off-white text-2xl font-semibold whitespace-nowrap dark:text-white">Lexcribe</span>
        </Link>

        {isAuthenticated ? (
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-white hover:bg-gray-400 focus:outline-none"
              >
                {/* Implement the user's profile image here */}
                <img src="" alt="User Avatar" className='w-full h-full object-cover' />
              </button>
              <Dropdown
                isOpen={dropdownOpen}
                onClose={() => setDropdownOpen(false)}
                buttons={profileButtons}
              />
            </div>
          </div>
        ) : (
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <motion.button
              className="text-white bg-gradient-to-br from-teal-400 to sky-700 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-sky-600 dark:hover:bg-sky-700"
              onClick={goToNavigate}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ type: "spring" }}
            >
              Login
            </motion.button>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
        )}

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to='/' className='block py-2 px-3 md:p-0 text-light rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/about' className='block py-2 px-3 md:p-0 text-light rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                About
              </Link>
            </li>
            <li>
              <Link to='/contact' className='block py-2 px-3 md:p-0 text-light rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

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
              className='px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-700'
            />
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;