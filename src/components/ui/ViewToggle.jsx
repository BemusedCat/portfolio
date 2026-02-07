import { motion } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

export default function ViewToggle() {
  const { isMaximalView, toggleView } = useViewMode();

  return (
    <motion.button
      onClick={toggleView}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isMaximalView ? 'Switch to Minimal' : 'Switch to Maximal'}
    >
      {/* Icon */}
      <motion.span
        animate={{ rotate: isMaximalView ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isMaximalView ? (
          <i className="bx bxs-bolt text-lg neon-text"></i>
        ) : (
          <i className="bx bx-minus text-lg text-gray-500 dark:text-gray-400"></i>
        )}
      </motion.span>

      {/* Label */}
      <span className="hidden sm:inline text-gray-700 dark:text-gray-300">
        {isMaximalView ? 'Maximal' : 'Minimal'}
      </span>

      {/* Glow effect for maximal mode */}
      {isMaximalView && (
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-500/20 -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        />
      )}
    </motion.button>
  );
}
