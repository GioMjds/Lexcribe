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
import Footer from './sections/Footer';
import NavBar from './sections/NavBar';

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
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/chat' element={<ChatBot />} />
        <Route path='/otp' element={<OTPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isAuthenticated && <Footer />}
    </>

  )
}

export default App
