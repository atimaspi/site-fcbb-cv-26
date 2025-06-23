
import { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  targetValue: number;
  delay?: number;
}

export const AnimatedCounter = ({ targetValue, delay = 0 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000;
    let startTime: number;
    const startCount = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const currentCount = Math.floor(progress * (targetValue - startCount) + startCount);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [targetValue, delay, hasStarted]);

  const startAnimation = () => setHasStarted(true);

  return { count, startAnimation };
};
