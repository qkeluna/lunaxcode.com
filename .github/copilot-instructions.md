# Copilot Instructions for Lunaxcode.com

## Project Overview
This is a Next.js 15 marketing website for **Lunaxcode**, a Filipino web development agency specializing in rapid 48-hour landing page delivery. The site features a modern onboarding flow with multi-step forms and dynamic pricing.

## Tech Stack & Architecture
- **Framework**: Next.js 15 with App Router and React 19
- **Build Tool**: Turbopack (via `--turbopack` flag in dev/build scripts)
- **Package Manager**: pnpm (specified in package.json)
- **Styling**: Tailwind CSS v4 with shadcn/ui components (New York style)
- **State Management**: Zustand for onboarding modal state
- **Animations**: Framer Motion for component animations
- **Fonts**: Inter + Poppins (Google Fonts) with CSS variables
- **Theme**: next-themes with system preference support

## Key Development Patterns

### Component Structure
```
src/components/
├── landing/          # Page-specific components (OnboardingModal)
├── providers/        # Context providers (ThemeProvider)
├── sections/         # Major page sections (Hero, Features, etc.)
└── ui/              # shadcn/ui components with custom variants
```

### State Management Convention
- Use Zustand for global state (see `src/lib/store.ts`)
- Onboarding flow managed via `useOnboardingStore` with steps, form data, and modal state
- Reset state on modal close for clean user experience

### Styling Conventions
- Use `cn()` utility from `src/lib/utils.ts` for conditional classes
- Component variants use `class-variance-authority` (cva)
- Dark mode supported via CSS custom properties and class-based themes
- Global styles in `src/app/globals.css` with custom CSS variables

### Animation Patterns
- Framer Motion for page transitions and component reveals
- Container/item pattern for staggered animations (see Hero component)
- Consistent animation timings: `staggerChildren: 0.2, delayChildren: 0.3`

## Development Workflow

### Commands
```bash
pnpm dev          # Development with Turbopack
pnpm build        # Production build with Turbopack  
pnpm start        # Production server
pnpm lint         # ESLint check
```

### shadcn/ui Integration
- Configuration in `components.json` with New York style
- Aliases: `@/components`, `@/lib`, `@/ui`
- Custom button variants include focus-visible states and accessibility features
- CSS variables approach for theming

### SEO & Meta Configuration
- Comprehensive meta tags in `layout.tsx` targeting Filipino market
- OpenGraph and Twitter cards configured
- Structured robots meta for optimal crawling
- Canonical URLs and locale set to `en_PH`

## Business Context
- Target audience: Filipino SMEs needing rapid web development
- Core value prop: Professional websites delivered in 48 hours
- Services: Landing pages, mobile apps, AI chat widgets
- Onboarding captures service type, project details, and contact info

## File Naming & Organization
- Use kebab-case for directories (`landing/`, `sections/`)
- PascalCase for React components
- Collocate related components (modals with their triggers)
- Keep utility functions in `/lib` with descriptive names

## Key Integration Points
- Dynamic imports for heavy components (OnboardingModal) to avoid SSR issues
- Theme provider wraps entire app with system preference detection
- Form handling via react-hook-form with zod validation (imported but pattern not yet implemented)
- Global state resets on navigation to prevent stale data