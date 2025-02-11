import { motion } from 'framer-motion';
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { fadeUpVariants } from "../constants/MotionVariants";
import { useMyContext } from "../context/MyContext";
import { TextGenerateEffect } from "../motions/TextGenerateEffect";

const line1: string = "Your personal AI legal mentor - helping law students master complex legal concepts, ace exams, and navigate their journey through law school with confidence.";

const Hero: FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useMyContext();

    const goToGenerate = () => {
        if (isAuthenticated) navigate('/');
        else navigate('/login');
    }

    return (
        <section className="flex items-center min-h-screen dark:bg-gray-900">
            <motion.div
                className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-200 md:text-5xl lg:text-6xl dark:text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Welcome to <span className="text-purple-600 text-opacity-80">Lexcribe</span>
                </motion.h1>
                <div
                    className="mb-8 text-md font-normal text-gray-200 lg:text-md sm:px-16 xl:px-48 dark:text-gray-400"
                >
                    <TextGenerateEffect words={line1} filter={false} />
                </div>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <motion.button
                        className="inline-flex justify-center items-center py-3 px-5 text-base text-center text-white rounded-full bg-gradient-to-br from-teal to-sky-600 md:p-4 sm:p-4"
                        onClick={goToGenerate}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        Get Started &rarr;
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}

export default Hero