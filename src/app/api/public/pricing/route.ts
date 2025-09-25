import { NextRequest } from 'next/server';
import { createApiResponse, createErrorResponse } from '@/lib/auth';

// Public endpoint - no authentication required
export const runtime = 'edge';

// GET /api/public/pricing - Get active pricing tiers for public display
export async function GET(request: NextRequest) {
  try {
    const externalApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 
                          process.env.API_BASE_URL ||
                          'https://lunaxcode-admin-qkeluna8941-yv8g04xo.apn.leapcell.dev/api/v1';
    
    let formattedPricingTiers = [];
    
    try {
      // Fetch from external API
      const response = await fetch(`${externalApiUrl}/pricing-plans/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Handle the paginated response format from external API
        if (data.items && Array.isArray(data.items)) {
          formattedPricingTiers = data.items;
        } else if (Array.isArray(data)) {
          formattedPricingTiers = data;
        }
      } else {
        console.warn('External API not available, using fallback data');
        throw new Error('External API not available');
      }
    } catch (apiError) {
      console.warn('External API not available or no pricing data, using fallback:', apiError);
      
      // Fallback pricing data when database is not available
      formattedPricingTiers = [
        {
          id: 'basic-landing',
          name: 'Basic Landing Page',
          price: '₱9,999',
          period: 'one-time',
          description: 'Perfect for small businesses and startups',
          features: ['Responsive Design', 'Contact Form', 'Basic SEO', '48-hour Delivery'],
          buttonText: 'Get Started',
          buttonVariant: 'outline',
          popular: false,
          timeline: '48 hours',
          category: 'web',
          displayOrder: 1,
        },
        {
          id: 'premium-landing',
          name: 'Premium Landing Page',
          price: '₱19,999',
          period: 'one-time',
          description: 'Advanced features for growing businesses',
          features: ['Everything in Basic', 'Advanced Analytics', 'A/B Testing', 'Lead Generation'],
          buttonText: 'Get Started',
          buttonVariant: 'default',
          popular: true,
          timeline: '72 hours',
          category: 'web',
          displayOrder: 2,
        },
        {
          id: 'web-app',
          name: 'Full Web Application',
          price: '₱49,999',
          period: 'starting at',
          description: 'Complete web applications with custom features',
          features: ['Custom Development', 'Database Integration', 'User Authentication', 'Admin Panel'],
          buttonText: 'Get Started',
          buttonVariant: 'outline',
          popular: false,
          timeline: '1-3 weeks',
          category: 'web',
          displayOrder: 3,
        }
      ];
    }
    
    return createApiResponse({
      pricingTiers: formattedPricingTiers,
      total: formattedPricingTiers.length,
    });
  } catch (error) {
    console.error('Error fetching public pricing tiers:', error);
    return createErrorResponse('Failed to fetch pricing information', 500);
  }
}
