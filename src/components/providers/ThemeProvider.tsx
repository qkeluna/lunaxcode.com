"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

interface ThemeProviderProps {
  readonly children: React.ReactNode;
  readonly attribute?: "class" | "data-theme";
  readonly defaultTheme?: string;
  readonly enableSystem?: boolean;
  readonly disableTransitionOnChange?: boolean;
}

export function ThemeProvider({ 
  children, 
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}