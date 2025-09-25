/**
 * Unified Card Component
 * Combines shadcn/ui's flexibility with Polaris's systematic design tokens
 *
 * Features:
 * - Design token-based styling
 * - Flexible content areas (header, body, footer)
 * - Multiple variants and padding options
 * - Accessibility-first with proper semantic markup
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/design-tokens"

const cardVariants = cva(
  [
    // Base styles using design tokens
    "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
    "bg-[var(--color-bg-surface)] text-[var(--color-text)]",
    "transition-colors"
  ],
  {
    variants: {
      variant: {
        // Default card with subtle shadow
        default: "shadow-sm",

        // Elevated card with more prominent shadow
        elevated: "shadow-lg border-[var(--color-border)]",

        // Interactive card with hover states
        interactive: [
          "shadow-sm cursor-pointer",
          "hover:shadow-md hover:bg-[var(--color-bg-surface-hover)]",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-focus)]"
        ],

        // Outlined card with stronger border
        outlined: "border-2 border-[var(--color-border)] shadow-none",

        // Subdued card for less prominent content
        subdued: [
          "bg-[var(--color-bg-surface-secondary)]",
          "border-[var(--color-border-secondary)] shadow-none"
        ],

        // Critical/error card
        critical: [
          "border-[var(--color-border-critical)]",
          "bg-[var(--color-bg-surface)] shadow-sm"
        ],

        // Success card
        success: [
          "border-[var(--color-border-success)]",
          "bg-[var(--color-bg-surface)] shadow-sm"
        ]
      },

      padding: {
        none: "",
        sm: "p-3",
        md: "p-[var(--space-card-padding)]", // Uses semantic token
        lg: "p-6",
        xl: "p-8"
      },

      // Polaris-style sectioned layout
      sectioned: {
        true: "divide-y divide-[var(--color-border-secondary)]"
      }
    },

    defaultVariants: {
      variant: "default",
      padding: "md"
    }
  }
)

const cardHeaderVariants = cva([
  "flex items-center justify-between",
  "pb-[var(--space-card-gap)] mb-[var(--space-card-gap)]",
  "border-b border-[var(--color-border-secondary)]"
])

const cardTitleVariants = cva([
  "text-lg font-semibold leading-none tracking-tight",
  "text-[var(--color-text)]"
])

const cardDescriptionVariants = cva([
  "text-sm text-[var(--color-text-secondary)]",
  "mt-1.5"
])

const cardContentVariants = cva([
  "text-[var(--color-text)]"
])

const cardFooterVariants = cva([
  "flex items-center justify-between",
  "pt-[var(--space-card-gap)] mt-[var(--space-card-gap)]",
  "border-t border-[var(--color-border-secondary)]"
])

const cardSectionVariants = cva([
  "py-[var(--space-card-padding)] first:pt-0 last:pb-0"
])

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Render as different HTML element
   */
  as?: React.ElementType

  /**
   * Card title (for accessibility and SEO)
   */
  title?: string

  /**
   * Card description (for accessibility)
   */
  description?: string
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Card description specific props */
  variant?: string;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card content specific props */
  variant?: string;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card footer specific props */
  variant?: string;
}

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Section title
   */
  title?: string

  /**
   * Section actions (buttons, links, etc.)
   */
  actions?: React.ReactNode

  /**
   * Subdued styling for less prominent sections
   */
  subdued?: boolean
}

// Main Card Component
const UnifiedCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, sectioned, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, padding, sectioned, className }))}
        {...props}
      />
    )
  }
)
UnifiedCard.displayName = "UnifiedCard"

// Card Header
const UnifiedCardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, actions, children, ...props }, ref) => (
    <div ref={ref} className={cn(cardHeaderVariants({ className }))} {...props}>
      <div className="flex flex-col space-y-1.5">
        {children}
      </div>
      {actions && (
        <div className="flex items-center space-x-2">
          {actions}
        </div>
      )}
    </div>
  )
)
UnifiedCardHeader.displayName = "UnifiedCardHeader"

// Card Title
const UnifiedCardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = "h3", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(cardTitleVariants({ className }))}
      {...props}
    />
  )
)
UnifiedCardTitle.displayName = "UnifiedCardTitle"

// Card Description
const UnifiedCardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(cardDescriptionVariants({ className }))}
      {...props}
    />
  )
)
UnifiedCardDescription.displayName = "UnifiedCardDescription"

// Card Content
const UnifiedCardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(cardContentVariants({ className }))} {...props} />
  )
)
UnifiedCardContent.displayName = "UnifiedCardContent"

// Card Footer
const UnifiedCardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(cardFooterVariants({ className }))} {...props} />
  )
)
UnifiedCardFooter.displayName = "UnifiedCardFooter"

// Card Section (Polaris-style)
const UnifiedCardSection = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, title, actions, subdued, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardSectionVariants({ className }),
        subdued && "bg-[var(--color-bg-surface-secondary)] -mx-[var(--space-card-padding)] px-[var(--space-card-padding)]"
      )}
      {...props}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between mb-3">
          {title && (
            <h4 className="text-sm font-medium text-[var(--color-text)]">
              {title}
            </h4>
          )}
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  )
)
UnifiedCardSection.displayName = "UnifiedCardSection"

export {
  UnifiedCard,
  UnifiedCardHeader,
  UnifiedCardFooter,
  UnifiedCardTitle,
  UnifiedCardDescription,
  UnifiedCardContent,
  UnifiedCardSection,
}
