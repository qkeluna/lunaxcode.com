"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Clock, CreditCard, Shield, Globe } from "lucide-react";

interface PricingProps {
  readonly onGetStarted: (serviceType: string) => void;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: string;
  popular: boolean;
  timeline: string;
  displayOrder: number;
  category?: string;
}

interface AddOnService {
  id: string;
  name: string;
  price: string;
  description: string;
  unit?: string;
}

// Static data for fallback
const webDevelopmentPlans = [
  {
    id: "landing_page",
    name: "Landing Page",
    price: "₱9,999",
    period: "- ₱25,999",
    description: "Perfect for startups and small businesses",
    features: [
      "48-hour delivery guaranteed",
      "1 professional responsive page",
      "AI chat widget integration",
      "Basic SEO optimization",
      "Google Analytics setup",
      "Mobile-first design",
      "1 round of revisions"
    ],
    buttonText: "Get Started",
    buttonVariant: "gradient",
    popular: true,
    timeline: "48 hours",
    displayOrder: 1,
    category: "web"
  },
  {
    id: "basic_website",
    name: "Basic Website",
    price: "₱19,999",
    period: "- ₱39,999",
    description: "Ideal for growing businesses",
    features: [
      "5-7 days delivery",
      "3-5 static pages",
      "AI chat widget",
      "SEO optimization",
      "Contact forms",
      "Analytics integration",
      "2 rounds of revisions",
      "Basic blog setup"
    ],
    buttonText: "Choose Plan",
    buttonVariant: "outline",
    popular: false,
    timeline: "5-7 days",
    displayOrder: 2,
    category: "web"
  },
  {
    id: "advanced_website",
    name: "Advanced Website",
    price: "₱49,999",
    period: "- ₱89,999",
    description: "For established businesses",
    features: [
      "2-3 weeks delivery",
      "8-12 pages with CMS",
      "Advanced AI features",
      "E-commerce ready",
      "Blog setup",
      "Advanced SEO & analytics",
      "3 rounds of revisions",
      "Performance optimization"
    ],
    buttonText: "Choose Plan",
    buttonVariant: "outline",
    popular: false,
    timeline: "2-3 weeks",
    displayOrder: 3,
    category: "web"
  }
];

const mobileAppPlans = [
  {
    id: "basic_mobile_app",
    name: "Basic Mobile App",
    price: "₱89,999",
    period: "- ₱199,999",
    description: "Cross-platform mobile solution",
    features: [
      "4-6 weeks delivery",
      "iOS & Android compatible",
      "Basic AI integration",
      "User authentication",
      "Push notifications",
      "App store submission",
      "3 months support",
      "Basic analytics"
    ],
    buttonText: "Get Quote",
    buttonVariant: "outline",
    popular: false,
    timeline: "4-6 weeks",
    displayOrder: 1,
    category: "mobile"
  },
  {
    id: "advanced_mobile_app",
    name: "Advanced Mobile App",
    price: "₱299,999",
    period: "- ₱999,999",
    description: "Enterprise-grade mobile application",
    features: [
      "8-12 weeks delivery",
      "Advanced AI features",
      "Backend API development",
      "Real-time features",
      "Advanced security",
      "Custom integrations",
      "6 months support",
      "Advanced analytics & reporting"
    ],
    buttonText: "Get Quote",
    buttonVariant: "gradient",
    popular: true,
    timeline: "8-12 weeks",
    displayOrder: 2,
    category: "mobile"
  }
];

const addOnServices: AddOnService[] = [
  {
    id: "additional_pages",
    name: "Additional Pages",
    price: "₱1,999",
    description: "Extra pages for your website",
    unit: "per page"
  },
  {
    id: "ai_content_generation",
    name: "AI Content Generation",
    price: "₱4,999",
    description: "AI-powered content creation",
    unit: "per package"
  },
  {
    id: "monthly_maintenance",
    name: "Monthly Maintenance",
    price: "₱3,999",
    description: "Ongoing support and updates",
    unit: "per month"
  },
  {
    id: "seo_optimization",
    name: "Advanced SEO Package",
    price: "₱7,999",
    description: "Comprehensive SEO optimization",
    unit: "one-time"
  },
  {
    id: "e_commerce_integration",
    name: "E-commerce Integration",
    price: "₱15,999",
    description: "Payment gateway and shopping cart",
    unit: "one-time"
  },
  {
    id: "custom_integrations",
    name: "Custom API Integration",
    price: "₱9,999",
    description: "Third-party service integrations",
    unit: "per integration"
  }
];

export function Pricing({ onGetStarted }: PricingProps) {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const response = await fetch('/api/cms/pricing');
        if (response.ok) {
          const plans = await response.json();
          if (plans.length > 0) {
            setPricingPlans(plans);
          } else {
            // Fallback to static data if no plans in database
            setPricingPlans([...webDevelopmentPlans, ...mobileAppPlans]);
          }
        } else {
          // Fallback to static data on API error
          setPricingPlans([...webDevelopmentPlans, ...mobileAppPlans]);
        }
      } catch (error) {
        console.error('Error fetching pricing plans:', error);
        // Fallback to static data
        setPricingPlans([...webDevelopmentPlans, ...mobileAppPlans]);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingPlans();
  }, []);

  const getButtonStyles = (plan: PricingPlan) => {
    if (plan.buttonVariant === "gradient") {
      return "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0";
    }
    return "border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20";
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

  // Separate plans by category, fallback to static data structure
  const webPlans = pricingPlans.filter(plan => plan.category === 'web' || plan.id.includes('page') || plan.id.includes('website'));
  const mobilePlans = pricingPlans.filter(plan => plan.category === 'mobile' || plan.id.includes('mobile') || plan.id.includes('app'));
  
  // Use static data if dynamic data doesn't have proper categories
  const finalWebPlans = webPlans.length > 0 ? webPlans : webDevelopmentPlans;
  const finalMobilePlans = mobilePlans.length > 0 ? mobilePlans : mobileAppPlans;

  if (loading) {
    return (
      <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse max-w-2xl mx-auto"></div>
          </div>
          
          {/* Web Development Loading */}
          <div className="mb-16">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8 max-w-xs mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="space-y-2 mb-6">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    ))}
                  </div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Development Loading */}
          <div className="mb-16">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8 max-w-xs mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="space-y-2 mb-6">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    ))}
                  </div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your Perfect{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Digital Solution
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From lightning-fast landing pages to comprehensive mobile applications. 
            All plans include AI integration and our satisfaction guarantee.
          </p>
        </motion.div>

        {/* Web Development Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <Globe className="mr-3 h-8 w-8 text-blue-600" />
              Web Development
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Professional websites delivered at the speed of light
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {finalWebPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className={`relative rounded-2xl border-2 p-8 shadow-lg transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900 flex flex-col h-full ${
                  plan.popular
                    ? "border-blue-500 scale-105"
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 dark:text-gray-400 ml-1">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    <Clock className="w-4 h-4 mr-1" />
                    {plan.timeline}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button - Fixed at bottom */}
                <Button
                  className={`w-full mt-auto ${getButtonStyles(plan)}`}
                  onClick={() => onGetStarted(plan.id)}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Mobile Development Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <svg className="mr-3 h-8 w-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM6 4a1 1 0 011-1h6a1 1 0 011 1v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4zm2 10a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Mobile App Development
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Cross-platform mobile solutions that drive engagement
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {finalMobilePlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                className={`relative rounded-2xl border-2 p-8 shadow-lg transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900 flex flex-col h-full ${
                  plan.popular
                    ? "border-purple-500 scale-105"
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 dark:text-gray-400 ml-1">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    <Clock className="w-4 h-4 mr-1" />
                    {plan.timeline}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button - Fixed at bottom */}
                <Button
                  className={`w-full mt-auto ${getButtonStyles(plan)}`}
                  onClick={() => onGetStarted(plan.id)}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Add-On Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Add-On Services
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Enhance your project with these additional features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOnServices.map((addon, index) => (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-md"
              >
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {addon.name}
                  </h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {addon.price}
                  </div>
                  {addon.unit && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {addon.unit}
                    </div>
                  )}
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {addon.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment Terms Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
                <CreditCard className="mr-3 h-6 w-6 text-blue-600" />
                Payment Terms & Conditions
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3">
                  <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Payment Methods</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    GCash, PayMaya, Bank Transfer, Credit/Debit Cards
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Guarantee</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    100% satisfaction or money back within 7 days
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Payment Schedule</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    50% upfront, 50% upon completion
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3">
                  <svg className="h-8 w-8 text-orange-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Support</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Free support for 30 days post-delivery
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Important Notes:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  All prices are in Philippine Peso (₱) and subject to applicable taxes
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Project timeline starts after initial payment and content approval
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Additional revisions beyond included rounds are charged at ₱999 per revision
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Hosting and domain costs are separate and billed annually
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* All Plans Include Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              All Plans Include
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-blue-600 dark:text-blue-400 text-3xl mb-3">🚀</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Lightning Fast Delivery
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Quick turnaround times without compromising quality
                </p>
              </div>
              <div className="text-center">
                <div className="text-blue-600 dark:text-blue-400 text-3xl mb-3">🤖</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  AI Integration
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Smart features powered by cutting-edge AI technology
                </p>
              </div>
              <div className="text-center">
                <div className="text-blue-600 dark:text-blue-400 text-3xl mb-3">✅</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  100% Satisfaction
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Unlimited revisions until you&apos;re completely happy
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}