import { Link } from "react-router-dom"
import { FC } from "react"

const NotFound: FC = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-spotlight px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-6xl font-bold text-indigo-500">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">Page Not Found</h1>
        <p className="mt-6 text-pretty text-lg font-medium text-white/80 sm:text-xl/8">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
          <Link 
            to='/' 
            className="rounded-full px-6 py-3 text-base font-medium text-white bg-gradient-to-br from-teal to-blue-600 hover:from-teal/90 hover:to-blue-700 transition-colors duration-300"
          >
            &larr; Back to Home
          </Link>
          <Link
            to="/contact"
            className="rounded-full px-6 py-3 text-base font-medium text-white border border-white/20 hover:bg-white/10 transition-colors duration-300"
          >
            Contact Support
          </Link>
        </div>
        <p className="mt-8 text-sm text-white/60">
          If you believe this is a mistake, please contact our support team.
        </p>
      </div>
    </main>
  )
}

export default NotFound