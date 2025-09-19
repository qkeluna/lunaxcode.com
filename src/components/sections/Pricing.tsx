"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingProps {
  readonly onGetStarted: (serviceType: string) => void;
}

const pricingPlans = [
  {
    id: "landing_page",
    name: "Landing Page",
    price: "₱8,000",
    period: "",
    description: "Professional single-page website with AI chat widget",
    features: [
      "Responsive design for all devices",
      "AI-powered chat widget included", 
      "SEO optimization",
      "Contact form integration",
      "Google Analytics setup",
      "48-hour delivery guarantee"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false,
    timeline: "48 hours"
  },
  {
    id: "basic_website",
    name: "Basic Website", 
    price: "₱18,000",
    period: "",
    description: "3-5 page website with AI features and SEO optimization",
    features: [
      "Up to 5 pages",
      "Content Management System",
      "Advanced SEO optimization", 
      "AI chat widget",
      "Social media integration",
      "Mobile-first design",
      "Contact forms",
      "Google Analytics & Search Console"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false,
    timeline: "5-7 days"
  },
  {
    id: "advanced_website",
    name: "Advanced Website",
    price: "₱40,000", 
    period: "",
    description: "Full-featured website with CMS and advanced functionality",
    features: [
      "Unlimited pages",
      "Advanced CMS",
      "E-commerce integration",
      "Custom functionality", 
      "Advanced SEO & Analytics",
      "AI-powered features",
      "Multi-language support",
      "Performance optimization",
      "Security features",
      "Ongoing support (3 months)"
    ],
    buttonText: "Get Started",
    buttonVariant: "gradient" as const,
    popular: true,
    timeline: "2-3 weeks"
  },
];

const mobilePlans = [
  {
    id: "basic_mobile_app",
    name: "Basic Mobile App",
    price: "₱80,000",
    period: "",
    description: "Cross-platform mobile app with basic features",
    features: [
      "iOS & Android platforms",
      "Basic UI/UX design",
      "User authentication",
      "Push notifications", 
      "Offline functionality",
      "App store submission"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false,
    timeline: "4-6 weeks"
  },
  {
    id: "advanced_mobile_app", 
    name: "Advanced Mobile App",
    price: "₱150,000",
    period: "",
    description: "Feature-rich mobile app with backend integration",
    features: [
      "Cross-platform development",
      "Advanced UI/UX design",
      "Backend API integration",
      "Real-time features",
      "Payment integration", 
      "Advanced analytics",
      "App store optimization",
      "Ongoing maintenance (6 months)"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false,
    timeline: "8-12 weeks"
  },
];

export function Pricing({ onGetStarted }: PricingProps) {
  const getButtonStyles = (plan: typeof pricingPlans[0]) => {
    if (plan.buttonVariant === "gradient") {
      return "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:text-white border-0";
    }
    return "bg-slate-900 text-white border-slate-900 hover:bg-slate-800 hover:border-slate-800 hover:text-white";
  };

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
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-xl text-gray-800 dark:text-gray-100 max-w-3xl mx-auto">
            Choose the perfect package for your business needs. All plans include
            AI integration and our 100% satisfaction guarantee.
          </p>
        </motion.div>

        {/* Website Development Plans */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Website Development</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className={`relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border transition-all duration-300 hover:shadow-lg flex flex-col h-full ${
                  plan.popular
                    ? "border-purple-500 shadow-purple-500/10"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h4>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 dark:text-gray-400 ml-1">{plan.period}</span>}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{plan.timeline} delivery</div>
                </div>

                <div className="mb-6 flex-grow">
                  <p className="text-gray-800 dark:text-gray-100 text-sm mb-4">{plan.description}</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-100 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => onGetStarted(plan.id)}
                  variant="default"
                  className={`w-full py-3 text-sm font-medium rounded-lg transition-all duration-300 mt-auto ${getButtonStyles(plan)}`}
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile App Development Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Mobile App Development</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {mobilePlans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg flex flex-col h-full"
              >
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h4>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 dark:text-gray-400 ml-1">{plan.period}</span>}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{plan.timeline} delivery</div>
                </div>

                <div className="mb-6 flex-grow">
                  <p className="text-gray-800 dark:text-gray-100 text-sm mb-4">{plan.description}</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-100 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => onGetStarted(plan.id)}
                  variant="default"
                  className="w-full py-3 text-sm font-medium rounded-lg bg-slate-900 text-white border-slate-900 hover:bg-slate-800 hover:border-slate-800 hover:text-white transition-all duration-300 mt-auto"
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Add-ons and Payment Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
        >
          <h4 className="text-2xl font-bold !text-gray-900 dark:!text-white mb-6 text-center">Add-On Services</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-lg font-semibold !text-gray-900 dark:!text-white mb-2">Additional Pages</div>
              <div className="text-2xl font-bold text-blue-600">₱1,500-₱2,000</div>
              <div className="!text-gray-800 dark:!text-white">per page</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-lg font-semibold !text-gray-900 dark:!text-white mb-2">AI Content Generation</div>
              <div className="text-2xl font-bold text-purple-600">₱3,000-₱5,000</div>
              <div className="!text-gray-800 dark:!text-white">per project</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-lg font-semibold !text-gray-900 dark:!text-white mb-2">Monthly Maintenance</div>
              <div className="text-2xl font-bold text-green-600">₱3,000-₱5,000</div>
              <div className="!text-gray-800 dark:!text-white">per month</div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Payment & Delivery</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white mb-2">Payment Terms</div>
                <ul className="text-gray-800 dark:text-white space-y-1">
                  <li>• 30-50% upfront payment</li>
                  <li>• Balance on project delivery</li>
                  <li>• GCash, PayMaya, Bank Transfer</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white mb-2">What&apos;s Included</div>
                <ul className="text-gray-800 dark:text-white space-y-1">
                  <li>• Free consultation</li>
                  <li>• Project planning & design</li>
                  <li>• Development & testing</li>
                  <li>• Launch & training</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}