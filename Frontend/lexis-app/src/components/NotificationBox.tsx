import { FC } from "react"
import { motion } from "framer-motion"

interface NotificationProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, y: '-50%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: '-50%', transition: { duration: 0.3 } }
};

const NotificationBox: FC<NotificationProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        className='bg-white rounded-lg shadow-lg p-6 max-w-sm w-full'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Notification</h2>
        <p className="mb-4 text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}

export default NotificationBox