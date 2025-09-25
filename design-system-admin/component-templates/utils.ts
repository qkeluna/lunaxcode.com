/**
 * Utility functions for the Unified Design System
 * Provides helper functions for component development
 */

import React from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names with proper conflict resolution
 * Merges Tailwind CSS classes and resolves conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Design Token Utilities
 * Helper functions for working with CSS custom properties
 */

export const designTokens = {
  // Color token getters
  getColor: (token: string) => `var(--color-${token})`,
  getSpace: (token: string) => `var(--space-${token})`,
  getRadius: (token: string) => `var(--radius-${token})`,
  getFontSize: (token: string) => `var(--font-size-${token})`,
  getFontWeight: (token: string) => `var(--font-weight-${token})`,

  // Semantic color helpers
  colors: {
    // Background tokens
    bg: {
      default: 'var(--color-bg)',
      surface: 'var(--color-bg-surface)',
      surfaceHover: 'var(--color-bg-surface-hover)',
      surfaceActive: 'var(--color-bg-surface-active)',
      surfaceSelected: 'var(--color-bg-surface-selected)',
      inverse: 'var(--color-bg-inverse)',
    },

    // Fill tokens
    fill: {
      brand: 'var(--color-bg-fill-brand)',
      brandHover: 'var(--color-bg-fill-brand-hover)',
      secondary: 'var(--color-bg-fill-secondary)',
      secondaryHover: 'var(--color-bg-fill-secondary-hover)',
      critical: 'var(--color-bg-fill-critical)',
      criticalHover: 'var(--color-bg-fill-critical-hover)',
      success: 'var(--color-bg-fill-success)',
      successHover: 'var(--color-bg-fill-success-hover)',
      warning: 'var(--color-bg-fill-warning)',
      caution: 'var(--color-bg-fill-caution)',
      disabled: 'var(--color-bg-fill-disabled)',
    },

    // Text tokens
    text: {
      default: 'var(--color-text)',
      secondary: 'var(--color-text-secondary)',
      disabled: 'var(--color-text-disabled)',
      link: 'var(--color-text-link)',
      linkHover: 'var(--color-text-link-hover)',
      brand: 'var(--color-text-brand)',
      brandOnFill: 'var(--color-text-brand-on-bg-fill)',
      critical: 'var(--color-text-critical)',
      criticalOnFill: 'var(--color-text-critical-on-bg-fill)',
      success: 'var(--color-text-success)',
      successOnFill: 'var(--color-text-success-on-bg-fill)',
      warning: 'var(--color-text-warning)',
      warningOnFill: 'var(--color-text-warning-on-bg-fill)',
      inverse: 'var(--color-text-inverse)',
    },

    // Border tokens
    border: {
      default: 'var(--color-border)',
      hover: 'var(--color-border-hover)',
      focus: 'var(--color-border-focus)',
      disabled: 'var(--color-border-disabled)',
      secondary: 'var(--color-border-secondary)',
      critical: 'var(--color-border-critical)',
      success: 'var(--color-border-success)',
      brand: 'var(--color-border-brand)',
    },

    // Icon tokens
    icon: {
      default: 'var(--color-icon)',
      secondary: 'var(--color-icon-secondary)',
      disabled: 'var(--color-icon-disabled)',
      brand: 'var(--color-icon-brand)',
      critical: 'var(--color-icon-critical)',
      success: 'var(--color-icon-success)',
      warning: 'var(--color-icon-warning)',
      inverse: 'var(--color-icon-inverse)',
    }
  },

  // Spacing tokens
  space: {
    0: 'var(--space-0)',
    px: 'var(--space-025)',
    0.5: 'var(--space-050)',
    1: 'var(--space-100)',
    1.5: 'var(--space-150)',
    2: 'var(--space-200)',
    3: 'var(--space-300)',
    4: 'var(--space-400)',
    5: 'var(--space-500)',
    6: 'var(--space-600)',
    8: 'var(--space-800)',
    10: 'var(--space-1000)',
    12: 'var(--space-1200)',
    16: 'var(--space-1600)',
    20: 'var(--space-2000)',
    24: 'var(--space-2400)',
    28: 'var(--space-2800)',
    32: 'var(--space-3200)',

    // Semantic spacing
    cardPadding: 'var(--space-card-padding)',
    cardGap: 'var(--space-card-gap)',
    buttonGroupGap: 'var(--space-button-group-gap)',
    tableCellPadding: 'var(--space-table-cell-padding)',
  },

  // Typography tokens
  typography: {
    fontFamily: {
      sans: 'var(--font-family-sans)',
      mono: 'var(--font-family-mono)',
    },

    fontSize: {
      xs: 'var(--font-size-275)',
      sm: 'var(--font-size-300)',
      base: 'var(--font-size-400)',
      lg: 'var(--font-size-500)',
      xl: 'var(--font-size-600)',
      '2xl': 'var(--font-size-750)',
      '3xl': 'var(--font-size-900)',
      '4xl': 'var(--font-size-1000)',
    },

    fontWeight: {
      regular: 'var(--font-weight-regular)',
      medium: 'var(--font-weight-medium)',
      semibold: 'var(--font-weight-semibold)',
      bold: 'var(--font-weight-bold)',
    },

    lineHeight: {
      tight: 'var(--font-line-height-300)',
      snug: 'var(--font-line-height-400)',
      normal: 'var(--font-line-height-500)',
      relaxed: 'var(--font-line-height-600)',
      loose: 'var(--font-line-height-800)',
    }
  },

  // Border radius tokens
  radius: {
    none: 'var(--radius-none)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    '3xl': 'var(--radius-3xl)',
    full: 'var(--radius-full)',
  },

  // Shadow tokens
  shadow: {
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
    '2xl': 'var(--shadow-2xl)',
  },

  // Motion tokens
  motion: {
    duration: {
      fast: 'var(--duration-100)',
      normal: 'var(--duration-200)',
      slow: 'var(--duration-300)',
    },
    easing: {
      easeIn: 'var(--easing-ease-in)',
      easeOut: 'var(--easing-ease-out)',
      easeInOut: 'var(--easing-ease-in-out)',
    }
  }
} as const

/**
 * Theme utilities
 */

export type ThemeMode = 'light' | 'dark' | 'system'

export const themeUtils = {
  /**
   * Set the theme mode
   */
  setTheme: (mode: ThemeMode) => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      mode = prefersDark ? 'dark' : 'light'
    }

    root.setAttribute('data-theme', mode)
    root.style.colorScheme = mode
  },

  /**
   * Get the current theme mode
   */
  getTheme: (): ThemeMode => {
    if (typeof document === 'undefined') return 'light'
    return (document.documentElement.getAttribute('data-theme') as ThemeMode) || 'light'
  },

  /**
   * Toggle between light and dark themes
   */
  toggleTheme: () => {
    const current = themeUtils.getTheme()
    themeUtils.setTheme(current === 'light' ? 'dark' : 'light')
  },

  /**
   * Watch for system theme changes
   */
  watchSystemTheme: (callback: (isDark: boolean) => void) => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handler = (e: MediaQueryListEvent) => {
      callback(e.matches)
    }

    mediaQuery.addEventListener('change', handler)

    // Return cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }
}

/**
 * Responsive utilities
 */

export const breakpoints = {
  xs: 320,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
} as const

export type Breakpoint = keyof typeof breakpoints

export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs}px)`,
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
} as const

/**
 * Create responsive hook for React components
 */
export function useBreakpoint() {
  if (typeof window === 'undefined') {
    return { current: 'sm' as Breakpoint, matches: {} }
  }

  const [current, setCurrent] = React.useState<Breakpoint>('sm')
  const [matches, setMatches] = React.useState<Record<Breakpoint, boolean>>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
  })

  React.useEffect(() => {
    const mediaQueryLists = Object.entries(mediaQueries).map(([key, query]) => ({
      key: key as Breakpoint,
      mql: window.matchMedia(query)
    }))

    const updateBreakpoints = () => {
      const newMatches: Record<Breakpoint, boolean> = {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
      }

      let currentBreakpoint: Breakpoint = 'xs'

      mediaQueryLists.forEach(({ key, mql }) => {
        newMatches[key] = mql.matches
        if (mql.matches) {
          currentBreakpoint = key
        }
      })

      setMatches(newMatches)
      setCurrent(currentBreakpoint)
    }

    // Initial update
    updateBreakpoints()

    // Add listeners
    mediaQueryLists.forEach(({ mql }) => {
      mql.addEventListener('change', updateBreakpoints)
    })

    // Cleanup
    return () => {
      mediaQueryLists.forEach(({ mql }) => {
        mql.removeEventListener('change', updateBreakpoints)
      })
    }
  }, [])

  return { current, matches }
}

/**
 * Accessibility utilities
 */

export const a11y = {
  /**
   * Generate unique IDs for form controls
   */
  useId: (() => {
    let counter = 0
    return (prefix = 'id') => `${prefix}-${++counter}`
  })(),

  /**
   * Screen reader only styles
   */
  srOnly: 'sr-only',

  /**
   * Focus ring styles using design tokens
   */
  focusRing: 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-focus)]',

  /**
   * Generate ARIA attributes for form validation
   */
  getAriaErrorProps: (hasError: boolean, errorId?: string) => ({
    'aria-invalid': hasError,
    'aria-describedby': hasError && errorId ? errorId : undefined,
  }),
}

/**
 * Animation utilities
 */

export const animations = {
  /**
   * Transition classes using design tokens
   */
  transition: {
    colors: 'transition-colors duration-[var(--duration-150)] ease-[var(--easing-ease-in-out)]',
    all: 'transition-all duration-[var(--duration-150)] ease-[var(--easing-ease-in-out)]',
    fast: 'transition-colors duration-[var(--duration-100)] ease-[var(--easing-ease-out)]',
    slow: 'transition-all duration-[var(--duration-300)] ease-[var(--easing-ease-in-out)]',
  },

  /**
   * Common animation classes
   */
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',

  /**
   * Enter/exit animations
   */
  slideIn: {
    from: {
      top: 'transform translate-y-2 opacity-0',
      right: 'transform translate-x-2 opacity-0',
      bottom: 'transform -translate-y-2 opacity-0',
      left: 'transform -translate-x-2 opacity-0',
    },
    to: 'transform translate-x-0 translate-y-0 opacity-100'
  },

  fadeIn: {
    from: 'opacity-0',
    to: 'opacity-100'
  },

  scaleIn: {
    from: 'transform scale-95 opacity-0',
    to: 'transform scale-100 opacity-100'
  }
}

/**
 * Form utilities
 */

export const forms = {
  /**
   * Standard form field wrapper classes
   */
  field: 'space-y-2',

  /**
   * Label styles
   */
  label: 'text-sm font-medium text-[var(--color-text)] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',

  /**
   * Help text styles
   */
  helpText: 'text-xs text-[var(--color-text-secondary)]',

  /**
   * Error text styles
   */
  errorText: 'text-xs text-[var(--color-text-critical)]',

  /**
   * Generate form field IDs and ARIA attributes
   */
  getFieldProps: (id: string, hasError?: boolean, errorMessage?: string, helpText?: string) => {
    const helpId = helpText ? `${id}-help` : undefined
    const errorId = hasError && errorMessage ? `${id}-error` : undefined
    const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined

    return {
      fieldId: id,
      helpId,
      errorId,
      'aria-describedby': describedBy,
      'aria-invalid': hasError,
    }
  }
}

/**
 * Layout utilities
 */

export const layout = {
  /**
   * Container classes with responsive padding
   */
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',

  /**
   * Common flex layouts
   */
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    end: 'flex items-center justify-end',
    col: 'flex flex-col',
    colCenter: 'flex flex-col items-center justify-center',
  },

  /**
   * Grid layouts
   */
  grid: {
    cols1: 'grid grid-cols-1',
    cols2: 'grid grid-cols-1 sm:grid-cols-2',
    cols3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cols4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    autoFit: 'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
    autoFill: 'grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))]',
  },

  /**
   * Stack layouts with design token gaps
   */
  stack: {
    xs: 'space-y-[var(--space-100)]',
    sm: 'space-y-[var(--space-200)]',
    md: 'space-y-[var(--space-300)]',
    lg: 'space-y-[var(--space-400)]',
    xl: 'space-y-[var(--space-600)]',
  }
}

/**
 * Export all utilities
 */
export {
  React,
  clsx,
  twMerge
}

// Type exports (ClassValue from clsx, others defined above)
export type { ClassValue }