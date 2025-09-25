# AI Prompts for Unified Design System

These prompts are optimized for Claude Code and other AI assistants to generate components using the unified shadcn/ui + Polaris design system.

## Core System Prompt

```markdown
You are working with a unified design system that combines shadcn/ui's utility-first approach with Shopify Polaris's systematic design tokens.

## Design Token Architecture

Use these CSS custom properties in your components:

### Colors (Semantic Tokens)
- Backgrounds: `--color-bg`, `--color-bg-surface`, `--color-bg-surface-hover`
- Fills: `--color-bg-fill-brand`, `--color-bg-fill-secondary`, `--color-bg-fill-critical`
- Text: `--color-text`, `--color-text-secondary`, `--color-text-link`, `--color-text-critical`
- Borders: `--color-border`, `--color-border-focus`, `--color-border-critical`
- Icons: `--color-icon`, `--color-icon-secondary`, `--color-icon-brand`

### Typography
- Sizes: `--font-size-275` (11px) through `--font-size-1000` (40px)
- Weights: `--font-weight-regular` (450), `--font-weight-medium` (550), `--font-weight-semibold` (650), `--font-weight-bold` (700)
- Line heights: `--font-line-height-300` through `--font-line-height-1200`

### Spacing
- Scale: `--space-100` (4px) through `--space-3200` (128px)
- Semantic: `--space-card-padding`, `--space-card-gap`, `--space-button-group-gap`

### Border Radius
- `--radius-sm` (4px), `--radius-md` (6px), `--radius-lg` (8px), `--radius-full` (9999px)

## Component Patterns

### Use Class Variance Authority (CVA)
```typescript
const componentVariants = cva(
  "base-classes-with-design-tokens",
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

### Always Include
- Focus states: `focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-focus)]`
- Hover states using hover variants of tokens
- Disabled states with proper opacity and pointer-events
- Transition classes: `transition-colors`

### Component Structure
- Use React.forwardRef for proper ref handling
- Include TypeScript interfaces with JSDoc comments
- Support `asChild` prop when appropriate (using Radix Slot)
- Include comprehensive variants from both shadcn and Polaris

## Tone and Semantic Variants
Always include these semantic variants:
- `default`, `secondary`, `tertiary`
- `critical`/`destructive`, `success`, `warning`/`caution`
- `brand`, `inverse`
- Size variants: `sm`, `md`, `lg` (plus `micro` and `xl` where appropriate)

## Accessibility
- Proper ARIA attributes
- Semantic HTML elements
- Focus management
- Screen reader support
- Color contrast compliance (handled by design tokens)

Generate components following these patterns exactly.
```

## Component Generation Prompts

### Button Component

```markdown
Create a Button component using the unified design system with these requirements:

**Base Features:**
- CVA variants for: primary, secondary, destructive, success, outline, ghost, link, plain
- Sizes: micro, sm, md, lg, icon
- Support for fullWidth, loading states, icons, and disclosure indicators
- Use semantic design tokens: `--color-bg-fill-brand`, `--color-text-brand-on-bg-fill`, etc.

**Advanced Features:**
- Polaris-style textAlign prop (left, center, right, start, end)
- Loading spinner with disabled state
- Icon support (before text)
- Disclosure indicators (up, down, select)
- asChild prop for composition

**Design Token Usage:**
- Primary: `bg-[var(--color-bg-fill-brand)]` with hover states
- Secondary: `bg-[var(--color-bg-fill-secondary)]`
- Destructive: `bg-[var(--color-bg-fill-critical)]`
- Focus: `focus-visible:ring-[var(--color-border-focus)]`
- Spacing: Use `--space-` tokens for padding
- Border radius: `rounded-[var(--radius-md)]`
```

### Form Components

```markdown
Create form components (Input, Textarea, Select) using the unified design system:

**Base Features:**
- Input states: default, hover, focus, error, disabled
- Variants: default, filled, outlined
- Sizes: sm, md, lg
- Support for labels, help text, error messages

**Design Token Usage:**
- Background: `bg-[var(--color-input-bg-surface)]`
- Border: `border-[var(--color-input-border)]`
- Focus: `focus:border-[var(--color-border-focus)]`
- Error: `border-[var(--color-border-critical)]`
- Text: `text-[var(--color-text)]`
- Placeholder: `placeholder:text-[var(--color-text-disabled)]`

**Accessibility:**
- Proper label association
- ARIA error states
- Focus management
- Required field indicators
```

### Layout Components

```markdown
Create layout components (Card, Stack, Grid) using the unified design system:

**Card Features:**
- Variants: default, elevated, interactive, outlined, subdued, critical, success
- Sectioned layout support (Polaris-style)
- Padding options: none, sm, md, lg
- Header/footer with actions

**Stack Features:**
- Direction: vertical, horizontal
- Spacing using design tokens: `gap-[var(--space-200)]`
- Alignment options
- Wrap behavior

**Design Tokens:**
- Card background: `bg-[var(--color-bg-surface)]`
- Card border: `border-[var(--color-border)]`
- Card padding: `p-[var(--space-card-padding)]`
- Shadows: `shadow-sm`, `shadow-lg`
- Border radius: `rounded-[var(--radius-lg)]`
```

### Typography Components

```markdown
Create Text and Heading components using the unified typography system:

**Text Variants:**
- Body: bodyXs, bodySm, bodyMd, bodyLg
- Caption: caption, captionMd
- Headings: headingXs, headingSm, headingMd, headingLg, headingXl, heading2xl

**Tone Variants:**
- default, secondary, disabled
- link, brand
- critical, success, warning
- inverse, inverse-secondary
- on-brand, on-critical, on-success, on-warning

**Design Token Usage:**
- Font sizes: `text-[var(--font-size-400)]`
- Font weights: `font-[var(--font-weight-medium)]`
- Line heights: `leading-[var(--font-line-height-500)]`
- Letter spacing: `tracking-[var(--font-letter-spacing-dense)]`
- Colors: `text-[var(--color-text-secondary)]`

**Features:**
- Truncation support
- Break word behavior
- Text alignment
- Decoration options
- Semantic HTML elements (as prop)
```

### Navigation Components

```markdown
Create navigation components (Navbar, Sidebar, Breadcrumbs) using the unified design system:

**Base Features:**
- Active/inactive states
- Nested navigation support
- Mobile responsive behavior
- Icon support

**Design Token Usage:**
- Nav background: `bg-[var(--color-nav-bg)]`
- Nav surface: `bg-[var(--color-nav-bg-surface)]`
- Active states: `bg-[var(--color-nav-bg-surface-selected)]`
- Hover states: `hover:bg-[var(--color-nav-bg-surface-hover)]`
- Text: `text-[var(--color-text)]`
- Links: `text-[var(--color-text-link)]`

**Accessibility:**
- ARIA navigation landmarks
- Keyboard navigation
- Screen reader support
- Focus indicators
```

## Specialized Generation Prompts

### Dashboard Components

```markdown
Create dashboard components (Stats cards, Charts, Data tables) optimized for the unified design system:

**Requirements:**
- Data visualization friendly color palette
- Responsive grid layouts
- Loading states for async data
- Error states with proper error styling
- Consistent spacing using design tokens

**Colors:**
Use semantic tokens for data visualization:
- Success metrics: `--color-text-success`, `--color-bg-fill-success`
- Critical metrics: `--color-text-critical`, `--color-bg-fill-critical`
- Neutral metrics: `--color-text-secondary`
- Brand highlights: `--color-text-brand`
```

### E-commerce Components

```markdown
Create e-commerce components (Product cards, Checkout forms, Cart) using the unified design system:

**Requirements:**
- Product image display with proper aspect ratios
- Price display with primary/secondary pricing
- Add to cart buttons with loading states
- Form validation with error states
- Success confirmation states

**Specific Tokens:**
- Success actions: `--color-bg-fill-success`
- Critical actions: `--color-bg-fill-critical`
- Brand highlights: `--color-bg-fill-brand`
- Disabled states: `--color-bg-fill-disabled`
```

### Modal and Dialog Components

```markdown
Create modal and dialog components with the unified design system:

**Requirements:**
- Backdrop with proper opacity
- Focus trapping
- Escape key handling
- Various sizes (sm, md, lg, xl, full)
- Confirmation dialogs with appropriate button styling

**Design Tokens:**
- Backdrop: `bg-[var(--color-backdrop-bg)]` (rgba(0, 0, 0, 0.71))
- Surface: `bg-[var(--color-bg-surface)]`
- Border: `border-[var(--color-border)]`
- Shadow: `shadow-xl`
```

## Framework-Specific Prompts

### Vue.js Adaptation

```markdown
Convert the React component patterns to Vue 3 Composition API:

**Requirements:**
- Use `<script setup lang="ts">`
- Convert CVA variants to computed properties
- Use Vue's `class` binding for dynamic classes
- Include proper TypeScript interfaces
- Support v-model where appropriate
- Use Vue's ref forwarding patterns

**Example Structure:**
```vue
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

const buttonClass = computed(() => cn(
  'base-classes',
  {
    'bg-[var(--color-bg-fill-brand)]': props.variant === 'primary',
    'bg-[var(--color-bg-fill-secondary)]': props.variant === 'secondary',
    'h-8 px-3': props.size === 'sm',
    'h-10 px-4': props.size === 'md'
  }
))
</script>
```

### Angular Adaptation

```markdown
Convert the component patterns to Angular with these requirements:

**Structure:**
- Use Angular Component decorator
- Include proper TypeScript interfaces
- Support Angular's template binding syntax
- Use `[class]` for dynamic class binding
- Include proper input/output decorators

**Example:**
```typescript
@Component({
  selector: 'ds-button',
  template: `
    <button
      [class]="buttonClasses"
      [disabled]="disabled || loading"
      (click)="onClick.emit($event)">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary'
  @Input() size: 'sm' | 'md' | 'lg' = 'md'
  @Output() onClick = new EventEmitter<Event>()

  get buttonClasses(): string {
    return cn('base-classes', {
      'bg-[var(--color-bg-fill-brand)]': this.variant === 'primary'
    })
  }
}
```
```

## Advanced Usage Prompts

### Theme Generation

```markdown
Create a theme generator that produces CSS custom properties for different brand themes:

**Requirements:**
- Base 16-step color scales for each brand color
- Automatic light/dark theme generation
- Semantic token mapping
- Accessibility validation (contrast ratios)
- Export formats: CSS, JSON, JavaScript objects

**Output Structure:**
```css
:root[data-theme="brand-name"] {
  --color-bg-fill-brand: /* calculated brand color */;
  --color-text-brand-on-bg-fill: /* calculated contrast color */;
  /* ... all other semantic tokens ... */
}
```
```

### Design Token Validation

```markdown
Create validation utilities for the design system:

**Requirements:**
- CSS custom property usage validation
- Component variant completeness checking
- Accessibility compliance verification
- Design token reference validation
- Unused token detection

**Features:**
- TypeScript integration for compile-time checks
- ESLint rules for design token usage
- Storybook integration for visual testing
- Automated accessibility testing
```

## Best Practices Reminder

Always include these in generated components:

1. **TypeScript**: Full type safety with proper interfaces
2. **Accessibility**: ARIA attributes, focus management, semantic HTML
3. **Design Tokens**: Use CSS custom properties, never hard-coded values
4. **Responsive**: Mobile-first responsive design patterns
5. **Performance**: Lazy loading, code splitting where appropriate
6. **Testing**: Include test examples and documentation
7. **Documentation**: JSDoc comments and usage examples

## Error Handling

When components need error states:

```markdown
Include error handling with these patterns:

**Visual States:**
- Error borders: `border-[var(--color-border-critical)]`
- Error text: `text-[var(--color-text-critical)]`
- Error backgrounds: `bg-[var(--color-bg-surface-critical)]`
- Error icons: `text-[var(--color-icon-critical)]`

**Behavior:**
- Proper ARIA error attributes
- Error message association
- Error state persistence
- Recovery guidance
```