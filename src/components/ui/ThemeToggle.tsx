"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  readonly variant?: "header" | "mobile";
  readonly isScrolled?: boolean;
}

export function ThemeToggle({ variant = "header", isScrolled = false }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 px-0"
      >
        <Monitor className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Switch to dark mode";
      case "dark":
        return "Switch to system mode";
      default:
        return "Switch to light mode";
    }
  };

  const getButtonClasses = () => {
    if (variant === "mobile") {
      return "h-10 w-10 px-0 text-gray-700 hover:bg-gray-100 hover:text-blue-600 border border-gray-200";
    }
    
    if (isScrolled) {
      return "h-8 w-8 px-0 text-gray-700 hover:bg-gray-100 hover:text-blue-600";
    }
    
    return "h-8 w-8 px-0 text-white hover:bg-white/10 hover:text-white";
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={getButtonClasses()}
      aria-label={getLabel()}
    >
      {getIcon()}
      <span className="sr-only">{getLabel()}</span>
    </Button>
  );
}