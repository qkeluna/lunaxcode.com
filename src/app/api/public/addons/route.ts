import { NextRequest } from 'next/server';
import { createApiResponse, createErrorResponse } from '@/lib/auth';

// Public endpoint - no authentication required
export const runtime = 'edge';

// GET /api/public/addons - Get active add-ons for public display
export async function GET(_request: NextRequest) {
  try {
    const externalApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 
                          process.env.API_BASE_URL ||
                          'https://lunaxcode-admin-qkeluna8941-yv8g04xo.apn.leapcell.dev/api/v1';
    
    let formattedAddons = [];
    
    try {
      // Fetch from external API
      const response = await fetch(`${externalApiUrl}/addon-services/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Handle the paginated response format from external API
        if (data.items && Array.isArray(data.items)) {
          formattedAddons = data.items;
        } else if (Array.isArray(data)) {
          formattedAddons = data;
        }
      } else {
        console.warn('External API not available, using fallback data');
        throw new Error('External API not available');
      }
    } catch (apiError) {
      console.warn('External API not available or no add-ons data, using fallback:', apiError);
      
      // Fallback add-ons data when database is not available
      formattedAddons = [
        {
          id: 'seo-optimization',
          name: 'SEO Optimization',
          description: 'Complete SEO setup and optimization',
          price: '₱5,999',
          unit: 'one-time',
          category: 'seo',
          icon: 'Search',
          popular: true,
          displayOrder: 1,
        },
        {
          id: 'analytics-setup',
          name: 'Analytics Setup',
          description: 'Google Analytics and conversion tracking',
          price: '₱2,999',
          unit: 'one-time',
          category: 'general',
          icon: 'BarChart',
          popular: false,
          displayOrder: 2,
        },
        {
          id: 'maintenance',
          name: 'Monthly Maintenance',
          description: 'Ongoing updates and support',
          price: '₱1,999',
          unit: 'per month',
          category: 'maintenance',
          icon: 'Wrench',
          popular: true,
          displayOrder: 3,
        }
      ];
    }
    
    return createApiResponse({
      addons: formattedAddons,
      total: formattedAddons.length,
    });
  } catch (error) {
    console.error('Error fetching public add-ons:', error);
    return createErrorResponse('Failed to fetch add-ons information', 500);
  }
}
