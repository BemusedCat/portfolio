import { motion } from 'framer-motion';

export default function Input({
  label,
  name,
  type = 'text',
  as = 'input',
  className = ''
}) {
  const baseStyles = `
    w-full text-base font-semibold
    p-4 rounded-lg border-2 border-secondary
    outline-none mb-8
    focus:border-primary transition-colors
    dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
  `;

  const Component = as === 'textarea' ? 'textarea' : 'input';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Component
        name={name}
        type={as === 'input' ? type : undefined}
        placeholder={label}
        className={`${baseStyles} ${as === 'textarea' ? 'min-h-[150px] resize-y' : ''} ${className}`}
      />
    </motion.div>
  );
}
