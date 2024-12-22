import { FC } from "react"
import { motion } from "framer-motion";

interface DropdownButton {
    label: string;
    onClick: () => void;
    className?: string;
}

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    buttons: DropdownButton[];
}

const Dropdown: FC<DropdownProps> = ({ isOpen, onClose, buttons }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            className="absolute right-0 mt-2 w-48 bg-light-high rounded-md shadow-lg z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
        >
            <div className="py-1">
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