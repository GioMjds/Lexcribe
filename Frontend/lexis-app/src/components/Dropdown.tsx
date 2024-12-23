import { FC } from "react"
import { motion } from "framer-motion";
import { dropdownVariants } from "../constants/motionVariants";

interface DropdownButton {
    label: string;
    onClick: () => void;
    className?: string;
}

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    buttons: DropdownButton[];
    username?: string;
    email?: string;
}

const Dropdown: FC<DropdownProps> = ({ isOpen, onClose, buttons, username, email }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            className="absolute right-0 mt-2 w-48 bg-light-high rounded-md shadow-lg z-10"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
        >
            <div className="py-1">
                <div className="px-4 py-2 text-gray-700">
                    <strong className="font-semibold text-base">{username}</strong>
                    <p className="text-sm">{email}</p>
                </div>
                {buttons.map((button, index) => (
                    <motion.button
                        key={index}
                        onClick={() => {
                            button.onClick();
                            onClose();
                        }}
                        className={`block px-4 py-2 text-sm text-gray-700 w-full text-left ${button.className}`}
                    >
                        {button.label}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    )
}

export default Dropdown