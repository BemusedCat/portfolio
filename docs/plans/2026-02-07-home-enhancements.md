# Home Page Enhancements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add loading animation, scroll progress indicator, magnetic buttons, easter eggs, terminal intro, and Spotify now playing widget to the home page.

**Architecture:** Create standalone UI components that integrate into the existing React/Framer Motion architecture. Loading screen wraps the entire app, scroll progress lives in Header, magnetic effect enhances Button component, terminal intro replaces typewriter temporarily, easter eggs hook into keyboard events, Spotify widget fetches from a serverless function or static mock.

**Tech Stack:** React 18, Framer Motion, Tailwind CSS, localStorage (for easter egg state)

---

## Task 1: Loading Animation Component

**Files:**
- Create: `src/components/ui/LoadingScreen.jsx`
- Modify: `src/components/ui/index.js`
- Modify: `src/App.jsx`

**Step 1: Create LoadingScreen component**

```jsx
// src/components/ui/LoadingScreen.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum display time for animation to complete
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white dark:bg-gray-900 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            {/* Animated logo/name */}
            <motion.div
              className="text-4xl md:text-6xl font-bold text-primary mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              A
            </motion.div>

            {/* Loading bar */}
            <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="mt-4 text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as LoadingScreen } from './LoadingScreen';
```

**Step 3: Integrate into App.jsx**

```jsx
// src/App.jsx
import { useState } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { Header, Footer } from './components/layout';
import { Home, About, Experience, Education, Skills, Contact } from './components/sections';
import { CustomCursor, LoadingScreen } from './components/ui';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ThemeProvider>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <CustomCursor />
      <Header />
      <main className="mt-12 md:mt-16">
        <Home />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
```

**Step 4: Verify it works**

Run: `npm run dev`
Expected: Loading screen appears for ~2.5s with animated logo and progress bar, then fades out

**Step 5: Commit**

```bash
git add src/components/ui/LoadingScreen.jsx src/components/ui/index.js src/App.jsx
git commit -m "feat: add loading screen animation"
```

---

## Task 2: Scroll Progress Indicator

**Files:**
- Create: `src/components/ui/ScrollProgress.jsx`
- Modify: `src/components/ui/index.js`
- Modify: `src/components/layout/Header.jsx`

**Step 1: Create ScrollProgress component**

```jsx
// src/components/ui/ScrollProgress.jsx
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as ScrollProgress } from './ScrollProgress';
```

**Step 3: Add to Header.jsx**

Modify `src/components/layout/Header.jsx` to import and render ScrollProgress at the top:
```jsx
import { ScrollProgress } from '../ui';

// Inside the component, before the <header> tag:
return (
  <>
    <ScrollProgress />
    <header className="fixed top-0 left-0 w-full z-50 ...">
      {/* existing content */}
    </header>
  </>
);
```

**Step 4: Verify it works**

Run: `npm run dev`
Expected: Blue progress bar at top of page that fills as you scroll down

**Step 5: Commit**

```bash
git add src/components/ui/ScrollProgress.jsx src/components/ui/index.js src/components/layout/Header.jsx
git commit -m "feat: add scroll progress indicator"
```

---

## Task 3: Magnetic Button Effect

**Files:**
- Modify: `src/components/ui/Button.jsx`

**Step 1: Add magnetic effect to Button**

Replace `src/components/ui/Button.jsx`:

```jsx
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Button({
  children,
  href,
  type = 'button',
  className = '',
  magnetic = true,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull strength (0.3 = 30% of distance)
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = `
    inline-block bg-primary text-white
    py-3 px-10 font-semibold rounded-lg
    transition-shadow duration-300
    hover:shadow-[0_10px_36px_rgba(0,0,0,0.15)]
  `;

  const motionProps = {
    ref,
    style: { x: xSpring, y: ySpring },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${className}`}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={`${baseStyles} border-none cursor-pointer ${className}`}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
```

**Step 2: Verify it works**

Run: `npm run dev`
Expected: Buttons subtly follow cursor when hovering near them, spring back when cursor leaves

**Step 3: Commit**

```bash
git add src/components/ui/Button.jsx
git commit -m "feat: add magnetic effect to buttons"
```

---

## Task 4: Terminal Intro Animation

**Files:**
- Create: `src/components/ui/TerminalIntro.jsx`
- Modify: `src/components/ui/index.js`
- Modify: `src/components/sections/Home.jsx`

**Step 1: Create TerminalIntro component**

```jsx
// src/components/ui/TerminalIntro.jsx
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
                <span className="animate-pulse">▊</span>
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
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as TerminalIntro } from './TerminalIntro';
```

**Step 3: Integrate into Home.jsx**

Add to `src/components/sections/Home.jsx`:
```jsx
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, SocialLinks, Typewriter, TerminalIntro } from '../ui';
// ... rest of imports

export default function Home() {
  const [terminalComplete, setTerminalComplete] = useState(false);
  // ... existing code

  return (
    <section ...>
      <div className="order-2 md:order-1">
        {/* Terminal intro - shows before main content */}
        <TerminalIntro onComplete={() => setTerminalComplete(true)} />

        {/* Main content - appears after terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: terminalComplete ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 ...>
            {/* existing h1 content */}
          </motion.h1>
          {/* rest of content */}
        </motion.div>
      </div>
      {/* illustration div unchanged */}
    </section>
  );
}
```

**Step 4: Verify it works**

Run: `npm run dev`
Expected: Terminal animation plays on home page, typing out commands, then fades to reveal normal content

**Step 5: Commit**

```bash
git add src/components/ui/TerminalIntro.jsx src/components/ui/index.js src/components/sections/Home.jsx
git commit -m "feat: add terminal intro animation to home page"
```

---

## Task 5: Easter Eggs (Konami Code)

**Files:**
- Create: `src/hooks/useKonamiCode.js`
- Create: `src/components/ui/EasterEgg.jsx`
- Modify: `src/components/ui/index.js`
- Modify: `src/App.jsx`

**Step 1: Create Konami Code hook**

```jsx
// src/hooks/useKonamiCode.js
import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

export default function useKonamiCode(callback) {
  const [inputSequence, setInputSequence] = useState([]);

  const handleKeyDown = useCallback((e) => {
    setInputSequence((prev) => {
      const newSequence = [...prev, e.code].slice(-KONAMI_CODE.length);

      if (newSequence.join(',') === KONAMI_CODE.join(',')) {
        callback?.();
        return [];
      }

      return newSequence;
    });
  }, [callback]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return inputSequence;
}
```

**Step 2: Create EasterEgg component**

```jsx
// src/components/ui/EasterEgg.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useKonamiCode from '../../hooks/useKonamiCode';

export default function EasterEgg() {
  const [activated, setActivated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useKonamiCode(() => {
    setActivated(true);
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
            🎮 KONAMI CODE ACTIVATED! 🎉
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
```

**Step 3: Add party-mode CSS**

Add to `src/index.css`:
```css
/* Easter egg party mode */
.party-mode {
  animation: hue-rotate 2s linear infinite;
}

@keyframes hue-rotate {
  from { filter: hue-rotate(0deg); }
  to { filter: hue-rotate(360deg); }
}
```

**Step 4: Export and integrate**

Add to `src/components/ui/index.js`:
```js
export { default as EasterEgg } from './EasterEgg';
```

Add to `src/App.jsx`:
```jsx
import { CustomCursor, LoadingScreen, EasterEgg } from './components/ui';

// Inside ThemeProvider, add:
<EasterEgg />
```

**Step 5: Verify it works**

Run: `npm run dev`
Expected: Type Konami code (↑↑↓↓←→←→BA) and see celebration animation with confetti

**Step 6: Commit**

```bash
git add src/hooks/useKonamiCode.js src/components/ui/EasterEgg.jsx src/components/ui/index.js src/App.jsx src/index.css
git commit -m "feat: add Konami code easter egg"
```

---

## Task 6: Spotify Now Playing Widget

**Files:**
- Create: `src/components/ui/SpotifyWidget.jsx`
- Modify: `src/components/ui/index.js`
- Modify: `src/components/sections/Home.jsx`

**Step 1: Create SpotifyWidget component (mock version)**

```jsx
// src/components/ui/SpotifyWidget.jsx
import { motion } from 'framer-motion';

// Mock data - replace with actual Spotify API integration later
const mockNowPlaying = {
  isPlaying: true,
  title: 'Blinding Lights',
  artist: 'The Weeknd',
  albumArt: null, // Would be actual album art URL
};

export default function SpotifyWidget() {
  const { isPlaying, title, artist } = mockNowPlaying;

  return (
    <motion.div
      className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 max-w-fit"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {/* Spotify icon */}
      <i className="bxl-spotify text-2xl text-green-500"></i>

      {/* Sound bars animation */}
      {isPlaying && (
        <div className="flex items-end gap-0.5 h-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-green-500 rounded-full"
              animate={{
                height: ['40%', '100%', '60%', '100%', '40%'],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}

      {/* Track info */}
      <div className="text-sm">
        <p className="font-medium text-gray-800 dark:text-white truncate max-w-[150px]">
          {title}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs truncate max-w-[150px]">
          {artist}
        </p>
      </div>
    </motion.div>
  );
}
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as SpotifyWidget } from './SpotifyWidget';
```

**Step 3: Add to Home.jsx**

Add to `src/components/sections/Home.jsx` after the social links:
```jsx
import { Button, SocialLinks, Typewriter, TerminalIntro, SpotifyWidget } from '../ui';

// Inside the component, after SocialLinks div:
<div className="mt-6">
  <SpotifyWidget />
</div>
```

**Step 4: Verify it works**

Run: `npm run dev`
Expected: Spotify widget appears below social links with animated sound bars

**Step 5: Commit**

```bash
git add src/components/ui/SpotifyWidget.jsx src/components/ui/index.js src/components/sections/Home.jsx
git commit -m "feat: add Spotify now playing widget (mock)"
```

---

## Summary

After completing all tasks, the home page will have:
1. ✅ Loading animation with progress bar
2. ✅ Scroll progress indicator in header
3. ✅ Magnetic button effect
4. ✅ Terminal intro animation
5. ✅ Konami code easter egg with confetti
6. ✅ Spotify now playing widget

Total estimated time: 45-60 minutes
