import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Pricing Plans table
export const pricingPlans = sqliteTable('pricing_plans', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  price: text('price').notNull(),
  period: text('period').default(''),
  description: text('description').notNull(),
  features: text('features').notNull(), // JSON string of features array
  buttonText: text('button_text').notNull().default('Get Started'),
  buttonVariant: text('button_variant').notNull().default('outline'),
  popular: integer('popular', { mode: 'boolean' }).notNull().default(false),
  timeline: text('timeline').notNull(),
  displayOrder: integer('display_order').notNull().default(0),
  category: text('category').default('web'), // web, mobile
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Add-On Services table
export const addOnServices = sqliteTable('addon_services', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  price: text('price').notNull(),
  description: text('description').notNull(),
  unit: text('unit'), // per page, per month, one-time, etc.
  category: text('category').default('general'), // general, seo, maintenance, integration
  icon: text('icon'), // Lucide icon name
  popular: integer('popular', { mode: 'boolean' }).notNull().default(false),
  displayOrder: integer('display_order').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Features table
export const features = sqliteTable('features', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(), // Lucide icon name
  color: text('color').notNull(), // Gradient classes
  displayOrder: integer('display_order').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Process Steps table
export const processSteps = sqliteTable('process_steps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  stepNumber: integer('step_number').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(), // Lucide icon name
  details: text('details'), // Additional details/sub-points JSON
  displayOrder: integer('display_order').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Hero Section table
export const heroSection = sqliteTable('hero_section', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  headline: text('headline').notNull(),
  subheadline: text('subheadline').notNull(),
  ctaText: text('cta_text').notNull().default('Get Started'),
  ctaVariant: text('cta_variant').notNull().default('default'),
  secondaryCtaText: text('secondary_cta_text'),
  secondaryCtaVariant: text('secondary_cta_variant').default('outline'),
  backgroundVideo: text('background_video'), // URL to background video
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Testimonials table
export const testimonials = sqliteTable('testimonials', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clientName: text('client_name').notNull(),
  clientCompany: text('client_company'),
  clientRole: text('client_role'),
  testimonial: text('testimonial').notNull(),
  rating: integer('rating').notNull().default(5),
  avatar: text('avatar'), // URL to avatar image
  projectType: text('project_type'), // landing_page, web_app, mobile_app
  displayOrder: integer('display_order').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Contact Information table
export const contactInfo = sqliteTable('contact_info', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text('type').notNull(), // email, phone, address, social
  label: text('label').notNull(),
  value: text('value').notNull(),
  icon: text('icon'), // Lucide icon name
  isPrimary: integer('is_primary', { mode: 'boolean' }).notNull().default(false),
  displayOrder: integer('display_order').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// FAQ table
export const faqs = sqliteTable('faqs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: text('category'), // pricing, process, general, technical
  displayOrder: integer('display_order').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Site Settings table (for global settings)
export const siteSettings = sqliteTable('site_settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  type: text('type').notNull().default('text'), // text, number, boolean, json
  description: text('description'),
  isPublic: integer('is_public', { mode: 'boolean' }).notNull().default(true),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// CMS Users table (for admin authentication)
export const cmsUsers = sqliteTable('cms_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('admin'), // admin, editor, viewer
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  lastLogin: text('last_login'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Form Submissions table (to store contact form submissions)
export const formSubmissions = sqliteTable('form_submissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  formType: text('form_type').notNull(), // contact, onboarding, quote
  name: text('name'),
  email: text('email'),
  phone: text('phone'),
  company: text('company'),
  projectType: text('project_type'),
  message: text('message'),
  formData: text('form_data').notNull(), // JSON string of all form data
  status: text('status').notNull().default('new'), // new, contacted, converted, archived
  source: text('source'), // where the submission came from
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Export types for TypeScript
export type PricingPlan = typeof pricingPlans.$inferSelect;
export type NewPricingPlan = typeof pricingPlans.$inferInsert;

export type AddOnService = typeof addOnServices.$inferSelect;
export type NewAddOnService = typeof addOnServices.$inferInsert;

export type Feature = typeof features.$inferSelect;
export type NewFeature = typeof features.$inferInsert;

export type ProcessStep = typeof processSteps.$inferSelect;
export type NewProcessStep = typeof processSteps.$inferInsert;

export type HeroSection = typeof heroSection.$inferSelect;
export type NewHeroSection = typeof heroSection.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

export type ContactInfo = typeof contactInfo.$inferSelect;
export type NewContactInfo = typeof contactInfo.$inferInsert;

export type FAQ = typeof faqs.$inferSelect;
export type NewFAQ = typeof faqs.$inferInsert;

export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewSiteSetting = typeof siteSettings.$inferInsert;

export type CMSUser = typeof cmsUsers.$inferSelect;
export type NewCMSUser = typeof cmsUsers.$inferInsert;

export type FormSubmission = typeof formSubmissions.$inferSelect;
export type NewFormSubmission = typeof formSubmissions.$inferInsert;

export type OnboardingSubmission = typeof onboardingSubmission.$inferSelect;
export type NewOnboardingSubmission = typeof onboardingSubmission.$inferInsert;

export type OnboardingStep = typeof onboardingSteps.$inferSelect;
export type NewOnboardingStep = typeof onboardingSteps.$inferInsert;

export type OnboardingStepProgress = typeof onboardingStepProgress.$inferSelect;
export type NewOnboardingStepProgress = typeof onboardingStepProgress.$inferInsert;

export type OnboardingAnalytics = typeof onboardingAnalytics.$inferSelect;
export type NewOnboardingAnalytics = typeof onboardingAnalytics.$inferInsert;

// Onboarding Submissions table
export const onboardingSubmission = sqliteTable('onboarding_submission', {
  id: text('id').primaryKey(),
  
  // Basic Information (common to all services)
  projectName: text('project_name').notNull(),
  companyName: text('company_name'),
  industry: text('industry'),
  description: text('description'),
  
  // Contact Information
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  preferredContact: text('preferred_contact'),
  
  // Service Information
  serviceType: text('service_type').notNull(), // 'landing_page', 'web_app', 'mobile_app'
  budget: text('budget'),
  timeline: text('timeline'),
  urgency: text('urgency'),
  
  // Service-specific fields (stored as JSON)
  serviceSpecificData: text('service_specific_data'),
  
  // Additional Requirements
  additionalRequirements: text('additional_requirements'),
  inspiration: text('inspiration'),
  
  // Add-ons
  addOns: text('add_ons'), // JSON array of selected add-ons
  
  // Status and tracking
  status: text('status').notNull().default('pending'), // 'pending', 'in-progress', 'completed', 'rejected'
  priority: text('priority').default('medium'), // 'low', 'medium', 'high', 'urgent'
  assignedTo: text('assigned_to'), // User ID of assigned team member
  
  // Notes and communication
  internalNotes: text('internal_notes'),
  clientNotes: text('client_notes'),
  
  // Timestamps
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  completedAt: text('completed_at'),
});

// Onboarding Steps Process table - Tracks the onboarding workflow steps
export const onboardingSteps = sqliteTable('onboarding_steps', {
  id: text('id').primaryKey(),
  
  // Step Configuration
  stepNumber: integer('step_number').notNull(),
  stepName: text('step_name').notNull(), // 'service_selection', 'basic_info', 'service_requirements', 'review', 'confirmation'
  stepTitle: text('step_title').notNull(),
  stepDescription: text('step_description'),
  
  // Step Validation and Schema
  validationSchema: text('validation_schema'), // JSON schema for step validation
  requiredFields: text('required_fields'), // JSON array of required field names
  optionalFields: text('optional_fields'), // JSON array of optional field names
  
  // UI Configuration
  componentType: text('component_type').notNull(), // 'form', 'selection', 'review', 'confirmation'
  formConfig: text('form_config'), // JSON configuration for form rendering
  uiLayout: text('ui_layout'), // 'single_column', 'two_column', 'grid', 'custom'
  
  // Flow Control
  nextStepConditions: text('next_step_conditions'), // JSON conditions for next step
  skipConditions: text('skip_conditions'), // JSON conditions to skip this step
  backAllowed: integer('back_allowed', { mode: 'boolean' }).notNull().default(true),
  
  // Service Type Specific
  serviceTypes: text('service_types'), // JSON array of applicable service types
  isConditional: integer('is_conditional', { mode: 'boolean' }).notNull().default(false),
  conditionalLogic: text('conditional_logic'), // JSON logic for conditional display
  
  // Progress and Display
  displayOrder: integer('display_order').notNull().default(0),
  progressWeight: integer('progress_weight').notNull().default(1), // How much this step contributes to progress
  estimatedTime: integer('estimated_time'), // Estimated completion time in minutes
  
  // Status and Management
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  isRequired: integer('is_required', { mode: 'boolean' }).notNull().default(true),
  
  // Timestamps
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Onboarding Step Progress table - Tracks individual user progress through steps
export const onboardingStepProgress = sqliteTable('onboarding_step_progress', {
  id: text('id').primaryKey(),
  
  // Relationships
  submissionId: text('submission_id').notNull().references(() => onboardingSubmission.id, { onDelete: 'cascade' }),
  stepId: text('step_id').notNull().references(() => onboardingSteps.id),
  
  // Progress Tracking
  stepNumber: integer('step_number').notNull(),
  stepName: text('step_name').notNull(),
  status: text('status').notNull().default('pending'), // 'pending', 'in_progress', 'completed', 'skipped', 'error'
  
  // Step Data
  stepData: text('step_data'), // JSON data collected in this step
  validationErrors: text('validation_errors'), // JSON array of validation errors
  userInput: text('user_input'), // JSON raw user input
  
  // Timing and Analytics
  startedAt: text('started_at'),
  completedAt: text('completed_at'),
  timeSpent: integer('time_spent'), // Time spent in seconds
  attemptCount: integer('attempt_count').notNull().default(1),
  
  // Navigation History
  previousStepId: text('previous_step_id'),
  nextStepId: text('next_step_id'),
  navigationHistory: text('navigation_history'), // JSON array of navigation events
  
  // User Experience
  userAgent: text('user_agent'),
  deviceType: text('device_type'), // 'desktop', 'tablet', 'mobile'
  exitedAt: text('exited_at'), // If user left without completing
  
  // Timestamps
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Onboarding Analytics table - Tracks performance and optimization data
export const onboardingAnalytics = sqliteTable('onboarding_analytics', {
  id: text('id').primaryKey(),
  
  // Session Information
  sessionId: text('session_id').notNull(),
  submissionId: text('submission_id').references(() => onboardingSubmission.id),
  
  // Flow Analytics
  totalSteps: integer('total_steps').notNull(),
  completedSteps: integer('completed_steps').notNull().default(0),
  skippedSteps: integer('skipped_steps').notNull().default(0),
  errorSteps: integer('error_steps').notNull().default(0),
  
  // Timing Analytics
  totalTimeSpent: integer('total_time_spent'), // Total time in seconds
  averageStepTime: integer('average_step_time'), // Average time per step
  fastestStep: text('fastest_step'), // Step completed fastest
  slowestStep: text('slowest_step'), // Step that took longest
  
  // Completion Analytics
  completionRate: integer('completion_rate'), // Percentage (0-100)
  abandonedAt: text('abandoned_at'), // Step where user abandoned
  conversionStatus: text('conversion_status'), // 'completed', 'abandoned', 'in_progress'
  
  // User Behavior
  backNavigationCount: integer('back_navigation_count').notNull().default(0),
  errorCount: integer('error_count').notNull().default(0),
  retryCount: integer('retry_count').notNull().default(0),
  helpRequested: integer('help_requested', { mode: 'boolean' }).notNull().default(false),
  
  // Technical Metrics
  performanceScore: integer('performance_score'), // 0-100 performance rating
  userExperienceScore: integer('user_experience_score'), // 0-100 UX rating
  technicalIssues: text('technical_issues'), // JSON array of technical issues
  
  // Device and Environment
  userAgent: text('user_agent'),
  deviceType: text('device_type'),
  browserName: text('browser_name'),
  operatingSystem: text('operating_system'),
  screenResolution: text('screen_resolution'),
  
  // Timestamps
  startedAt: text('started_at').default(sql`CURRENT_TIMESTAMP`),
  completedAt: text('completed_at'),
  lastActiveAt: text('last_active_at'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});