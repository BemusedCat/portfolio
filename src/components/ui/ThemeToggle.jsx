import { motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        text-xl text-secondary dark:text-white
        hover:text-primary dark:hover:text-primary
        transition-colors cursor-pointer
        ${className}
      `}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.i
        className={`bx ${theme === 'dark' ? 'bx-sun' : 'bx-moon'}`}
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
