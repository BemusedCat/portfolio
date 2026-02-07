import { motion } from 'framer-motion';

export default function Button({
  children,
  href,
  type = 'button',
  className = ''
}) {
  const baseStyles = `
    inline-block bg-primary text-white
    py-3 px-10 font-semibold rounded-lg
    transition-shadow duration-300
    hover:shadow-[0_10px_36px_rgba(0,0,0,0.15)]
  `;

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={`${baseStyles} border-none cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
