import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { FC } from "react";
import { useMyContext } from "../context/MyContext";
import { TextGenerateEffect } from "../motions/TextGenerateEffect";

const line1: string = "Lexcribe AI is a conversational AI that helps you get into law school. Ask Lexcribe AI about law school admissions, LSAT, personal statements, and more.";

const transition = { duration: 1, ease: [.25, .1, .25, 1] };
const variants = {
    hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
    visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
};

const sentence = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.5,
            staggerChildren: 0.02,
        }
    }
}

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
                whileInView="visible"
                variants={variants}
                transition={transition}
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
                    variants={sentence}
                    initial="hidden"
                    animate="visible"
                >
                    <TextGenerateEffect filter={false} words={line1} />
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