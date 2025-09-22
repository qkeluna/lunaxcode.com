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
      setIsScrolled(window.scrollY > 100);
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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700"
          : "bg-gradient-to-r from-slate-900 to-blue-900 dark:from-gray-900 dark:to-blue-900"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Lunaxcode
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Features", id: "features" },
              { name: "Services", id: "pricing" },
              { name: "Process", id: "process" },
              { name: "Contact", id: "contact" },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    : "text-white hover:text-blue-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle variant="header" isScrolled={isScrolled} />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => openModal("landing_page")}
                variant={isScrolled ? "default" : "secondary"}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              >
                Get Started
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white"}`} />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <div className="py-6 px-4 space-y-2">
              {[
                { name: "Features", id: "features" },
                { name: "Services", id: "pricing" },
                { name: "Process", id: "process" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="flex w-full text-left px-6 py-4 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 cursor-pointer min-h-[48px] items-center"
                  style={{ touchAction: 'manipulation' }}
                >
                  {item.name}
                </button>
              ))}
              <div className="px-2 pt-4 space-y-3">
                <div className="flex justify-center">
                  <ThemeToggle variant="mobile" />
                </div>
                <Button
                  onClick={() => {
                    openModal("landing_page");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-4 min-h-[48px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
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