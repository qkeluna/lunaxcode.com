/**
 * Unified Design System Tokens and Utilities
 * Based on shadcn/ui + Shopify Polaris design system
 */

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
  }
} as const

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
 * Accessibility utilities
 */
export const a11y = {
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
