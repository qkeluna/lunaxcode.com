"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Clock, Star, Sparkles } from "lucide-react";

interface HeroProps {
  readonly onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const
      }
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)] overflow-hidden">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/5 dark:from-transparent dark:via-[var(--accent-primary)]/10 dark:to-[var(--accent-secondary)]/10"></div>
      
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-20 w-1 h-1 bg-[var(--accent-primary)] rounded-full"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-[var(--accent-secondary)] rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-[var(--accent-primary)] rounded-full"></div>
        <div className="absolute bottom-20 right-1/4 w-1 h-1 bg-[var(--accent-secondary)] rounded-full"></div>
      </div>

      <div className="container mx-auto px-[var(--container-padding)] sm:px-12 lg:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-[1200px] mx-auto"
          style={{ paddingTop: 'var(--section-padding-lg)', paddingBottom: 'var(--section-padding-lg)' }}
        >
          {/* Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-full text-[var(--text-primary)] text-body-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4 mr-2 text-[var(--accent-primary)]" />
            <span className="text-overline">Code at the Speed of Light</span>
          </motion.div>

          {/* Main Headline - Display typography */}
          <motion.h1
            variants={itemVariants}
            className="text-display font-bold text-[var(--text-primary)] mb-6 leading-tight tracking-tight"
          >
            Professional websites and{" "}
            <span className="block text-[var(--accent-primary)]">
              mobile apps delivered fast
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-body-lg text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Meet the system for modern product development. From 48-hour landing pages to full 
            mobile applications - we help Filipino SMEs establish and grow their digital presence.
          </motion.p>

          {/* CTA Buttons - Linear style */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            {/* Primary Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold px-8 py-4 text-body rounded-lg shadow-lg transition-all duration-200 group"
              >
                Start building
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>

            {/* Secondary Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-transparent border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 font-semibold px-8 py-4 text-body rounded-lg transition-all duration-200"
              >
                Learn more
              </Button>
            </motion.div>
          </motion.div>

          {/* Product Screenshot with perspective (Linear style) */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-5xl mx-auto mb-16"
          >
            <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 shadow-2xl">
              {/* Mock interface content */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[var(--accent-error)] rounded-full"></div>
                  <div className="w-3 h-3 bg-[var(--accent-warning)] rounded-full"></div>
                  <div className="w-3 h-3 bg-[var(--accent-success)] rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-[var(--surface-elevated)] rounded w-3/4"></div>
                  <div className="h-4 bg-[var(--surface-elevated)] rounded w-1/2"></div>
                  <div className="h-8 bg-[var(--accent-primary)]/20 rounded"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-12 bg-[var(--surface-elevated)] rounded"></div>
                    <div className="h-12 bg-[var(--surface-elevated)] rounded"></div>
                    <div className="h-12 bg-[var(--surface-elevated)] rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators - Minimalist */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-[var(--text-secondary)]"
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[var(--accent-success)] fill-current" />
              <span className="text-body-sm">4.9/5 Client Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--accent-primary)]" />
              <span className="text-body-sm">100% On-Time Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[var(--accent-warning)]" />
              <span className="text-body-sm">AI-Powered Development</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Subtle Linear style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-[var(--border-subtle)] rounded-full flex justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-[var(--text-secondary)] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}