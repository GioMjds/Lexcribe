import { FC } from "react"
import { motion } from "framer-motion"

const spinnerVariants = {
  spin: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: 'linear'
    }
  }
};

const Loading: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <motion.svg
        className='h-5 w-5 mr-3 text-white animate-spin'
        viewBox={'0 0 24 24'}
        variants={spinnerVariants}
        animate='spin'
      >
        <motion.circle
          className='opacity-25'
          cx={12}
          cy={12}
          r={10}
          fill={'none'}
          strokeWidth={4}
          stroke={'currentColor'}
        />
          <path 
            className="opacity-75"
            fill="currentColor"
            d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z"
          />
      </motion.svg>
      <motion.span
        className='text-white'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading . . .
      </motion.span>
    </div>
  )
}

export default Loading