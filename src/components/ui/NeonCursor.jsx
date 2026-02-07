import { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

export default function NeonCursor() {
  const { isModernView } = useViewMode();
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for the outer ring (delayed follow)
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    if (!isModernView) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Hide default cursor on body
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, [isModernView, mouseX, mouseY]);

  // Also hide cursor on interactive elements
  useEffect(() => {
    if (!isModernView) return;

    const style = document.createElement('style');
    style.id = 'neon-cursor-style';
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById('neon-cursor-style');
      if (existing) existing.remove();
    };
  }, [isModernView]);

  if (!isModernView) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000]">
      {/* Outer ring - follows with spring delay */}
      <motion.div
        ref={ringRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          left: ringX,
          top: ringY,
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-full border-2 border-cyan-400"
          style={{
            boxShadow: '0 0 10px #00f2fe, 0 0 20px #00f2fe, inset 0 0 10px rgba(0, 242, 254, 0.1)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Inner dot - follows cursor exactly */}
      <motion.div
        ref={cursorRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          left: mouseX,
          top: mouseY,
        }}
      >
        {/* Core dot */}
        <div
          className="w-2 h-2 rounded-full bg-cyan-400"
          style={{
            boxShadow: '0 0 8px #00f2fe, 0 0 16px #00f2fe, 0 0 24px #00f2fe',
          }}
        />

        {/* Crosshair lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Horizontal line */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              width: '24px',
              left: '-12px',
              opacity: 0.6,
            }}
            animate={{
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Vertical line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            style={{
              height: '24px',
              top: '-12px',
              opacity: 0.6,
            }}
            animate={{
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.75,
            }}
          />
        </div>

        {/* Corner accents */}
        {[0, 90, 180, 270].map((rotation) => (
          <motion.div
            key={rotation}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            }}
          >
            <motion.div
              className="absolute w-[6px] h-[1px] bg-magenta-400"
              style={{
                top: '-14px',
                left: '-3px',
                background: '#ff00ff',
                boxShadow: '0 0 4px #ff00ff',
                opacity: 0.8,
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: rotation / 360,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
