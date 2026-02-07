# React Portfolio Conversion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the HTML/CSS/JS portfolio to React with Vite, Tailwind CSS, and Framer Motion while preserving all animations and functionality.

**Architecture:** Component-based structure with reusable UI primitives (Button, Input, SkillBar, etc.) and section components (Home, About, Skills, Contact). SVGs converted to React components for animation control via Framer Motion.

**Tech Stack:** React 18, Vite, Tailwind CSS, Framer Motion, BoxIcons (CDN)

---

## Task 1: Initialize Vite + React Project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html` (new Vite entry)
- Create: `src/main.jsx`
- Create: `src/App.jsx`

**Step 1: Initialize project with Vite**

Run:
```bash
cd /Users/abhigyan/Developers/portfolio/portfolio
npm create vite@latest . -- --template react
```
Expected: Project scaffolded with React template

**Step 2: Verify project structure**

Run:
```bash
ls -la src/
```
Expected: `main.jsx`, `App.jsx`, `App.css`, `index.css` files present

**Step 3: Install dependencies**

Run:
```bash
npm install
```
Expected: `node_modules` created, dependencies installed

**Step 4: Test dev server starts**

Run:
```bash
npm run dev -- --port 3000 &
sleep 3
curl -s http://localhost:3000 | head -20
pkill -f "vite"
```
Expected: HTML response with Vite React app

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: initialize Vite + React project"
```

---

## Task 2: Set Up Tailwind CSS

**Files:**
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Modify: `src/index.css`

**Step 1: Install Tailwind and dependencies**

Run:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Expected: `tailwind.config.js` and `postcss.config.js` created

**Step 2: Configure Tailwind with custom colors**

Replace `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4070F4',
        secondary: '#0E2431',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**Step 3: Set up Tailwind in index.css**

Replace `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply font-poppins text-secondary;
  }
}

@layer components {
  .section {
    @apply pt-12 pb-8 md:pt-16 md:pb-12;
  }
  .bd-container {
    @apply max-w-[1220px] mx-auto px-4 md:px-8;
  }
}

/* SVG Animations */
@keyframes slidewheel {
  from { transform: rotateZ(0deg); }
  to { transform: rotateZ(-360deg); }
}

@keyframes slidein {
  from { transform: rotateX(20deg); }
  to { transform: rotateX(-20deg); }
}

@keyframes lines {
  from { transform: translateY(0%); }
  to { transform: translateY(250%); }
}

@keyframes lines-left {
  from { transform: translate(0%, 0%); }
  to { transform: translate(-10%, 200%); }
}

@keyframes lines-right {
  from { transform: translate(0%, 0%); }
  to { transform: translate(10%, 200%); }
}

@keyframes hand_ani {
  from { transform: rotateY(0deg) translateX(2%); }
  to { transform: rotateY(20deg) translateX(-2%); }
}

@keyframes blink {
  0%, 100% { border-color: #4070F4; }
  50% { border-color: transparent; }
}

.animate-wheel {
  animation: slidewheel 2s infinite linear;
  transform-origin: center;
  transform-box: fill-box;
}

.animate-slidein {
  animation: slidein 3s ease-in-out infinite alternate;
  transform-origin: center;
  transform-box: fill-box;
}

.animate-lines {
  animation: lines 1s ease-in-out infinite alternate;
  transform-origin: center;
  transform-box: fill-box;
}

.animate-lines-left {
  animation: lines-left 1s ease-in-out infinite alternate;
  transform-origin: center;
  transform-box: fill-box;
}

.animate-lines-right {
  animation: lines-right 1s ease-in-out infinite alternate;
  transform-origin: center;
  transform-box: fill-box;
}

.animate-hand {
  animation: hand_ani 0.8s ease-in-out infinite alternate;
  transform-origin: top left;
  transform-box: fill-box;
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}
```

**Step 4: Verify Tailwind works**

Run:
```bash
npm run dev -- --port 3000 &
sleep 3
curl -s http://localhost:3000 | grep -q "tailwind" && echo "Tailwind loaded" || echo "Check setup"
pkill -f "vite"
```

**Step 5: Commit**

```bash
git add tailwind.config.js postcss.config.js src/index.css
git commit -m "feat: configure Tailwind CSS with custom theme"
```

---

## Task 3: Install Framer Motion

**Files:**
- Modify: `package.json`

**Step 1: Install Framer Motion**

Run:
```bash
npm install framer-motion
```
Expected: `framer-motion` added to dependencies

**Step 2: Verify installation**

Run:
```bash
grep "framer-motion" package.json
```
Expected: `"framer-motion": "^11.x"`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add Framer Motion for animations"
```

---

## Task 4: Create Component Directory Structure

**Files:**
- Create: `src/components/layout/.gitkeep`
- Create: `src/components/sections/.gitkeep`
- Create: `src/components/ui/.gitkeep`
- Create: `src/components/svg/.gitkeep`
- Move: `assets/img/*` to `src/assets/img/`

**Step 1: Create directory structure**

Run:
```bash
mkdir -p src/components/{layout,sections,ui,svg}
mkdir -p src/assets/img
```

**Step 2: Copy images to src/assets**

Run:
```bash
cp assets/img/*.{jpg,png} src/assets/img/
```

**Step 3: Move CNAME to public**

Run:
```bash
mkdir -p public
cp CNAME public/
```

**Step 4: Verify structure**

Run:
```bash
find src -type d | head -20
```
Expected: All directories created

**Step 5: Commit**

```bash
git add src/components src/assets public/CNAME
git commit -m "feat: create component directory structure"
```

---

## Task 5: Create Button Component

**Files:**
- Create: `src/components/ui/Button.jsx`

**Step 1: Create Button component**

Create `src/components/ui/Button.jsx`:
```jsx
import { motion } from 'framer-motion';

export default function Button({
  children,
  href,
  type = 'button',
  className = ''
}) {
  const baseStyles = `
    inline-block bg-primary text-white
    py-3 px-10 font-semibold rounded-lg
    transition-shadow duration-300
    hover:shadow-[0_10px_36px_rgba(0,0,0,0.15)]
  `;

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={`${baseStyles} border-none cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
```

**Step 2: Verify syntax**

Run:
```bash
npx eslint src/components/ui/Button.jsx --no-eslintrc --parser-options=ecmaVersion:2022,sourceType:module,ecmaFeatures:{jsx:true} 2>/dev/null || echo "ESLint not configured, skipping"
```

**Step 3: Commit**

```bash
git add src/components/ui/Button.jsx
git commit -m "feat: add Button component"
```

---

## Task 6: Create SectionTitle Component

**Files:**
- Create: `src/components/ui/SectionTitle.jsx`

**Step 1: Create SectionTitle component**

Create `src/components/ui/SectionTitle.jsx`:
```jsx
import { motion } from 'framer-motion';

export default function SectionTitle({ children, className = '' }) {
  return (
    <motion.h2
      className={`
        relative text-xl md:text-2xl text-primary font-semibold
        text-center mt-4 mb-8 md:mb-12
        after:content-[''] after:absolute after:w-16 md:after:w-20
        after:h-[3px] after:bg-primary
        after:left-1/2 after:-translate-x-1/2 after:top-8 md:after:top-12
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.h2>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/SectionTitle.jsx
git commit -m "feat: add SectionTitle component"
```

---

## Task 7: Create SocialLinks Component

**Files:**
- Create: `src/components/ui/SocialLinks.jsx`

**Step 1: Create SocialLinks component**

Create `src/components/ui/SocialLinks.jsx`:
```jsx
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SocialLinks({
  links,
  size = 'lg',
  direction = 'vertical',
  className = ''
}) {
  const sizeClasses = size === 'lg' ? 'text-2xl' : 'text-xl';
  const directionClasses = direction === 'vertical'
    ? 'flex-col space-y-4'
    : 'flex-row space-x-4';

  return (
    <motion.div
      className={`flex ${directionClasses} ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {links.map((link) => (
        <motion.a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            ${sizeClasses} text-secondary
            transition-colors duration-300
            hover:text-primary
          `}
          variants={item}
          whileHover={{ scale: 1.1 }}
          aria-label={link.label}
        >
          <i className={`bx ${link.icon}`}></i>
        </motion.a>
      ))}
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/SocialLinks.jsx
git commit -m "feat: add SocialLinks component"
```

---

## Task 8: Create SkillBar Component

**Files:**
- Create: `src/components/ui/SkillBar.jsx`

**Step 1: Create SkillBar component**

Create `src/components/ui/SkillBar.jsx`:
```jsx
import { motion } from 'framer-motion';

export default function SkillBar({ name, icon, percentage }) {
  return (
    <motion.div
      className="
        relative flex justify-between items-center
        font-semibold p-2 px-4 mb-8
        rounded-lg shadow-[0_4px_25px_rgba(14,36,49,0.15)]
      "
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <i className={`bx ${icon} text-3xl text-primary mr-4`}></i>
        <span>{name}</span>
      </div>
      <span>{percentage}%</span>

      {/* Progress bar */}
      <motion.div
        className="absolute left-0 bottom-0 h-1 bg-primary rounded-lg"
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/SkillBar.jsx
git commit -m "feat: add SkillBar component with animated progress"
```

---

## Task 9: Create Typewriter Component

**Files:**
- Create: `src/components/ui/Typewriter.jsx`

**Step 1: Create Typewriter component**

Create `src/components/ui/Typewriter.jsx`:
```jsx
import { useState, useEffect } from 'react';

export default function Typewriter({ words, period = 2000 }) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setText(currentWord.substring(0, text.length + 1));

        if (text === currentWord) {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), period);
        }
      } else {
        // Deleting
        setText(currentWord.substring(0, text.length - 1));

        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, period]);

  return (
    <span className="inline-block">
      <span>{text}</span>
      <span className="border-r-2 border-primary cursor-blink ml-1">&nbsp;</span>
    </span>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Typewriter.jsx
git commit -m "feat: add Typewriter component with typing animation"
```

---

## Task 10: Create Input Component

**Files:**
- Create: `src/components/ui/Input.jsx`

**Step 1: Create Input component**

Create `src/components/ui/Input.jsx`:
```jsx
import { motion } from 'framer-motion';

export default function Input({
  label,
  name,
  type = 'text',
  as = 'input',
  className = ''
}) {
  const baseStyles = `
    w-full text-base font-semibold
    p-4 rounded-lg border-2 border-secondary
    outline-none mb-8
    focus:border-primary transition-colors
  `;

  const Component = as === 'textarea' ? 'textarea' : 'input';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Component
        name={name}
        type={as === 'input' ? type : undefined}
        placeholder={label}
        className={`${baseStyles} ${as === 'textarea' ? 'min-h-[150px] resize-y' : ''} ${className}`}
      />
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Input.jsx
git commit -m "feat: add Input component"
```

---

## Task 11: Create UI Component Index

**Files:**
- Create: `src/components/ui/index.js`

**Step 1: Create barrel export**

Create `src/components/ui/index.js`:
```js
export { default as Button } from './Button';
export { default as SectionTitle } from './SectionTitle';
export { default as SocialLinks } from './SocialLinks';
export { default as SkillBar } from './SkillBar';
export { default as Typewriter } from './Typewriter';
export { default as Input } from './Input';
```

**Step 2: Commit**

```bash
git add src/components/ui/index.js
git commit -m "feat: add UI component barrel export"
```

---

## Task 12: Create HeroIllustration SVG Component

**Files:**
- Create: `src/components/svg/HeroIllustration.jsx`

**Step 1: Create HeroIllustration component**

Create `src/components/svg/HeroIllustration.jsx`:
```jsx
export default function HeroIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 720 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Wheel */}
      <g id="wheel-left" className="animate-wheel">
        <g>
          <path d="M138.413 619.227L148.754 510.999L138.413 402.038L136.164 402.331L146.506 511.146L136.164 618.934L138.413 619.227ZM166.589 624.067L168.837 623.774L158.346 511.146L168.837 407.171L166.589 406.877L156.098 511.293L166.589 624.067Z" fill="#595959"/>
          <path d="M39.1964 529.037L150.552 518.918L260.709 529.037L260.859 526.838L150.402 516.719L39.0466 526.838L39.1964 529.037ZM150.552 509.533L265.955 499.414L265.805 497.214L150.552 507.333L44.2921 497.214L43.9924 499.414L150.552 509.533Z" fill="#595959"/>
          <path d="M217.546 599.283L219.344 597.816L148.454 514.079L62.4268 444.273L60.9281 446.033L146.805 515.692L217.546 599.283ZM242.724 581.832L244.223 580.072L155.348 507.626L87.6055 426.822L85.807 428.288L153.849 509.239L242.724 581.832Z" fill="#595959"/>
          <path d="M65.8739 578.899L151.451 509.679L222.791 425.355L220.993 423.889L149.653 508.213L64.3752 577.139L65.8739 578.899ZM84.0085 603.243L158.046 516.279L240.626 449.993L239.127 448.233L156.397 514.812L82.2101 601.776L84.0085 603.243Z" fill="#595959"/>
        </g>
        <path d="M152.501 419.049C100.045 419.049 57.481 460.845 57.481 512.026C57.481 563.207 100.195 605.002 152.501 605.002C204.806 605.002 247.52 563.207 247.52 512.026C247.52 460.845 204.956 419.049 152.501 419.049ZM152.501 397.052C217.396 397.052 270.001 448.526 270.001 512.026C270.001 575.526 217.396 627 152.501 627C87.6055 627 35.0001 575.526 35.0001 512.026C35.0001 448.526 87.6055 397.052 152.501 397.052Z" fill="#333333"/>
        <path d="M152.501 423.302C102.443 423.302 61.6775 463.191 61.6775 512.172C61.6775 561.154 102.443 601.043 152.501 601.043C202.558 601.043 243.324 561.154 243.324 512.172C243.324 463.191 202.558 423.302 152.501 423.302ZM152.501 413.037C208.403 413.037 253.815 457.472 253.815 512.172C253.815 566.873 208.403 611.308 152.501 611.308C96.5979 611.308 51.1863 566.873 51.1863 512.172C51.1863 457.472 96.5979 413.037 152.501 413.037Z" fill="#71B9EA"/>
      </g>

      {/* Right Wheel */}
      <g id="wheel-right" className="animate-wheel">
        <g>
          <path d="M553.561 619.228L563.902 510.999L553.561 402.038L551.313 402.331L561.654 511.146L551.313 618.934L553.561 619.228ZM581.737 624.067L583.985 623.774L573.494 511.146L583.985 407.171L581.737 406.877L571.246 511.293L581.737 624.067Z" fill="#595959"/>
          <path d="M454.345 529.037L565.551 518.918L675.858 529.037L676.008 526.838L565.551 516.719L454.195 526.838L454.345 529.037ZM565.551 509.533H565.701L681.103 499.414L680.953 497.214L565.551 507.333L459.291 497.214L459.141 499.414L565.551 509.533Z" fill="#595959"/>
          <path d="M632.544 599.283L634.343 597.817L563.453 514.079L477.426 444.273L475.927 446.033L561.954 515.692L632.544 599.283ZM657.723 581.832L659.222 580.072L570.497 507.626L502.604 426.822L500.806 428.288L568.848 509.239L657.723 581.832Z" fill="#595959"/>
          <path d="M480.873 578.899L566.45 509.679L637.79 425.355L635.991 423.889L564.802 508.213L479.374 577.139L480.873 578.899ZM499.007 603.243L573.195 516.279L655.625 449.993L654.126 448.233L571.396 514.812L497.209 601.776L499.007 603.243Z" fill="#595959"/>
        </g>
        <path d="M567.499 419.049C515.044 419.049 472.48 460.845 472.48 512.026C472.48 563.207 515.194 605.002 567.499 605.002C619.805 605.002 662.519 563.207 662.519 512.026C662.519 460.845 619.955 419.049 567.499 419.049ZM567.499 397.052C632.395 397.052 685 448.526 685 512.026C685 575.526 632.395 627 567.499 627C502.604 627 449.999 575.526 449.999 512.026C449.999 448.526 502.604 397.052 567.499 397.052Z" fill="#333333"/>
        <path d="M567.499 423.302C517.442 423.302 476.676 463.191 476.676 512.173C476.676 561.154 517.442 601.043 567.499 601.043C617.557 601.043 658.323 561.154 658.323 512.173C658.323 463.191 617.557 423.302 567.499 423.302ZM567.499 413.037C623.402 413.037 668.814 457.472 668.814 512.173C668.814 566.873 623.402 611.308 567.499 611.308C511.597 611.308 466.185 566.873 466.185 512.173C466.185 457.472 511.597 413.037 567.499 413.037Z" fill="#71B9EA"/>
      </g>

      {/* Body - simplified, add full SVG paths from original */}
      <g id="body">
        <path d="M400.99 63.2746L412.231 99.2041L415.528 107.563C415.528 107.563 410.732 113.576 399.342 115.922C391.548 117.535 386.303 117.682 382.856 117.389C380.008 117.095 376.561 116.509 378.36 111.376C380.907 103.75 380.008 98.9108 380.008 98.9108L375.962 77.3531L400.99 63.2746Z" fill="#EA9D7D"/>
        {/* Additional body paths would go here - keeping abbreviated for readability */}
      </g>

      <defs>
        <linearGradient id="paint0_linear" x1="389.559" y1="63.2746" x2="389.559" y2="97.7375" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EA9D7D"/>
          <stop offset="1" stopColor="#D4805E"/>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="378.51" y1="32.7713" x2="378.51" y2="54.6222" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EA9D7D"/>
          <stop offset="1" stopColor="#D4805E"/>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="403.089" y1="54.4756" x2="403.089" y2="61.8081" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4B9A6"/>
          <stop offset="1" stopColor="#EA9D7D"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
```

**Note:** The full SVG will need to be copied from the original `index.html`. This is a simplified version showing the wheel animations.

**Step 2: Commit**

```bash
git add src/components/svg/HeroIllustration.jsx
git commit -m "feat: add HeroIllustration SVG component with wheel animation"
```

---

## Task 13: Create ProgrammerIllustration SVG Component

**Files:**
- Create: `src/components/svg/ProgrammerIllustration.jsx`

**Step 1: Create component**

Create `src/components/svg/ProgrammerIllustration.jsx`:
```jsx
export default function ProgrammerIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 720 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Animated code blocks */}
      <g id="comp-top-right" className="animate-slidein">
        {/* SVG paths for code block */}
      </g>
      <g id="comp-top-left" className="animate-slidein">
        {/* SVG paths */}
      </g>
      <g id="comp-middle" className="animate-slidein">
        {/* SVG paths */}
      </g>
      <g id="comp-bottom-left" className="animate-slidein">
        {/* SVG paths */}
      </g>
      <g id="comp-bottom-right" className="animate-slidein">
        {/* SVG paths */}
      </g>

      {/* Animated lines */}
      <g id="middle-line" className="animate-lines">
        {/* SVG paths */}
      </g>
      <g id="bottom-left-line" className="animate-lines">
        {/* SVG paths */}
      </g>
      <g id="bottom-right-line" className="animate-lines">
        {/* SVG paths */}
      </g>
      <g id="top-left-line" className="animate-lines-left">
        {/* SVG paths */}
      </g>
      <g id="top-right-line" className="animate-lines-right">
        {/* SVG paths */}
      </g>

      {/* Animated hand */}
      <g id="hand" className="animate-hand">
        {/* SVG paths */}
      </g>

      {/* Static elements */}
      {/* Rest of SVG */}
    </svg>
  );
}
```

**Note:** Copy the full SVG paths from the skills section in the original `index.html`.

**Step 2: Commit**

```bash
git add src/components/svg/ProgrammerIllustration.jsx
git commit -m "feat: add ProgrammerIllustration SVG component with animations"
```

---

## Task 14: Create Header Component

**Files:**
- Create: `src/components/layout/Header.jsx`

**Step 1: Create Header component**

Create `src/components/layout/Header.jsx`:
```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
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
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-[0_1px_4px_rgba(146,161,176,0.15)]">
      <nav className="h-12 md:h-16 flex justify-between items-center max-w-[1220px] mx-auto px-4 md:px-8 font-semibold">
        {/* Logo */}
        <a href="#" className="text-secondary text-lg">
          Abhigyan
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`
                  relative text-secondary
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

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-secondary text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <i className={`bx ${isOpen ? 'bx-x' : 'bx-menu'}`}></i>
        </button>

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
  );
}
```

**Step 2: Commit**

```bash
git add src/components/layout/Header.jsx
git commit -m "feat: add Header component with mobile menu"
```

---

## Task 15: Create Footer Component

**Files:**
- Create: `src/components/layout/Footer.jsx`

**Step 1: Create Footer component**

Create `src/components/layout/Footer.jsx`:
```jsx
import { SocialLinks } from '../ui';

const socialLinks = [
  { icon: 'bxl-facebook', url: '#', label: 'Facebook' },
  { icon: 'bxl-instagram', url: 'https://www.instagram.com/abhimaigyandega/', label: 'Instagram' },
  { icon: 'bxl-twitter', url: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-white text-center font-semibold py-8">
      <h2 className="text-3xl mb-8">Abhigyan</h2>
      <SocialLinks
        links={socialLinks}
        size="sm"
        direction="horizontal"
        className="justify-center mb-8"
      />
      <p className="text-sm opacity-70">
        &copy; {new Date().getFullYear()} Abhigyan. All rights reserved.
      </p>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/layout/Footer.jsx
git commit -m "feat: add Footer component"
```

---

## Task 16: Create Home Section

**Files:**
- Create: `src/components/sections/Home.jsx`

**Step 1: Create Home section component**

Create `src/components/sections/Home.jsx`:
```jsx
import { motion } from 'framer-motion';
import { Button, SocialLinks, Typewriter } from '../ui';
import HeroIllustration from '../svg/HeroIllustration';

const socialLinks = [
  { icon: 'bxl-linkedin', url: 'https://www.linkedin.com/in/abhigyan-pandey-b6948811a/', label: 'LinkedIn' },
  { icon: 'bxl-instagram', url: 'https://www.instagram.com/abhimaigyandega/', label: 'Instagram' },
  { icon: 'bxl-github', url: 'https://github.com/BemusedCat', label: 'GitHub' },
];

export default function Home() {
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-3rem)] md:min-h-screen grid md:grid-cols-2 gap-4 items-center pt-12 md:pt-0 bd-container"
    >
      <div className="order-2 md:order-1">
        <motion.h1
          className="text-3xl md:text-6xl font-bold mb-10"
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
        className="order-1 md:order-2 flex justify-center items-center"
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

**Step 2: Commit**

```bash
git add src/components/sections/Home.jsx
git commit -m "feat: add Home section component"
```

---

## Task 17: Create About Section

**Files:**
- Create: `src/components/sections/About.jsx`

**Step 1: Create About section component**

Create `src/components/sections/About.jsx`:
```jsx
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui';
import aboutImg from '../../assets/img/about.jpg';

export default function About() {
  return (
    <section id="about" className="section bd-container">
      <SectionTitle>About Me</SectionTitle>

      <div className="grid md:grid-cols-2 gap-8 items-center text-center md:text-left">
        <motion.div
          className="justify-self-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={aboutImg}
            alt="About Abhigyan"
            className="w-48 md:w-72 rounded-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4">
            I'm Abhigyan
          </h3>
          <p className="leading-relaxed">
            I am an aspiring software engineer, currently studying Electronics
            and Instrumentation Engineering at National Institute of Technology,
            Agartala. I'm passionate about web development, design, and creating
            meaningful digital experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/About.jsx
git commit -m "feat: add About section component"
```

---

## Task 18: Create Skills Section

**Files:**
- Create: `src/components/sections/Skills.jsx`

**Step 1: Create Skills section component**

Create `src/components/sections/Skills.jsx`:
```jsx
import { motion } from 'framer-motion';
import { SectionTitle, SkillBar } from '../ui';
import ProgrammerIllustration from '../svg/ProgrammerIllustration';

const skills = [
  { name: 'HTML5', icon: 'bxl-html5', percentage: 95 },
  { name: 'CSS3', icon: 'bxl-css3', percentage: 85 },
  { name: 'JavaScript', icon: 'bxl-javascript', percentage: 65 },
  { name: 'Java', icon: 'bx-code-block', percentage: 65 },
  { name: 'C/C++', icon: 'bx-code-alt', percentage: 70 },
  { name: 'Machine Learning', icon: 'bx-line-chart', percentage: 50 },
];

export default function Skills() {
  return (
    <section id="skills" className="section bd-container">
      <SectionTitle>Skills</SectionTitle>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
            Professional Skills
          </h3>
          <p className="mb-8 text-center md:text-left">
            Technologies and tools I work with regularly.
          </p>

          {skills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              percentage={skill.percentage}
            />
          ))}
        </motion.div>

        <motion.div
          className="hidden md:flex justify-center items-center pt-[15%]"
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

**Step 2: Commit**

```bash
git add src/components/sections/Skills.jsx
git commit -m "feat: add Skills section component"
```

---

## Task 19: Create Contact Section

**Files:**
- Create: `src/components/sections/Contact.jsx`

**Step 1: Create Contact section component**

Create `src/components/sections/Contact.jsx`:
```jsx
import { motion } from 'framer-motion';
import { SectionTitle, Input, Button } from '../ui';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Visual only - no submission logic
  };

  return (
    <section id="contact" className="section bd-container">
      <SectionTitle>Contact</SectionTitle>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md"
        >
          <Input label="Name" name="name" />
          <Input label="Email" name="email" type="email" />
          <Input label="Message" name="message" as="textarea" />

          <div className="flex justify-end">
            <Button type="submit">
              Send Message
            </Button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/Contact.jsx
git commit -m "feat: add Contact section component"
```

---

## Task 20: Create Section Index

**Files:**
- Create: `src/components/sections/index.js`

**Step 1: Create barrel export**

Create `src/components/sections/index.js`:
```js
export { default as Home } from './Home';
export { default as About } from './About';
export { default as Skills } from './Skills';
export { default as Contact } from './Contact';
```

**Step 2: Commit**

```bash
git add src/components/sections/index.js
git commit -m "feat: add sections barrel export"
```

---

## Task 21: Create Layout Index

**Files:**
- Create: `src/components/layout/index.js`

**Step 1: Create barrel export**

Create `src/components/layout/index.js`:
```js
export { default as Header } from './Header';
export { default as Footer } from './Footer';
```

**Step 2: Commit**

```bash
git add src/components/layout/index.js
git commit -m "feat: add layout barrel export"
```

---

## Task 22: Update App.jsx

**Files:**
- Modify: `src/App.jsx`

**Step 1: Update App with all components**

Replace `src/App.jsx`:
```jsx
import { Header, Footer } from './components/layout';
import { Home, About, Skills, Contact } from './components/sections';

export default function App() {
  return (
    <>
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

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire up App with all components"
```

---

## Task 23: Update index.html with BoxIcons

**Files:**
- Modify: `index.html`

**Step 1: Update index.html**

Replace `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet'>
    <title>Abhigyan Pandey</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add BoxIcons CDN to index.html"
```

---

## Task 24: Clean Up Unused Files

**Files:**
- Delete: `src/App.css`
- Delete: Default Vite assets

**Step 1: Remove unused files**

Run:
```bash
rm -f src/App.css
rm -f src/assets/react.svg
rm -f public/vite.svg
```

**Step 2: Commit**

```bash
git add -A
git commit -m "chore: clean up unused Vite defaults"
```

---

## Task 25: Copy Full SVG Content

**Files:**
- Modify: `src/components/svg/HeroIllustration.jsx`
- Modify: `src/components/svg/ProgrammerIllustration.jsx`

**Step 1: Extract full SVG from original index.html**

Copy the complete SVG content from the original `index.html` file (the home section SVG and skills section SVG) into the respective React components, adding the animation classes to the appropriate groups.

**Step 2: Verify SVGs render correctly**

Run:
```bash
npm run dev
```
Open browser and verify both SVGs display with animations.

**Step 3: Commit**

```bash
git add src/components/svg/*.jsx
git commit -m "feat: add complete SVG content with animations"
```

---

## Task 26: Final Testing and Verification

**Step 1: Run dev server**

Run:
```bash
npm run dev
```

**Step 2: Verify all sections**

- [ ] Header displays correctly
- [ ] Mobile menu works
- [ ] Home section with typewriter effect
- [ ] Hero SVG wheels rotating
- [ ] About section with image
- [ ] Skills section with animated bars
- [ ] Programmer SVG animations
- [ ] Contact form displays
- [ ] Footer with social links
- [ ] All scroll reveal animations work
- [ ] Responsive on mobile

**Step 3: Build production**

Run:
```bash
npm run build
```
Expected: Build succeeds with no errors

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete React portfolio conversion"
```

---

## Summary

Total: 26 tasks covering:
1. Project setup (Vite, Tailwind, Framer Motion)
2. Directory structure
3. UI components (Button, SectionTitle, SocialLinks, SkillBar, Typewriter, Input)
4. SVG components (HeroIllustration, ProgrammerIllustration)
5. Layout components (Header, Footer)
6. Section components (Home, About, Skills, Contact)
7. App integration
8. Cleanup and verification

Each task is atomic and can be verified independently.
