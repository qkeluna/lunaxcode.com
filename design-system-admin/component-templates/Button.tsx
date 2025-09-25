/**
 * Unified Button Component
 * Combines shadcn/ui's CVA approach with Polaris design tokens
 *
 * Features:
 * - Design token-based styling
 * - Comprehensive variants from both systems
 * - Accessibility-first design
 * - Framework agnostic (can be adapted for Vue, Angular, etc.)
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    // Base styles with design tokens
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-focus)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
  ],
  {
    variants: {
      variant: {
        // Primary - Brand colors from Polaris tokens
        primary: [
          "bg-[var(--color-bg-fill-brand)] text-[var(--color-text-brand-on-bg-fill)] shadow-sm",
          "hover:bg-[var(--color-bg-fill-brand-hover)]",
          "active:bg-[var(--color-bg-fill-brand-active)]",
          "disabled:bg-[var(--color-bg-fill-brand-disabled)]"
        ],

        // Secondary - Polaris secondary fills
        secondary: [
          "bg-[var(--color-bg-fill-secondary)] text-[var(--color-text)] shadow-sm",
          "hover:bg-[var(--color-bg-fill-secondary-hover)]",
          "active:bg-[var(--color-bg-fill-secondary-active)]"
        ],

        // Tertiary - Subtle button style
        tertiary: [
          "bg-transparent text-[var(--color-text)] border border-[var(--color-border)]",
          "hover:bg-[var(--color-bg-surface-hover)]",
          "active:bg-[var(--color-bg-surface-active)]"
        ],

        // Destructive - Critical/error actions
        destructive: [
          "bg-[var(--color-bg-fill-critical)] text-[var(--color-text-critical-on-bg-fill)] shadow-sm",
          "hover:bg-[var(--color-bg-fill-critical-hover)]",
          "active:bg-[var(--color-bg-fill-critical-active)]"
        ],

        // Success - Success actions
        success: [
          "bg-[var(--color-bg-fill-success)] text-[var(--color-text-success-on-bg-fill)] shadow-sm",
          "hover:bg-[var(--color-bg-fill-success-hover)]"
        ],

        // Outline - shadcn/ui style with design tokens
        outline: [
          "border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-sm",
          "hover:bg-[var(--color-bg-surface-hover)] hover:text-[var(--color-text)]"
        ],

        // Ghost - Transparent with hover states
        ghost: [
          "hover:bg-[var(--color-bg-surface-hover)] hover:text-[var(--color-text)]"
        ],

        // Link - Text link style
        link: [
          "text-[var(--color-text-link)] underline-offset-4",
          "hover:underline hover:text-[var(--color-text-link-hover)]"
        ],

        // Plain - Polaris plain button (minimal)
        plain: [
          "text-[var(--color-text)] bg-transparent",
          "hover:bg-[var(--color-bg-surface-hover)]",
          "focus-visible:bg-[var(--color-bg-surface-active)]"
        ]
      },

      size: {
        // Micro - Polaris micro size
        micro: [
          "h-6 px-2 text-xs rounded-[var(--radius-sm)]",
          "font-medium"
        ],

        // Small - shadcn sm + Polaris slim
        sm: [
          "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
          "font-medium"
        ],

        // Medium - Default size (Polaris medium)
        md: [
          "h-10 px-4 py-2 text-sm rounded-[var(--radius-md)]",
          "font-medium"
        ],

        // Large - Large button size
        lg: [
          "h-12 px-8 text-base rounded-[var(--radius-lg)]",
          "font-medium"
        ],

        // Icon - Square button for icons only
        icon: [
          "h-10 w-10 rounded-[var(--radius-md)]"
        ]
      },

      // Polaris fullWidth prop
      fullWidth: {
        true: "w-full"
      },

      // Text alignment (from Polaris)
      textAlign: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        start: "text-start",
        end: "text-end"
      },

      // Tone (Polaris concept for semantic meaning)
      tone: {
        default: "",
        critical: "", // Handled by variant="destructive"
        success: ""   // Handled by variant="success"
      }
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      textAlign: "center"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as a child component (from shadcn/ui)
   */
  asChild?: boolean

  /**
   * Icon to display before the button text (from Polaris)
   */
  icon?: React.ReactNode

  /**
   * Show loading spinner (from Polaris)
   */
  loading?: boolean

  /**
   * Remove underline from button text (Polaris deprecated but included for compatibility)
   * @deprecated Use variant instead
   */
  removeUnderline?: boolean

  /**
   * Disclosure indicator (from Polaris)
   */
  disclosure?: "down" | "up" | "select" | boolean

  /**
   * Primary navigation link indicator (from Polaris)
   */
  dataPrimaryLink?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    fullWidth,
    textAlign,
    tone,
    asChild = false,
    icon,
    loading,
    disclosure,
    removeUnderline,
    children,
    disabled,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Handle loading state
    const isDisabled = disabled || loading

    // Prepare disclosure icon
    const disclosureIcon = React.useMemo(() => {
      if (!disclosure) return null

      switch (disclosure) {
        case "down":
        case true:
          return <ChevronDownIcon />
        case "up":
          return <ChevronUpIcon />
        case "select":
          return <SelectIcon />
        default:
          return null
      }
    }, [disclosure])

    return (
      <Comp
        className={cn(buttonVariants({
          variant,
          size,
          fullWidth,
          textAlign,
          tone,
          className
        }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <>
            <span className="animate-spin">
              <LoadingIcon />
            </span>
            {children}
          </>
        ) : (
          <>
            {icon && <span className="inline-flex">{icon}</span>}
            {children}
            {disclosureIcon && <span className="inline-flex">{disclosureIcon}</span>}
          </>
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }

// Icon components (would typically be imported from an icon library)
const ChevronDownIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const ChevronUpIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
)

const SelectIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
  </svg>
)

const LoadingIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

/**
 * Usage Examples:
 *
 * // Basic primary button
 * <Button>Save changes</Button>
 *
 * // Secondary with icon
 * <Button variant="secondary" icon={<PlusIcon />}>
 *   Add item
 * </Button>
 *
 * // Full width destructive
 * <Button variant="destructive" fullWidth>
 *   Delete account
 * </Button>
 *
 * // Loading state
 * <Button loading disabled>
 *   Processing...
 * </Button>
 *
 * // With disclosure
 * <Button disclosure="down">
 *   More options
 * </Button>
 *
 * // Ghost button with custom alignment
 * <Button variant="ghost" textAlign="left" fullWidth>
 *   Left aligned
 * </Button>
 *
 * // Link style
 * <Button variant="link" asChild>
 *   <a href="/learn-more">Learn more</a>
 * </Button>
 */