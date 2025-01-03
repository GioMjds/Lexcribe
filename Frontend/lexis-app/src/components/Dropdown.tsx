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

    // Truncate email to 22 characters and add ellipsis if it's longer
    // This is in order the dropdown doesn't overflow
    const truncateEmail = (email: string | undefined) => {
        if (!email) return '';
        if (email.length > 25) {
            return email.substring(0, 22) + '...';
        }
        return email;
    };

    return (
        <motion.div
            ref={dropdownRef}
            className="absolute right-0 mt-2 bg-light-high rounded-md shadow-lg z-10 min-w-[200px] w-max"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
        >
            <div className="py-1">
                <div className="px-4 py-2 text-gray-700">
                    <strong className="font-semibold text-base">{username}</strong>
                    <p className="text-xs text-gray-400 truncate">{truncateEmail(email)}</p>
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