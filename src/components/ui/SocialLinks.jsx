import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SocialLinks({
  links,
  size = 'lg',
  direction = 'vertical',
  className = ''
}) {
  const sizeClasses = size === 'lg' ? 'text-2xl' : 'text-xl';
  const directionClasses = direction === 'vertical'
    ? 'flex-col space-y-4'
    : 'flex-row space-x-4';

  return (
    <motion.div
      className={`flex ${directionClasses} ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {links.map((link) => (
        <motion.a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            ${sizeClasses} text-secondary dark:text-white
            transition-colors duration-300
            hover:text-primary
          `}
          variants={item}
          whileHover={{ scale: 1.1 }}
          aria-label={link.label}
        >
          <i className={`bx ${link.icon}`}></i>
        </motion.a>
      ))}
    </motion.div>
  );
}
