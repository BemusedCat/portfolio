# React Portfolio Conversion Design

## Overview

Convert the existing HTML/CSS/JS portfolio to a React application with:
- **Vite** as the build tool
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Medium granularity** component architecture

## Project Structure

```
portfolio/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Root component
│   ├── index.css             # Tailwind imports + custom keyframes
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx    # Fixed nav with mobile menu
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   └── Contact.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── SectionTitle.jsx
│   │   │   ├── SocialLinks.jsx
│   │   │   ├── SkillBar.jsx
│   │   │   ├── Typewriter.jsx
│   │   │   └── Input.jsx
│   │   └── svg/
│   │       ├── HeroIllustration.jsx
│   │       └── ProgrammerIllustration.jsx
│   └── assets/
│       └── img/
│           ├── perfil.png
│           ├── about.jpg
│           └── work1-6.jpg
└── public/
    └── CNAME
```

## Design System

### Colors (Tailwind Config)
```js
colors: {
  primary: '#4070F4',    // Blue accent
  secondary: '#0E2431',  // Dark navy
}
```

### Typography
- Font: Poppins (400, 600, 700)
- Import via Google Fonts in index.css

## Reusable UI Components

### Button
```jsx
<Button href="#contact">Contact Me</Button>
<Button type="submit">Send Message</Button>
```
- Props: `children`, `href` (optional), `type`, `className`
- Renders `<a>` if href provided, otherwise `<button>`

### SectionTitle
```jsx
<SectionTitle>About Me</SectionTitle>
```
- Props: `children`, `className`
- Centered text with blue underline accent

### SocialLinks
```jsx
<SocialLinks links={socialData} size="lg" />
```
- Props: `links` (array of {icon, url, label}), `size` ("sm" | "lg")
- Vertical layout for Home, horizontal for Footer

### SkillBar
```jsx
<SkillBar name="HTML5" icon="bxl-html5" percentage={95} />
```
- Props: `name`, `icon`, `percentage`
- Animated width on scroll into view

### Typewriter
```jsx
<Typewriter words={["Web Developer", "Web Designer", "Freelancer"]} period={2000} />
```
- Props: `words` (array), `period` (ms delay)
- Typing/deleting animation with blinking cursor

### Input
```jsx
<Input label="Name" name="name" />
<Input label="Message" name="message" as="textarea" />
```
- Props: `label`, `name`, `as` ("input" | "textarea"), `type`

## Section Components

### Header
- Fixed position navigation
- Mobile hamburger menu (state-driven toggle)
- Active link highlighting based on scroll position
- Smooth scroll to sections on click

### Home
- Two-column layout (text + SVG illustration)
- Uses: Typewriter, Button, SocialLinks, HeroIllustration
- Animations: fade-in from top, staggered social icons

### About
- Two-column grid (image + text), stacks on mobile
- Uses: SectionTitle
- Animations: slide-in from left/right

### Skills
- Two-column layout (skills list + SVG)
- Uses: SectionTitle, SkillBar, ProgrammerIllustration
- Skills as data array for easy editing

### Contact
- Form with name, email, message fields
- Uses: SectionTitle, Input, Button
- Visual only (no submission logic)

### Footer
- Dark background
- Name and social links
- Uses: SocialLinks

## Animations

### Framer Motion Scroll Reveal
```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

### SVG Animations
- **HeroIllustration**: Wheels rotate infinitely
  ```jsx
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  ```
- **ProgrammerIllustration**:
  - Code blocks: rotateX oscillation
  - Lines: translateY falling animation
  - Hand: wave animation

### Typewriter Implementation
- useState for current display text
- useEffect with setTimeout for typing loop
- CSS keyframe for blinking cursor

### Staggered Children
```jsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};
const child = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
```

### Hover Effects
- Tailwind utilities: `hover:scale-110`, `hover:shadow-lg`
- Smooth transitions: `transition-all duration-300`

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "framer-motion": "^11.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x"
  }
}
```

## Implementation Notes

1. **Icons**: Continue using BoxIcons via CDN link in index.html
2. **Images**: Move to src/assets/img for Vite bundling
3. **CNAME**: Keep in public/ folder for GitHub Pages deployment
4. **Mobile menu**: Use useState for toggle, conditional classes for show/hide
5. **Active nav link**: Use Intersection Observer or scroll event listener
