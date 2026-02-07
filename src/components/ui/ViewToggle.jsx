import { motion } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

export default function ViewToggle() {
  const { isModernView, toggleView } = useViewMode();

  return (
    <motion.button
      onClick={toggleView}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isModernView ? 'Switch to Classic View' : 'Switch to Modern View'}
    >
      {/* Icon */}
      <motion.span
        animate={{ rotate: isModernView ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isModernView ? (
          <i className="bx bx-cube-alt text-lg text-primary"></i>
        ) : (
          <i className="bx bx-layout text-lg text-gray-500 dark:text-gray-400"></i>
        )}
      </motion.span>

      {/* Label */}
      <span className="hidden sm:inline text-gray-700 dark:text-gray-300">
        {isModernView ? 'Modern' : 'Classic'}
      </span>

      {/* Glow effect for modern mode */}
      {isModernView && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        />
      )}
    </motion.button>
  );
}
