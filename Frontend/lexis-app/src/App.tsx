import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import OTPassword from './pages/OTPassword'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import useTokenHandler from './hooks/useTokenHandler';
import ChatBot from './pages/ChatBot'
import { MyProvider, useMyContext } from './context/MyContext'

function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}


function Main() {
  const location = useLocation();


  const { isAuthenticated} = useMyContext();
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
      <Footer />
    </>

  )
}

export default App
