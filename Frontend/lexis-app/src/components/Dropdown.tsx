import { motion } from "framer-motion";
import { FC, useEffect, useRef } from "react";
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