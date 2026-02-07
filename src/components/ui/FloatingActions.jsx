import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

const actions = [
  { icon: 'bxl-github', label: 'GitHub', url: 'https://github.com/BemusedCat' },
  { icon: 'bxl-linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/abhigyann/' },
  { icon: 'bx-envelope', label: 'Email', url: 'mailto:hello@abhigyan.dev' },
];

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const { isModernView } = useViewMode();

  if (!isModernView) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
      <AnimatePresence>
        {isOpen && actions.map((action, index) => (
          <motion.a
            key={action.label}
            href={action.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-primary text-xl hover:bg-primary hover:text-white transition-colors"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ delay: index * 0.05 }}
            title={action.label}
          >
            <i className={`bx ${action.icon}`}></i>
          </motion.a>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center text-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <i className="bx bx-plus"></i>
      </motion.button>
    </div>
  );
}
