# Dark Mode Toggle Design

## Overview

Add a dark mode toggle button to the portfolio header with sun/moon icons, localStorage persistence, and system preference detection.

## Toggle Button

**Position:** Header, far right
- Desktop: After the last nav link, with left margin
- Mobile: To the left of the hamburger menu icon
- Always visible (not hidden in mobile menu)

**Icons:** BoxIcons
- Light mode shows: `bx bx-moon` (click to go dark)
- Dark mode shows: `bx bx-sun` (click to go light)

**Styling:**
- Size: `text-xl` (matches nav links)
- Color: `text-secondary dark:text-white`
- Hover: `hover:text-primary`
- Animation: Smooth rotation on toggle via Framer Motion

## Theme Implementation

**Strategy:** Tailwind CSS `class` dark mode - adds `dark` class to `<html>` element

**Tailwind Config:**
```js
export default {
  darkMode: 'class',
  // ...
}
```

**New Files:**
- `src/hooks/useTheme.js` - Theme state management
- `src/components/ui/ThemeToggle.jsx` - Toggle button component

## useTheme Hook

```js
// Returns { theme: 'light' | 'dark', toggleTheme: () => void }
```

**Behavior:**
1. On mount: Check localStorage for `theme` key
2. If no saved value: Check `prefers-color-scheme` system preference
3. Apply `dark` class to `<html>` if theme is dark
4. On toggle: Update state, localStorage, and DOM class

## Color Scheme

### Light Mode (default)
- Body: `bg-white`
- Header: `bg-white`
- Text: `text-secondary` (#0E2431)
- Inputs: `bg-white border-secondary`

### Dark Mode
- Body: `dark:bg-gray-900`
- Header: `dark:bg-gray-900`
- Text: `dark:text-white`
- Inputs: `dark:bg-gray-800 dark:border-gray-600`
- Cards: `dark:bg-gray-800`

### Unchanged
- Primary accent: `#4070F4` (same in both modes)
- Footer: Already dark, no changes needed

## Components to Update

| Component | Changes |
|-----------|---------|
| `Header.jsx` | Add ThemeToggle, dark background/text |
| `Home.jsx` | Dark text colors |
| `About.jsx` | Dark text colors |
| `Skills.jsx` | Dark card backgrounds, text |
| `Contact.jsx` | Dark input styling |
| `SectionTitle.jsx` | Primary color stays, no change |
| `SkillBar.jsx` | Dark card background |
| `Input.jsx` | Dark background, border, text |
| `SocialLinks.jsx` | Dark icon colors |
| `Button.jsx` | Primary stays, no change |
| `Footer.jsx` | Already dark, no change |

## Dependencies

None - uses existing Tailwind and Framer Motion
