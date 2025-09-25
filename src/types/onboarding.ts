// Type aliases for union types
export type ServiceType = 'landing_page' | 'web_app' | 'mobile_app';
export type SubmissionStatus = 'pending' | 'in-progress' | 'completed' | 'rejected';
export type SubmissionPriority = 'low' | 'medium' | 'high' | 'urgent';
export type Platform = 'ios' | 'android' | 'both';

// Onboarding Steps Process Types
export type StepName = 'service_selection' | 'basic_info' | 'service_requirements' | 'review' | 'confirmation';
export type StepStatus = 'pending' | 'in_progress' | 'completed' | 'skipped' | 'error';
export type ComponentType = 'form' | 'selection' | 'review' | 'confirmation';
export type UILayout = 'single_column' | 'two_column' | 'grid' | 'custom';
export type DeviceType = 'desktop' | 'tablet' | 'mobile';
export type ConversionStatus = 'completed' | 'abandoned' | 'in_progress';

export interface OnboardingSubmissionBase {
  id?: string;
  
  // Basic Information (common to all services)
  projectName: string;
  companyName?: string;
  industry?: string;
  description?: string;
  
  // Contact Information
  name: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  
  // Service Information
  serviceType: ServiceType;
  budget?: string;
  timeline?: string;
  urgency?: string;
  
  // Additional Requirements
  additionalRequirements?: string;
  inspiration?: string;
  
  // Add-ons
  addOns?: string[];
  
  // Status and tracking
  status?: SubmissionStatus;
  priority?: SubmissionPriority;
  assignedTo?: string;
  
  // Notes and communication
  internalNotes?: string;
  clientNotes?: string;
  
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
  completedAt?: Date;
}

// Service-specific data interfaces
export interface LandingPageData {
  businessType?: string;
  targetAudience?: string;
  primaryGoal?: string;
  conversionType?: string;
  keyFeatures?: string[];
  brandColors?: string;
  designStyle?: string;
  contentProvided?: boolean;
  competitorExamples?: string;
}

export interface WebAppData {
  appType?: string;
  userRoles?: string[];
  coreFeatures?: string[];
  integrations?: string[];
  scalabilityRequirements?: string;
  securityRequirements?: string;
  performanceRequirements?: string;
  technicalRequirements?: string;
  existingBranding?: boolean;
}

export interface MobileAppData {
  platforms?: Platform[];
  appCategory?: string;
  targetUsers?: string;
  coreFeatures?: string[];
  designRequirements?: string;
  integrations?: string[];
  monetization?: string;
  appStoreRequirements?: string;
  marketingSupport?: boolean;
}

export type ServiceSpecificData = LandingPageData | WebAppData | MobileAppData;

export interface OnboardingSubmission extends OnboardingSubmissionBase {
  serviceSpecificData?: ServiceSpecificData;
}

export interface OnboardingSubmissionCreateRequest {
  projectName: string;
  companyName?: string;
  industry?: string;
  description?: string;
  name: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  serviceType: ServiceType;
  budget?: string;
  timeline?: string;
  urgency?: string;
  serviceSpecificData?: ServiceSpecificData;
  additionalRequirements?: string;
  inspiration?: string;
  addOns?: string[];
}

export interface OnboardingSubmissionUpdateRequest extends Partial<OnboardingSubmissionCreateRequest> {
  status?: SubmissionStatus;
  priority?: SubmissionPriority;
  assignedTo?: string;
  internalNotes?: string;
  clientNotes?: string;
}

export interface OnboardingSubmissionListResponse {
  submissions: OnboardingSubmission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OnboardingSubmissionFilters {
  serviceType?: ServiceType;
  status?: SubmissionStatus;
  priority?: SubmissionPriority;
  assignedTo?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string; // Search in project name, company name, email
}

// Onboarding Steps Process Interfaces

export interface OnboardingStepConfig {
  id: string;
  stepNumber: number;
  stepName: StepName;
  stepTitle: string;
  stepDescription?: string;
  
  // Validation and Schema
  validationSchema?: Record<string, unknown>; // JSON schema for step validation
  requiredFields?: string[];
  optionalFields?: string[];
  
  // UI Configuration
  componentType: ComponentType;
  formConfig?: Record<string, unknown>; // JSON configuration for form rendering
  uiLayout?: UILayout;
  
  // Flow Control
  nextStepConditions?: Record<string, unknown>; // JSON conditions for next step
  skipConditions?: Record<string, unknown>; // JSON conditions to skip this step
  backAllowed?: boolean;
  
  // Service Type Specific
  serviceTypes?: ServiceType[];
  isConditional?: boolean;
  conditionalLogic?: Record<string, unknown>; // JSON logic for conditional display
  
  // Progress and Display
  displayOrder: number;
  progressWeight?: number; // How much this step contributes to progress
  estimatedTime?: number; // Estimated completion time in minutes
  
  // Status and Management
  isActive?: boolean;
  isRequired?: boolean;
  
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OnboardingStepProgressConfig {
  id: string;
  submissionId: string;
  stepId: string;
  
  // Progress Tracking
  stepNumber: number;
  stepName: StepName;
  status: StepStatus;
  
  // Step Data
  stepData?: Record<string, unknown>; // JSON data collected in this step
  validationErrors?: string[]; // Array of validation errors
  userInput?: Record<string, unknown>; // JSON raw user input
  
  // Timing and Analytics
  startedAt?: Date;
  completedAt?: Date;
  timeSpent?: number; // Time spent in seconds
  attemptCount?: number;
  
  // Navigation History
  previousStepId?: string;
  nextStepId?: string;
  navigationHistory?: NavigationEvent[]; // Array of navigation events
  
  // User Experience
  userAgent?: string;
  deviceType?: DeviceType;
  exitedAt?: Date; // If user left without completing
  
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OnboardingAnalyticsConfig {
  id: string;
  sessionId: string;
  submissionId?: string;
  
  // Flow Analytics
  totalSteps: number;
  completedSteps?: number;
  skippedSteps?: number;
  errorSteps?: number;
  
  // Timing Analytics
  totalTimeSpent?: number; // Total time in seconds
  averageStepTime?: number; // Average time per step
  fastestStep?: string; // Step completed fastest
  slowestStep?: string; // Step that took longest
  
  // Completion Analytics
  completionRate?: number; // Percentage (0-100)
  abandonedAt?: string; // Step where user abandoned
  conversionStatus?: ConversionStatus;
  
  // User Behavior
  backNavigationCount?: number;
  errorCount?: number;
  retryCount?: number;
  helpRequested?: boolean;
  
  // Technical Metrics
  performanceScore?: number; // 0-100 performance rating
  userExperienceScore?: number; // 0-100 UX rating
  technicalIssues?: string[]; // Array of technical issues
  
  // Device and Environment
  userAgent?: string;
  deviceType?: DeviceType;
  browserName?: string;
  operatingSystem?: string;
  screenResolution?: string;
  
  // Timestamps
  startedAt?: Date;
  completedAt?: Date;
  lastActiveAt?: Date;
  createdAt?: Date;
}

export interface NavigationEvent {
  timestamp: Date;
  action: 'next' | 'back' | 'skip' | 'retry' | 'exit';
  fromStep: string;
  toStep?: string;
  duration?: number; // Time spent on previous step
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings?: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: unknown;
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

export interface StepFormConfig {
  fields: FormFieldConfig[];
  layout: UILayout;
  validation: Record<string, unknown>;
  submitButtonText?: string;
  helpText?: string;
}

export interface FormFieldConfig {
  name: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'textarea';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: FieldOption[];
  validation?: Record<string, unknown>;
  helpText?: string;
  dependsOn?: string; // Field name this field depends on
  conditionalLogic?: Record<string, unknown>;
}

export interface FieldOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

// Onboarding Flow Management

export interface OnboardingFlowConfig {
  steps: OnboardingStepConfig[];
  serviceType: ServiceType;
  totalSteps: number;
  currentStep: number;
  progress: number; // 0-100
  canGoBack: boolean;
  canGoNext: boolean;
  canSkip: boolean;
}

export interface OnboardingFlowState {
  sessionId: string;
  submissionId?: string;
  currentStep: number;
  currentStepName: StepName;
  stepHistory: string[];
  formData: Record<string, unknown>;
  serviceType: ServiceType;
  isComplete: boolean;
  startedAt: Date;
  lastActiveAt: Date;
}

export interface OnboardingStepComponent {
  stepConfig: OnboardingStepConfig;
  formData: Record<string, unknown>;
  onNext: (data: Record<string, unknown>) => void;
  onBack: () => void;
  onSkip?: () => void;
  isLoading?: boolean;
  errors?: ValidationError[];
}

// API Request/Response Types

export interface CreateOnboardingStepRequest {
  stepNumber: number;
  stepName: StepName;
  stepTitle: string;
  stepDescription?: string;
  componentType: ComponentType;
  serviceTypes?: ServiceType[];
  validationSchema?: Record<string, unknown>;
  formConfig?: Record<string, unknown>;
  isRequired?: boolean;
  displayOrder: number;
}

export interface UpdateOnboardingStepRequest extends Partial<CreateOnboardingStepRequest> {
  isActive?: boolean;
}

export interface OnboardingStepsListResponse {
  steps: OnboardingStepConfig[];
  total: number;
  serviceType?: ServiceType;
}

export interface StartOnboardingFlowRequest {
  serviceType: ServiceType;
  userAgent?: string;
  deviceType?: DeviceType;
}

export interface StartOnboardingFlowResponse {
  sessionId: string;
  flowConfig: OnboardingFlowConfig;
  currentStep: OnboardingStepConfig;
}

export interface SubmitStepDataRequest {
  sessionId: string;
  stepId: string;
  stepData: Record<string, unknown>;
  timeSpent?: number;
  deviceType?: DeviceType;
}

export interface SubmitStepDataResponse {
  success: boolean;
  validationResult: ValidationResult;
  nextStep?: OnboardingStepConfig;
  isComplete?: boolean;
  submissionId?: string;
}