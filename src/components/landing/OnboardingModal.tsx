"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Form validation schemas
const basicInfoSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  projectDescription: z.string().min(10, "Project description must be at least 10 characters"),
  contactEmail: z.string().min(1, "Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  contactPhone: z.string().optional(),
});

const fallbackSchema = z.object({}); // Empty schema as fallback

const serviceSpecificSchemas = {
  landing_page: z.object({
    pageType: z.string().min(1, "Page type is required"),
    designStyle: z.string().min(1, "Design style is required"),
    sections: z.array(z.string()).min(1, "At least one section is required"),
    ctaGoal: z.string().min(1, "Call-to-action goal is required"),
  }),
  web_app: z.object({
    websiteType: z.string().min(1, "Website type is required"),
    pageCount: z.string().min(1, "Page count is required"),
    features: z.array(z.string()).min(1, "At least one feature is required"),
    contentSource: z.string().min(1, "Content source is required"),
  }),
  mobile_app: z.object({
    appCategory: z.string().min(1, "App category is required"),
    platforms: z.array(z.string()).min(1, "At least one platform is required"),
    coreFeatures: z.array(z.string()).min(1, "At least one core feature is required"),
    backend: z.array(z.string()).min(1, "At least one backend requirement is required"),
  }),
};

type BasicInfoForm = z.infer<typeof basicInfoSchema>;
type ServiceSpecificForm = {
  pageType?: string;
  designStyle?: string;
  sections?: string[];
  ctaGoal?: string;
  websiteType?: string;
  pageCount?: string;
  features?: string[];
  contentSource?: string;
  appCategory?: string;
  platforms?: string[];
  coreFeatures?: string[];
  backend?: string[];
};

interface OnboardingModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly selectedService: string;
}

const serviceDetails = {
  landing_page: {
    name: "Landing Page",
    price: "₱8,000 - ₱12,000",
    timeline: "48 hours",
    description: "Professional single-page website with AI chat widget",
  },
  basic_website: {
    name: "Basic Website",
    price: "₱18,000 - ₱25,000",
    timeline: "5-7 days",
    description: "3-5 page website with AI features and SEO optimization",
  },
  advanced_website: {
    name: "Advanced Website",
    price: "₱40,000 - ₱60,000",
    timeline: "2-3 weeks",
    description: "Full-featured website with CMS and advanced functionality",
  },
  basic_mobile_app: {
    name: "Basic Mobile App",
    price: "₱80,000 - ₱120,000",
    timeline: "4-6 weeks",
    description: "Cross-platform mobile app with basic features",
  },
  advanced_mobile_app: {
    name: "Advanced Mobile App",
    price: "₱150,000 - ₱250,000",
    timeline: "8-12 weeks",
    description: "Feature-rich mobile app with backend integration",
  },
};

const serviceMapping = {
  'landing_page': 'landing_page',
  'basic_website': 'web_app',
  'advanced_website': 'web_app',
  'basic_mobile_app': 'mobile_app',
  'advanced_mobile_app': 'mobile_app'
};

export function OnboardingModal({ isOpen, onClose, selectedService }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const basicInfoForm = useForm<BasicInfoForm>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      projectName: "",
      companyName: "",
      industry: "",
      projectDescription: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const serviceSpecificForm = useForm<ServiceSpecificForm>({
    resolver: selectedService && serviceMapping[selectedService as keyof typeof serviceMapping]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (zodResolver(serviceSpecificSchemas[serviceMapping[selectedService as keyof typeof serviceMapping] as keyof typeof serviceSpecificSchemas]) as any)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      : (zodResolver(fallbackSchema) as any),
    defaultValues: {},
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = async () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const isValid = await basicInfoForm.trigger();
      if (isValid) {
        setFormData({ ...formData, ...basicInfoForm.getValues() });
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      const isValid = await serviceSpecificForm.trigger();
      if (isValid) {
        setFormData({ ...formData, ...serviceSpecificForm.getValues() });
        setCurrentStep(4);
      }
    } else if (currentStep === 4) {
      setCurrentStep(5);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Combine all form data
      const finalFormData = {
        ...formData,
        ...basicInfoForm.getValues(),
        ...serviceSpecificForm.getValues()
      };

      // Map form fields to API fields
      const submissionData = {
        projectName: finalFormData.projectName,
        companyName: finalFormData.companyName,
        industry: finalFormData.industry,
        description: finalFormData.projectDescription,
        name: finalFormData.companyName, // Using company name as contact name for now
        email: finalFormData.contactEmail,
        phone: finalFormData.contactPhone,
        preferredContact: 'email', // Default to email
        serviceType: serviceMapping[selectedService as keyof typeof serviceMapping] as 'landing_page' | 'web_app' | 'mobile_app',
        budget: serviceDetails[selectedService as keyof typeof serviceDetails]?.price,
        timeline: serviceDetails[selectedService as keyof typeof serviceDetails]?.timeline,
        urgency: 'medium', // Default urgency
        serviceSpecificData: {
          originalService: selectedService,
          serviceDetails: serviceDetails[selectedService as keyof typeof serviceDetails],
          ...serviceSpecificForm.getValues()
        },
        additionalRequirements: finalFormData.projectDescription,
        addOns: [], // No add-ons selected in current form
      };

      // Submit to API
      const response = await fetch('/api/cms/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit project request');
      }

      const result = await response.json();
      
      if (result.success) {
        // Store the submission ID for reference
        setFormData({ ...formData, submissionId: result.data.id });
        setCurrentStep(5); // Success step
      } else {
        throw new Error(result.error || 'Failed to submit project request');
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      // You could add a toast notification here
      alert('Failed to submit project request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setCurrentStep(1);
    setFormData({});
    basicInfoForm.reset();
    serviceSpecificForm.reset();
    onClose();
  };

  const renderServiceSpecificForm = () => {
    const mappedService = serviceMapping[selectedService as keyof typeof serviceMapping];

    if (mappedService === 'landing_page') {
      return (
        <div className="space-y-6">
          <FormField
            control={serviceSpecificForm.control}
            name="pageType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What type of landing page?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select page type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Product Launch">Product Launch</SelectItem>
                    <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                    <SelectItem value="Event Registration">Event Registration</SelectItem>
                    <SelectItem value="App Download">App Download</SelectItem>
                    <SelectItem value="Service Promotion">Service Promotion</SelectItem>
                    <SelectItem value="Newsletter Signup">Newsletter Signup</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={serviceSpecificForm.control}
            name="designStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred design style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select design style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Modern/Minimalist">Modern/Minimalist</SelectItem>
                    <SelectItem value="Bold/Colorful">Bold/Colorful</SelectItem>
                    <SelectItem value="Professional/Corporate">Professional/Corporate</SelectItem>
                    <SelectItem value="Creative/Artistic">Creative/Artistic</SelectItem>
                    <SelectItem value="Tech/Startup">Tech/Startup</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={serviceSpecificForm.control}
            name="sections"
            render={() => (
              <FormItem>
                <FormLabel>Required sections</FormLabel>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Hero Section", "Features/Benefits", "Testimonials",
                    "Pricing", "FAQ", "Contact Form", "About Us", "Gallery/Portfolio"
                  ].map((section) => (
                    <FormField
                      key={section}
                      control={serviceSpecificForm.control}
                      name="sections"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(section)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                if (checked) {
                                  field.onChange([...current, section]);
                                } else {
                                  field.onChange(current.filter((s: string) => s !== section));
                                }
                              }}
                            />
                          </FormControl>
                          <Label className="text-sm">{section}</Label>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={serviceSpecificForm.control}
            name="ctaGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary call-to-action goal</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Sign up for free trial, Download app, Contact sales..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );
    }

    // Add similar forms for web_app and mobile_app
    return <div>Service-specific form for {mappedService}</div>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
            Project Onboarding
          </DialogTitle>
          <p className="text-center text-gray-600 text-sm sm:text-base">
            Let&apos;s gather your requirements and create the perfect solution
          </p>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-center">Confirm Your Selected Service</h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl">
                <div className="text-center">
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {serviceDetails[selectedService as keyof typeof serviceDetails]?.name}
                  </h4>
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">
                        {serviceDetails[selectedService as keyof typeof serviceDetails]?.price}
                      </div>
                      <div className="text-sm text-gray-600">Price Range</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">
                        {serviceDetails[selectedService as keyof typeof serviceDetails]?.timeline}
                      </div>
                      <div className="text-sm text-gray-600">Timeline</div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {serviceDetails[selectedService as keyof typeof serviceDetails]?.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Button onClick={nextStep} className="px-6 sm:px-8 w-full sm:w-auto">
                  Continue with This Service
                </Button>
                <Button variant="outline" onClick={resetModal} className="w-full sm:w-auto">
                  Choose Different Service
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-center">Project Information</h3>
              <Form {...basicInfoForm}>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={basicInfoForm.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your project name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={basicInfoForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company/Client Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={basicInfoForm.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                            <SelectItem value="Real Estate">Real Estate</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={basicInfoForm.control}
                    name="projectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description *</FormLabel>
                        <FormControl>
                          <textarea
                            className="w-full p-3 border border-gray-300 rounded-md resize-none"
                            rows={4}
                            placeholder="Describe the project goals, target audience, and key requirements..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={basicInfoForm.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={basicInfoForm.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+63 XXX XXX XXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                <Button variant="outline" onClick={prevStep} className="w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={nextStep} className="w-full sm:w-auto">
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-center">Service Requirements</h3>
              <Form {...serviceSpecificForm}>
                <form className="space-y-6">
                  {renderServiceSpecificForm()}
                </form>
              </Form>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                <Button variant="outline" onClick={prevStep} className="w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={nextStep} className="w-full sm:w-auto">
                  Review & Submit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-center">Project Summary</h3>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Service:</span>
                    <div>{serviceDetails[selectedService as keyof typeof serviceDetails]?.name}</div>
                  </div>
                  <div>
                    <span className="font-semibold">Timeline:</span>
                    <div>{serviceDetails[selectedService as keyof typeof serviceDetails]?.timeline}</div>
                  </div>
                  <div>
                    <span className="font-semibold">Price Range:</span>
                    <div>{serviceDetails[selectedService as keyof typeof serviceDetails]?.price}</div>
                  </div>
                  <div>
                    <span className="font-semibold">Project:</span>
                    <div>{(formData.projectName as string) || ''}</div>
                  </div>
                </div>
                <div>
                  <span className="font-semibold">Company:</span>
                  <div>{(formData.companyName as string) || ''}</div>
                </div>
                <div>
                  <span className="font-semibold">Industry:</span>
                  <div>{(formData.industry as string) || ''}</div>
                </div>
                <div>
                  <span className="font-semibold">Contact:</span>
                  <div className="break-all">{(formData.contactEmail as string) || ''}</div>
                </div>
              </div>

              <div className="bg-green-50 p-4 sm:p-6 rounded-xl">
                <h4 className="font-semibold text-green-800 mb-3">What happens next?</h4>
                <ul className="text-green-700 space-y-2 text-sm sm:text-base">
                  <li>• We&apos;ll review your requirements within 24 hours</li>
                  <li>• Receive a detailed project proposal and timeline</li>
                  <li>• Schedule a consultation call to discuss details</li>
                  <li>• Begin development once approved</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                <Button variant="outline" onClick={prevStep} className="w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Edit
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Submitting..." : "Submit Project Request"}
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6"
            >
              <div className="text-4xl sm:text-6xl text-green-500 mb-4">✓</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Project Submitted Successfully!</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Thank you for choosing Lunaxcode. We&apos;ll be in touch within 24 hours with next steps.
              </p>

              <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
                <h4 className="font-semibold text-blue-800 mb-2">Your Reference Number</h4>
                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                  {formData.submissionId ? `LXC-${(formData.submissionId as string).slice(-8).toUpperCase()}` : `LXC${Date.now().toString().slice(-6)}`}
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  Keep this number for your records
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button onClick={resetModal} className="w-full sm:w-auto">
                  Start New Project
                </Button>
                <Button variant="outline" onClick={resetModal} className="w-full sm:w-auto">
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}