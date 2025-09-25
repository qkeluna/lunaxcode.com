# Unified Design System

> A comprehensive design system merging inspiration from Linear, Notion, Cursor, Cal.com, Bird, and Square

## Table of Contents
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing System](#spacing-system)
- [Component Library](#component-library)
- [Layout Patterns](#layout-patterns)
- [Design Principles](#design-principles)

---

## Color Palette

### Primary Colors

#### Dark Theme (Primary)
```css
--bg-primary: #000000
--bg-secondary: #0a0a0a
--bg-tertiary: #1a1a1a
--text-primary: #ffffff
--text-secondary: #a0a0a0
--text-tertiary: #666666
```

#### Light Theme (Alternative)
```css
--bg-primary: #ffffff
--bg-secondary: #f8f8f8
--bg-tertiary: #f0f0f0
--text-primary: #000000
--text-secondary: #666666
--text-tertiary: #999999
```

### Accent Colors

#### Interactive Elements
```css
--accent-primary: #5b6eff       /* Linear-style blue/purple */
--accent-secondary: #0066ff     /* Notion blue */
--accent-tertiary: #000000      /* Cal.com/Square black */
--accent-success: #00d084       /* Success green */
--accent-warning: #ff9500       /* Warning orange */
--accent-error: #ff3b30         /* Error red */
```

#### Gradient Accent (Cursor-inspired)
```css
--gradient-primary: linear-gradient(135deg, #ff006e 0%, #ff8c00 50%, #ffeb3b 100%)
--gradient-card: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

### Border & Surface Colors
```css
--border-subtle: rgba(255, 255, 255, 0.1)
--border-medium: rgba(255, 255, 255, 0.2)
--border-strong: rgba(255, 255, 255, 0.3)
--surface-elevated: rgba(255, 255, 255, 0.05)
--surface-overlay: rgba(0, 0, 0, 0.8)
```

---

## Typography

### Font Families
```css
--font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
--font-display: "SF Pro Display", -apple-system, sans-serif
--font-mono: "SF Mono", "Monaco", "Inconsolata", monospace
```

### Type Scale

#### Headings
```css
--text-display: 72px / 1.1 / -2%     /* Hero sections */
--text-h1: 56px / 1.2 / -1.5%         /* Main headings */
--text-h2: 40px / 1.3 / -1%           /* Section headings */
--text-h3: 32px / 1.4 / -0.5%         /* Subsection headings */
--text-h4: 24px / 1.5 / 0%            /* Card headings */
--text-h5: 20px / 1.5 / 0%            /* Small headings */
```

#### Body Text
```css
--text-body-lg: 18px / 1.6 / 0%       /* Large body */
--text-body: 16px / 1.6 / 0%          /* Default body */
--text-body-sm: 14px / 1.5 / 0%       /* Small body */
--text-caption: 12px / 1.4 / 0%       /* Captions */
--text-overline: 11px / 1.3 / 2%      /* Labels (uppercase) */
```

### Font Weights
```css
--weight-light: 300
--weight-regular: 400
--weight-medium: 500
--weight-semibold: 600
--weight-bold: 700
```

---

## Spacing System

### Base Unit: 8px

```css
--space-0: 0
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
--space-32: 128px
```

### Layout Spacing
```css
--section-padding-sm: 48px
--section-padding-md: 80px
--section-padding-lg: 120px
--container-padding: 24px
--grid-gap: 24px
```

---

## Component Library

### Buttons

#### Primary Button
```css
Background: var(--accent-primary)
Text: white
Padding: 12px 24px
Border-radius: 8px
Font: 16px / semibold
Hover: opacity 0.9
```

#### Secondary Button
```css
Background: transparent
Text: var(--text-primary)
Padding: 12px 24px
Border: 1px solid var(--border-medium)
Border-radius: 8px
Hover: background var(--surface-elevated)
```

#### Outlined Button (Cal.com style)
```css
Background: transparent
Text: var(--text-primary)
Padding: 10px 20px
Border: 2px solid var(--text-primary)
Border-radius: 6px
```

#### Gradient Button (Cursor style)
```css
Background: var(--gradient-primary)
Text: white
Padding: 12px 28px
Border-radius: 12px
Font: 16px / bold
```

### Cards

#### Feature Card (Linear style)
```css
Background: var(--bg-secondary)
Border: 1px solid var(--border-subtle)
Border-radius: 16px
Padding: 32px
Hover: transform translateY(-4px), border-color accent
Transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

#### Pricing Card (Notion/Cursor style)
```css
Background: var(--bg-primary)
Border: 2px solid var(--border-medium)
Border-radius: 12px
Padding: 32px
Recommended: border-color var(--accent-primary)
```

#### Blog Card (Linear style)
```css
Background: var(--bg-secondary)
Border-radius: 12px
Image-border-radius: 8px
Padding: 16px
Hover: background var(--bg-tertiary)
```

### Navigation

#### Top Navigation (Linear/Notion style)
```css
Height: 64px
Background: var(--bg-primary) / blur
Backdrop-filter: blur(20px)
Border-bottom: 1px solid var(--border-subtle)
Padding: 0 48px
Position: sticky, top: 0
```

#### Navigation Links
```css
Font: 15px / medium
Color: var(--text-secondary)
Hover: var(--text-primary)
Active: var(--accent-primary)
```

### Forms

#### Input Fields (Cal.com style)
```css
Background: var(--bg-primary)
Border: 1px solid var(--border-medium)
Border-radius: 8px
Padding: 12px 16px
Font: 16px / regular
Focus: border-color var(--accent-primary), outline 0
```

#### Dropdown/Select
```css
Background: var(--bg-secondary)
Border: 1px solid var(--border-medium)
Border-radius: 8px
Padding: 10px 16px
Icon: chevron-down, right 12px
```

### Badges & Tags

#### Status Badge
```css
Background: var(--surface-elevated)
Border-radius: 6px
Padding: 4px 8px
Font: 12px / medium
```

#### Discount Tag (Linear/Notion style)
```css
Background: var(--accent-primary)
Text: white
Border-radius: 4px
Padding: 2px 6px
Font: 11px / semibold / uppercase
```

---

## Layout Patterns

### Hero Section

#### Dark Hero (Linear style)
```css
Background: var(--bg-primary)
Padding: 120px 48px
Max-width: 1200px
Text-align: center or left
```

**Structure:**
- Headline: var(--text-display)
- Subheadline: var(--text-body-lg), var(--text-secondary)
- CTA buttons: 16px gap
- Optional: Product screenshot with perspective transform

#### Light Hero (Notion style)
```css
Background: white
Padding: 80px 48px
Max-width: 1400px
Layout: 2-column (50/50)
```

**Structure:**
- Left: Text content
- Right: Illustration/Screenshot
- Trust badges below

### Feature Sections

#### Grid Layout (Linear/Bird style)
```css
Display: grid
Grid-columns: repeat(auto-fit, minmax(300px, 1fr))
Gap: 24px
Padding: 80px 48px
```

**Card Structure:**
- Icon/Illustration (48px)
- Title: var(--text-h4)
- Description: var(--text-body), var(--text-secondary)
- Optional: CTA link

#### Two-Column Feature (Linear style)
```css
Display: flex
Gap: 80px
Align-items: center
Padding: 120px 48px
```

**Structure:**
- Text side (40%): Headline + description + CTA
- Visual side (60%): Screenshot/illustration

### Pricing Section

#### Pricing Grid (Notion/Cursor style)
```css
Display: grid
Grid-columns: repeat(auto-fit, minmax(280px, 1fr))
Gap: 24px
Max-width: 1200px
```

**Card Structure:**
- Plan name: var(--text-h5)
- Price: var(--text-h1) + period var(--text-body)
- Features list: checkmarks + var(--text-body-sm)
- CTA button
- Recommended badge (if applicable)

### FAQ Section (Linear style)

```css
Max-width: 800px
Margin: 0 auto
Padding: 80px 48px
```

**Accordion Item:**
- Question: var(--text-h5), chevron icon
- Answer: var(--text-body), var(--text-secondary)
- Border-bottom: 1px solid var(--border-subtle)
- Padding: 24px 0

### Contact/CTA Section

#### Full-width CTA (Linear/Square style)
```css
Background: var(--bg-secondary) or gradient
Padding: 80px 48px
Text-align: center
Border-radius: 24px (inner section)
```

**Structure:**
- Headline: var(--text-h2)
- Subheadline: var(--text-body-lg)
- CTA buttons: primary + secondary

---

## Design Principles

### 1. **Dark-First Design**
- Primary theme: Dark mode with subtle surfaces
- Use elevation through subtle borders and backgrounds
- Maintain high contrast for accessibility (WCAG AAA)

### 2. **Minimalist Aesthetics**
- Clean, uncluttered interfaces
- Generous white space (dark space)
- Focus on content hierarchy

### 3. **Smooth Interactions**
- Ease-in-out transitions (0.2s - 0.4s)
- Subtle hover states (opacity, transform, border)
- Micro-animations for feedback

### 4. **Typography Hierarchy**
- Clear visual hierarchy through size and weight
- Limited font sizes (type scale)
- Consistent line heights for readability

### 5. **Flexible Grid System**
- Responsive breakpoints: 640px, 768px, 1024px, 1280px, 1536px
- Fluid layouts with max-widths
- Mobile-first approach

### 6. **Iconography**
- Consistent stroke width (1.5px - 2px)
- 24px base size
- Outlined style preferred
- Accent color for interactive icons

### 7. **Imagery**
- High-quality product screenshots
- Subtle shadows and elevation
- Perspective transforms for depth
- Rounded corners (8px - 16px)

---

## Breakpoints

```css
--breakpoint-sm: 640px
--breakpoint-md: 768px
--breakpoint-lg: 1024px
--breakpoint-xl: 1280px
--breakpoint-2xl: 1536px
```

### Responsive Patterns

#### Mobile (< 768px)
- Single column layouts
- Full-width buttons
- Reduced padding (24px)
- Smaller typography scale (0.9x)

#### Tablet (768px - 1024px)
- 2-column grids
- Adaptive padding (48px)
- Standard typography

#### Desktop (> 1024px)
- 3-4 column grids
- Maximum padding (80px - 120px)
- Full typography scale

---

## Animation & Transitions

### Timing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--spring: cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Common Transitions
```css
--transition-fast: 0.15s var(--ease-out)
--transition-base: 0.3s var(--ease-in-out)
--transition-slow: 0.5s var(--ease-in-out)
```

### Hover Effects
- Buttons: scale(1.02) + opacity 0.9
- Cards: translateY(-4px) + border glow
- Links: color transition + underline expand

---

## Accessibility Guidelines

### Color Contrast
- Text on dark: Minimum 7:1 ratio (AAA)
- Interactive elements: Clear focus states
- Error states: Color + icon + text

### Keyboard Navigation
- Visible focus indicators (2px outline)
- Logical tab order
- Skip to main content link

### Screen Readers
- Semantic HTML structure
- ARIA labels for icons
- Alt text for images

---

## Component Usage Examples

### Hero Section
```html
<section class="hero">
  <h1 class="hero__title">Linear is a purpose-built tool for planning and building products</h1>
  <p class="hero__subtitle">Meet the system for modern product development.</p>
  <div class="hero__cta">
    <button class="btn btn--primary">Start building</button>
  </div>
</section>
```

### Feature Card
```html
<div class="feature-card">
  <div class="feature-card__icon">
    <svg>...</svg>
  </div>
  <h3 class="feature-card__title">Issues</h3>
  <p class="feature-card__description">Create new tasks and subtasks in seconds</p>
</div>
```

### Pricing Card
```html
<div class="pricing-card pricing-card--recommended">
  <div class="pricing-card__badge">Recommended</div>
  <h3 class="pricing-card__plan">Business</h3>
  <div class="pricing-card__price">
    <span class="pricing-card__amount">$20</span>
    <span class="pricing-card__period">per member / month</span>
  </div>
  <button class="btn btn--primary btn--full">Get started</button>
  <ul class="pricing-card__features">
    <li>SAML SSO</li>
    <li>Unlimited teams</li>
    <li>Private teamspaces</li>
  </ul>
</div>
```

---

## Integration with Development Tools

### Tailwind CSS Configuration
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#5b6eff',
        secondary: '#0066ff',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
      }
    }
  }
}
```

### CSS-in-JS (Styled Components)
```js
const theme = {
  colors: {
    bgPrimary: '#000000',
    textPrimary: '#ffffff',
    accentPrimary: '#5b6eff',
  },
  spacing: {
    section: '80px',
    container: '24px',
  }
}
```

---

## Design System Governance

### File Structure
```
design-system/
├── tokens/
│   ├── colors.json
│   ├── typography.json
│   └── spacing.json
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── layouts/
│   ├── Hero.tsx
│   ├── Features.tsx
│   └── Pricing.tsx
└── docs/
    └── unified-style-guide.md
```

### Version Control
- Semantic versioning (1.0.0)
- Changelog for updates
- Migration guides for breaking changes

### Component Status
- **Stable**: Production-ready
- **Beta**: Testing phase
- **Deprecated**: To be removed

---

## Resources & Tools

### Design Tools
- Figma: Component library
- Sketch: Design files
- Adobe XD: Prototypes

### Development Tools
- Storybook: Component documentation
- Chromatic: Visual regression testing
- Design tokens: Style Dictionary

### Inspiration Sources
- Linear: Modern SaaS aesthetics
- Notion: Clean information architecture
- Cursor: Bold gradients and visual identity
- Cal.com: Minimalist scheduling UI
- Bird: Professional business tools
- Square: E-commerce excellence

---

*Last updated: 2025-09-24*
*Design System Version: 1.0.0*