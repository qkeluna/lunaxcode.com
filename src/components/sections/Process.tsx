"use client";

import { motion } from "framer-motion";
import { MessageCircle, FileText, Code, Rocket } from "lucide-react";

export function Process() {
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
    visible: { opacity: 1, y: 0 },
  };

  const processSteps = [
    {
      icon: MessageCircle,
      title: "1. Consultation",
      description: "Free consultation to understand your business needs and goals",
      details: [
        "Discuss your vision and requirements",
        "Analyze your target audience",
        "Define project scope and timeline",
        "Provide detailed proposal"
      ]
    },
    {
      icon: FileText,
      title: "2. Planning & Design",
      description: "Detailed planning and design phase for your project",
      details: [
        "Create wireframes and mockups",
        "Design user interface and experience",
        "Plan technical architecture",
        "Get your approval on designs"
      ]
    },
    {
      icon: Code,
      title: "3. Development",
      description: "Professional development with regular updates",
      details: [
        "Clean, efficient code development",
        "Regular progress updates",
        "Testing and quality assurance",
        "Client feedback integration"
      ]
    },
    {
      icon: Rocket,
      title: "4. Launch & Support",
      description: "Deployment and ongoing support for your project",
      details: [
        "Deploy to production environment",
        "Training and documentation",
        "Performance optimization",
        "Ongoing maintenance support"
      ]
    }
  ];

  return (
    <section 
      id="process" 
      className="bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)]"
      style={{ paddingTop: 'var(--section-padding-md)', paddingBottom: 'var(--section-padding-md)' }}
    >
      <div className="container mx-auto px-[var(--container-padding)] lg:px-12 max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 font-bold text-[var(--text-primary)] mb-6">
            Our Development Process
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            A proven 4-step process that ensures your project is delivered on time, 
            within budget, and exceeds your expectations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ gap: 'var(--grid-gap)' }}
        >
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
                className="relative bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl p-6 hover:border-[var(--accent-primary)] transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-[var(--surface-elevated)] rounded-xl mb-6 mx-auto">
                  <IconComponent className="w-6 h-6 text-[var(--accent-primary)]" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-h5 font-semibold text-[var(--text-primary)] mb-3 text-center">
                  {step.title}
                </h3>
                
                <p className="text-body-sm text-[var(--text-secondary)] mb-4 text-center">
                  {step.description}
                </p>
                
                <ul className="space-y-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="text-caption text-[var(--text-secondary)] flex items-start">
                      <span className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
                
                {/* Step connector line - subtle Linear style */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-6 h-px bg-[var(--border-subtle)] transform -translate-y-1/2"></div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-3xl p-12">
            <h3 className="text-h3 font-bold text-[var(--text-primary)] mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-body-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Get in touch today for a free consultation and let&apos;s bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <button
                  onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200"
                >
                  View Pricing
                </button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium px-8 py-3 rounded-lg transition-all duration-200"
                >
                  Contact Us
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}