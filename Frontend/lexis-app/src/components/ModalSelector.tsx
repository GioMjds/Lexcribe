import { motion } from "framer-motion";
import { FC, useEffect } from "react";
import { modalVariants } from "../constants/motionVariants";

interface ModalSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
  actionMsg: string;
  className: string;
  cancelMsg: string;
  paragraph?: string;
  h2?: string;
}

const ModalSelector: FC<ModalSelectorProps> = ({ isOpen, onClose, onConfirm, actionMsg, cancelMsg, paragraph, h2, loading, className }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleEscapeKey);

    return () => document.removeEventListener('keydown', handleEscapeKey);;
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      className='fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50'
    >
      <motion.div
        className='bg-white rounded-lg shadow-lg p-6 max-w-sm w-full'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <h2 className="text-xl font-semibold mb-4">{h2}</h2>
        <p className="mb-4 text-md">{paragraph}</p>
        <div className="flex justify-end">
          <motion.button
            className='mr-2 px-4 py-2 text-sm bg-gray-300 rounded-xl'
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {cancelMsg}
          </motion.button>

          <button
            type="submit"
            onClick={onConfirm}
            className={loading ? `${className} opacity-45 cursor-not-allowed text-sm` : className}
            disabled={loading}
          >
            {actionMsg}
          </button>

        </div>
      </motion.div>
    </motion.div>
  )
}

export default ModalSelector