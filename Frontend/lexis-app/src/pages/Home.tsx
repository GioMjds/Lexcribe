import Features from "../sections/Features"
import Hero from "../sections/Hero"
import { useNavigate } from "react-router-dom"
import { useMyContext } from "../context/MyContext"
import { useEffect } from "react"

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useMyContext();

  useEffect(() => {
    if (isAuthenticated) navigate('/chat');
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Hero />
      <Features />
    </>
  )
}

export default Home