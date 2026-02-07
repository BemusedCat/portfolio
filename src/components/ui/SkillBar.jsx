import { motion } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

export default function SkillBar({ name, icon, percentage }) {
  const { isModernView } = useViewMode();

  return (
    <motion.div
      className={`
        relative flex justify-between items-center
        font-semibold p-2 px-4 mb-8
        rounded-lg shadow-[0_4px_25px_rgba(14,36,49,0.15)]
        dark:bg-gray-800 dark:shadow-[0_4px_25px_rgba(255,255,255,0.06)]
        ${isModernView ? 'glass' : ''}
      `}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <i className={`bx ${icon} text-3xl text-primary mr-4`}></i>
        <span>{name}</span>
      </div>
      <span>{percentage}%</span>

      {/* Progress bar */}
      <motion.div
        className={`absolute left-0 bottom-0 h-1 rounded-lg ${
          isModernView
            ? 'bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%]'
            : 'bg-primary'
        }`}
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </motion.div>
  );
}
