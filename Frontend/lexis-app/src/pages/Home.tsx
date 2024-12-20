import Features from "../sections/Features"
import Hero from "../sections/Hero"

const Home = () => {
  return (
    <>
      <section className="bg-spotlight bg-cover bg-center bg-no-repeat min-h-screen dark:bg-gray-900">
        <Hero />
        <Features />
      </section>
    </>
  )
}

export default Home