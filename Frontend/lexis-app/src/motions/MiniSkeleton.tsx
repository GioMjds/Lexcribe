import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const MiniSkeleton = () => {
  return (
    <div className="w-4/6 space-y-2">
      <Skeleton 
        count={3} 
        height={40}
        className="rounded-lg"
        baseColor="#17153B"
        highlightColor="#383781"
      />
    </div>
  );
};

export default MiniSkeleton;