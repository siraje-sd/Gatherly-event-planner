# EventPlanner - Design Documentation & Style Guide

## Table of Contents
1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Logo Usage](#logo-usage)
5. [Component Library](#component-library)
6. [Accessibility](#accessibility)
7. [Responsive Design](#responsive-design)

---

## Brand Identity

### Brand Name
**EventPlanner** - Professional event management platform

### Brand Values
- **Reliability**: Trusted platform for managing important events
- **Simplicity**: Easy-to-use interface for all skill levels
- **Collaboration**: Seamless teamwork and coordination
- **Innovation**: Real-time updates and modern technology

### Logo Design
The EventPlanner logo features a calendar icon with event markers, representing organization and planning. The design uses a gradient from blue to purple, symbolizing professionalism and creativity.

**Logo Variants:**
- **Full Logo**: Icon + "EventPlanner" text
- **Icon Only**: Calendar icon for favicon and compact spaces
- **Light Mode**: Standard colors for light backgrounds
- **Dark Mode**: Adjusted colors for dark backgrounds

---

## Color System

### Primary Colors
The primary color palette is based on blue tones, representing trust and professionalism.

```
Primary Blue:
- 50:  #f0f9ff  (Lightest background)
- 100: #e0f2fe
- 200: #bae6fd
- 300: #7dd3fc
- 400: #38bdf8
- 500: #0ea5e9  (Base primary)
- 600: #0284c7  (Primary actions)
- 700: #0369a1
- 800: #075985
- 900: #0c4a6e  (Darkest)
```

### Secondary Colors
Purple tones for accents and highlights.

```
Secondary Purple:
- 500: #a855f7  (Base secondary)
- 600: #9333ea  (Secondary actions)
```

### Accent Colors
Red for warnings and important actions.

```
Accent Red:
- 500: #ef4444  (Warnings)
- 600: #dc2626  (Errors)
```

### Semantic Colors
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)
- **Info**: Blue (#3b82f6)

### WCAG Compliance
All color combinations meet WCAG 2.1 AA standards:
- Text on light backgrounds: Minimum 4.5:1 contrast ratio
- Large text (18pt+): Minimum 3:1 contrast ratio
- Interactive elements: Clear focus states with 3:1 contrast

---

## Typography

### Font Family
**Primary Font**: Inter (System fallback: system-ui, sans-serif)

Inter is used throughout the application for its excellent readability and modern appearance.

### Type Scale

```
Headings:
- H1: 3rem (48px) - font-extrabold
- H2: 2.25rem (36px) - font-bold
- H3: 1.875rem (30px) - font-semibold
- H4: 1.5rem (24px) - font-semibold
- H5: 1.25rem (20px) - font-medium
- H6: 1rem (16px) - font-medium

Body:
- Large: 1.125rem (18px) - font-normal
- Base: 1rem (16px) - font-normal
- Small: 0.875rem (14px) - font-normal
- XSmall: 0.75rem (12px) - font-normal
```

### Font Weights
- **Extrabold**: 800 (Hero headings)
- **Bold**: 700 (Section headings)
- **Semibold**: 600 (Subheadings, buttons)
- **Medium**: 500 (Labels, emphasis)
- **Normal**: 400 (Body text)

---

## Logo Usage

### Placement Guidelines

1. **Navbar**: Full logo, left-aligned
2. **Login/Register**: Large logo, centered above form
3. **Footer**: Full logo with dark variant
4. **Favicon**: Icon only, 32x32px minimum

### Sizing

- **Small**: 32px (Mobile nav)
- **Default**: 40px (Standard nav)
- **Large**: 64px (Landing pages)
- **XL**: 96px (Hero sections)

### Color Variants

- **Light Background**: Standard colors
- **Dark Background**: Lightened colors for contrast
- **Monochrome**: Single color for special cases

### Do's and Don'ts

✅ **Do:**
- Maintain minimum clear space around logo
- Use appropriate variant for background
- Scale proportionally

❌ **Don't:**
- Stretch or distort logo
- Use low contrast colors
- Place on busy backgrounds without overlay

---

## Component Library

### Buttons

**Primary Button:**
```jsx
<button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
  Primary Action
</button>
```

**Secondary Button:**
```jsx
<button className="bg-white text-primary-600 px-6 py-3 rounded-lg border-2 border-primary-600">
  Secondary Action
</button>
```

**Gradient Button:**
```jsx
<button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg">
  Gradient Action
</button>
```

### Cards

**Standard Card:**
- White background
- Rounded corners (rounded-lg or rounded-xl)
- Shadow: shadow-md (hover: shadow-xl)
- Border: border-gray-100 (optional)

**Feature Card:**
- Gradient background option
- Icon at top
- Title and description
- Hover elevation effect

### Forms

**Input Fields:**
- Border: border-gray-300
- Focus: ring-2 ring-primary-500
- Padding: px-4 py-3
- Border radius: rounded-lg
- Error state: border-red-300, text-red-600

**Labels:**
- Font: text-sm font-medium
- Color: text-gray-700
- Spacing: mb-2

### Navigation

**Navbar:**
- Sticky positioning
- Backdrop blur on scroll
- Shadow elevation
- Responsive mobile menu

**Sidebar:**
- Fixed width: 256px (w-64)
- Active state highlighting
- Icon + text labels

---

## Accessibility

### ARIA Labels
All interactive elements include appropriate ARIA labels:
- Navigation: `role="navigation"`, `aria-label`
- Buttons: `aria-label` for icon-only buttons
- Forms: `aria-invalid`, `aria-describedby` for errors
- Modals: `role="dialog"`, `aria-modal="true"`

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order follows visual flow
- Focus indicators: ring-2 ring-primary-500
- Skip links for main content

### Screen Reader Support
- Semantic HTML elements
- Alt text for images
- Form labels properly associated
- Error messages announced
- Status updates via aria-live regions

### Color Contrast
- Text meets WCAG AA standards (4.5:1 minimum)
- Interactive elements have clear focus states
- Error states use both color and text/icon

---

## Responsive Design

### Breakpoints

```
Mobile:    < 640px  (sm)
Tablet:    640px - 1024px  (md, lg)
Desktop:  > 1024px  (xl, 2xl)
```

### Layout Patterns

**Mobile First:**
- Single column layouts
- Stacked navigation
- Full-width buttons
- Collapsible menus

**Tablet:**
- Two-column grids
- Side navigation
- Medium button sizes

**Desktop:**
- Multi-column layouts
- Persistent sidebar
- Hover states
- Larger touch targets

### Component Responsiveness

**Navbar:**
- Mobile: Hamburger menu
- Desktop: Full horizontal nav

**Cards:**
- Mobile: Full width
- Tablet: 2 columns
- Desktop: 3-4 columns

**Forms:**
- Mobile: Stacked fields
- Desktop: Side-by-side where appropriate

---

## Animation Guidelines

### Principles
- **Purposeful**: Animations enhance understanding
- **Subtle**: Don't distract from content
- **Fast**: 200-300ms for micro-interactions
- **Smooth**: Use easing functions

### Common Animations

**Page Transitions:**
- Fade in: 500ms ease-in-out
- Slide up: 500ms ease-out

**Hover Effects:**
- Scale: 1.02-1.05
- Shadow elevation
- Color transitions: 200ms

**Loading States:**
- Spinner animations
- Skeleton screens
- Progress indicators

**Micro-interactions:**
- Button press: scale(0.98)
- Card hover: translateY(-5px)
- Form focus: ring expansion

---

## File Structure

```
src/
├── components/
│   ├── Logo/
│   │   ├── Logo.js
│   │   └── LogoIcon.js
│   └── Layout/
│       ├── Navbar.js
│       └── Footer.js
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   └── Dashboard.js
└── assets/
    └── (logo files)
```

---

## Implementation Checklist

- [x] Logo design and variants
- [x] Color system implementation
- [x] Typography setup
- [x] Component library
- [x] Accessibility features
- [x] Responsive design
- [x] Animation integration
- [x] Documentation

---

## Contact & Support

For design questions or updates to this style guide, please contact the design team.

**Last Updated**: November 2024
**Version**: 1.0

