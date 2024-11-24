import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import GoogleButton from '../components/GoogleButton';
import { Link } from 'react-router-dom';
import { useMyContext } from '../context/MyContext';
import axios from 'axios'


const Login: React.FC = () => {
  const [show, setShow] = useState(false);
  const { setIsAuthenticated } = useMyContext();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const toggleIcon = () => {
    setShow(!show);
  };


  const loginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/login/`, {
        email: email,
        password: password
      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      });

      if (response.data.success) {
        setIsAuthenticated(true);
        setLoading(false);
        const { access, refresh } = response.data;
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
      }

    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        const { data } = error.response;
        if (data.Pass) {
          setPasswordError(data.Pass);
          return;
        }

        if (data.Email) {
          setEmailError(data.Email);
          return;
        }

        if (data.Invalid) {
          alert("Please fill out all fields");
          return;
        }
      }
    }

  };

  return (
    <section className="h-screen w-full absolute top-20 pb-10 inset-0 flex justify-center items-center">

      <div className="absolute inset-0 bg-gray-900 bg-opacity-75  z-10"></div>


      <div className="relative flex flex-col p-6 z-20 bg-loginbg  border-formcolor border-2 rounded-lg shadow-2xl w-96">
        
        <h2 className="text-2xl font-semibold text-center text-cyan-500">Log in</h2>

        <div className="flex items-center justify-center flex-row mb-2">
          <p className="text-center text-slate-300 mr-1">or</p>
          <Link to="/signup">
            <p className="text-center text-cyan-500 hover:underline decoration-blue">sign up for an account</p>
          </Link>
        </div>

        <form className="flex flex-col" onSubmit={loginSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-slate-200">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="username"
              className="border border-inputcolor text-slate-300 placeholder:text-inputtext rounded p-2 w-full bg-inputcolor hover:bg-inputcolor focus:bg-inputcolor focus:ring-0 focus:border-inputcolor transition duration-300"
              autoComplete="off"
              placeholder="Enter your email"
            />
            {emailError && <div><p className="text-red-600">{emailError}</p></div>}
          </div>

          <div className="mb-2 relative">
            <label htmlFor="password" className="block mb-2 text-slate-200">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              id="password"
              className="border bg-inputcolor text-slate-300 placeholder:text-inputtext border-inputcolor rounded p-2 pr-10 w-full"
              placeholder="Enter your password"
            />
            <FontAwesomeIcon
              icon={show ? faEyeSlash : faEye}
              onClick={toggleIcon}
              className="absolute right-2 text-white top-1/2 pt-2"
              style={{ cursor: "pointer" }}
            />
          </div>

          {passwordError && <div><p className="text-red-600">{passwordError}</p></div>}

          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 mt-2 text-white rounded p-2 hover:bg-blue-600 transition duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2 animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
                Loading...
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <div className="text-center pt-3 mb-2">
          <p className="text-slate-300">Or via</p>
        </div>

        <GoogleButton />
      </div>
    </section>



  )
}

export default Login