# Parallax Effects Design

## Overview

Add subtle parallax scrolling effects to SVG illustrations, creating depth as the user scrolls.

## Affected Elements

1. **Hero Illustration** (Home section) - `HeroIllustration.jsx`
2. **Programmer Illustration** (Skills section) - `ProgrammerIllustration.jsx`

## Effect Behavior

**Parallax direction:** Elements move upward (opposite to scroll direction) as user scrolls down. This creates the illusion that the illustrations are "further back" in depth.

**Hero Illustration:**
- Transform: `translateY` from 0 to -50px
- Triggers as Home section scrolls

**Programmer Illustration:**
- Transform: `translateY` from 0 to -30px (less intense)
- Triggers as Skills section scrolls into view

## Implementation

**Using Framer Motion hooks:**

```jsx
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

function Home() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={sectionRef}>
      {/* ... */}
      <motion.div style={{ y: illustrationY }}>
        <HeroIllustration />
      </motion.div>
    </section>
  );
}
```

## Scroll Offset Explained

```js
offset: ["start start", "end start"]
```
- First value: when element's start reaches viewport's start (0%)
- Second value: when element's end reaches viewport's start (100%)

## Mobile Behavior

**Reduced intensity for performance:**
- Hero: 0 to -20px (instead of -50px)
- Programmer: 0 to -15px (instead of -30px)

**Detection:**
```js
const isMobile = window.innerWidth < 768;
const parallaxIntensity = isMobile ? -20 : -50;
```

Or use Tailwind breakpoint via a custom hook.

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/sections/Home.jsx` | Add scroll tracking, wrap illustration |
| `src/components/sections/Skills.jsx` | Add scroll tracking, wrap illustration |

## Performance Considerations

- Use `will-change: transform` on animated elements
- Framer Motion handles GPU acceleration automatically
- No JavaScript-based scroll listeners (uses Intersection Observer internally)

## No Additional Dependencies

Uses existing Framer Motion - no new packages needed.
