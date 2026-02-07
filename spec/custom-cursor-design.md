# Custom Cursor Design

## Overview

Add a custom dot + ring cursor that follows the mouse with smooth animations and interactive hover states.

## Structure

**Two elements:**
- **Inner dot:** 8px solid circle, follows cursor instantly
- **Outer ring:** 40px circle, 2px border, follows with ~100ms delay

## Behavior

**Default state:**
- Dot follows mouse position instantly
- Ring follows with spring animation delay (~100ms)
- Both elements have `pointer-events: none`

**Hover states (links, buttons):**
- Ring expands from 40px to 60px
- Dot shrinks from 8px to 4px
- Smooth transition (0.2s)

**Click state:**
- Brief scale-down animation on both elements
- Returns to normal after click

**Edge cases:**
- Hidden when cursor leaves viewport
- Hidden on touch/mobile devices

## Styling

```jsx
// Inner dot
className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999]"

// Outer ring
className="fixed w-10 h-10 border-2 border-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
```

**Colors:**
- Primary blue (#4070F4) for both elements
- `mix-blend-difference` on ring for visibility on any background

## Implementation

**Component:** `src/components/ui/CustomCursor.jsx`

**State:**
- `position: { x, y }` - current cursor position
- `isHovering: boolean` - hovering over interactive element
- `isVisible: boolean` - cursor in viewport

**Event listeners:**
- `mousemove` - update position
- `mouseenter/mouseleave` on interactive elements - toggle hover state
- `mouseenter/mouseleave` on document - toggle visibility

**Animation:** Framer Motion
- Dot: `animate={{ x, y }}` with no delay
- Ring: `animate={{ x, y }}` with spring transition

## Mobile Detection

```js
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
```

If touch device, render nothing.

## Integration

Add `<CustomCursor />` to `App.jsx` at root level, outside of main content.

## Interactive Elements

Detect hover on these elements:
- `a` (links)
- `button`
- Elements with `data-cursor="pointer"` attribute (for custom cases)
