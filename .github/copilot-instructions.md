# Copilot Instructions for Lunaxcode.com

## Project Overview
This is a Next.js 15 marketing website for **Lunaxcode**, a Filipino web development agency specializing in rapid 48-hour landing page delivery. The site features a comprehensive multi-step onboarding flow with service-specific forms, dynamic pricing, and modern animations.

## Tech Stack & Architecture
- **Framework**: Next.js 15.5.3 with App Router and React 19.1.0
- **Build Tool**: Turbopack (via `--turbopack` flag in dev/build scripts)
- **Package Manager**: pnpm@10.14.0 (enforced via packageManager field)
- **Styling**: Tailwind CSS v4 with shadcn/ui components (New York style)
- **State Management**: Zustand v5.0.8 for onboarding modal state
- **Animations**: Framer Motion v12.23.15 for component animations and page transitions
- **Forms**: React Hook Form v7.62.0 + Zod v4.1.9 validation + @hookform/resolvers
- **Icons**: Lucide React v0.544.0
- **UI Components**: Radix UI primitives with custom shadcn/ui styling
- **Fonts**: Inter + Poppins (Google Fonts) with CSS variables
- **Theme**: next-themes v0.4.6 with system preference support

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
- Use Zustand v5.0.8 for global state (see `src/lib/store.ts`)
- Onboarding flow managed via `useOnboardingStore` with comprehensive state:
  - `isModalOpen`: Boolean for modal visibility
  - `selectedService`: Current service type (landing_page, web_app, mobile_app)
  - `formData`: Accumulated form data across steps
  - `currentStep`: Current step in multi-step form (1-3)
- Actions include `openModal(service)`, `closeModal()`, `setFormData()`, `setCurrentStep()`, `reset()`
- Reset state on modal close for clean user experience

### Form Handling & Validation
- React Hook Form v7.62.0 with Zod v4.1.9 schema validation
- Service-specific validation schemas in OnboardingModal:
  - `basicInfoSchema`: Common fields (projectName, companyName, industry, etc.)
  - `serviceSpecificSchemas`: Different schemas per service type
  - Dynamic form rendering based on selected service
- Form resolver pattern: `zodResolver()` for seamless validation
- Multi-step form with step-by-step validation and progress tracking

### Styling Conventions
- Use `cn()` utility from `src/lib/utils.ts` for conditional classes with `tailwind-merge`
- Component variants use `class-variance-authority` (cva) for consistent styling patterns
- Dark mode supported via CSS custom properties and class-based themes
- Global styles in `src/app/globals.css` with custom CSS variables
- Tailwind CSS v4 with modern features and improved performance
- Consistent color scheme: Blue (#3B82F6) primary, Red (#EF4444) accent, Gray scale for text

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
- Configuration in `components.json` with New York style and RSC support
- TypeScript-first approach with strict type checking
- Aliases: `@/components`, `@/lib`, `@/ui`, `@/hooks` configured in both components.json and tsconfig.json
- Custom button variants include focus-visible states and accessibility features
- CSS variables approach for theming with `baseColor: "slate"`
- Icon library: Lucide React v0.544.0 for consistent iconography

### SEO & Meta Configuration
- Comprehensive meta tags in `layout.tsx` targeting Filipino market
- OpenGraph and Twitter cards configured
- Structured robots meta for optimal crawling
- Canonical URLs and locale set to `en_PH`
- Inter and Poppins fonts optimized with Next.js font optimization
- SEO-focused title: "Lunaxcode - Code at the Speed of Light | 48-Hour Landing Pages That Convert"

## Business Context
- Target audience: Filipino SMEs needing rapid web development
- Core value prop: Professional websites delivered in 48 hours
- Services: Landing pages (48 hours), full websites (5 days - 3 weeks), mobile apps (4-12 weeks)
- Pricing: Landing pages ₱9,999-25,999, Full websites ₱19,999-89,999, Mobile apps ₱89,999-999,999
- Add-ons: AI chat widgets, SEO optimization, maintenance packages
- Onboarding captures service type, project details, and contact info with comprehensive form validation

## File Naming & Organization
- Use kebab-case for directories (`landing/`, `sections/`)
- PascalCase for React components
- Collocate related components (modals with their triggers)
- Keep utility functions in `/lib` with descriptive names

## Key Integration Points
- Dynamic imports for heavy components (OnboardingModal) to avoid SSR issues
- Theme provider wraps entire app with system preference detection
- Form handling via react-hook-form with zod validation and service-specific schemas
- Global state resets on navigation to prevent stale data