import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">Lexscribe</Link>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle navigation"
        >
          {navOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
        <div className={`flex-col md:flex md:flex-row ${navOpen ? 'flex' : 'hidden'} md:flex`}>
          <Link to="/" className="p-2 hover:bg-gray-200 hover:underline rounded">Home</Link>
          <Link to="/about" className="p-2 hover:bg-gray-200 hover:underline rounded">About</Link>
          <Link to="/contact" className="p-2 hover:bg-gray-200 hover:underline rounded">Contact Us</Link>
          <Link to='/login' className='p-2 hover:bg-gray-200 hover:underline rounded'>Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;