/**
 * Unified Text Component
 * Combines Polaris's systematic typography with shadcn/ui's flexibility
 *
 * Features:
 * - Complete typography scale from design tokens
 * - Semantic color variants
 * - Flexible element rendering (as prop)
 * - Polaris-style variant naming
 * - Accessibility-first with proper semantic elements
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textVariants = cva("", {
  variants: {
    // Typography variants based on Polaris naming
    variant: {
      // Body text variants
      bodyXs: [
        "text-xs", // 11px
        "font-normal leading-[var(--font-line-height-300)]"
      ],
      bodySm: [
        "text-sm", // 12px
        "font-normal leading-[var(--font-line-height-400)]"
      ],
      bodyMd: [
        "text-base", // 16px
        "font-normal leading-[var(--font-line-height-500)]"
      ],
      bodyLg: [
        "text-lg", // 20px
        "font-normal leading-[var(--font-line-height-600)]"
      ],

      // Caption variants (smaller text)
      caption: [
        "text-xs", // 11px
        "font-normal leading-[var(--font-line-height-300)]",
        "tracking-[var(--font-letter-spacing-normal)]"
      ],
      captionMd: [
        "text-sm", // 12px
        "font-normal leading-[var(--font-line-height-400)]",
        "tracking-[var(--font-letter-spacing-normal)]"
      ],

      // Heading variants
      headingXs: [
        "text-base", // 16px
        "font-semibold leading-[var(--font-line-height-500)]",
        "tracking-[var(--font-letter-spacing-dense)]"
      ],
      headingSm: [
        "text-lg", // 20px
        "font-semibold leading-[var(--font-line-height-600)]",
        "tracking-[var(--font-letter-spacing-dense)]"
      ],
      headingMd: [
        "text-xl", // 24px
        "font-semibold leading-[var(--font-line-height-700)]",
        "tracking-[var(--font-letter-spacing-denser)]"
      ],
      headingLg: [
        "text-2xl", // 30px
        "font-semibold leading-[var(--font-line-height-800)]",
        "tracking-[var(--font-letter-spacing-denser)]"
      ],
      headingXl: [
        "text-3xl", // 36px
        "font-bold leading-[var(--font-line-height-1000)]",
        "tracking-[var(--font-letter-spacing-densest)]"
      ],
      heading2xl: [
        "text-[var(--font-size-1000)]", // 40px
        "font-bold leading-[var(--font-line-height-1200)]",
        "tracking-[var(--font-letter-spacing-densest)]"
      ]
    },

    // Color/tone variants using design tokens
    tone: {
      default: "text-[var(--color-text)]",
      secondary: "text-[var(--color-text-secondary)]",
      disabled: "text-[var(--color-text-disabled)]",

      // Interactive colors
      link: "text-[var(--color-text-link)] hover:text-[var(--color-text-link-hover)]",
      brand: "text-[var(--color-text-brand)] hover:text-[var(--color-text-brand-hover)]",

      // Status colors
      critical: "text-[var(--color-text-critical)]",
      success: "text-[var(--color-text-success)]",
      warning: "text-[var(--color-text-warning)]",

      // Special contexts
      inverse: "text-[var(--color-text-inverse)]",
      "inverse-secondary": "text-[var(--color-text-inverse-secondary)]",

      // On colored backgrounds
      "on-brand": "text-[var(--color-text-brand-on-bg-fill)]",
      "on-critical": "text-[var(--color-text-critical-on-bg-fill)]",
      "on-success": "text-[var(--color-text-success-on-bg-fill)]",
      "on-warning": "text-[var(--color-text-warning-on-bg-fill)]"
    },

    // Text alignment
    alignment: {
      start: "text-start",
      center: "text-center",
      end: "text-end",
      justify: "text-justify"
    },

    // Text decoration
    decoration: {
      none: "no-underline",
      underline: "underline underline-offset-4",
      strikethrough: "line-through"
    },

    // Font weight override (when variant weight isn't suitable)
    weight: {
      regular: "font-[var(--font-weight-regular)]",
      medium: "font-[var(--font-weight-medium)]",
      semibold: "font-[var(--font-weight-semibold)]",
      bold: "font-[var(--font-weight-bold)]"
    },

    // Truncation behavior
    truncate: {
      true: "truncate",
      false: ""
    },

    // Break behavior for long words/URLs
    breakWord: {
      true: "break-words",
      false: ""
    }
  },

  defaultVariants: {
    variant: "bodyMd",
    tone: "default",
    alignment: "start",
    decoration: "none"
  }
})

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  /**
   * The HTML element to render
   * @default "span"
   */
  as?:
    | "p"
    | "span"
    | "div"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "strong"
    | "em"
    | "small"
    | "abbr"
    | "code"
    | "kbd"
    | "samp"
    | "var"
    | "time"
    | "mark"
    | "del"
    | "ins"
    | "sub"
    | "sup"
    | "blockquote"
    | "cite"
    | "q"
    | "dfn"

  /**
   * Visually hidden text (for screen readers)
   */
  visuallyHidden?: boolean
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({
    className,
    variant,
    tone,
    alignment,
    decoration,
    weight,
    truncate,
    breakWord,
    as: Component = "span",
    visuallyHidden,
    ...props
  }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          textVariants({
            variant,
            tone,
            alignment,
            decoration,
            weight,
            truncate,
            breakWord
          }),
          visuallyHidden && "sr-only",
          className
        )}
        {...props}
      />
    )
  }
)

Text.displayName = "Text"

// Convenience components for common text elements
const Heading = React.forwardRef<HTMLHeadingElement, TextProps>(
  ({ as = "h2", variant = "headingMd", ...props }, ref) => (
    <Text ref={ref} as={as} variant={variant} {...props} />
  )
)
Heading.displayName = "Heading"

const Paragraph = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ as = "p", variant = "bodyMd", ...props }, ref) => (
    <Text ref={ref} as={as} variant={variant} {...props} />
  )
)
Paragraph.displayName = "Paragraph"

const Caption = React.forwardRef<HTMLElement, TextProps>(
  ({ variant = "caption", tone = "secondary", ...props }, ref) => (
    <Text ref={ref} variant={variant} tone={tone} {...props} />
  )
)
Caption.displayName = "Caption"

const Link = React.forwardRef<HTMLElement, TextProps>(
  ({ as = "span", tone = "link", decoration = "underline", ...props }, ref) => (
    <Text ref={ref} as={as} tone={tone} decoration={decoration} {...props} />
  )
)
Link.displayName = "Link"

const Code = React.forwardRef<HTMLElement, TextProps>(
  ({ as = "code", className, ...props }, ref) => (
    <Text
      ref={ref}
      as={as}
      className={cn(
        "font-mono text-sm bg-[var(--color-bg-surface-secondary)] px-1.5 py-0.5 rounded-[var(--radius-sm)]",
        className
      )}
      {...props}
    />
  )
)
Code.displayName = "Code"

export { Text, Heading, Paragraph, Caption, Link, Code, textVariants }

/**
 * Usage Examples:
 *
 * // Basic text
 * <Text>Default body text</Text>
 *
 * // Headings with semantic HTML
 * <Heading as="h1" variant="headingXl">
 *   Page Title
 * </Heading>
 *
 * <Heading as="h2" variant="headingLg">
 *   Section Title
 * </Heading>
 *
 * // Paragraphs
 * <Paragraph>
 *   This is a paragraph of body text with proper line height and spacing.
 * </Paragraph>
 *
 * <Paragraph variant="bodyLg" tone="secondary">
 *   Larger secondary paragraph text.
 * </Paragraph>
 *
 * // Status text
 * <Text tone="critical" variant="bodySm">
 *   Error message text
 * </Text>
 *
 * <Text tone="success" weight="medium">
 *   Success message
 * </Text>
 *
 * // Interactive text
 * <Text tone="link" decoration="underline" as="button">
 *   Click me
 * </Text>
 *
 * // Captions and small text
 * <Caption>
 *   Photo taken on March 1, 2024
 * </Caption>
 *
 * <Text variant="bodyXs" tone="secondary">
 *   Fine print text
 * </Text>
 *
 * // Text with special formatting
 * <Text truncate className="max-w-48">
 *   This is a very long text that will be truncated with ellipsis
 * </Text>
 *
 * <Text breakWord>
 *   https://very-long-url-that-might-break-layout.example.com/path
 * </Text>
 *
 * // Code and technical text
 * <Code>npm install @your-org/design-system</Code>
 *
 * <Text as="kbd" className="font-mono bg-[var(--color-bg-surface-secondary)] px-1 py-0.5 rounded">
 *   ⌘ + K
 * </Text>
 *
 * // Text on colored backgrounds
 * <div className="bg-[var(--color-bg-fill-brand)] p-4 rounded">
 *   <Text tone="on-brand" variant="headingSm">
 *     White text on brand background
 *   </Text>
 * </div>
 *
 * // Accessible visually hidden text
 * <Text visuallyHidden>
 *   This text is only available to screen readers
 * </Text>
 *
 * // Custom alignment and decoration
 * <Text
 *   variant="headingMd"
 *   alignment="center"
 *   decoration="underline"
 *   tone="brand"
 * >
 *   Centered underlined heading
 * </Text>
 *
 * // Time and data formatting
 * <Text as="time" dateTime="2024-03-01" variant="caption" tone="secondary">
 *   March 1, 2024
 * </Text>
 *
 * // Emphasized text
 * <Text as="strong" weight="semibold" tone="brand">
 *   Important information
 * </Text>
 *
 * <Text as="em" className="italic">
 *   Emphasized text
 * </Text>
 */