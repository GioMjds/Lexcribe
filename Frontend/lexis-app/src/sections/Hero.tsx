import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { FC } from "react";
import { useMyContext } from "../context/MyContext";
import { TextGenerateEffect } from "../motions/TextGenerateEffect";
import { fadeUpVariants } from "../constants/motionVariants";

const line1: string = "Lexcribe AI is a conversational AI that helps you get into law school. Ask Lexcribe AI about law school admissions, LSAT, personal statements, and more.";

const Hero: FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useMyContext();

    const goToGenerate = () => {
        if (isAuthenticated) navigate('/chat');
        else navigate('/login');
    }   

    return (
        <section className="flex items-center min-h-screen dark:bg-gray-900">
            <motion.div
                className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                transition={{ duration: 1, ease: [.25, .1, .25, 1] }}
            >
                <motion.h1
                    className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-200 md:text-5xl lg:text-6xl dark:text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Ask <span className="text-teal">Lexcribe AI</span> about Law
                </motion.h1>
                <motion.p
                    className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
                >
                    <TextGenerateEffect words={line1} filter={false} />
                </motion.p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <motion.button
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-br from-teal-400 to-sky-700 md:p-4 sm:p-4"
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