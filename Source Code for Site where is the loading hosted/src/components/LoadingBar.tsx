
import React, { useEffect, useState } from 'react';
import { Progress } from './ui/progress';

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set up the progress bar animation
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // When we reach 100%, stop the interval
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 0.5;
      });
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <Progress
        value={progress}
        className="w-full h-1"
      />
    </div>
  );
};

export default LoadingBar;
