import { motion } from "framer-motion";
import { FC, useEffect, useRef } from "react";
import { drawerBtns } from "../constants/DrawerButtons"; // May change contents
import { drawerVariants } from "../constants/motionVariants";

// This may change contents too in drawer functional component
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerBtnClick: (action: string) => void;
  loading?: boolean;
}

const Drawer: FC<DrawerProps> = ({ isOpen, onClose, drawerBtnClick, loading }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={drawerRef}
      className="fixed left-0 w-full md:w-64 h-full bg-black bg-opacity-20 shadow-lg z-50"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={drawerVariants}
      transition={{ duration: 0.3 }}
    >
      {drawerBtns.map((btn) => (
        <button
          key={btn.action}
          onClick={() => {
            drawerBtnClick(btn.action);
            onClose();
          }}
          className="block w-full md:w-56 p-3 m-3 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {btn.label}
        </button>
      ))}
      {/* Fetches all the chat history from backend, also clickable per chat history */}
    </motion.div>
  )
}

export default Drawer;