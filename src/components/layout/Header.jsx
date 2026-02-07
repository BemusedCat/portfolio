import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle, ScrollProgress } from '../ui';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  const handleNavClick = (href) => {
    setActiveLink(href);
    setIsOpen(false);
  };

  return (
    <>
    <ScrollProgress />
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-[0_1px_4px_rgba(146,161,176,0.15)]">
      <nav className="h-12 md:h-16 flex justify-between items-center max-w-[1220px] mx-auto px-4 md:px-8 font-semibold">
        {/* Logo */}
        <a href="#" className="text-secondary dark:text-white text-lg">
          Abhigyan
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex gap-12">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`
                    relative text-secondary dark:text-white
                    hover:after:content-[''] hover:after:absolute
                    hover:after:w-full hover:after:h-[3px]
                    hover:after:bg-primary hover:after:left-0 hover:after:top-8
                    ${activeLink === link.href ?
                      "after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-primary after:left-0 after:top-8"
                      : ''
                    }
                  `}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile: Theme Toggle + Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            className="text-secondary dark:text-white text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <i className={`bx ${isOpen ? 'bx-x' : 'bx-menu'}`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed top-12 right-0 w-4/5 h-full bg-secondary p-8 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <ul className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`
                        relative text-white
                        ${activeLink === link.href ?
                          "after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-primary after:left-0 after:top-8"
                          : ''
                        }
                      `}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
    </>
  );
}
