import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

const chars = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({ children, className = '', delay = 0 }) {
  const { isModernView } = useViewMode();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const targetText = typeof children === 'string' ? children : '';

  useEffect(() => {
    if (!isModernView || !isInView || !targetText) {
      setDisplayText(targetText);
      setIsComplete(true);
      return;
    }

    let iteration = 0;
    const totalIterations = targetText.length * 3;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          targetText
            .split('')
            .map((char, index) => {
              if (index < iteration / 3) {
                return char;
              }
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        iteration++;

        if (iteration >= totalIterations) {
          clearInterval(interval);
          setDisplayText(targetText);
          setIsComplete(true);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, isModernView, targetText, delay]);

  if (!isModernView) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={`font-mono ${className}`}
      style={{
        color: isComplete ? 'inherit' : 'var(--neon-green)',
        textShadow: isComplete ? 'none' : '0 0 10px var(--neon-green)'
      }}
    >
      {displayText || children}
    </motion.span>
  );
}
