import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

export default function Button({
  children,
  href,
  type = 'button',
  className = '',
  magnetic = true,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull strength (0.3 = 30% of distance)
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = `
    inline-block bg-primary text-white
    py-3 px-10 font-semibold rounded-lg
    transition-shadow duration-300
    hover:shadow-[0_10px_36px_rgba(0,0,0,0.15)]
  `;

  const motionProps = {
    ref,
    style: { x: xSpring, y: ySpring },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${className}`}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={`${baseStyles} border-none cursor-pointer ${className}`}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
