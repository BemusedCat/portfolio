import { motion } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

export default function SkillBar({ name, icon, percentage }) {
  const { isModernView } = useViewMode();

  if (isModernView) {
    return (
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center relative"
          style={{
            background: `radial-gradient(circle, rgba(0,242,254,0.3) 0%, transparent 70%)`,
            boxShadow: `0 0 ${percentage / 2}px var(--neon-cyan), inset 0 0 20px rgba(0,242,254,0.2)`,
          }}
        >
          <i className={`bx ${icon} text-3xl neon-text`}></i>
        </div>
        <p className="text-center text-sm mt-2 neon-text-green">{name}</p>
        <p className="text-center text-xs opacity-60">{percentage}%</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="
        relative flex justify-between items-center
        font-semibold p-2 px-4 mb-8
        rounded-lg shadow-[0_4px_25px_rgba(14,36,49,0.15)]
        dark:bg-gray-800 dark:shadow-[0_4px_25px_rgba(255,255,255,0.06)]
      "
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
        className="absolute left-0 bottom-0 h-1 rounded-lg bg-primary"
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </motion.div>
  );
}
