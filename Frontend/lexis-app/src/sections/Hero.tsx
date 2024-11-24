import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="bg-light flex items-center min-h-screen dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Ask <span className="text-blue-600">Lexscribe AI</span> about Law School
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Lexscribe AI is a conversational AI that helps you get into law school. Ask Lexscribe AI about law school admissions, LSAT, personal statements, and more.
                </p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <Link to='/login' className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-slate-500 hover:bg-slate-600 md:p-4 sm:p-4">
                        Get Started &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero