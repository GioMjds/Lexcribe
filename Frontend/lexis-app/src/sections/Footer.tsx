import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
  return (
    <footer className="p-4 bg-spotlight sm:p-6 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to='/' className="flex items-center">
              <span className="self-center text-light-medium text-2xl font-semibold whitespace-nowrap dark:text-white">Lexcribe</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-md font-semibold text-purple-500/90 uppercase dark:text-white">Navigation</h2>
              <ul className="text-light dark:text-gray-400">
                <li className="mb-4">
                  <Link to='/' className="hover:text-purple-500 transition-all duration-300">Home</Link>
                </li>
                <li className="mb-4">
                  <Link to='/about' className="hover:text-purple-500 transition-all duration-300">About</Link>
                </li>
                <li className="mb-4">
                  <Link to='/contact' className="hover:text-purple-500 transition-all duration-300">Contact Us</Link>
                </li>
                <li className="mb-4">
                  <Link to='/login' className="hover:text-purple-500 transition-all duration-300">Login</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-md font-semibold text-purple-500/90 uppercase dark:text-white">Follow Us</h2>
              <ul className="text-light dark:text-gray-400">
                <li className="mb-4">
                  <a href="/" className="hover:text-purple-500 transition-all duration-300">Facebook</a>
                </li>
                <li className="mb-4">
                  <a href="/" className="hover:text-purple-500 transition-all duration-300">Twitter</a>
                </li>
                <li className="mb-4">
                  <a href="/" className="hover:text-purple-500 transition-all duration-300">Linkedin</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-md font-semibold text-purple-500/90 uppercase dark:text-white">Legal</h2>
              <ul className="text-light dark:text-gray-400">
                <li className="mb-4">
                  <Link to='/privacy-policy' className="hover:text-purple-500 transition-all duration-300">Privacy Policy</Link>
                </li>
                <li className="mb-4">
                  <Link to='/terms-and-conditions' className="hover:text-purple-500 transition-all duration-300">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-base text-light-medium sm:text-center dark:text-gray-400">
            &copy; 2024 Lexcribe™ | All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 text-light sm:justify-center sm:mt-0">
            <a href="https://www.facebook.com" target="_blank">
              <FontAwesomeIcon icon={faFacebook} className="w-7 h-7 hover:text-gray-400"/>
            </a>
            <a href="https://www.x.com" target="_blank">
              <FontAwesomeIcon icon={faXTwitter} className="w-7 h-7 hover:text-gray-400"/>
            </a>
            <a href="https://www.linkedin.com" target="_blank">
              <FontAwesomeIcon icon={faLinkedin} className="w-7 h-7 hover:text-gray-400"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer