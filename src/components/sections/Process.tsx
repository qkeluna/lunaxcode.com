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
    <section id="process" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Development Process
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A proven 4-step process that ensures your project is delivered on time, 
            within budget, and exceeds your expectations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 mx-auto">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                  {step.description}
                </p>
                
                <ul className="space-y-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
                
                {/* Step connector line (hidden on mobile, visible on larger screens) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-y-1/2"></div>
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
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get in touch today for a free consultation and let&apos;s bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200"
              >
                View Pricing
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200"
              >
                Contact Us
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}