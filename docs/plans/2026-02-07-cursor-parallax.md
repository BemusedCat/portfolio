# Custom Cursor & Parallax Effects Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a custom dot + ring cursor with hover states and parallax scrolling effects on SVG illustrations.

**Architecture:** CustomCursor component renders two fixed-position elements (dot + ring) that follow mouse position using Framer Motion. Parallax uses Framer Motion's useScroll and useTransform hooks to move illustrations opposite to scroll direction.

**Tech Stack:** React, Framer Motion (useScroll, useTransform, motion), Tailwind CSS

---

## Task 1: Create useIsTouchDevice Hook

**Files:**
- Create: `src/hooks/useIsTouchDevice.js`

**Step 1: Create the hook**

Create `src/hooks/useIsTouchDevice.js`:
```js
import { useState, useEffect } from 'react';

export default function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  return isTouch;
}
```

**Step 2: Commit**

```bash
git add src/hooks/useIsTouchDevice.js
git commit -m "feat: add useIsTouchDevice hook for device detection"
```

---

## Task 2: Create CustomCursor Component

**Files:**
- Create: `src/components/ui/CustomCursor.jsx`

**Step 1: Create the component**

Create `src/components/ui/CustomCursor.jsx`:
```jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useIsTouchDevice from '../../hooks/useIsTouchDevice';

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add hover detection for interactive elements
    const handleElementMouseEnter = () => setIsHovering(true);
    const handleElementMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"]');

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementMouseEnter);
      el.addEventListener('mouseleave', handleElementMouseLeave);
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementMouseEnter);
        el.removeEventListener('mouseleave', handleElementMouseLeave);
      });
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouch]);

  // Don't render on touch devices
  if (isTouch) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary"
        animate={{
          x: position.x - (isHovering ? 2 : 4),
          y: position.y - (isHovering ? 2 : 4),
          width: isHovering ? 4 : 8,
          height: isHovering ? 4 : 8,
          scale: isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'tween',
          duration: 0,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 border-primary mix-blend-difference"
        animate={{
          x: position.x - (isHovering ? 30 : 20),
          y: position.y - (isHovering ? 30 : 20),
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          scale: isClicking ? 0.9 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
    </>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/CustomCursor.jsx
git commit -m "feat: add CustomCursor component with dot + ring"
```

---

## Task 3: Export CustomCursor from UI Index

**Files:**
- Modify: `src/components/ui/index.js`

**Step 1: Add export**

Replace `src/components/ui/index.js`:
```js
export { default as Button } from './Button';
export { default as SectionTitle } from './SectionTitle';
export { default as SocialLinks } from './SocialLinks';
export { default as SkillBar } from './SkillBar';
export { default as Typewriter } from './Typewriter';
export { default as Input } from './Input';
export { default as ThemeToggle } from './ThemeToggle';
export { default as CustomCursor } from './CustomCursor';
```

**Step 2: Commit**

```bash
git add src/components/ui/index.js
git commit -m "feat: export CustomCursor from UI index"
```

---

## Task 4: Add CustomCursor to App

**Files:**
- Modify: `src/App.jsx`

**Step 1: Import and add CustomCursor**

Replace `src/App.jsx`:
```jsx
import { Header, Footer } from './components/layout';
import { Home, About, Skills, Contact } from './components/sections';
import { CustomCursor } from './components/ui';

export default function App() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main className="mt-12 md:mt-16">
        <Home />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

**Step 2: Hide default cursor globally**

Add to `src/index.css` in the `@layer base` section:
```css
@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply font-poppins text-secondary bg-white;
    @apply dark:bg-gray-900 dark:text-white;
  }
  /* Hide default cursor on non-touch devices */
  @media (pointer: fine) {
    * {
      cursor: none !important;
    }
  }
}
```

**Step 3: Verify cursor works**

Run:
```bash
npm run dev
```
Open browser on desktop, verify:
- Custom dot + ring follows mouse
- Ring expands on hovering links/buttons
- Both scale down on click
- Default cursor is hidden

**Step 4: Commit**

```bash
git add src/App.jsx src/index.css
git commit -m "feat: integrate CustomCursor and hide default cursor"
```

---

## Task 5: Create useIsMobile Hook

**Files:**
- Create: `src/hooks/useIsMobile.js`

**Step 1: Create the hook**

Create `src/hooks/useIsMobile.js`:
```js
import { useState, useEffect } from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}
```

**Step 2: Commit**

```bash
git add src/hooks/useIsMobile.js
git commit -m "feat: add useIsMobile hook for responsive parallax"
```

---

## Task 6: Add Parallax to Home Section

**Files:**
- Modify: `src/components/sections/Home.jsx`

**Step 1: Add scroll-based parallax to illustration**

Replace `src/components/sections/Home.jsx`:
```jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, SocialLinks, Typewriter } from '../ui';
import HeroIllustration from '../svg/HeroIllustration';
import useIsMobile from '../../hooks/useIsMobile';

const socialLinks = [
  { icon: 'bxl-linkedin', url: 'https://www.linkedin.com/in/abhigyan-pandey-b6948811a/', label: 'LinkedIn' },
  { icon: 'bxl-instagram', url: 'https://www.instagram.com/abhimaigyandega/', label: 'Instagram' },
  { icon: 'bxl-github', url: 'https://github.com/BemusedCat', label: 'GitHub' },
];

export default function Home() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

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
        <motion.h1
          className="text-3xl md:text-6xl font-bold mb-10 dark:text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi,<br />
          I'm <span className="text-primary">Abhigyan</span><br />
          <Typewriter
            words={['Web Developer', 'Web Designer', 'Freelancer']}
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
      </div>

      <motion.div
        className="order-1 md:order-2 flex justify-center items-center will-change-transform"
        style={{ y: parallaxY }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <HeroIllustration className="w-full max-w-md md:max-w-lg" />
      </motion.div>
    </section>
  );
}
```

**Step 2: Verify parallax on Home**

Run:
```bash
npm run dev
```
Scroll down, verify hero illustration moves slightly upward (opposite to scroll).

**Step 3: Commit**

```bash
git add src/components/sections/Home.jsx
git commit -m "feat: add parallax effect to Home hero illustration"
```

---

## Task 7: Add Parallax to Skills Section

**Files:**
- Modify: `src/components/sections/Skills.jsx`

**Step 1: Add scroll-based parallax to programmer illustration**

Replace `src/components/sections/Skills.jsx`:
```jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionTitle, SkillBar } from '../ui';
import ProgrammerIllustration from '../svg/ProgrammerIllustration';
import useIsMobile from '../../hooks/useIsMobile';

const skills = [
  { name: 'HTML5', icon: 'bxl-html5', percentage: 95 },
  { name: 'CSS3', icon: 'bxl-css3', percentage: 85 },
  { name: 'JavaScript', icon: 'bxl-javascript', percentage: 65 },
  { name: 'Java', icon: 'bx-code-block', percentage: 65 },
  { name: 'C/C++', icon: 'bx-code-alt', percentage: 70 },
  { name: 'Machine Learning', icon: 'bx-line-chart', percentage: 50 },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? -15 : -30]
  );

  return (
    <section ref={sectionRef} id="skills" className="section bd-container">
      <SectionTitle>Skills</SectionTitle>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-center md:text-left dark:text-white">
            Professional Skills
          </h3>
          <p className="mb-8 text-center md:text-left dark:text-gray-300">
            Technologies and tools I work with regularly.
          </p>

          {skills.map((skill) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              percentage={skill.percentage}
            />
          ))}
        </motion.div>

        <motion.div
          className="hidden md:flex justify-center items-center pt-[15%] will-change-transform"
          style={{ y: parallaxY }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ProgrammerIllustration className="w-full" />
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Verify parallax on Skills**

Run:
```bash
npm run dev
```
Scroll to Skills section, verify programmer illustration moves slightly upward.

**Step 3: Commit**

```bash
git add src/components/sections/Skills.jsx
git commit -m "feat: add parallax effect to Skills programmer illustration"
```

---

## Task 8: Create Hooks Index for Clean Imports

**Files:**
- Create: `src/hooks/index.js`

**Step 1: Create barrel export**

Create `src/hooks/index.js`:
```js
export { default as useTheme } from './useTheme';
export { default as useIsTouchDevice } from './useIsTouchDevice';
export { default as useIsMobile } from './useIsMobile';
```

**Step 2: Commit**

```bash
git add src/hooks/index.js
git commit -m "feat: add hooks barrel export"
```

---

## Task 9: Final Testing and Verification

**Step 1: Run dev server**

Run:
```bash
npm run dev
```

**Step 2: Test custom cursor**

Desktop checklist:
- [ ] Dot follows cursor instantly
- [ ] Ring follows with slight delay
- [ ] Ring expands when hovering links/buttons
- [ ] Both scale down on click
- [ ] Hidden when mouse leaves window
- [ ] Works in both light and dark mode

**Step 3: Test parallax**

- [ ] Hero illustration moves up as you scroll down
- [ ] Programmer illustration moves up as Skills section scrolls
- [ ] Movement is subtle, not jarring
- [ ] Works smoothly at 60fps

**Step 4: Test mobile**

Open DevTools, toggle device toolbar:
- [ ] Custom cursor is completely hidden
- [ ] Default cursor appears on simulated touch
- [ ] Parallax still works but with reduced intensity

**Step 5: Build production**

Run:
```bash
npm run build
```
Expected: Build succeeds with no errors

**Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete custom cursor and parallax implementation"
```

---

## Summary

Total: 9 tasks covering:
1. Touch device detection hook
2. CustomCursor component (dot + ring with hover/click states)
3. Export and integrate cursor into App
4. Mobile detection hook
5. Parallax on Home hero illustration
6. Parallax on Skills programmer illustration
7. Hooks barrel export
8. Testing and verification

Each task is atomic and can be verified independently.
