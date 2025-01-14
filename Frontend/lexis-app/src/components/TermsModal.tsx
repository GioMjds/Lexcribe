import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { modalVariants } from '../constants/MotionVariants';
import { terms } from '../constants/terms';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
}

const TermsModal = ({ isOpen, onClose, onAccept }: TermsModalProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleAccept = () => {
        if (!isChecked) {
            setShowError(true);
            return;
        }
        setShowError(false);
        onAccept();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[80vh] flex flex-col"
                    >
                        <motion.div
                            className="p-6 border-b border-gray-200 dark:border-gray-700"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-white">
                                {terms.title}
                            </h2>
                        </motion.div>

                        <div className="p-6 overflow-y-auto flex-grow">
                            <div className="space-y-4">
                                {terms.sections.map((section, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * (index + 1) }}
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            {section.heading}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            {section.content}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="accept-terms"
                                    checked={isChecked}
                                    onChange={(e) => {
                                        setIsChecked(e.target.checked);
                                        if (e.target.checked) setShowError(false);
                                    }}
                                    className="w-4 h-4 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
                                />
                                <label htmlFor="accept-terms" className="text-sm text-gray-600 dark:text-gray-300">
                                    I have read and agree to the Terms and Conditions
                                </label>
                            </div>

                            {showError && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 text-sm"
                                >
                                    Please accept the Terms and Conditions to continue
                                </motion.p>
                            )}

                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white font-medium"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleAccept}
                                    disabled={!isChecked}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 
                                        ${isChecked
                                            ? 'bg-sky-600 hover:bg-sky-700 text-white cursor-pointer'
                                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                                >
                                    Continue
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TermsModal;
