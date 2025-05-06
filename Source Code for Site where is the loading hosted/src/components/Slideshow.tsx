
import React, { useState, useEffect, useRef } from 'react';

interface SlideshowProps {
  images: string[];
  interval?: number;
}

const Slideshow: React.FC<SlideshowProps> = ({ images, interval = 5000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(-1);
  const timeoutRef = useRef<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(() => {
      setPreviousImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => {
      resetTimeout();
    };
  }, [currentImageIndex, images.length, interval]);

  return (
    <div className="slideshow-container">
      <div className="overlay"></div>
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className={`slide ${
            index === currentImageIndex
              ? 'active'
              : index === previousImageIndex
              ? 'inactive'
              : ''
          }`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ))}
    </div>
  );
};

export default Slideshow;
