"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useOnboardingStore } from "@/lib/store";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useOnboardingStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { name: "Features", id: "features" },
    { name: "Services", id: "pricing" },
    { name: "Process", id: "process" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <motion.header
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-subtle)]"
          : "bg-[var(--bg-primary)]/80 backdrop-blur-sm"
      }`}
      style={{ height: '64px' }}
    >
      <div className="container mx-auto px-[var(--container-padding)] lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
            className="flex items-center"
          >
            <div className="text-2xl font-bold text-[var(--text-primary)]">
              Lunaxcode
            </div>
          </motion.div>

          {/* Desktop Navigation - Linear/Notion style */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-body-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Right side - CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle variant="header" isScrolled={isScrolled} />
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                onClick={() => openModal("landing_page")}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg border-0 transition-all duration-200"
              >
                Get Started
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[var(--text-primary)]" />
            ) : (
              <Menu className="w-6 h-6 text-[var(--text-primary)]" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu - Slide down with backdrop blur */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden absolute top-full left-0 right-0 bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-lg"
          >
            <div className="py-6 px-[var(--container-padding)] space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="flex w-full text-left px-4 py-3 text-body font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] rounded-lg transition-all duration-200 min-h-[48px] items-center"
                  style={{ touchAction: 'manipulation' }}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile CTA and Theme Toggle */}
              <div className="pt-4 space-y-3 border-t border-[var(--border-subtle)] mt-4">
                <div className="flex justify-center">
                  <ThemeToggle variant="mobile" />
                </div>
                <Button
                  onClick={() => {
                    openModal("landing_page");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 min-h-[48px] bg-[var(--accent-primary)] hover:opacity-90 text-white font-medium rounded-lg border-0"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}