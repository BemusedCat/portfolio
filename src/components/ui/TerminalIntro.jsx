import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const commands = [
  { cmd: '> whoami', output: 'abhigyan' },
  { cmd: '> cat profession.txt', output: 'Software Engineer @ CrowdStrike' },
  { cmd: '> echo $SKILLS', output: 'React, Node.js, DevOps, AI/ML' },
  { cmd: '> ./start_portfolio.sh', output: 'Initializing...' },
];

export default function TerminalIntro({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLine >= commands.length) {
      setTimeout(() => {
        setIsComplete(true);
        onComplete?.();
      }, 500);
      return;
    }

    const command = commands[currentLine];
    let charIndex = 0;

    // Type out command
    const typeInterval = setInterval(() => {
      if (charIndex <= command.cmd.length) {
        setDisplayedText(command.cmd.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Show output after typing
        setTimeout(() => {
          setShowOutput(true);
          // Move to next line
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1);
            setDisplayedText('');
            setShowOutput(false);
          }, 800);
        }, 300);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentLine, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="bg-gray-900 rounded-lg p-4 font-mono text-sm mb-6 overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Previous lines */}
          {commands.slice(0, currentLine).map((cmd, i) => (
            <div key={i} className="mb-2">
              <span className="text-green-400">{cmd.cmd}</span>
              <div className="text-gray-300 pl-2">{cmd.output}</div>
            </div>
          ))}

          {/* Current line being typed */}
          {currentLine < commands.length && (
            <div>
              <span className="text-green-400">
                {displayedText}
                <span className="animate-pulse">&#9610;</span>
              </span>
              {showOutput && (
                <motion.div
                  className="text-gray-300 pl-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {commands[currentLine].output}
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
