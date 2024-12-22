import { FC } from "react"
import { motion } from "framer-motion"

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

const modalVariants = {
  hidden: { opacity: 0, y: '-50%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: '-50%', transition: { duration: 0.3 } }
}

const ModalSelector: FC<ModalSelectorProps> = ({ isOpen, onClose, onConfirm, actionMsg, cancelMsg, paragraph, h2, loading, className }) => {
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
        <h2 className="text-2xl font-semibold mb-4">{h2}</h2>
        <p className="mb-4 text-xl">{paragraph}</p>
        <div className="flex justify-end">
          <motion.button
            className='mr-2 px-4 py-2 bg-gray-300 rounded-xl'
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