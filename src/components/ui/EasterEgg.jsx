import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useKonamiCode from '../../hooks/useKonamiCode';

export default function EasterEgg() {
  const [showMessage, setShowMessage] = useState(false);

  useKonamiCode(() => {
    setShowMessage(true);

    // Add party mode class to body
    document.body.classList.add('party-mode');

    // Remove after 5 seconds
    setTimeout(() => {
      setShowMessage(false);
      document.body.classList.remove('party-mode');
    }, 5000);
  });

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-primary text-white px-8 py-4 rounded-2xl text-2xl font-bold shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', damping: 10 }}
          >
            KONAMI CODE ACTIVATED!
          </motion.div>

          {/* Confetti effect */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#ff0', '#f0f', '#0ff', '#f00', '#0f0'][i % 5],
                left: `${Math.random() * 100}%`,
              }}
              initial={{ top: '-5%', rotate: 0 }}
              animate={{
                top: '105%',
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'linear',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
