import * as z from 'zod';
import { ServiceType, StepName } from '@/types/onboarding';

// Base schemas for validation
export const serviceTypeSchema = z.enum(['landing_page', 'web_app', 'mobile_app']);
export const stepNameSchema = z.enum(['service_selection', 'basic_info', 'service_requirements', 'review', 'confirmation']);
export const componentTypeSchema = z.enum(['form', 'selection', 'review', 'confirmation']);
export const uiLayoutSchema = z.enum(['single_column', 'two_column', 'grid', 'custom']);
export const deviceTypeSchema = z.enum(['desktop', 'tablet', 'mobile']);
export const stepStatusSchema = z.enum(['pending', 'in_progress', 'completed', 'skipped', 'error']);
export const conversionStatusSchema = z.enum(['completed', 'abandoned', 'in_progress']);

// Field option schema
export const fieldOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  description: z.string().optional(),
  disabled: z.boolean().optional().default(false),
});

// Form field configuration schema
export const formFieldConfigSchema = z.object({
  name: z.string().min(1, 'Field name is required'),
  type: z.enum(['text', 'email', 'phone', 'select', 'multiselect', 'checkbox', 'radio', 'textarea']),
  label: z.string().min(1, 'Field label is required'),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  options: z.array(fieldOptionSchema).optional(),
  validation: z.record(z.unknown()).optional(),
  helpText: z.string().optional(),
  dependsOn: z.string().optional(),
  conditionalLogic: z.record(z.unknown()).optional(),
});

// Step form configuration schema
export const stepFormConfigSchema = z.object({
  fields: z.array(formFieldConfigSchema),
  layout: uiLayoutSchema.default('single_column'),
  validation: z.record(z.unknown()).default({}),
  submitButtonText: z.string().optional(),
  helpText: z.string().optional(),
});

// Navigation event schema
export const navigationEventSchema = z.object({
  timestamp: z.date(),
  action: z.enum(['next', 'back', 'skip', 'retry', 'exit']),
  fromStep: z.string(),
  toStep: z.string().optional(),
  duration: z.number().optional(),
});

// Validation error schema
export const validationErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
  code: z.string(),
  value: z.unknown().optional(),
});

// Validation warning schema
export const validationWarningSchema = z.object({
  field: z.string(),
  message: z.string(),
  suggestion: z.string().optional(),
});

// Validation result schema
export const validationResultSchema = z.object({
  isValid: z.boolean(),
  errors: z.array(validationErrorSchema),
  warnings: z.array(validationWarningSchema).optional(),
});

// Onboarding step configuration schema
export const onboardingStepConfigSchema = z.object({
  id: z.string(),
  stepNumber: z.number().int().positive(),
  stepName: stepNameSchema,
  stepTitle: z.string().min(1, 'Step title is required'),
  stepDescription: z.string().optional(),
  
  // Validation and Schema
  validationSchema: z.record(z.unknown()).optional(),
  requiredFields: z.array(z.string()).optional(),
  optionalFields: z.array(z.string()).optional(),
  
  // UI Configuration
  componentType: componentTypeSchema,
  formConfig: z.record(z.unknown()).optional(),
  uiLayout: uiLayoutSchema.optional(),
  
  // Flow Control
  nextStepConditions: z.record(z.unknown()).optional(),
  skipConditions: z.record(z.unknown()).optional(),
  backAllowed: z.boolean().default(true),
  
  // Service Type Specific
  serviceTypes: z.array(serviceTypeSchema).optional(),
  isConditional: z.boolean().default(false),
  conditionalLogic: z.record(z.unknown()).optional(),
  
  // Progress and Display
  displayOrder: z.number().int().min(0),
  progressWeight: z.number().int().positive().default(1),
  estimatedTime: z.number().int().positive().optional(),
  
  // Status and Management
  isActive: z.boolean().default(true),
  isRequired: z.boolean().default(true),
  
  // Timestamps
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Onboarding step progress schema
export const onboardingStepProgressSchema = z.object({
  id: z.string(),
  submissionId: z.string(),
  stepId: z.string(),
  
  // Progress Tracking
  stepNumber: z.number().int().positive(),
  stepName: stepNameSchema,
  status: stepStatusSchema.default('pending'),
  
  // Step Data
  stepData: z.record(z.unknown()).optional(),
  validationErrors: z.array(z.string()).optional(),
  userInput: z.record(z.unknown()).optional(),
  
  // Timing and Analytics
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  timeSpent: z.number().int().min(0).optional(),
  attemptCount: z.number().int().positive().default(1),
  
  // Navigation History
  previousStepId: z.string().optional(),
  nextStepId: z.string().optional(),
  navigationHistory: z.array(navigationEventSchema).optional(),
  
  // User Experience
  userAgent: z.string().optional(),
  deviceType: deviceTypeSchema.optional(),
  exitedAt: z.date().optional(),
  
  // Timestamps
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Onboarding analytics schema
export const onboardingAnalyticsSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  submissionId: z.string().optional(),
  
  // Flow Analytics
  totalSteps: z.number().int().positive(),
  completedSteps: z.number().int().min(0).default(0),
  skippedSteps: z.number().int().min(0).default(0),
  errorSteps: z.number().int().min(0).default(0),
  
  // Timing Analytics
  totalTimeSpent: z.number().int().min(0).optional(),
  averageStepTime: z.number().int().min(0).optional(),
  fastestStep: z.string().optional(),
  slowestStep: z.string().optional(),
  
  // Completion Analytics
  completionRate: z.number().int().min(0).max(100).optional(),
  abandonedAt: z.string().optional(),
  conversionStatus: conversionStatusSchema.optional(),
  
  // User Behavior
  backNavigationCount: z.number().int().min(0).default(0),
  errorCount: z.number().int().min(0).default(0),
  retryCount: z.number().int().min(0).default(0),
  helpRequested: z.boolean().default(false),
  
  // Technical Metrics
  performanceScore: z.number().int().min(0).max(100).optional(),
  userExperienceScore: z.number().int().min(0).max(100).optional(),
  technicalIssues: z.array(z.string()).optional(),
  
  // Device and Environment
  userAgent: z.string().optional(),
  deviceType: deviceTypeSchema.optional(),
  browserName: z.string().optional(),
  operatingSystem: z.string().optional(),
  screenResolution: z.string().optional(),
  
  // Timestamps
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  lastActiveAt: z.date().optional(),
  createdAt: z.date().optional(),
});

// Onboarding flow configuration schema
export const onboardingFlowConfigSchema = z.object({
  steps: z.array(onboardingStepConfigSchema),
  serviceType: serviceTypeSchema,
  totalSteps: z.number().int().positive(),
  currentStep: z.number().int().positive(),
  progress: z.number().min(0).max(100),
  canGoBack: z.boolean(),
  canGoNext: z.boolean(),
  canSkip: z.boolean(),
});

// Onboarding flow state schema
export const onboardingFlowStateSchema = z.object({
  sessionId: z.string(),
  submissionId: z.string().optional(),
  currentStep: z.number().int().positive(),
  currentStepName: stepNameSchema,
  stepHistory: z.array(z.string()),
  formData: z.record(z.unknown()),
  serviceType: serviceTypeSchema,
  isComplete: z.boolean(),
  startedAt: z.date(),
  lastActiveAt: z.date(),
});

// API Request Schemas

export const createOnboardingStepRequestSchema = z.object({
  stepNumber: z.number().int().positive(),
  stepName: stepNameSchema,
  stepTitle: z.string().min(1, 'Step title is required'),
  stepDescription: z.string().optional(),
  componentType: componentTypeSchema,
  serviceTypes: z.array(serviceTypeSchema).optional(),
  validationSchema: z.record(z.unknown()).optional(),
  formConfig: z.record(z.unknown()).optional(),
  isRequired: z.boolean().default(true),
  displayOrder: z.number().int().min(0),
});

export const updateOnboardingStepRequestSchema = createOnboardingStepRequestSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const startOnboardingFlowRequestSchema = z.object({
  serviceType: serviceTypeSchema,
  userAgent: z.string().optional(),
  deviceType: deviceTypeSchema.optional(),
});

export const submitStepDataRequestSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  stepId: z.string().min(1, 'Step ID is required'),
  stepData: z.record(z.unknown()),
  timeSpent: z.number().int().min(0).optional(),
  deviceType: deviceTypeSchema.optional(),
});

// Step-specific validation schemas

export const serviceSelectionStepSchema = z.object({
  serviceType: serviceTypeSchema,
  serviceDetails: z.record(z.unknown()).optional(),
});

export const basicInfoStepSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  industry: z.string().min(1, 'Industry is required'),
  projectDescription: z.string().min(10, 'Project description must be at least 10 characters'),
  contactEmail: z.string().min(1, 'Email is required').email('Invalid email address'),
  contactPhone: z.string().optional(),
  preferredContact: z.enum(['email', 'phone', 'both']).default('email'),
});

export const landingPageRequirementsSchema = z.object({
  pageType: z.string().min(1, 'Page type is required'),
  designStyle: z.string().min(1, 'Design style is required'),
  sections: z.array(z.string()).min(1, 'At least one section is required'),
  ctaGoal: z.string().min(1, 'Call-to-action goal is required'),
  brandColors: z.string().optional(),
  competitorExamples: z.string().optional(),
  contentProvided: z.boolean().default(false),
});

export const webAppRequirementsSchema = z.object({
  websiteType: z.string().min(1, 'Website type is required'),
  pageCount: z.string().min(1, 'Page count is required'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  contentSource: z.string().min(1, 'Content source is required'),
  userRoles: z.array(z.string()).optional(),
  integrations: z.array(z.string()).optional(),
  securityRequirements: z.string().optional(),
});

export const mobileAppRequirementsSchema = z.object({
  appCategory: z.string().min(1, 'App category is required'),
  platforms: z.array(z.enum(['ios', 'android', 'both'])).min(1, 'At least one platform is required'),
  coreFeatures: z.array(z.string()).min(1, 'At least one core feature is required'),
  backend: z.array(z.string()).min(1, 'At least one backend requirement is required'),
  targetUsers: z.string().optional(),
  designRequirements: z.string().optional(),
  monetization: z.string().optional(),
});

export const reviewStepSchema = z.object({
  confirmDetails: z.boolean().refine(val => val === true, 'You must confirm the project details'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
  additionalNotes: z.string().optional(),
});

// Combined service-specific requirements schema
export const serviceRequirementsSchema = z.discriminatedUnion('serviceType', [
  z.object({
    serviceType: z.literal('landing_page'),
    requirements: landingPageRequirementsSchema,
  }),
  z.object({
    serviceType: z.literal('web_app'),
    requirements: webAppRequirementsSchema,
  }),
  z.object({
    serviceType: z.literal('mobile_app'),
    requirements: mobileAppRequirementsSchema,
  }),
]);

// Complete onboarding form schema
export const completeOnboardingFormSchema = z.object({
  serviceSelection: serviceSelectionStepSchema,
  basicInfo: basicInfoStepSchema,
  serviceRequirements: serviceRequirementsSchema,
  review: reviewStepSchema,
  addOns: z.array(z.string()).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  urgency: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  additionalRequirements: z.string().optional(),
  inspiration: z.string().optional(),
});

// Step validation schemas map
export const stepValidationSchemas = {
  service_selection: serviceSelectionStepSchema,
  basic_info: basicInfoStepSchema,
  service_requirements: serviceRequirementsSchema,
  review: reviewStepSchema,
  confirmation: z.object({}), // No validation needed for confirmation step
} as const;

// Utility function to get validation schema for a step
export function getStepValidationSchema(stepName: StepName, serviceType?: ServiceType) {
  const baseSchema = stepValidationSchemas[stepName];
  
  if (stepName === 'service_requirements' && serviceType) {
    switch (serviceType) {
      case 'landing_page':
        return z.object({
          serviceType: z.literal('landing_page'),
          requirements: landingPageRequirementsSchema,
        });
      case 'web_app':
        return z.object({
          serviceType: z.literal('web_app'),
          requirements: webAppRequirementsSchema,
        });
      case 'mobile_app':
        return z.object({
          serviceType: z.literal('mobile_app'),
          requirements: mobileAppRequirementsSchema,
        });
      default:
        return baseSchema;
    }
  }
  
  return baseSchema;
}

// Type inference helpers
export type ServiceSelectionStepData = z.infer<typeof serviceSelectionStepSchema>;
export type BasicInfoStepData = z.infer<typeof basicInfoStepSchema>;
export type LandingPageRequirementsData = z.infer<typeof landingPageRequirementsSchema>;
export type WebAppRequirementsData = z.infer<typeof webAppRequirementsSchema>;
export type MobileAppRequirementsData = z.infer<typeof mobileAppRequirementsSchema>;
export type ReviewStepData = z.infer<typeof reviewStepSchema>;
export type CompleteOnboardingFormData = z.infer<typeof completeOnboardingFormSchema>;

export type CreateOnboardingStepRequestData = z.infer<typeof createOnboardingStepRequestSchema>;
export type UpdateOnboardingStepRequestData = z.infer<typeof updateOnboardingStepRequestSchema>;
export type StartOnboardingFlowRequestData = z.infer<typeof startOnboardingFlowRequestSchema>;
export type SubmitStepDataRequestData = z.infer<typeof submitStepDataRequestSchema>;
