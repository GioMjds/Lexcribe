import { useEffect } from "react";
import { useAnimate, motion, stagger } from "framer-motion";

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5,
}: {
    words: string;
    className?: string;
    filter?: boolean;
    duration?: number;
}) => {
    const [scope, animate] = useAnimate();
    const wordsArray = words.split(" ");

    useEffect(() => {
        animate(
            "span",
            { opacity: 1, filter: filter ? "blur(0)" : "none" },
            { duration: duration ? duration : 1, delay: stagger(0.1) },
        );
    }, [animate, duration, filter]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, index) => {
                    return (
                        <motion.span
                            key={word + index}
                            className={`dark:text-white opacity-0 ${className}`}
                            style={{ filter: filter ? "blur(10px)" : "none" }}
                        >
                            {word}{" "}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={className}>
            <div className="mt-4">
                <div className="leading-snug tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    )
}