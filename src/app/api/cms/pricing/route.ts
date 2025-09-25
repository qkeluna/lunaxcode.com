import { NextRequest } from 'next/server';
import { withAdminAuth, createApiResponse, createErrorResponse } from '@/lib/auth';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

// Helper function to get external API URL
const getExternalApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || 
         process.env.API_BASE_URL ||
         'https://lunaxcode-admin-qkeluna8941-yv8g04xo.apn.leapcell.dev/api/v1';
};

// GET - Fetch all pricing plans (Admin only)
export const GET = withAdminAuth(async (request: NextRequest) => {
  try {
    const externalApiUrl = getExternalApiUrl();
    
    // Forward request to external API
    const response = await fetch(`${externalApiUrl}/pricing`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Forward any authorization headers if needed
        ...(request.headers.get('authorization') && {
          'Authorization': request.headers.get('authorization')!
        })
      },
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    return createApiResponse(data.data || data);
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return createErrorResponse('Failed to fetch pricing plans', 500);
  }
});

// POST - Create new pricing plan (Admin only)
export const POST = withAdminAuth(async (request: NextRequest) => {
  try {
    const externalApiUrl = getExternalApiUrl();
    const body = await request.json();
    
    // Forward request to external API
    const response = await fetch(`${externalApiUrl}/pricing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward any authorization headers if needed
        ...(request.headers.get('authorization') && {
          'Authorization': request.headers.get('authorization')!
        })
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `External API error: ${response.status}`);
    }

    const data = await response.json();
    return createApiResponse(data.data || data, 201);
  } catch (error) {
    console.error('Error creating pricing plan:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to create pricing plan', 
      500
    );
  }
});

// PUT - Update pricing plan (Admin only)
export const PUT = withAdminAuth(async (request: NextRequest) => {
  try {
    const externalApiUrl = getExternalApiUrl();
    const body = await request.json();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return createErrorResponse('Pricing plan ID is required', 400);
    }
    
    // Forward request to external API
    const response = await fetch(`${externalApiUrl}/pricing/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Forward any authorization headers if needed
        ...(request.headers.get('authorization') && {
          'Authorization': request.headers.get('authorization')!
        })
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `External API error: ${response.status}`);
    }

    const data = await response.json();
    return createApiResponse(data.data || data);
  } catch (error) {
    console.error('Error updating pricing plan:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to update pricing plan', 
      500
    );
  }
});

// DELETE - Delete pricing plan (Admin only)
export const DELETE = withAdminAuth(async (request: NextRequest) => {
  try {
    const externalApiUrl = getExternalApiUrl();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return createErrorResponse('Pricing plan ID is required', 400);
    }
    
    // Forward request to external API
    const response = await fetch(`${externalApiUrl}/pricing/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Forward any authorization headers if needed
        ...(request.headers.get('authorization') && {
          'Authorization': request.headers.get('authorization')!
        })
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `External API error: ${response.status}`);
    }

    return createApiResponse({ message: 'Pricing plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting pricing plan:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to delete pricing plan', 
      500
    );
  }
});