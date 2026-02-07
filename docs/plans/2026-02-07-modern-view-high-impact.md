# Modern View - High Impact Features Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create an alternate "Modern View" of the portfolio with cutting-edge features: Interactive 3D hero, particle background, projects showcase, and additional wow-factor elements that make this the most advanced portfolio ever.

**Architecture:** Implement a view toggle system that switches between Classic View (current) and Modern View. Modern View will use React Three Fiber for 3D, tsParticles for particle effects, and a custom projects gallery. The toggle persists in localStorage and is accessible from the header.

**Tech Stack:**
- `@react-three/fiber` + `@react-three/drei` - 3D graphics
- `@tsparticles/react` + `@tsparticles/slim` - Particle effects
- `framer-motion` - Animations (already installed)
- React Router (optional) or state-based view switching

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

### Task 4: Integrate View Mode into App

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/layout/Header.jsx`

**Step 1: Wrap App with ViewModeProvider**

Update `src/App.jsx`:

```jsx
import { useState } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { ViewModeProvider } from './hooks/useViewMode';
import { Header, Footer } from './components/layout';
import { Home, About, Experience, Education, Skills, Contact } from './components/sections';
import { CustomCursor, LoadingScreen, EasterEgg } from './components/ui';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ThemeProvider>
      <ViewModeProvider>
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
      </ViewModeProvider>
    </ThemeProvider>
  );
}
```

**Step 2: Add ViewToggle to Header**

Update `src/components/layout/Header.jsx` to include ViewToggle next to ThemeToggle:

```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle, ViewToggle, ScrollProgress } from '../ui';

// ... existing navLinks ...

export default function Header() {
  // ... existing state ...

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
              {/* ... existing nav links ... */}
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

          {/* Mobile Navigation - unchanged */}
          {/* ... */}
        </nav>
      </header>
    </>
  );
}
```

**Step 3: Verify it works**

Run: `npm run dev`
Expected: View toggle button appears in header, clicking it toggles between Classic/Modern (visual only for now)

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
        value: 80,
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
        value: { min: 0.1, max: 0.5 },
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
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
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
          distance: 200,
          links: {
            opacity: 0.5,
            color: '#4070F4',
          },
        },
        push: {
          quantity: 4,
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

**Step 3: Commit**

```bash
git add src/components/ui/ParticleBackground.jsx src/components/ui/index.js
git commit -m "feat: add particle background component"
```

---

### Task 6: Integrate Particles with View Mode

**Files:**
- Modify: `src/App.jsx`

**Step 1: Add conditional particle background**

Update `src/App.jsx`:

```jsx
import { useState } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { ViewModeProvider } from './hooks/useViewMode';
import useViewMode from './hooks/useViewMode';
import { Header, Footer } from './components/layout';
import { Home, About, Experience, Education, Skills, Contact } from './components/sections';
import { CustomCursor, LoadingScreen, EasterEgg, ParticleBackground } from './components/ui';

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
Expected: Clicking Modern View toggle shows animated particle background

**Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: show particle background in modern view mode"
```

---

## Phase 3: Interactive 3D Hero

### Task 7: Create 3D Hero Component

**Files:**
- Create: `src/components/3d/Hero3D.jsx`
- Create: `src/components/3d/index.js`

**Step 1: Create Hero3D component with floating shapes**

```jsx
// src/components/3d/Hero3D.jsx
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, shape = 'sphere', speed = 1 }) {
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
      <Shape ref={meshRef} position={position} args={args} scale={0.5}>
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

function FloatingCode() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary sphere - represents core skills */}
      <FloatingShape position={[0, 0, 0]} color="#4070F4" shape="sphere" speed={0.5} />

      {/* Orbiting elements */}
      <FloatingShape position={[2, 1, -1]} color="#71B9EA" shape="box" speed={1.2} />
      <FloatingShape position={[-2, -0.5, 0.5]} color="#EA9D7D" shape="torus" speed={0.8} />
      <FloatingShape position={[1, -1.5, 1]} color="#4070F4" shape="box" speed={1} />
      <FloatingShape position={[-1.5, 1.5, -0.5]} color="#333333" shape="sphere" speed={0.6} />
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

        <FloatingCode />

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

```jsx
// src/components/3d/index.js
export { default as Hero3D } from './Hero3D';
```

**Step 3: Commit**

```bash
git add src/components/3d/Hero3D.jsx src/components/3d/index.js
git commit -m "feat: add interactive 3D hero component"
```

---

### Task 8: Integrate 3D Hero with View Mode

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
        {/* Terminal intro - shows before main content */}
        <TerminalIntro onComplete={() => setTerminalComplete(true)} />

        {/* Main content - appears after terminal */}
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
            I'm <span className="text-primary">Abhigyan</span><br />
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
Expected: Modern view shows interactive 3D shapes, Classic view shows SVG illustration

**Step 3: Commit**

```bash
git add src/components/sections/Home.jsx
git commit -m "feat: show 3D hero in modern view mode"
```

---

## Phase 4: Projects Showcase

### Task 9: Create Project Card Component

**Files:**
- Create: `src/components/ui/ProjectCard.jsx`
- Modify: `src/components/ui/index.js`

**Step 1: Create ProjectCard component**

```jsx
// src/components/ui/ProjectCard.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project image/preview */}
      <div className="relative aspect-video overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/80 to-blue-600/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Placeholder gradient - replace with actual screenshots */}
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`,
          }}
        />

        {/* Hover overlay with links */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary text-xl shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <i className="bx bx-link-external"></i>
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-800 text-xl shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <i className="bxl-github"></i>
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project info */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 dark:text-white">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{project.description}</p>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
```

**Step 2: Export from ui/index.js**

Add to `src/components/ui/index.js`:
```js
export { default as ProjectCard } from './ProjectCard';
```

**Step 3: Commit**

```bash
git add src/components/ui/ProjectCard.jsx src/components/ui/index.js
git commit -m "feat: add project card component with hover effects"
```

---

### Task 10: Create Projects Section

**Files:**
- Create: `src/components/sections/Projects.jsx`
- Modify: `src/components/sections/index.js`

**Step 1: Create Projects section**

```jsx
// src/components/sections/Projects.jsx
import { motion } from 'framer-motion';
import { SectionTitle, ProjectCard } from '../ui';
import useViewMode from '../../hooks/useViewMode';

const projects = [
  {
    title: 'AI-Powered Code Review',
    description: 'Automated code review tool using LLMs to provide intelligent suggestions and catch bugs before they reach production.',
    tech: ['React', 'Node.js', 'OpenAI', 'GitHub API'],
    gradientFrom: '#4070F4',
    gradientTo: '#71B9EA',
    liveUrl: '#',
    githubUrl: 'https://github.com/BemusedCat',
  },
  {
    title: 'Real-time Analytics Dashboard',
    description: 'High-performance dashboard for visualizing millions of data points with WebSocket-based live updates.',
    tech: ['React', 'D3.js', 'WebSocket', 'Redis'],
    gradientFrom: '#EA9D7D',
    gradientTo: '#F4B9A6',
    liveUrl: '#',
    githubUrl: 'https://github.com/BemusedCat',
  },
  {
    title: 'Cloud Infrastructure Manager',
    description: 'Multi-cloud management platform for provisioning and monitoring infrastructure across AWS, GCP, and Azure.',
    tech: ['Go', 'Terraform', 'Kubernetes', 'gRPC'],
    gradientFrom: '#333333',
    gradientTo: '#595959',
    liveUrl: '#',
    githubUrl: 'https://github.com/BemusedCat',
  },
  {
    title: 'DevOps Pipeline Orchestrator',
    description: 'CI/CD orchestration tool with intelligent test selection and parallel execution optimization.',
    tech: ['Python', 'Docker', 'Jenkins', 'MLOps'],
    gradientFrom: '#4070F4',
    gradientTo: '#333333',
    liveUrl: '#',
    githubUrl: 'https://github.com/BemusedCat',
  },
];

export default function Projects() {
  const { isModernView } = useViewMode();

  // Only show in modern view
  if (!isModernView) return null;

  return (
    <section id="projects" className="section bd-container">
      <SectionTitle>Featured Projects</SectionTitle>

      <motion.div
        className="grid md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </motion.div>

      {/* View all projects link */}
      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <a
          href="https://github.com/BemusedCat"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-primary font-semibold"
        >
          View all projects on GitHub
          <i className="bx bx-right-arrow-alt text-xl group-hover:translate-x-1 transition-transform"></i>
        </a>
      </motion.div>
    </section>
  );
}
```

**Step 2: Export from sections/index.js**

Add to `src/components/sections/index.js`:
```js
export { default as Projects } from './Projects';
```

**Step 3: Commit**

```bash
git add src/components/sections/Projects.jsx src/components/sections/index.js
git commit -m "feat: add projects showcase section"
```

---

### Task 11: Add Projects Section to App

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/layout/Header.jsx`

**Step 1: Add Projects to App**

Update `src/App.jsx`:

```jsx
import { useState } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { ViewModeProvider } from './hooks/useViewMode';
import useViewMode from './hooks/useViewMode';
import { Header, Footer } from './components/layout';
import { Home, About, Experience, Education, Skills, Projects, Contact } from './components/sections';
import { CustomCursor, LoadingScreen, EasterEgg, ParticleBackground } from './components/ui';

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
        <Projects />
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

**Step 2: Add Projects to navigation (Modern view only)**

Update Header.jsx navLinks to conditionally include Projects:

```jsx
// In Header.jsx, update navLinks based on view mode
import useViewMode from '../../hooks/useViewMode';

// Inside Header component:
const { isModernView } = useViewMode();

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  ...(isModernView ? [{ name: 'Projects', href: '#projects' }] : []),
  { name: 'Contact', href: '#contact' },
];
```

**Step 3: Verify it works**

Run: `npm run dev`
Expected: Modern view shows Projects section with animated cards, Classic view hides it

**Step 4: Commit**

```bash
git add src/App.jsx src/components/layout/Header.jsx
git commit -m "feat: integrate projects section with navigation"
```

---

## Phase 5: Additional Wow Factors

### Task 12: Add Glassmorphism Cards (Modern View)

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/sections/About.jsx`

**Step 1: Add glassmorphism utility class**

Add to `src/index.css`:

```css
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
```

**Step 2: Apply glassmorphism to About section in modern view**

Update About.jsx to use glass effect in modern view:

```jsx
import useViewMode from '../../hooks/useViewMode';

// Inside component:
const { isModernView } = useViewMode();

// Apply to card container:
<div className={`... ${isModernView ? 'glass rounded-2xl p-6' : ''}`}>
```

**Step 3: Commit**

```bash
git add src/index.css src/components/sections/About.jsx
git commit -m "feat: add glassmorphism effect for modern view"
```

---

### Task 13: Add Gradient Text Animation

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/sections/Home.jsx`

**Step 1: Add animated gradient text class**

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
```

**Step 2: Apply to name in modern view**

Update Home.jsx:

```jsx
// Replace the name span in modern view:
<span className={isModernView ? 'gradient-text' : 'text-primary'}>Abhigyan</span>
```

**Step 3: Commit**

```bash
git add src/index.css src/components/sections/Home.jsx
git commit -m "feat: add animated gradient text for modern view"
```

---

### Task 14: Add Smooth Page Transitions

**Files:**
- Create: `src/components/ui/PageTransition.jsx`
- Modify: `src/App.jsx`

**Step 1: Create PageTransition component**

```jsx
// src/components/ui/PageTransition.jsx
import { motion, AnimatePresence } from 'framer-motion';
import useViewMode from '../../hooks/useViewMode';

export default function PageTransition({ children }) {
  const { isModernView } = useViewMode();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isModernView ? 'modern' : 'classic'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Step 2: Wrap main content with PageTransition**

Update App.jsx to wrap main content.

**Step 3: Commit**

```bash
git add src/components/ui/PageTransition.jsx src/App.jsx
git commit -m "feat: add smooth transitions when switching views"
```

---

### Task 15: Add Floating Action Button for Quick Actions

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
  { icon: 'bx-download', label: 'Resume', url: '#' },
];

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const { isModernView } = useViewMode();

  // Only show in modern view
  if (!isModernView) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
      {/* Action buttons */}
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

      {/* Main toggle button */}
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

**Step 2: Export and add to App**

Add to index.js and App.jsx

**Step 3: Commit**

```bash
git add src/components/ui/FloatingActions.jsx src/components/ui/index.js src/App.jsx
git commit -m "feat: add floating action button for quick links"
```

---

## Summary

After completing all tasks, the portfolio will have:

### Classic View (Default)
- Original SVG illustration
- Clean, minimal design
- All existing features

### Modern View (Toggle)
- Interactive particle background
- 3D floating shapes hero
- Projects showcase with hover effects
- Glassmorphism cards
- Animated gradient text
- Floating action button
- Smooth view transitions

**New Dependencies:**
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for R3F
- `three` - 3D library
- `@tsparticles/react` - Particle effects
- `@tsparticles/slim` - Lightweight particle engine

**Total estimated time:** 2-3 hours
