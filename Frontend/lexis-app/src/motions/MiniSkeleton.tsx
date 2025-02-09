import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from "framer-motion";

const MiniSkeleton = () => {
  return (
    <motion.div
      className="w-4/6 space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-xl text-white animate-pulse">Wait for Lexcribe to respond . . . .</h1>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Skeleton 
          count={6} 
          height={10}
          baseColor="#17153b69"
          highlightColor="#38378148"
          borderRadius={8}
          className="animate-pulse"
        />
      </motion.div>
    </motion.div>
  );
};

export default MiniSkeleton;