import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

export default function NeonTitle({ children, className = '' }) {
  const { isModernView } = useViewMode();
  const [flickerDone, setFlickerDone] = useState(false);

  useEffect(() => {
    if (isModernView) {
      const timer = setTimeout(() => setFlickerDone(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isModernView]);

  if (!isModernView) {
    return (
      <h2 className={`text-center text-2xl font-bold mb-8 ${className}`}>
        {children}
      </h2>
    );
  }

  return (
    <motion.h2
      className={`text-center text-3xl font-bold mb-12 ${flickerDone ? 'neon-pulse' : 'neon-flicker'} ${className}`}
      style={{ color: 'var(--neon-cyan)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
      {/* Reflection */}
      <span
        className="block text-lg opacity-30 mt-1 scale-y-[-1] blur-[1px]"
        style={{
          background: 'linear-gradient(to bottom, var(--neon-cyan), transparent)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent'
        }}
      >
        {children}
      </span>
    </motion.h2>
  );
}
