import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

export default function HolographicCard({ children, className = '' }) {
  const { isModernView } = useViewMode();
  const cardRef = useRef(null);
  const lastUpdate = useRef(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !isModernView) return;

    // Throttle to 60fps max
    const now = Date.now();
    if (now - lastUpdate.current < 16) return;
    lastUpdate.current = now;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);

    // Glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  }, [isModernView]);

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  if (!isModernView) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        willChange: 'transform',
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Holographic rainbow border */}
      <div
        className="absolute inset-0 rounded-xl opacity-50"
        style={{
          background: `linear-gradient(
            ${45 + rotateY * 5}deg,
            #ff0000 0%,
            #ff8000 14%,
            #ffff00 28%,
            #00ff00 42%,
            #00ffff 56%,
            #0000ff 70%,
            #8000ff 84%,
            #ff0080 100%
          )`,
          padding: '2px',
        }}
      />

      {/* Card content */}
      <div
        className="relative rounded-xl p-6 h-full"
        style={{
          background: 'rgba(10, 10, 20, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {children}

        {/* Glare effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: `radial-gradient(
              circle at ${glarePosition.x}% ${glarePosition.y}%,
              rgba(255,255,255,0.15) 0%,
              transparent 50%
            )`,
          }}
        />

        {/* Interference lines */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden opacity-10"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,242,254,0.5) 2px,
              rgba(0,242,254,0.5) 4px
            )`,
            animation: 'interference 2s linear infinite',
          }}
        />
      </div>
    </motion.div>
  );
}
