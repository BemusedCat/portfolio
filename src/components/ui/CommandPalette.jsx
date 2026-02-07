import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';
import useTheme from '../../hooks/useTheme';

const commands = [
  { id: 'home', label: 'Go to Home', icon: 'bx-home', action: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'about', label: 'Go to About', icon: 'bx-user', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'experience', label: 'Go to Experience', icon: 'bx-briefcase', action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'education', label: 'Go to Education', icon: 'bx-book', action: () => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'skills', label: 'Go to Skills', icon: 'bx-code-alt', action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'contact', label: 'Go to Contact', icon: 'bx-envelope', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'theme', label: 'Toggle Theme', icon: 'bx-moon', action: null },
  { id: 'view', label: 'Toggle View Mode', icon: 'bx-cube-alt', action: null },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { toggleTheme } = useTheme();
  const { toggleView } = useViewMode();

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const executeCommand = useCallback((command) => {
    if (command.id === 'theme') {
      toggleTheme();
    } else if (command.id === 'view') {
      toggleView();
    } else if (command.action) {
      command.action();
    }
    setIsOpen(false);
    setSearch('');
  }, [toggleTheme, toggleView]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearch('');
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      }
      if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, executeCommand]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Palette */}
          <motion.div
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[201]"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
          >
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl neon-border">
              {/* Search input */}
              <div className="p-4 border-b border-gray-800">
                <input
                  type="text"
                  placeholder="Type a command..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setSelectedIndex(0); }}
                  className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                  autoFocus
                />
              </div>

              {/* Commands list */}
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredCommands.map((cmd, index) => (
                  <button
                    key={cmd.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      index === selectedIndex
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                    onClick={() => executeCommand(cmd)}
                  >
                    <i className={`bx ${cmd.icon} text-xl`}></i>
                    <span>{cmd.label}</span>
                  </button>
                ))}
              </div>

              {/* Hint */}
              <div className="p-3 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
                <span>&#8593;&#8595; to navigate</span>
                <span>&#8629; to select</span>
                <span>esc to close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
