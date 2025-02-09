import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const MiniSkeleton = () => {
  return (
    <div className="w-4/6 space-y-2">
      <h1>Skeleton</h1>
      <Skeleton 
        count={6} 
        height={10}
        baseColor="#17153b69"
        highlightColor="#38378148"
        borderRadius={8}
      />
    </div>
  );
};

export default MiniSkeleton;