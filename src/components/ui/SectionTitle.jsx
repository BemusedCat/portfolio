import { motion } from 'framer-motion';

export default function SectionTitle({ children, className = '' }) {
  return (
    <motion.h2
      className={`
        relative text-xl md:text-2xl text-primary font-semibold
        text-center mt-4 mb-8 md:mb-12
        after:content-[''] after:absolute after:w-16 md:after:w-20
        after:h-[3px] after:bg-primary
        after:left-1/2 after:-translate-x-1/2 after:top-8 md:after:top-12
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.h2>
  );
}
