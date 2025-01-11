import { motion } from "framer-motion"

const Loading = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className='text-white w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      </motion.div>
        {text}
    </div>
  )
}

export default Loading