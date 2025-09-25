# Unified Design System: shadcn/ui + Shopify Polaris

A comprehensive design system that combines the best of shadcn/ui's utility-first approach with Shopify Polaris's systematic design token architecture. This unified system provides scalable, accessible, and maintainable design patterns for modern web applications.

## 🎯 Overview

This project extracts and unifies design patterns from two leading design systems:

- **[shadcn/ui](https://github.com/shadcn-ui/ui)**: Tailwind CSS + Radix UI components with CVA variants
- **[Shopify Polaris](https://github.com/Shopify/polaris)**: Comprehensive design token system with semantic naming

### Key Features

- ✅ **16-step color scales** for precise color control
- ✅ **Semantic token architecture** for maintainable theming
- ✅ **Utility-first implementation** with Tailwind CSS
- ✅ **Accessibility-first design** with proper contrast ratios
- ✅ **Framework flexibility** (React, Vue, Angular, vanilla CSS)
- ✅ **AI-optimized patterns** for efficient component generation
- ✅ **TypeScript support** with full type safety
- ✅ **Dark mode support** with automatic token switching

## 📁 Project Structure

```
docs-repo/
├── unified-repo-style-guide.md         # Complete design system documentation
├── design-tokens/
│   ├── unified-repo-design-tokens.json # Design tokens in JSON format
│   └── unified-repo-design-tokens.css  # CSS custom properties
├── component-templates/
│   ├── Button.tsx                      # Unified Button component
│   ├── Card.tsx                        # Unified Card component
│   ├── Text.tsx                        # Typography component
│   └── utils.ts                        # Utility functions
└── ai-prompts/
    └── claude-code-prompts.md          # AI generation prompts

repo-analysis/
├── shadcn-ui/                          # shadcn/ui repository clone
└── polaris/                           # Shopify Polaris repository clone
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot
npm install -D tailwindcss postcss autoprefixer
```

### 2. Configure Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
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
        },
        muted: {
          DEFAULT: "var(--color-bg-surface-hover)",
          foreground: "var(--color-text-secondary)"
        }
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)"
      },
      fontFamily: {
        sans: "var(--font-family-sans)",
        mono: "var(--font-family-mono)"
      },
      fontSize: {
        xs: ["var(--font-size-275)", { lineHeight: "var(--font-line-height-300)" }],
        sm: ["var(--font-size-300)", { lineHeight: "var(--font-line-height-400)" }],
        base: ["var(--font-size-400)", { lineHeight: "var(--font-line-height-500)" }],
        lg: ["var(--font-size-500)", { lineHeight: "var(--font-line-height-600)" }],
        xl: ["var(--font-size-600)", { lineHeight: "var(--font-line-height-700)" }],
        "2xl": ["var(--font-size-750)", { lineHeight: "var(--font-line-height-800)" }],
        "3xl": ["var(--font-size-900)", { lineHeight: "var(--font-line-height-1000)" }]
      },
      spacing: {
        px: "var(--space-025)",
        0.5: "var(--space-050)",
        1: "var(--space-100)",
        1.5: "var(--space-150)",
        2: "var(--space-200)",
        3: "var(--space-300)",
        4: "var(--space-400)",
        5: "var(--space-500)",
        6: "var(--space-600)",
        8: "var(--space-800)",
        10: "var(--space-1000)",
        12: "var(--space-1200)",
        16: "var(--space-1600)",
        20: "var(--space-2000)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
```

### 3. Add CSS Variables

```css
/* globals.css */
@import './design-tokens/unified-repo-design-tokens.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

### 4. Copy Components

Copy components from `component-templates/` and start using them:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Text, Heading } from "@/components/ui/text"

export function Example() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>
          Get started with the unified design system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Text variant="bodyMd">
          This example shows the unified design system in action.
        </Text>
        <div className="flex gap-2">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

## 🎨 Design Token Architecture

### Color System

The unified system uses Polaris's 16-step color scales with semantic naming:

```css
/* Base colors (1-16 scale) */
--color-gray-1: rgba(255, 255, 255, 1);  /* Lightest */
--color-gray-16: rgba(26, 26, 26, 1);    /* Darkest */

/* Semantic tokens */
--color-bg-fill-brand: var(--color-gray-15);
--color-text-brand-on-bg-fill: var(--color-gray-1);
--color-border-focus: var(--color-blue-13);
```

### Typography Scale

Systematic typography with consistent naming:

```css
--font-size-275: 11px;  /* xs */
--font-size-400: 16px;  /* base */
--font-size-600: 24px;  /* xl */

--font-weight-regular: 450;
--font-weight-semibold: 650;
```

### Spacing System

Consistent spacing based on 4px baseline:

```css
--space-100: 4px;   /* 1 unit */
--space-200: 8px;   /* 2 units */
--space-400: 16px;  /* 4 units (base) */
--space-800: 32px;  /* 8 units */
```

## 🧩 Component Patterns

### CVA with Design Tokens

```tsx
const buttonVariants = cva(
  // Base styles with design tokens
  "inline-flex items-center justify-center font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-bg-fill-brand)] text-[var(--color-text-brand-on-bg-fill)]",
        secondary: "bg-[var(--color-bg-fill-secondary)] text-[var(--color-text)]"
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
        md: "h-10 px-4 py-2 rounded-[var(--radius-md)]"
      }
    }
  }
)
```

### Accessibility First

```tsx
<Button
  className={cn(
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-focus)]",
    "disabled:pointer-events-none disabled:opacity-50"
  )}
>
```

## 🌗 Dark Mode Support

Automatic theme switching with design tokens:

```css
[data-theme="dark"] {
  --color-bg: var(--color-gray-16);
  --color-text: var(--color-gray-1);
  /* All tokens automatically adjust */
}
```

```tsx
import { themeUtils } from "@/lib/utils"

// Theme controls
themeUtils.setTheme('dark')
themeUtils.toggleTheme()
themeUtils.watchSystemTheme((isDark) => {
  // Handle system theme changes
})
```

## 🤖 AI Integration

### Claude Code Prompts

Use the provided AI prompts to generate components:

```markdown
Create a Button component using the unified design system with these requirements:
- CVA variants for: primary, secondary, destructive, outline, ghost
- Sizes: sm, md, lg, icon
- Use semantic design tokens: --color-bg-fill-brand, --color-text-brand-on-bg-fill
```

### Auto-Generated Components

The design system is optimized for AI code generation with:
- Consistent patterns across all components
- Semantic token naming for easy AI understanding
- Comprehensive variant systems
- TypeScript interfaces with JSDoc

## 🔧 Framework Adapters

### React (Default)

```tsx
import { Button } from "@/components/ui/button"

<Button variant="primary" size="lg">
  React Button
</Button>
```

### Vue 3

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}>()

const buttonClass = computed(() => cn(
  'base-classes',
  {
    'bg-[var(--color-bg-fill-brand)]': props.variant === 'primary'
  }
))
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

### Angular

```typescript
@Component({
  selector: 'ds-button',
  template: `
    <button [class]="buttonClasses">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary'

  get buttonClasses(): string {
    return cn('base-classes', {
      'bg-[var(--color-bg-fill-brand)]': this.variant === 'primary'
    })
  }
}
```

## 📚 Documentation

### Complete Documentation

- **[Style Guide](./unified-repo-style-guide.md)**: Complete design system documentation
- **[Design Tokens](./design-tokens/)**: JSON and CSS token files
- **[Components](./component-templates/)**: React component examples
- **[AI Prompts](./ai-prompts/)**: Optimized prompts for code generation

### Key Benefits

1. **Systematic Design**: Based on proven design systems from shadcn/ui and Polaris
2. **Developer Experience**: Easy to implement, customize, and maintain
3. **Accessibility**: WCAG compliant with proper contrast ratios
4. **Performance**: Optimized for bundle size and runtime performance
5. **Flexibility**: Works with any CSS framework or vanilla CSS
6. **Future-Proof**: Semantic tokens allow easy theme updates

## 🛠 Development Tools

### Design Token Validation

```typescript
import { designTokens } from "@/lib/utils"

// Use semantic helpers
const brandColor = designTokens.colors.fill.brand
const primaryText = designTokens.colors.text.default
const cardPadding = designTokens.space.cardPadding
```

### Theme Development

```typescript
// Create custom themes
const customTheme = {
  "--color-bg-fill-brand": "#your-brand-color",
  "--color-text-brand-on-bg-fill": "#ffffff"
}
```

### Component Testing

```tsx
import { render, screen } from "@testing-library/react"
import { Button } from "@/components/ui/button"

test("button renders with correct design tokens", () => {
  render(<Button variant="primary">Test</Button>)

  const button = screen.getByRole("button")
  expect(button).toHaveClass("bg-[var(--color-bg-fill-brand)]")
})
```

## 📈 Roadmap

- [ ] **Figma Integration**: Design token synchronization with Figma
- [ ] **Storybook**: Interactive component documentation
- [ ] **Theme Builder**: Visual theme customization tool
- [ ] **CLI Tool**: Component generation and management
- [ ] **VS Code Extension**: Design token autocompletion
- [ ] **Additional Frameworks**: Svelte, Solid.js adapters

## 🤝 Contributing

This design system is built by analyzing and combining patterns from shadcn/ui and Shopify Polaris. Contributions should:

1. Maintain design token consistency
2. Follow accessibility guidelines
3. Include TypeScript types
4. Provide usage examples
5. Update documentation

## 📄 License

This project extracts and unifies publicly available design patterns. Please respect the original licenses:
- [shadcn/ui License](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)
- [Shopify Polaris License](https://github.com/Shopify/polaris/blob/main/LICENSE.md)

## 🙏 Acknowledgments

This unified design system is built upon the excellent work of:

- **[shadcn](https://twitter.com/shadcn)** for creating shadcn/ui
- **[Shopify Design Team](https://polaris.shopify.com)** for Polaris Design System
- **[Tailwind CSS Team](https://tailwindcss.com)** for the utility-first approach
- **[Radix UI Team](https://radix-ui.com)** for accessible primitives

---

## 🚀 Get Started

Ready to use this unified design system? Check out the [Style Guide](./unified-repo-style-guide.md) for complete documentation and implementation examples.

**Built with ❤️ for the design system community**