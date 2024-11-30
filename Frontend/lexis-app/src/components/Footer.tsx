import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
  return (
    <footer className="p-4 bg-light-medium sm:p-6 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to='/' className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Lexscribe</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Navigation</h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <Link to='/' className="hover:underline">Home</Link>
                </li>
                <li className="mb-4">
                  <Link to='/about' className="hover:underline">About</Link>
                </li>
                <li className="mb-4">
                  <Link to='/contact' className="hover:underline">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow Us</h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <Link to='/' className="hover:underline">Facebook</Link>
                </li>
                <li className="mb-4">
                  <Link to='/about' className="hover:underline">Twitter</Link>
                </li>
                <li className="mb-4">
                  <Link to='/contact' className="hover:underline">Linkedin</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <Link to='/' className="hover:underline">Privacy Policy</Link>
                </li>
                <li className="mb-4">
                  <Link to='/about' className="hover:underline">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-base text-gray-500 sm:text-center dark:text-gray-400">
            &copy; 2024 Lexscribe™ AI | All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="https://www.facebook.com" target="_blank">
              <FontAwesomeIcon icon={faFacebook} className="w-5 h-5"/>
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <FontAwesomeIcon icon={faTwitter} className="w-5 h-5"/>
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5"/>
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer