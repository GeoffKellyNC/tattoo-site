// useMobileCheck.ts
import { useState, useEffect } from 'react';

const mobileWidthThreshold = 1000;

export const useMobileCheck = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileWidthThreshold);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= mobileWidthThreshold);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  return isMobile;
};
