# Unified Design System: shadcn/ui + Shopify Polaris

A comprehensive design system merging the best patterns from shadcn/ui's utility-first approach with Shopify Polaris's systematic design token architecture.

## Table of Contents

- [Overview](#overview)
- [Design Philosophy](#design-philosophy)
- [Design Tokens](#design-tokens)
- [Component Architecture](#component-architecture)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Component Patterns](#component-patterns)
- [Implementation Guidelines](#implementation-guidelines)
- [AI Integration](#ai-integration)

## Overview

This unified design system combines:

**From shadcn/ui:**
- Tailwind CSS utility-first approach
- Class Variance Authority (CVA) for component variants
- Radix UI primitives for accessibility
- Flexible, copy-paste component architecture

**From Shopify Polaris:**
- Comprehensive design token system
- 16-step color scales
- Semantic color aliases (bg-fill, bg-surface, text, icon, border)
- Systematic spacing and typography scales
- CSS Custom Properties architecture

## Design Philosophy

### Core Principles

1. **Systematic Flexibility**: Structured design tokens with flexible implementation
2. **Accessibility First**: Built-in WCAG compliance through semantic tokens
3. **Developer Experience**: Easy to implement, customize, and maintain
4. **Scalability**: Tokens that work from startup to enterprise
5. **Framework Agnostic**: Core tokens work with any CSS framework

### Design Token Philosophy

```
Raw Colors → Semantic Aliases → CSS Custom Properties → Utility Classes
```

Example:
```
blue[13] → color-text-link → --color-text-link → text-link
```

## Design Tokens

### Color Architecture

Our unified system uses Polaris's comprehensive 16-step color scales with shadcn's semantic naming:

#### Base Color Scales (16 steps each)
```typescript
// Raw color scales (1-16)
gray: rgba(255, 255, 255, 1) → rgba(26, 26, 26, 1)
blue: rgba(252, 253, 255, 1) → rgba(0, 22, 51, 1)
green: rgba(250, 255, 251, 1) → rgba(2, 38, 34, 1)
red: rgba(255, 250, 251, 1) → rgba(47, 4, 11, 1)
orange: rgba(255, 253, 250, 1) → rgba(37, 26, 0, 1)
yellow: rgba(255, 253, 246, 1) → rgba(31, 28, 0, 1)
purple: rgba(253, 253, 255, 1) → rgba(28, 0, 79, 1)
// ... additional colors
```

#### Semantic Color Tokens

**Background Colors:**
```css
--color-bg: /* Main page background */
--color-bg-surface: /* Card/panel background */
--color-bg-surface-hover: /* Interactive surface states */
--color-bg-surface-selected: /* Selected states */
--color-bg-fill: /* Button/input backgrounds */
--color-bg-fill-brand: /* Primary action backgrounds */
--color-bg-fill-critical: /* Error/destructive backgrounds */
```

**Text Colors:**
```css
--color-text: /* Primary text */
--color-text-secondary: /* Supporting text */
--color-text-disabled: /* Disabled text */
--color-text-link: /* Interactive links */
--color-text-brand: /* Brand accent text */
--color-text-critical: /* Error text */
```

**Border Colors:**
```css
--color-border: /* Default borders */
--color-border-focus: /* Focus rings */
--color-border-critical: /* Error borders */
```

### Typography Scale

Based on Polaris's systematic approach with shadcn's simplicity:

#### Font Sizes
```css
--font-size-275: 11px  /* xs */
--font-size-300: 12px  /* sm */
--font-size-400: 16px  /* base */
--font-size-500: 20px  /* lg */
--font-size-600: 24px  /* xl */
--font-size-750: 30px  /* 2xl */
--font-size-900: 36px  /* 3xl */
```

#### Font Weights
```css
--font-weight-regular: 450
--font-weight-medium: 550
--font-weight-semibold: 650
--font-weight-bold: 700
```

#### Line Heights
```css
--font-line-height-300: 12px
--font-line-height-400: 16px
--font-line-height-500: 20px
--font-line-height-600: 24px
--font-line-height-800: 32px
```

### Spacing Scale

Polaris's systematic spacing with shadcn naming conventions:

```css
--space-0: 0px     /* 0 */
--space-025: 1px   /* px */
--space-050: 2px   /* 0.5 */
--space-100: 4px   /* 1 */
--space-150: 6px   /* 1.5 */
--space-200: 8px   /* 2 */
--space-300: 12px  /* 3 */
--space-400: 16px  /* 4 */
--space-500: 20px  /* 5 */
--space-600: 24px  /* 6 */
--space-800: 32px  /* 8 */
--space-1000: 40px /* 10 */
--space-1200: 48px /* 12 */
--space-1600: 64px /* 16 */
--space-2000: 80px /* 20 */
```

### Border Radius Scale

```css
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 8px
--radius-xl: 12px
--radius-2xl: 16px
--radius-full: 9999px
```

## Component Architecture

### shadcn/ui Pattern (Utility-First)

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8"
      }
    }
  }
)
```

### Polaris Pattern (CSS Modules + Design Tokens)

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'plain'
  size?: 'micro' | 'slim' | 'medium' | 'large'
  tone?: 'critical' | 'success'
  fullWidth?: boolean
}

// CSS Module approach
<button className={classNames(
  styles.Button,
  variant && styles[variationName('variant', variant)],
  size && styles[variationName('size', size)]
)}>
```

### Unified Hybrid Approach

Combine the best of both:

```typescript
// Design token foundation
const buttonTokens = {
  primary: {
    bg: 'var(--color-bg-fill-brand)',
    color: 'var(--color-text-brand-on-bg-fill)',
    borderRadius: 'var(--radius-md)'
  }
}

// CVA with semantic tokens
const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-bg-fill-brand)] text-[var(--color-text-brand-on-bg-fill)] hover:bg-[var(--color-bg-fill-brand-hover)]",
        secondary: "bg-[var(--color-bg-fill-secondary)] text-[var(--color-text)] hover:bg-[var(--color-bg-fill-secondary-hover)]",
        destructive: "bg-[var(--color-bg-fill-critical)] text-[var(--color-text-critical-on-bg-fill)] hover:bg-[var(--color-bg-fill-critical-hover)]"
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
        md: "h-10 px-4 py-2 rounded-[var(--radius-md)]",
        lg: "h-12 px-8 rounded-[var(--radius-lg)]"
      }
    }
  }
)
```

## Color System

### Light Theme Implementation

```css
:root {
  /* Color Scheme */
  --color-scheme: light;

  /* Background Colors */
  --color-bg: rgb(241, 241, 241);
  --color-bg-surface: rgb(255, 255, 255);
  --color-bg-surface-hover: rgb(247, 247, 247);
  --color-bg-surface-selected: rgb(241, 241, 241);

  /* Text Colors */
  --color-text: rgb(48, 48, 48);
  --color-text-secondary: rgb(97, 97, 97);
  --color-text-disabled: rgb(181, 181, 181);
  --color-text-link: rgb(0, 91, 211);

  /* Brand Colors */
  --color-bg-fill-brand: rgb(48, 48, 48);
  --color-text-brand-on-bg-fill: rgb(255, 255, 255);

  /* Status Colors */
  --color-bg-fill-critical: rgb(199, 10, 36);
  --color-text-critical: rgb(142, 11, 33);
  --color-bg-fill-success: rgb(4, 123, 93);
  --color-text-success: rgb(1, 75, 64);
}
```

### Dark Theme Implementation

```css
[data-theme="dark"] {
  --color-scheme: dark;

  --color-bg: rgb(26, 26, 26);
  --color-bg-surface: rgb(48, 48, 48);
  --color-bg-surface-hover: rgb(74, 74, 74);

  --color-text: rgb(227, 227, 227);
  --color-text-secondary: rgb(181, 181, 181);
  --color-text-disabled: rgb(138, 138, 138);

  /* Maintain accessible contrast ratios */
}
```

## Typography

### Type Scale Implementation

```css
/* Base Typography Classes */
.text-xs { font-size: var(--font-size-275); line-height: var(--font-line-height-300); }
.text-sm { font-size: var(--font-size-300); line-height: var(--font-line-height-400); }
.text-base { font-size: var(--font-size-400); line-height: var(--font-line-height-500); }
.text-lg { font-size: var(--font-size-500); line-height: var(--font-line-height-600); }
.text-xl { font-size: var(--font-size-600); line-height: var(--font-line-height-700); }
.text-2xl { font-size: var(--font-size-750); line-height: var(--font-line-height-800); }
.text-3xl { font-size: var(--font-size-900); line-height: var(--font-line-height-1000); }

/* Weight Classes */
.font-normal { font-weight: var(--font-weight-regular); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }
```

### Text Component Variants

```typescript
const textVariants = cva("", {
  variants: {
    variant: {
      bodyXs: "text-xs font-normal",
      bodySm: "text-sm font-normal",
      bodyMd: "text-base font-normal",
      bodyLg: "text-lg font-normal",
      headingXs: "text-base font-semibold",
      headingSm: "text-lg font-semibold",
      headingMd: "text-xl font-semibold",
      headingLg: "text-2xl font-semibold",
      headingXl: "text-3xl font-bold"
    },
    tone: {
      default: "text-[var(--color-text)]",
      secondary: "text-[var(--color-text-secondary)]",
      disabled: "text-[var(--color-text-disabled)]",
      critical: "text-[var(--color-text-critical)]",
      success: "text-[var(--color-text-success)]"
    }
  }
})
```

## Spacing & Layout

### Spacing Utilities

```css
/* Margin Classes */
.m-0 { margin: var(--space-0); }
.m-1 { margin: var(--space-100); }
.m-2 { margin: var(--space-200); }
.m-3 { margin: var(--space-300); }
.m-4 { margin: var(--space-400); }
.m-6 { margin: var(--space-600); }
.m-8 { margin: var(--space-800); }

/* Padding Classes */
.p-0 { padding: var(--space-0); }
.p-1 { padding: var(--space-100); }
.p-2 { padding: var(--space-200); }
.p-3 { padding: var(--space-300); }
.p-4 { padding: var(--space-400); }
.p-6 { padding: var(--space-600); }
.p-8 { padding: var(--space-800); }

/* Gap Classes */
.gap-1 { gap: var(--space-100); }
.gap-2 { gap: var(--space-200); }
.gap-3 { gap: var(--space-300); }
.gap-4 { gap: var(--space-400); }
```

### Component Spacing Tokens

```css
/* Semantic Spacing */
--space-card-padding: var(--space-400);
--space-card-gap: var(--space-400);
--space-button-group-gap: var(--space-200);
--space-table-cell-padding: var(--space-150);
```

## Component Patterns

### Button Component

Complete implementation combining both approaches:

```typescript
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-focus)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-bg-fill-brand)] text-[var(--color-text-brand-on-bg-fill)] shadow",
          "hover:bg-[var(--color-bg-fill-brand-hover)]",
          "active:bg-[var(--color-bg-fill-brand-active)]"
        ],
        secondary: [
          "bg-[var(--color-bg-fill-secondary)] text-[var(--color-text)] shadow-sm",
          "hover:bg-[var(--color-bg-fill-secondary-hover)]",
          "active:bg-[var(--color-bg-fill-secondary-active)]"
        ],
        destructive: [
          "bg-[var(--color-bg-fill-critical)] text-[var(--color-text-critical-on-bg-fill)] shadow-sm",
          "hover:bg-[var(--color-bg-fill-critical-hover)]"
        ],
        outline: [
          "border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-sm",
          "hover:bg-[var(--color-bg-surface-hover)]"
        ],
        ghost: "hover:bg-[var(--color-bg-surface-hover)]",
        link: "text-[var(--color-text-link)] underline-offset-4 hover:underline"
      },
      size: {
        sm: "h-8 rounded-[var(--radius-sm)] px-3 text-xs",
        md: "h-10 rounded-[var(--radius-md)] px-4 py-2",
        lg: "h-12 rounded-[var(--radius-lg)] px-8",
        icon: "h-10 w-10 rounded-[var(--radius-md)]"
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

### Card Component

```typescript
const cardVariants = cva(
  "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-sm",
  {
    variants: {
      padding: {
        none: "",
        sm: "p-3",
        md: "p-[var(--space-card-padding)]",
        lg: "p-6"
      },
      variant: {
        default: "",
        elevated: "shadow-lg",
        outlined: "border-2"
      }
    },
    defaultVariants: {
      padding: "md",
      variant: "default"
    }
  }
)
```

## Implementation Guidelines

### Setup Instructions

1. **Install Dependencies**
```bash
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot
```

2. **Configure Tailwind CSS**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        border: "var(--color-border)",
        background: "var(--color-bg)",
        foreground: "var(--color-text)",
        primary: {
          DEFAULT: "var(--color-bg-fill-brand)",
          foreground: "var(--color-text-brand-on-bg-fill)"
        },
        secondary: {
          DEFAULT: "var(--color-bg-fill-secondary)",
          foreground: "var(--color-text)"
        },
        destructive: {
          DEFAULT: "var(--color-bg-fill-critical)",
          foreground: "var(--color-text-critical-on-bg-fill)"
        }
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)"
      }
    }
  }
}
```

3. **CSS Variables Setup**
```css
/* globals.css */
:root {
  /* Include all design token variables */
}
```

### Best Practices

1. **Use Semantic Tokens**: Always prefer semantic tokens over raw color values
2. **Consistent Spacing**: Use the spacing scale consistently across components
3. **Accessibility**: Ensure proper contrast ratios with semantic color tokens
4. **Component Variants**: Use CVA for scalable variant systems
5. **Design Token Updates**: Update tokens centrally for system-wide changes

## AI Integration

### Claude Code Prompts

```markdown
Use this design system with these tokens:
- Colors: --color-bg-fill-brand, --color-text-brand-on-bg-fill
- Spacing: --space-100 through --space-800
- Typography: --font-size-300 through --font-size-900
- Create components using CVA with semantic token classes
```

### Component Generation Template

```typescript
// Template for AI to use when creating new components
const [componentName]Variants = cva(
  "base-classes", // Always include base accessibility classes
  {
    variants: {
      variant: {
        // Use semantic token classes
        primary: "bg-[var(--color-bg-fill-brand)] text-[var(--color-text-brand-on-bg-fill)]"
      },
      size: {
        // Use spacing scale
        sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]"
      }
    }
  }
)
```

## Conclusion

This unified design system provides:

- **16-step color scales** for precise color control
- **Semantic token architecture** for maintainable theming
- **Utility-first implementation** for developer productivity
- **Accessibility-first approach** with proper contrast ratios
- **Framework flexibility** supporting React, Vue, Angular, and vanilla CSS
- **AI-optimized patterns** for efficient component generation

The system scales from simple websites to complex enterprise applications while maintaining consistency and accessibility standards.