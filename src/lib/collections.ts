/**
 * TanStack Query Hooks for Admin Data Management
 * ADMIN-ONLY: These hooks are used exclusively for admin dashboard data
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

// ============================================================================
// SCHEMAS - Define data structures with Zod validation
// ============================================================================

export const onboardingSubmissionSchema = z.object({
  id: z.string(),
  projectName: z.string(),
  companyName: z.string().nullable(),
  industry: z.string().nullable(),
  description: z.string().nullable(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  preferredContact: z.string().nullable(),
  serviceType: z.enum(['landing_page', 'web_app', 'mobile_app']),
  budget: z.string().nullable(),
  timeline: z.string().nullable(),
  urgency: z.string().nullable(),
  serviceSpecificData: z.record(z.string(), z.any()).nullable(),
  additionalRequirements: z.string().nullable(),
  inspiration: z.string().nullable(),
  addOns: z.array(z.string()).nullable(),
  status: z.enum(['pending', 'in-progress', 'completed', 'rejected']).default('pending'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  assignedTo: z.string().nullable(),
  internalNotes: z.string().nullable(),
  clientNotes: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  completedAt: z.date().nullable(),
});

export const pricingTierSchema = z.object({
  id: z.string(),
  name: z.string(),
  serviceType: z.enum(['landing_page', 'web_app', 'mobile_app']),
  price: z.number(),
  currency: z.string().default('PHP'),
  deliveryTime: z.string(),
  features: z.array(z.string()),
  isPopular: z.boolean().default(false),
  isActive: z.boolean().default(true),
  displayOrder: z.number().default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const addonSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  currency: z.string().default('PHP'),
  isActive: z.boolean().default(true),
  applicableServices: z.array(z.enum(['landing_page', 'web_app', 'mobile_app'])),
  displayOrder: z.number().default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const featuresSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const heroContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  ctaText: z.string(),
  ctaUrl: z.string(),
  backgroundImage: z.string().nullable(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// TYPE EXPORTS - For TypeScript usage throughout the app
// ============================================================================

export type OnboardingSubmission = z.infer<typeof onboardingSubmissionSchema>;
export type PricingTier = z.infer<typeof pricingTierSchema>;
export type Addon = z.infer<typeof addonSchema>;
export type Feature = z.infer<typeof featuresSchema>;
export type HeroContent = z.infer<typeof heroContentSchema>;

// ============================================================================
// API FUNCTIONS - Handle backend communication
// ============================================================================

// Get API base URL from environment variables
const getApiBaseUrl = () => {
  // Use external API if configured, otherwise fallback to local API routes
  return process.env.NEXT_PUBLIC_API_BASE_URL || '/api/cms';
};

const apiClient = {
  async fetchOnboardingSubmissions(): Promise<OnboardingSubmission[]> {
    const baseUrl = getApiBaseUrl();
    const endpoint = baseUrl.includes('/api/v1') 
      ? `${baseUrl}/onboarding` 
      : `${baseUrl}/onboarding`;
    
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Failed to fetch onboarding submissions');
    const data = await response.json();
    // Handle both external API format and local API format
    return data.data?.submissions || data.data || data || [];
  },

  async updateOnboardingSubmission(id: string, updates: Partial<OnboardingSubmission>): Promise<void> {
    const baseUrl = getApiBaseUrl();
    const endpoint = baseUrl.includes('/api/v1') 
      ? `${baseUrl}/onboarding/${id}` 
      : `${baseUrl}/onboarding/${id}`;
    
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update submission');
  },

  async fetchPricingTiers(): Promise<PricingTier[]> {
    const baseUrl = getApiBaseUrl();
    const endpoint = baseUrl.includes('/api/v1') 
      ? `${baseUrl}/pricing` 
      : `${baseUrl}/pricing`;
    
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Failed to fetch pricing tiers');
    const data = await response.json();
    return data.data || data || [];
  },

  async updatePricingTier(id: string, updates: Partial<PricingTier>): Promise<void> {
    const baseUrl = getApiBaseUrl();
    const endpoint = baseUrl.includes('/api/v1') 
      ? `${baseUrl}/pricing/${id}` 
      : `${baseUrl}/pricing/${id}`;
    
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update pricing tier');
  },

  async fetchAddons(): Promise<Addon[]> {
    const baseUrl = getApiBaseUrl();
    const endpoint = baseUrl.includes('/api/v1') 
      ? `${baseUrl}/addons` 
      : `${baseUrl}/addons`;
    
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Failed to fetch addons');
    const data = await response.json();
    return data.data || data || [];
  },

  async updateAddon(id: string, updates: Partial<Addon>): Promise<void> {
    const baseUrl = getApiBaseUrl();
    const endpoint = baseUrl.includes('/api/v1') 
      ? `${baseUrl}/addons/${id}` 
      : `${baseUrl}/addons/${id}`;
    
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update addon');
  },

  async fetchFeatures(): Promise<Feature[]> {
    const baseUrl = getApiBaseUrl();
    const endpoint = baseUrl.includes('/api/v1') 
      ? `${baseUrl}/features` 
      : `${baseUrl}/features`;
    
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Failed to fetch features');
    const data = await response.json();
    return data.data || data || [];
  },

  async updateFeature(id: string, updates: Partial<Feature>): Promise<void> {
    const baseUrl = getApiBaseUrl();
    const endpoint = baseUrl.includes('/api/v1') 
      ? `${baseUrl}/features/${id}` 
      : `${baseUrl}/features/${id}`;
    
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update feature');
  },

  async fetchHeroContent(): Promise<HeroContent[]> {
    const baseUrl = getApiBaseUrl();
    const endpoint = baseUrl.includes('/api/v1') 
      ? `${baseUrl}/hero` 
      : `${baseUrl}/hero`;
    
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Failed to fetch hero content');
    const data = await response.json();
    return data.data || data || [];
  },

  async updateHeroContent(id: string, updates: Partial<HeroContent>): Promise<void> {
    const baseUrl = getApiBaseUrl();
    const endpoint = baseUrl.includes('/api/v1') 
      ? `${baseUrl}/hero/${id}` 
      : `${baseUrl}/hero/${id}`;
    
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update hero content');
  },
};

// ============================================================================
// TANSTACK QUERY HOOKS - Reactive data hooks for admin dashboard
// ============================================================================

// Onboarding Submissions Hooks
export function useOnboardingSubmissions() {
  return useQuery({
    queryKey: ["admin", "onboarding"],
    queryFn: apiClient.fetchOnboardingSubmissions,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdateOnboardingSubmission() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<OnboardingSubmission> }) =>
      apiClient.updateOnboardingSubmission(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "onboarding"] });
    },
  });
}

// Pricing Tiers Hooks
export function usePricingTiers() {
  return useQuery({
    queryKey: ["admin", "pricing"],
    queryFn: apiClient.fetchPricingTiers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdatePricingTier() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<PricingTier> }) =>
      apiClient.updatePricingTier(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pricing"] });
    },
  });
}

// Addons Hooks
export function useAddons() {
  return useQuery({
    queryKey: ["admin", "addons"],
    queryFn: apiClient.fetchAddons,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdateAddon() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Addon> }) =>
      apiClient.updateAddon(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "addons"] });
    },
  });
}

// Features Hooks
export function useFeatures() {
  return useQuery({
    queryKey: ["admin", "features"],
    queryFn: apiClient.fetchFeatures,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdateFeature() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Feature> }) =>
      apiClient.updateFeature(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "features"] });
    },
  });
}

// Hero Content Hooks
export function useHeroContent() {
  return useQuery({
    queryKey: ["admin", "hero"],
    queryFn: apiClient.fetchHeroContent,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdateHeroContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<HeroContent> }) =>
      apiClient.updateHeroContent(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "hero"] });
    },
  });
}

// ============================================================================
// UTILITIES - Helper functions for working with data
// ============================================================================

export function useRefreshAllData() {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: ["admin"] });
  };
}
