"use client";

import { motion } from "framer-motion";
import { Zap, Globe, Smartphone, Bot, DollarSign, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "48-Hour Landing Pages",
    description: "While competitors take 3-5 days minimum, we deliver professional landing pages in just 48 hours. No compromises on quality.",
  },
  {
    icon: Globe,
    title: "Full Website Development",
    description: "Complete websites with CMS, advanced SEO, and multi-page functionality delivered in 5 days to 3 weeks depending on complexity.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform iOS and Android apps with modern UI/UX, backend integration, and push notifications in 4-12 weeks.",
  },
  {
    icon: Bot,
    title: "AI Integration Included",
    description: "Every project comes with intelligent AI features - chat widgets for websites, smart features for mobile apps.",
  },
  {
    icon: DollarSign,
    title: "SME-Friendly Pricing",
    description: "Starting at just ₱9,999 for landing pages, ₱19,999 for websites, and ₱89,999 for mobile apps. Affordable for all business sizes.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Development",
    description: "Using cutting-edge AI tools to accelerate development while maintaining high quality and modern design standards across all services.",
  },
];

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section 
      id="features" 
      className="bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)]"
      style={{ paddingTop: 'var(--section-padding-md)', paddingBottom: 'var(--section-padding-md)' }}
    >
      <div className="container mx-auto px-[var(--container-padding)] lg:px-12 max-w-[1200px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 font-bold text-[var(--text-primary)] mb-6">
            Features
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            We combine speed, quality, and affordability to help Filipino SMEs establish and grow their digital presence with cutting-edge technology.
          </p>
        </motion.div>

        {/* Features Grid - Linear/Bird style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ gap: 'var(--grid-gap)' }}
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                }}
                className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl p-8 hover:border-[var(--accent-primary)] transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="inline-flex p-3 rounded-xl bg-[var(--surface-elevated)] mb-6 group-hover:bg-[var(--accent-primary)]/10 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-[var(--accent-primary)]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-h4 font-semibold text-[var(--text-primary)] mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section - Full-width Linear style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-3xl p-12 text-center">
            <h3 className="text-h3 font-bold text-[var(--text-primary)] mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-body-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Join hundreds of Filipino SMEs who have already accelerated their digital journey with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Button
                  onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200"
                >
                  View Pricing Plans
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-transparent border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 font-medium px-8 py-3 rounded-lg transition-all duration-200"
                >
                  Get Free Consultation
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}