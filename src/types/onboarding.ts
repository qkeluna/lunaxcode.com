// Type aliases for union types
export type ServiceType = 'landing_page' | 'web_app' | 'mobile_app';
export type SubmissionStatus = 'pending' | 'in-progress' | 'completed' | 'rejected';
export type SubmissionPriority = 'low' | 'medium' | 'high' | 'urgent';
export type Platform = 'ios' | 'android' | 'both';

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