# Modern View - High Impact Features Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create an alternate "Modern View" of the portfolio with cutting-edge features: Interactive 3D hero, particle background, and enhanced versions of Experience, Education, and Skills sections.

**Architecture:** Implement a view toggle system that switches between Classic View (current) and Modern View. Modern View will use React Three Fiber for 3D, tsParticles for particle effects, and enhanced animations for existing sections. The toggle persists in localStorage and is accessible from the header.

**Tech Stack:**
- `@react-three/fiber` + `@react-three/drei` - 3D graphics
- `@tsparticles/react` + `@tsparticles/slim` - Particle effects
- `framer-motion` - Animations (already installed)

---

## Phase 1: Foundation - View Toggle System

### Task 1: Install Required Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install 3D and particle libraries**

Run:
```bash
npm install @react-three/fiber @react-three/drei three @tsparticles/react @tsparticles/slim
```

Expected: Packages install successfully

**Step 2: Verify installation**

Run: `npm run build`
Expected: Build succeeds with new dependencies

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add 3D and particle effect dependencies"
```

---

### Task 2: Create View Mode Context

**Files:**
- Create: `src/hooks/useViewMode.jsx`

**Step 1: Create the view mode hook and provider**

```jsx
// src/hooks/useViewMode.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ViewModeContext = createContext();

export function ViewModeProvider({ children }) {
  const [isModernView, setIsModernView] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-view-mode');
      return saved === 'modern';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('portfolio-view-mode', isModernView ? 'modern' : 'classic');
  }, [isModernView]);

  const toggleView = () => setIsModernView((prev) => !prev);

  return (
    <ViewModeContext.Provider value={{ isModernView, toggleView }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export default function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used within ViewModeProvider');
  }
  return context;
}
```

**Step 2: Verify file created**

Run: `cat src/hooks/useViewMode.jsx`
Expected: File contents displayed

**Step 3: Commit**

```bash
git add src/hooks/useViewMode.jsx
git commit -m "feat: add view mode context for classic/modern toggle"
```

---

### Task 3: Create View Toggle Button Component

**Files:**
- Create: `src/components/ui/ViewToggle.jsx`
- Modify: `src/components/ui/index.js`

**Step 1: Create ViewToggle component**

```jsx
// src/components/ui/ViewToggle.jsx
import { motion } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

export default function ViewToggle() {
  const { isModernView, toggleView } = useViewMode();

  return (
    <motion.button
      onClick={toggleView}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isModernView ? 'Switch to Classic View' : 'Switch to Modern View'}
    >
      {/* Icon */}
      <motion.span
        animate={{ rotate: isModernView ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isModernView ? (
          <i className="bx bx-cube-alt text-lg text-primary"></i>
        ) : (
          <i className="bx bx-layout text-lg text-gray-500 dark:text-gray-400"></i>
        )}
      </motion.span>

      {/* Label */}
      <span className="hidden sm:inline text-gray-700 dark:text-gray-300">
        {isModernView ? 'Modern' : 'Classic'}
      </span>

      {/* Glow effect for modern mode */}
      {isModernView && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        />
      )}
    </motion.button>
  );
}
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as ViewToggle } from './ViewToggle';
```

**Step 3: Commit**

```bash
git add src/components/ui/ViewToggle.jsx src/components/ui/index.js
git commit -m "feat: add view toggle button component"
```

---

### Task 4: Integrate View Mode into App and Header

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/layout/Header.jsx`

**Step 1: Wrap App with ViewModeProvider**

Update `src/App.jsx`:

```jsx
import { useState } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { ViewModeProvider } from './hooks/useViewMode';
import useViewMode from './hooks/useViewMode';
import { Header, Footer } from './components/layout';
import { Home, About, Experience, Education, Skills, Contact } from './components/sections';
import { CustomCursor, LoadingScreen, EasterEgg } from './components/ui';

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <EasterEgg />
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

**Step 2: Add ViewToggle to Header**

Update `src/components/layout/Header.jsx`:

```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle, ViewToggle, ScrollProgress } from '../ui';

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
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8">
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
            <div className="flex items-center gap-3">
              <ViewToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: View Toggle + Theme Toggle + Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <ViewToggle />
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
```

**Step 3: Verify it works**

Run: `npm run dev`
Expected: View toggle button appears in header, clicking it toggles between Classic/Modern

**Step 4: Commit**

```bash
git add src/App.jsx src/components/layout/Header.jsx
git commit -m "feat: integrate view mode toggle into header"
```

---

## Phase 2: Particle Background

### Task 5: Create Particle Background Component

**Files:**
- Create: `src/components/ui/ParticleBackground.jsx`
- Modify: `src/components/ui/index.js`
- Modify: `src/App.jsx`

**Step 1: Create ParticleBackground component**

```jsx
// src/components/ui/ParticleBackground.jsx
import { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => ({
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          width: 800,
          height: 800,
        },
      },
      color: {
        value: '#4070F4',
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: { min: 0.1, max: 0.4 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 3 },
      },
      links: {
        enable: true,
        distance: 150,
        color: '#4070F4',
        opacity: 0.15,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'bounce',
        },
      },
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: {
          enable: true,
          mode: 'grab',
        },
        onClick: {
          enable: true,
          mode: 'push',
        },
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.4,
            color: '#4070F4',
          },
        },
        push: {
          quantity: 3,
        },
      },
    },
    detectRetina: true,
  }), []);

  return (
    <Particles
      id="tsparticles"
      options={options}
      init={particlesInit}
    />
  );
}
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as ParticleBackground } from './ParticleBackground';
```

**Step 3: Add to App.jsx conditionally**

Update `src/App.jsx` AppContent function:

```jsx
import { CustomCursor, LoadingScreen, EasterEgg, ParticleBackground } from './components/ui';
import useViewMode from './hooks/useViewMode';

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isModernView } = useViewMode();

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <EasterEgg />
      {isModernView && <ParticleBackground />}
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
    </>
  );
}
```

**Step 4: Verify it works**

Run: `npm run dev`
Expected: Clicking Modern View toggle shows animated particle background

**Step 5: Commit**

```bash
git add src/components/ui/ParticleBackground.jsx src/components/ui/index.js src/App.jsx
git commit -m "feat: add particle background for modern view"
```

---

## Phase 3: Interactive 3D Hero

### Task 6: Create 3D Hero Component

**Files:**
- Create: `src/components/3d/Hero3D.jsx`
- Create: `src/components/3d/index.js`

**Step 1: Create Hero3D component with floating shapes**

```jsx
// src/components/3d/Hero3D.jsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, OrbitControls } from '@react-three/drei';

function FloatingShape({ position, color, shape = 'sphere', speed = 1, scale = 0.5 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  const Shape = shape === 'box' ? Box : shape === 'torus' ? Torus : Sphere;
  const args = shape === 'box' ? [1, 1, 1] : shape === 'torus' ? [0.8, 0.3, 16, 32] : [1, 32, 32];

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Shape ref={meshRef} position={position} args={args} scale={scale}>
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          radius={1}
          transparent
          opacity={0.8}
        />
      </Shape>
    </Float>
  );
}

function FloatingElements() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary sphere - represents core */}
      <FloatingShape position={[0, 0, 0]} color="#4070F4" shape="sphere" speed={0.5} scale={0.8} />

      {/* Orbiting elements */}
      <FloatingShape position={[2, 1, -1]} color="#71B9EA" shape="box" speed={1.2} scale={0.4} />
      <FloatingShape position={[-2, -0.5, 0.5]} color="#EA9D7D" shape="torus" speed={0.8} scale={0.5} />
      <FloatingShape position={[1, -1.5, 1]} color="#4070F4" shape="box" speed={1} scale={0.3} />
      <FloatingShape position={[-1.5, 1.5, -0.5]} color="#333333" shape="sphere" speed={0.6} scale={0.35} />
    </group>
  );
}

export default function Hero3D({ className = '' }) {
  return (
    <div className={`w-full h-full min-h-[300px] md:min-h-[400px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4070F4" />

        <FloatingElements />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
```

**Step 2: Create index export**

```js
// src/components/3d/index.js
export { default as Hero3D } from './Hero3D';
```

**Step 3: Commit**

```bash
git add src/components/3d/Hero3D.jsx src/components/3d/index.js
git commit -m "feat: add interactive 3D hero component"
```

---

### Task 7: Integrate 3D Hero with Home Section

**Files:**
- Modify: `src/components/sections/Home.jsx`

**Step 1: Conditionally render 3D or SVG hero**

Update `src/components/sections/Home.jsx`:

```jsx
import { useRef, useState, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, SocialLinks, Typewriter, TerminalIntro, SpotifyWidget } from '../ui';
import HeroIllustration from '../svg/HeroIllustration';
import useIsMobile from '../../hooks/useIsMobile';
import useViewMode from '../../hooks/useViewMode';

// Lazy load 3D component for performance
const Hero3D = lazy(() => import('../3d/Hero3D').then(m => ({ default: m.default })));

const socialLinks = [
  { icon: 'bxl-linkedin', url: 'https://www.linkedin.com/in/abhigyann/', label: 'LinkedIn' },
  { icon: 'bxl-instagram', url: 'https://www.instagram.com/abhigyann22', label: 'Instagram' },
  { icon: 'bxl-github', url: 'https://github.com/BemusedCat', label: 'GitHub' },
];

function Hero3DFallback() {
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  const [terminalComplete, setTerminalComplete] = useState(false);
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const { isModernView } = useViewMode();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? -20 : -50]
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-[calc(100vh-3rem)] md:min-h-screen grid md:grid-cols-2 gap-4 items-center pt-12 md:pt-0 bd-container"
    >
      <div className="order-2 md:order-1">
        <TerminalIntro onComplete={() => setTerminalComplete(true)} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: terminalComplete ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl md:text-6xl font-bold mb-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi,<br />
            I'm <span className={isModernView ? 'gradient-text' : 'text-primary'}>Abhigyan</span><br />
            <Typewriter
              words={['Freelancer', 'Software Engineer', 'Web Developer']}
              period={2000}
            />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button href="#contact">Contact</Button>
          </motion.div>

          <div className="mt-8 md:mt-0 md:pt-8">
            <SocialLinks
              links={socialLinks}
              size="lg"
              direction="horizontal"
              className="md:flex-row"
            />
          </div>

          <div className="mt-6">
            <SpotifyWidget />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="order-1 md:order-2 flex justify-center items-center will-change-transform"
        style={{ y: parallaxY }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {isModernView ? (
          <Suspense fallback={<Hero3DFallback />}>
            <Hero3D className="w-full max-w-md md:max-w-lg" />
          </Suspense>
        ) : (
          <HeroIllustration className="w-full max-w-md md:max-w-lg" />
        )}
      </motion.div>
    </section>
  );
}
```

**Step 2: Verify it works**

Run: `npm run dev`
Expected: Modern view shows 3D floating shapes, Classic view shows SVG

**Step 3: Commit**

```bash
git add src/components/sections/Home.jsx
git commit -m "feat: show 3D hero in modern view mode"
```

---

## Phase 4: Enhanced Sections for Modern View

### Task 8: Add Glassmorphism and Gradient Text CSS

**Files:**
- Modify: `src/index.css`

**Step 1: Add modern view CSS utilities**

Add to `src/index.css`:

```css
/* Animated gradient text */
.gradient-text {
  background: linear-gradient(
    90deg,
    #4070F4 0%,
    #71B9EA 25%,
    #EA9D7D 50%,
    #71B9EA 75%,
    #4070F4 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% center; }
  50% { background-position: 100% center; }
  100% { background-position: 0% center; }
}

/* Glassmorphism effect for modern view */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Glowing border animation */
.glow-border {
  position: relative;
}

.glow-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #4070F4, #71B9EA, #EA9D7D, #4070F4);
  background-size: 400% 400%;
  border-radius: inherit;
  z-index: -1;
  animation: glow-rotate 3s ease infinite;
  opacity: 0.7;
}

@keyframes glow-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Step 2: Commit**

```bash
git add src/index.css
git commit -m "feat: add glassmorphism and gradient text CSS for modern view"
```

---

### Task 9: Enhance Experience Section for Modern View

**Files:**
- Modify: `src/components/sections/Experience.jsx`

**Step 1: Add glassmorphism cards and enhanced animations in modern view**

Add import at top:
```jsx
import useViewMode from '../../hooks/useViewMode';
```

Update ExperienceCard to use glass effect:

```jsx
function ExperienceCard({ exp, scrollYProgress, isLast }) {
  const { isModernView } = useViewMode();
  const threshold = exp.threshold;

  // ... existing transforms ...

  return (
    <motion.div
      className={`relative pl-12 ${!isLast ? 'pb-10' : ''}`}
      style={{ opacity, x, scale }}
    >
      {/* Timeline dot with glow */}
      <motion.div
        className={`absolute left-0 w-8 h-8 rounded-full ${exp.color} flex items-center justify-center text-white text-base z-10 ${isModernView ? 'glow-border' : ''}`}
        style={{ boxShadow: dotGlow }}
      >
        <i className={`bx ${exp.icon}`}></i>
      </motion.div>

      {/* Card with optional glass effect */}
      <div className={`${isModernView ? 'glass rounded-xl p-4' : ''}`}>
        {/* Company header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold dark:text-white">{exp.company}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{exp.type}</p>
        </div>

        {/* Roles with nested timeline */}
        <RolesTimeline
          roles={exp.roles}
          scrollYProgress={scrollYProgress}
          baseThreshold={threshold}
          skills={exp.skills}
        />
      </div>
    </motion.div>
  );
}
```

**Step 2: Verify it works**

Run: `npm run dev`
Expected: Experience cards have glassmorphism effect and glowing borders in modern view

**Step 3: Commit**

```bash
git add src/components/sections/Experience.jsx
git commit -m "feat: add glassmorphism to Experience section in modern view"
```

---

### Task 10: Enhance Education Section for Modern View

**Files:**
- Modify: `src/components/sections/Education.jsx`

**Step 1: Add glass effect and enhanced animations**

Add import at top:
```jsx
import useViewMode from '../../hooks/useViewMode';
```

Update EducationCard to use glass effect:

```jsx
function EducationCard({ edu, index, scrollYProgress }) {
  const { isModernView } = useViewMode();
  // ... existing code ...

  return (
    <motion.div
      className="relative"
      style={{
        y,
        opacity,
        rotateX,
        scale,
        transformPerspective: 1000,
        transformOrigin: 'bottom center',
      }}
    >
      <div className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
        isModernView
          ? 'glass glow-border'
          : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
      }`}>
        {/* ... rest of card content ... */}
      </div>
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Education.jsx
git commit -m "feat: add glassmorphism to Education section in modern view"
```

---

### Task 11: Enhance Skills Section for Modern View

**Files:**
- Modify: `src/components/ui/SkillBar.jsx`

**Step 1: Add enhanced skill bar animation for modern view**

Update `src/components/ui/SkillBar.jsx`:

```jsx
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

export default function SkillBar({ name, icon, percentage }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { isModernView } = useViewMode();

  return (
    <div ref={ref} className={`mb-6 ${isModernView ? 'glass rounded-lg p-4' : ''}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <i className={`bx ${icon} text-primary text-xl`}></i>
          <span className="font-medium dark:text-white">{name}</span>
        </div>
        <motion.span
          className="text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {percentage}%
        </motion.span>
      </div>

      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isModernView ? 'bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%]' : 'bg-primary'}`}
          initial={{ width: 0 }}
          animate={isInView ? {
            width: `${percentage}%`,
            backgroundPosition: isModernView ? ['0% 0%', '100% 0%', '0% 0%'] : undefined
          } : {}}
          transition={{
            width: { duration: 1, ease: 'easeOut' },
            backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
          }}
        />
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/SkillBar.jsx
git commit -m "feat: add animated gradient skill bars for modern view"
```

---

### Task 12: Add Floating Action Button

**Files:**
- Create: `src/components/ui/FloatingActions.jsx`
- Modify: `src/components/ui/index.js`
- Modify: `src/App.jsx`

**Step 1: Create FloatingActions component**

```jsx
// src/components/ui/FloatingActions.jsx
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
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as FloatingActions } from './FloatingActions';
```

**Step 3: Add to App.jsx**

Update imports and add to AppContent:
```jsx
import { CustomCursor, LoadingScreen, EasterEgg, ParticleBackground, FloatingActions } from './components/ui';

// In AppContent, add before closing fragment:
<FloatingActions />
```

**Step 4: Commit**

```bash
git add src/components/ui/FloatingActions.jsx src/components/ui/index.js src/App.jsx
git commit -m "feat: add floating action button for modern view"
```

---

## Summary

After completing all tasks, the portfolio will have:

### Classic View (Default)
- Original SVG illustration
- Clean, minimal design
- All existing animations

### Modern View (Toggle)
- Interactive particle background with hover effects
- 3D floating shapes hero (drag to rotate)
- Animated gradient text for name
- Glassmorphism cards on Experience & Education
- Glowing animated borders
- Gradient-animated skill bars
- Floating action button for quick links

**New Dependencies:**
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for R3F
- `three` - 3D library
- `@tsparticles/react` - Particle effects
- `@tsparticles/slim` - Lightweight particle engine

**Total tasks:** 12
**Estimated time:** 1.5-2 hours
