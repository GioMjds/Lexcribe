import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';

type NotificationProps = {
  isOpen: boolean;
  message: string;
  type?: 'success' | 'error' | 'deleted';
  onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

const NotificationBox: FC<NotificationProps> = ({ isOpen, message, type = 'success', onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <FaTimesCircle className="w-5 h-5 text-red-500" />;
      case 'deleted':
        return <FaTrash className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getNotificationStyles = () => {
    const baseStyles = "min-w-[300px] p-4 rounded-lg shadow-lg backdrop-blur-sm";
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-100 border border-green-200`;
      case 'error':
        return `${baseStyles} bg-red-100 border border-red-200`;
      case 'deleted':
        return `${baseStyles} bg-gray-100 border border-gray-200`;
      default:
        return baseStyles;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute bottom-4 left-4 pointer-events-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <div className={getNotificationStyles()}>
            <div className="flex items-center space-x-3">
              {getIcon()}
              <p className="text-sm font-medium">{message}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default NotificationBox
