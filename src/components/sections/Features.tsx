"use client";

import { motion } from "framer-motion";
import { Zap, Globe, Smartphone, Bot, DollarSign, Cpu } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "48-Hour Landing Pages",
    description: "While competitors take 3-5 days minimum, we deliver professional landing pages in just 48 hours. No compromises on quality.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Globe,
    title: "Full Website Development",
    description: "Complete websites with CMS, advanced SEO, and multi-page functionality delivered in 5 days to 3 weeks depending on complexity.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform iOS and Android apps with modern UI/UX, backend integration, and push notifications in 4-12 weeks.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Bot,
    title: "AI Integration Included",
    description: "Every project comes with intelligent AI features - chat widgets for websites, smart features for mobile apps.",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: DollarSign,
    title: "SME-Friendly Pricing",
    description: "Starting at just ₱8,000 for landing pages, ₱18,000 for websites, and ₱80,000 for mobile apps. Affordable for all business sizes.",
    color: "from-red-400 to-rose-500",
  },
  {
    icon: Cpu,
    title: "AI-Powered Development",
    description: "Using cutting-edge AI tools to accelerate development while maintaining high quality and modern design standards across all services.",
    color: "from-indigo-400 to-blue-500",
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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Lunaxcode
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We combine speed, quality, and affordability to help Filipino SMEs establish
            and grow their digital presence with cutting-edge technology.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                <motion.div
                  className="mt-6 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of Filipino SMEs who have already accelerated their digital journey with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 shadow-lg"
              >
                View Pricing Plans
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Get Free Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}