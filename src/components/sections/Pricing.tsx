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
  button_text: string;
  button_variant: string;
  popular: boolean;
  timeline: string;
  display_order: number;
  category?: string;
  is_active: boolean;
}

interface AddOnService {
  id: string;
  name: string;
  price: string;
  description: string;
  unit?: string;
  category?: string;
  icon?: string;
  popular: boolean;
  display_order: number;
  is_active: boolean;
}

// Fallback data for when external API is not available
function getFallbackPricing(): PricingPlan[] {
  return [
    {
      id: 'landing-page',
      name: 'Landing Page',
      price: '₱15,999',
      period: 'one-time',
      description: 'Professional landing page with conversion optimization',
      features: ['Responsive Design', 'SEO Optimization', 'Contact Forms', '48-hour Delivery'],
      button_text: 'Get Started',
      button_variant: 'default',
      popular: true,
      timeline: '48 hours',
      category: 'website',
      display_order: 1,
      is_active: true
    },
    {
      id: 'web-app',
      name: 'Web Application',
      price: '₱49,999',
      period: 'project',
      description: 'Custom web application tailored to your business needs',
      features: ['Custom Development', 'Database Integration', 'User Authentication', 'Admin Dashboard'],
      button_text: 'Contact Us',
      button_variant: 'outline',
      popular: false,
      timeline: '2-4 weeks',
      category: 'web-app',
      display_order: 2,
      is_active: true
    }
  ];
}

function getFallbackAddons(): AddOnService[] {
  return [
    {
      id: 'seo-premium',
      name: 'SEO Premium Package',
      price: '₱5,999',
      description: 'Advanced SEO optimization with keyword research and analytics',
      unit: 'one-time',
      category: 'marketing',
      icon: 'search',
      popular: true,
      display_order: 1,
      is_active: true
    },
    {
      id: 'chat-widget',
      name: 'AI Chat Widget',
      price: '₱3,999',
      description: 'Intelligent chatbot for customer support and lead generation',
      unit: 'one-time',
      category: 'automation',
      icon: 'message-circle',
      popular: false,
      display_order: 2,
      is_active: true
    }
  ];
}

export function Pricing({ onGetStarted }: PricingProps) {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [addOnServices, setAddOnServices] = useState<AddOnService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pricing plans and add-ons from external API or fallback to mock data
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lunaxcode-admin-qkeluna8941-yv8g04xo.apn.leapcell.dev/api/v1';

        const [pricingResponse, addonsResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/pricing-plans/`).catch((error) => {
            console.error('Error fetching pricing plans:', error);
            return null;
          }),
          fetch(`${apiBaseUrl}/addon-services/`).catch((error) => {
            console.error('Error fetching addon services:', error);
            return null;
          })
        ]);

        // Handle pricing plans with fallback
        if (pricingResponse && pricingResponse.ok) {
          try {
            const pricingResult = await pricingResponse.json();
            console.log('Pricing API response:', pricingResult);
            if (pricingResult.items && Array.isArray(pricingResult.items)) {
              const pricingData = pricingResult.items;
              console.log('Processed pricing data:', pricingData);
              setPricingPlans(pricingData);
            } else {
              console.warn('No pricing data available from API, using fallback');
              setPricingPlans(getFallbackPricing());
            }
          } catch (_parseError) {
            console.warn('Error parsing pricing response, using fallback');
            setPricingPlans(getFallbackPricing());
          }
        } else {
          if (pricingResponse) {
            console.warn(`Pricing API returned status ${pricingResponse.status}: ${pricingResponse.statusText}`);
          } else {
            console.warn('Pricing API request failed completely');
          }
          console.warn('Using fallback pricing data');
          setPricingPlans(getFallbackPricing());
        }

        // Handle add-ons with fallback
        if (addonsResponse && addonsResponse.ok) {
          try {
            const addonsResult = await addonsResponse.json();
            console.log('Addons API response:', addonsResult);
            if (addonsResult.items && Array.isArray(addonsResult.items)) {
              const addonsData = addonsResult.items;
              console.log('Processed addons data:', addonsData);
              setAddOnServices(addonsData);
            } else {
              console.warn('No add-ons data available from API, using fallback');
              setAddOnServices(getFallbackAddons());
            }
          } catch (_parseError) {
            console.warn('Error parsing addons response, using fallback');
            setAddOnServices(getFallbackAddons());
          }
        } else {
          if (addonsResponse) {
            console.warn(`Addons API returned status ${addonsResponse.status}: ${addonsResponse.statusText}`);
          } else {
            console.warn('Addons API request failed completely');
          }
          console.warn('Using fallback addons data');
          setAddOnServices(getFallbackAddons());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log('Using fallback data due to error');
        setPricingPlans(getFallbackPricing());
        setAddOnServices(getFallbackAddons());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getButtonStyles = (plan: PricingPlan) => {
    if (plan.button_variant === "gradient" || plan.button_variant === "default") {
      return "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white border-0 transition-all duration-200";
    }
    return "border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white transition-all duration-200";
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

  // Filter only active plans and separate by category
  const activePlans = pricingPlans.filter(plan => plan.is_active !== false);
  const webPlans = activePlans.filter(plan => plan.category === 'web' || plan.id?.includes('page') || plan.id?.includes('website'));
  const mobilePlans = activePlans.filter(plan => plan.category === 'mobile' || plan.id?.includes('mobile') || plan.id?.includes('app'));
  
  // Sort plans by display order
  const finalWebPlans = webPlans.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  const finalMobilePlans = mobilePlans.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

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

  // Show empty state if no pricing data is available
  if (!loading && pricingPlans.length === 0) {
    return (
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Pricing Plans
            </h2>
            <div className="max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Pricing Plans Available
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Pricing information is currently being updated. Please check back soon or contact us directly.
                </p>
                <Button 
                  onClick={() => window.location.href = 'mailto:hello@lunaxcode.com'}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-all duration-200"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="pricing" 
      className="bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)]"
      style={{ paddingTop: 'var(--section-padding-md)', paddingBottom: 'var(--section-padding-md)' }}
    >
      <div className="container mx-auto px-[var(--container-padding)] lg:px-12 max-w-[1200px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 font-bold text-[var(--text-primary)] mb-6">
            Choose Your Perfect{" "}
            <span className="text-[var(--accent-primary)]">
              Digital Solution
            </span>
          </h2>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
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
            <h3 className="text-h3 font-bold text-[var(--text-primary)] mb-4 flex items-center justify-center">
              <Globe className="mr-3 h-8 w-8 text-[var(--accent-secondary)]" />
              Web Development
            </h3>
            <p className="text-body-lg text-[var(--text-secondary)]">
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
                className={`relative rounded-xl border-2 p-8 transition-all duration-300 bg-[var(--bg-primary)] flex flex-col h-full ${
                  plan.popular
                    ? "border-[var(--accent-primary)] shadow-lg"
                    : "border-[var(--border-medium)] hover:border-[var(--accent-primary)] hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[var(--accent-primary)] text-white px-3 py-1 rounded-md text-caption font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                  <h4 className="text-h4 font-bold text-[var(--text-primary)] mb-2">
                    {plan.name}
                  </h4>
                  <p className="text-body-sm text-[var(--text-secondary)] mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-h1 font-bold text-[var(--text-primary)]">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-body text-[var(--text-secondary)] ml-1">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <div className="inline-flex items-center px-3 py-1 rounded-md text-body-sm font-medium bg-[var(--surface-elevated)] text-[var(--accent-secondary)]">
                    <Clock className="w-4 h-4 mr-1" />
                    {plan.timeline}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-[var(--accent-success)] mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--text-secondary)] text-body-sm">
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
                  {plan.button_text}
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
            <h3 className="text-h3 font-bold text-[var(--text-primary)] mb-4 flex items-center justify-center">
              <svg className="mr-3 h-8 w-8 text-[var(--accent-primary)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM6 4a1 1 0 011-1h6a1 1 0 011 1v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4zm2 10a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Mobile App Development
            </h3>
            <p className="text-body-lg text-[var(--text-secondary)]">
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
                      <Check className="h-5 w-5 text-[var(--accent-success)] mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--text-secondary)] text-body-sm">
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
                  {plan.button_text}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Add-On Services Section */}
        {addOnServices.length > 0 && (
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
              {addOnServices.filter(addon => addon.is_active !== false).map((addon, index) => (
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
        )}

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