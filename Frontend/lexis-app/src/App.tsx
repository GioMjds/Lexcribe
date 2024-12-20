import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { MyProvider, useMyContext } from './context/MyContext';
import useTokenHandler from './hooks/useTokenHandler';
import About from './pages/About';
import ChatBot from './pages/ChatBot';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import OTPassword from './pages/OTPassword';
import SignUp from './pages/SignUp';
import NavBar from './sections/NavBar';
import ForgotPassword from './pages/ForgotPassword';
import Footer from './sections/Footer';
import OTPReset from './pages/OTPReset';

function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}

const Main = () => {
  const location = useLocation();
  const { isAuthenticated } = useMyContext();
  useTokenHandler();

  useEffect(() => {
    if (isAuthenticated && location.pathname !== "/home") {
      localStorage.setItem("currentPath", location.pathname);
    }
  }, [location, isAuthenticated]);

  return (
    <>
      <NavBar />
      <Routes>
        {/* Change the default route of the homepage when logged in or not */}
        <Route path='/' element={!isAuthenticated ? <Home /> : <ChatBot />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/otp' element={<OTPassword />} />
        <Route path='/reset' element={<OTPReset />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isAuthenticated && <Footer />}
    </>
  )
}

export default App
