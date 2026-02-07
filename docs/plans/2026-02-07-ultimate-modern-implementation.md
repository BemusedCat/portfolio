# Ultimate Modern View - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Modern View into a jaw-dropping, immersive experience with aurora backgrounds, neon effects, text scramble, cursor trails, holographic cards, and more.

**Architecture:** Build modular effect components that layer together. Each effect is independently toggleable and performance-optimized. Effects are conditionally rendered only in Modern View.

**Tech Stack:**
- `framer-motion` - Already installed
- `@react-three/fiber` + `drei` - Already installed
- CSS custom properties for neon colors
- Canvas API for cursor trails
- SVG filters for glitch effects

---

## Phase 1: Aurora Background & Neon Foundation

### Task 1: Create Aurora Background Component

**Files:**
- Create: `src/components/ui/AuroraBackground.jsx`
- Modify: `src/components/ui/index.js`

**Step 1: Create AuroraBackground with flowing ribbons**

```jsx
// src/components/ui/AuroraBackground.jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0f]">
      {/* Aurora ribbons */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0" />
            <stop offset="50%" stopColor="#00f2fe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4facfe" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="aurora2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff00ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#667eea" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="aurora3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#39ff14" stopOpacity="0" />
            <stop offset="50%" stopColor="#39ff14" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="20" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ribbon 1 - Cyan */}
        <motion.path
          d="M-100,200 Q200,100 400,200 T800,150 T1200,250 T1600,200"
          fill="none"
          stroke="url(#aurora1)"
          strokeWidth="150"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            d: [
              "M-100,200 Q200,100 400,200 T800,150 T1200,250 T1600,200",
              "M-100,250 Q200,150 400,250 T800,200 T1200,150 T1600,250",
              "M-100,200 Q200,100 400,200 T800,150 T1200,250 T1600,200"
            ]
          }}
          transition={{
            pathLength: { duration: 2 },
            opacity: { duration: 1 },
            d: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Ribbon 2 - Magenta */}
        <motion.path
          d="M-100,400 Q300,300 500,400 T900,350 T1300,450 T1700,400"
          fill="none"
          stroke="url(#aurora2)"
          strokeWidth="120"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            d: [
              "M-100,400 Q300,300 500,400 T900,350 T1300,450 T1700,400",
              "M-100,350 Q300,450 500,350 T900,400 T1300,350 T1700,450",
              "M-100,400 Q300,300 500,400 T900,350 T1300,450 T1700,400"
            ]
          }}
          transition={{
            pathLength: { duration: 2, delay: 0.3 },
            opacity: { duration: 1, delay: 0.3 },
            d: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Ribbon 3 - Green */}
        <motion.path
          d="M-100,600 Q250,500 450,600 T850,550 T1250,650 T1650,600"
          fill="none"
          stroke="url(#aurora3)"
          strokeWidth="100"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            d: [
              "M-100,600 Q250,500 450,600 T850,550 T1250,650 T1650,600",
              "M-100,550 Q250,650 450,550 T850,600 T1250,550 T1650,650",
              "M-100,600 Q250,500 450,600 T850,550 T1250,650 T1650,600"
            ]
          }}
          transition={{
            pathLength: { duration: 2, delay: 0.6 },
            opacity: { duration: 1, delay: 0.6 },
            d: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </svg>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
}
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as AuroraBackground } from './AuroraBackground';
```

**Step 3: Commit**

```bash
git add src/components/ui/AuroraBackground.jsx src/components/ui/index.js
git commit -m "feat: add aurora background with flowing neon ribbons"
```

---

### Task 2: Add Neon Color CSS Variables & Utilities

**Files:**
- Modify: `src/index.css`

**Step 1: Add neon color system and effects**

Add to `src/index.css`:

```css
/* ============================================
   NEON COLOR SYSTEM - Modern View
   ============================================ */

:root {
  --neon-cyan: #00f2fe;
  --neon-magenta: #ff00ff;
  --neon-green: #39ff14;
  --neon-pink: #ff3366;
  --neon-purple: #bf00ff;
  --neon-orange: #ff6600;
}

/* Neon text effect */
.neon-text {
  color: var(--neon-cyan);
  text-shadow:
    0 0 5px var(--neon-cyan),
    0 0 10px var(--neon-cyan),
    0 0 20px var(--neon-cyan),
    0 0 40px var(--neon-cyan);
}

.neon-text-magenta {
  color: var(--neon-magenta);
  text-shadow:
    0 0 5px var(--neon-magenta),
    0 0 10px var(--neon-magenta),
    0 0 20px var(--neon-magenta),
    0 0 40px var(--neon-magenta);
}

.neon-text-green {
  color: var(--neon-green);
  text-shadow:
    0 0 5px var(--neon-green),
    0 0 10px var(--neon-green),
    0 0 20px var(--neon-green),
    0 0 40px var(--neon-green);
}

/* Neon flicker animation */
@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow:
      0 0 5px var(--neon-cyan),
      0 0 10px var(--neon-cyan),
      0 0 20px var(--neon-cyan),
      0 0 40px var(--neon-cyan);
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}

.neon-flicker {
  animation: neon-flicker 3s infinite;
}

/* Neon pulse animation */
@keyframes neon-pulse {
  0%, 100% {
    text-shadow:
      0 0 5px var(--neon-cyan),
      0 0 10px var(--neon-cyan),
      0 0 20px var(--neon-cyan);
  }
  50% {
    text-shadow:
      0 0 10px var(--neon-cyan),
      0 0 20px var(--neon-cyan),
      0 0 40px var(--neon-cyan),
      0 0 80px var(--neon-cyan);
  }
}

.neon-pulse {
  animation: neon-pulse 2s ease-in-out infinite;
}

/* Neon border glow */
.neon-border {
  border: 2px solid var(--neon-cyan);
  box-shadow:
    0 0 5px var(--neon-cyan),
    0 0 10px var(--neon-cyan),
    inset 0 0 5px var(--neon-cyan);
}

/* Scanline overlay effect */
.scanlines::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 100;
}

/* Chromatic aberration on hover */
.chromatic-aberration:hover {
  animation: chromatic 0.3s ease;
}

@keyframes chromatic {
  0% { text-shadow: -2px 0 #ff0000, 2px 0 #00ffff; }
  25% { text-shadow: 2px 0 #ff0000, -2px 0 #00ffff; }
  50% { text-shadow: -1px 0 #ff0000, 1px 0 #00ffff; }
  75% { text-shadow: 1px 0 #ff0000, -1px 0 #00ffff; }
  100% { text-shadow: 0 0 transparent; }
}

/* Holographic shimmer effect */
@keyframes holographic {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.holographic {
  background: linear-gradient(
    90deg,
    #ff0000 0%,
    #ff8000 14%,
    #ffff00 28%,
    #00ff00 42%,
    #00ffff 56%,
    #0000ff 70%,
    #8000ff 84%,
    #ff0080 100%
  );
  background-size: 200% 200%;
  animation: holographic 3s ease infinite;
  -webkit-background-clip: text;
  background-clip: text;
}
```

**Step 2: Commit**

```bash
git add src/index.css
git commit -m "feat: add neon color system and cyberpunk CSS effects"
```

---

### Task 3: Create Neon Section Title Component

**Files:**
- Create: `src/components/ui/NeonTitle.jsx`
- Modify: `src/components/ui/index.js`

**Step 1: Create NeonTitle with flicker and glow**

```jsx
// src/components/ui/NeonTitle.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

export default function NeonTitle({ children, className = '' }) {
  const { isModernView } = useViewMode();
  const [flickerDone, setFlickerDone] = useState(false);

  useEffect(() => {
    if (isModernView) {
      const timer = setTimeout(() => setFlickerDone(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isModernView]);

  if (!isModernView) {
    return (
      <h2 className={`text-center text-2xl font-bold mb-8 ${className}`}>
        {children}
      </h2>
    );
  }

  return (
    <motion.h2
      className={`text-center text-3xl font-bold mb-12 ${flickerDone ? 'neon-pulse' : 'neon-flicker'} ${className}`}
      style={{ color: 'var(--neon-cyan)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
      {/* Reflection */}
      <span
        className="block text-lg opacity-30 mt-1 scale-y-[-1] blur-[1px]"
        style={{
          background: 'linear-gradient(to bottom, var(--neon-cyan), transparent)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent'
        }}
      >
        {children}
      </span>
    </motion.h2>
  );
}
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as NeonTitle } from './NeonTitle';
```

**Step 3: Commit**

```bash
git add src/components/ui/NeonTitle.jsx src/components/ui/index.js
git commit -m "feat: add neon title with flicker and reflection effects"
```

---

## Phase 2: Text Scramble & Cursor Trails

### Task 4: Create Text Scramble Component

**Files:**
- Create: `src/components/ui/TextScramble.jsx`
- Modify: `src/components/ui/index.js`

**Step 1: Create TextScramble effect**

```jsx
// src/components/ui/TextScramble.jsx
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

const chars = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({ children, className = '', delay = 0 }) {
  const { isModernView } = useViewMode();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const targetText = typeof children === 'string' ? children : '';

  useEffect(() => {
    if (!isModernView || !isInView || !targetText) {
      setDisplayText(targetText);
      setIsComplete(true);
      return;
    }

    let iteration = 0;
    const totalIterations = targetText.length * 3;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          targetText
            .split('')
            .map((char, index) => {
              if (index < iteration / 3) {
                return char;
              }
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        iteration++;

        if (iteration >= totalIterations) {
          clearInterval(interval);
          setDisplayText(targetText);
          setIsComplete(true);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, isModernView, targetText, delay]);

  if (!isModernView) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={`font-mono ${className}`}
      style={{
        color: isComplete ? 'inherit' : 'var(--neon-green)',
        textShadow: isComplete ? 'none' : '0 0 10px var(--neon-green)'
      }}
    >
      {displayText || children}
    </motion.span>
  );
}
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as TextScramble } from './TextScramble';
```

**Step 3: Commit**

```bash
git add src/components/ui/TextScramble.jsx src/components/ui/index.js
git commit -m "feat: add matrix-style text scramble reveal effect"
```

---

### Task 5: Create Cursor Trail Component

**Files:**
- Create: `src/components/ui/CursorTrail.jsx`
- Modify: `src/components/ui/index.js`

**Step 1: Create sparkle cursor trail**

```jsx
// src/components/ui/CursorTrail.jsx
import { useEffect, useRef, useState } from 'react';
import useViewMode from '../../hooks/useViewMode';

export default function CursorTrail() {
  const { isModernView } = useViewMode();
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isModernView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Add new particles
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2 - 1,
          life: 1,
          color: ['#00f2fe', '#ff00ff', '#39ff14'][Math.floor(Math.random() * 3)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.02;
        p.size *= 0.98;

        if (p.life <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isModernView]);

  if (!isModernView) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as CursorTrail } from './CursorTrail';
```

**Step 3: Commit**

```bash
git add src/components/ui/CursorTrail.jsx src/components/ui/index.js
git commit -m "feat: add sparkle cursor trail effect"
```

---

### Task 6: Integrate Aurora, Trails into App

**Files:**
- Modify: `src/App.jsx`

**Step 1: Replace ParticleBackground with AuroraBackground, add CursorTrail**

```jsx
import { useState } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { ViewModeProvider } from './hooks/useViewMode';
import { Header, Footer } from './components/layout';
import { Home, About, Experience, Education, Skills, Contact } from './components/sections';
import { CustomCursor, LoadingScreen, EasterEgg, AuroraBackground, FloatingActions, CursorTrail } from './components/ui';
import useViewMode from './hooks/useViewMode';

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isModernView } = useViewMode();

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <EasterEgg />
      {isModernView && <AuroraBackground />}
      {isModernView && <CursorTrail />}
      <CustomCursor />
      <Header />
      <main className={`mt-12 md:mt-16 ${isModernView ? 'text-white' : ''}`}>
        <Home />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ViewModeProvider>
        <AppContent />
      </ViewModeProvider>
    </ThemeProvider>
  );
}
```

**Step 2: Verify it works**

Run: `npm run dev`
Expected: Modern view shows aurora background with flowing ribbons and sparkle cursor trail

**Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: integrate aurora background and cursor trail"
```

---

## Phase 3: Holographic Cards & Electric Arcs

### Task 7: Create Holographic Card Component

**Files:**
- Create: `src/components/ui/HolographicCard.jsx`
- Modify: `src/components/ui/index.js`

**Step 1: Create 3D tilt holographic card**

```jsx
// src/components/ui/HolographicCard.jsx
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

export default function HolographicCard({ children, className = '' }) {
  const { isModernView } = useViewMode();
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isModernView) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);

    // Glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  if (!isModernView) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Holographic rainbow border */}
      <div
        className="absolute inset-0 rounded-xl opacity-50"
        style={{
          background: `linear-gradient(
            ${45 + rotateY * 5}deg,
            #ff0000 0%,
            #ff8000 14%,
            #ffff00 28%,
            #00ff00 42%,
            #00ffff 56%,
            #0000ff 70%,
            #8000ff 84%,
            #ff0080 100%
          )`,
          padding: '2px',
        }}
      />

      {/* Card content */}
      <div
        className="relative rounded-xl p-6 h-full"
        style={{
          background: 'rgba(10, 10, 20, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {children}

        {/* Glare effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: `radial-gradient(
              circle at ${glarePosition.x}% ${glarePosition.y}%,
              rgba(255,255,255,0.15) 0%,
              transparent 50%
            )`,
          }}
        />

        {/* Interference lines */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden opacity-10"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,242,254,0.5) 2px,
              rgba(0,242,254,0.5) 4px
            )`,
            animation: 'interference 2s linear infinite',
          }}
        />
      </div>
    </motion.div>
  );
}
```

**Step 2: Add interference animation to CSS**

Add to `src/index.css`:
```css
@keyframes interference {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}
```

**Step 3: Export and commit**

```bash
git add src/components/ui/HolographicCard.jsx src/components/ui/index.js src/index.css
git commit -m "feat: add holographic card with 3D tilt and rainbow shimmer"
```

---

### Task 8: Create Electric Arc Timeline

**Files:**
- Create: `src/components/ui/ElectricArc.jsx`
- Modify: `src/components/ui/index.js`

**Step 1: Create animated lightning arc**

```jsx
// src/components/ui/ElectricArc.jsx
import { useEffect, useRef } from 'react';
import useViewMode from '../../hooks/useViewMode';

export default function ElectricArc({ height = 100, className = '' }) {
  const { isModernView } = useViewMode();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isModernView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const drawLightning = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const segments = 15;
      const segmentHeight = canvas.height / segments;

      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);

      for (let i = 1; i <= segments; i++) {
        const x = canvas.width / 2 + (Math.random() - 0.5) * 20;
        const y = i * segmentHeight;
        ctx.lineTo(x, y);
      }

      // Main bolt
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00f2fe';
      ctx.stroke();

      // Glow
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Occasional bright flash
      if (Math.random() > 0.95) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(drawLightning);
    };

    // Throttle to 30fps for performance
    const interval = setInterval(() => {
      drawLightning();
    }, 50);

    return () => {
      clearInterval(interval);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isModernView]);

  if (!isModernView) {
    return (
      <div
        className={`w-0.5 bg-gray-200 dark:bg-gray-700 ${className}`}
        style={{ height }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={40}
      height={height}
      className={className}
      style={{ width: '40px', height }}
    />
  );
}
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as ElectricArc } from './ElectricArc';
```

**Step 3: Commit**

```bash
git add src/components/ui/ElectricArc.jsx src/components/ui/index.js
git commit -m "feat: add electric arc lightning effect for timelines"
```

---

## Phase 4: Enhanced Section Integration

### Task 9: Update Experience Section with Holographic Cards

**Files:**
- Modify: `src/components/sections/Experience.jsx`

**Step 1: Wrap experience cards in HolographicCard**

Import and use HolographicCard:
```jsx
import { HolographicCard, NeonTitle, TextScramble } from '../ui';
import useViewMode from '../../hooks/useViewMode';

// In ExperienceCard component:
const { isModernView } = useViewMode();

// Wrap the card content:
return (
  <motion.div ...>
    <HolographicCard className="...">
      {/* existing card content */}
    </HolographicCard>
  </motion.div>
);
```

**Step 2: Replace SectionTitle with NeonTitle in modern view**

```jsx
{isModernView ? (
  <NeonTitle>Experience</NeonTitle>
) : (
  <SectionTitle>Experience</SectionTitle>
)}
```

**Step 3: Commit**

```bash
git add src/components/sections/Experience.jsx
git commit -m "feat: add holographic cards and neon titles to Experience"
```

---

### Task 10: Update Education Section with Effects

**Files:**
- Modify: `src/components/sections/Education.jsx`

**Step 1: Add holographic cards and neon title**

Same pattern as Experience - import and use HolographicCard, NeonTitle, TextScramble.

**Step 2: Commit**

```bash
git add src/components/sections/Education.jsx
git commit -m "feat: add holographic cards and neon titles to Education"
```

---

### Task 11: Update Skills with Floating Orb Effect

**Files:**
- Modify: `src/components/ui/SkillBar.jsx`

**Step 1: Create skill orb for modern view**

When isModernView, render skill as a glowing orb instead of a bar:

```jsx
if (isModernView) {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.1 }}
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
```

**Step 2: Commit**

```bash
git add src/components/ui/SkillBar.jsx
git commit -m "feat: add glowing orb skill visualization for modern view"
```

---

### Task 12: Update Home Section with Text Scramble

**Files:**
- Modify: `src/components/sections/Home.jsx`

**Step 1: Wrap name in TextScramble**

```jsx
import { TextScramble } from '../ui';

// In the h1:
I'm <TextScramble className={isModernView ? 'neon-text' : 'text-primary'}>
  Abhigyan
</TextScramble>
```

**Step 2: Commit**

```bash
git add src/components/sections/Home.jsx
git commit -m "feat: add text scramble effect to home hero"
```

---

## Phase 5: Command Palette & Final Polish

### Task 13: Create Command Palette (Cmd+K)

**Files:**
- Create: `src/components/ui/CommandPalette.jsx`
- Modify: `src/components/ui/index.js`
- Modify: `src/App.jsx`

**Step 1: Create CommandPalette component**

```jsx
// src/components/ui/CommandPalette.jsx
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';
import { useTheme } from '../../hooks/useTheme';

const commands = [
  { id: 'home', label: 'Go to Home', icon: 'bx-home', action: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'about', label: 'Go to About', icon: 'bx-user', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'experience', label: 'Go to Experience', icon: 'bx-briefcase', action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'education', label: 'Go to Education', icon: 'bx-book', action: () => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'skills', label: 'Go to Skills', icon: 'bx-code-alt', action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'contact', label: 'Go to Contact', icon: 'bx-envelope', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'theme', label: 'Toggle Theme', icon: 'bx-moon', action: null }, // handled specially
  { id: 'view', label: 'Toggle View Mode', icon: 'bx-cube-alt', action: null }, // handled specially
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
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
                <span>esc to close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

**Step 2: Export and add to App**

Add to index.js and App.jsx.

**Step 3: Commit**

```bash
git add src/components/ui/CommandPalette.jsx src/components/ui/index.js src/App.jsx
git commit -m "feat: add command palette with Cmd+K shortcut"
```

---

### Task 14: Add Scanline Overlay

**Files:**
- Create: `src/components/ui/Scanlines.jsx`
- Modify: `src/App.jsx`

**Step 1: Create subtle CRT scanline overlay**

```jsx
// src/components/ui/Scanlines.jsx
import useViewMode from '../../hooks/useViewMode';

export default function Scanlines() {
  const { isModernView } = useViewMode();

  if (!isModernView) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.03) 2px,
          rgba(0, 0, 0, 0.03) 4px
        )`,
      }}
    />
  );
}
```

**Step 2: Export and add to App**

**Step 3: Commit**

```bash
git add src/components/ui/Scanlines.jsx src/components/ui/index.js src/App.jsx
git commit -m "feat: add CRT scanline overlay effect"
```

---

## Summary

After completing all 14 tasks, the Modern View will have:

### Visual Effects
- ✅ Aurora background with flowing neon ribbons
- ✅ Sparkle cursor trail
- ✅ Neon glow section titles with flicker
- ✅ Text scramble reveal effect
- ✅ Holographic cards with 3D tilt and rainbow shimmer
- ✅ Electric arc timeline connections
- ✅ Glowing skill orbs
- ✅ CRT scanlines overlay

### Interactions
- ✅ Command palette (Cmd+K)
- ✅ 3D card tilt following mouse
- ✅ Neon hover effects throughout

### Polish
- ✅ Neon color system with CSS variables
- ✅ Chromatic aberration effects
- ✅ Noise texture for depth
- ✅ Grid overlay

**The difference will be dramatic:**
- Classic = Clean professional portfolio
- Modern = Cyberpunk/Blade Runner experience

**Total tasks:** 14
**Estimated time:** 2-3 hours
