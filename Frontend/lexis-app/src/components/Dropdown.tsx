import { motion } from "framer-motion";
import { FC, useEffect, useRef } from "react";
import { dropdownVariants } from "../constants/MotionVariants";

interface DropdownButton {
    label: string;
    onClick: () => void;
    className?: string;
    icon?: React.ReactNode;
}

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    buttons: DropdownButton[];
    className?: string;
}

const Dropdown: FC<DropdownProps> = ({ isOpen, onClose, buttons, className }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) onClose();
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        else document.removeEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <motion.div
            ref={dropdownRef}
            className={`absolute right-0 ${className} bg-light-violet/50 rounded-md shadow-lg z-10 min-w-[200px] w-max`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
        >
            <div className="py-2">
                {buttons.map((button, index) => (
                    <motion.button
                        key={index}
                        onClick={() => {
                            button.onClick();
                            onClose();
                        }}
                        className={`flex items-center gap-2 px-4 py-2 text-base text-gray-300 w-full text-left ${button.className}`}
                    >
                        {button.icon} {button.label}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    )
}

export default Dropdown