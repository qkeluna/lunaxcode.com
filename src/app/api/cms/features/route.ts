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

// GET - Fetch all features (Admin only)
export const GET = withAdminAuth(async (request: NextRequest) => {
  try {
    const externalApiUrl = getExternalApiUrl();
    
    // Forward request to external API
    const response = await fetch(`${externalApiUrl}/features`, {
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
    console.error('Error fetching features:', error);
    return createErrorResponse('Failed to fetch features', 500);
  }
});

// POST - Create new feature (Admin only)
export const POST = withAdminAuth(async (request: NextRequest) => {
  try {
    const externalApiUrl = getExternalApiUrl();
    const body = await request.json();
    
    // Forward request to external API
    const response = await fetch(`${externalApiUrl}/features`, {
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
    console.error('Error creating feature:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to create feature', 
      500
    );
  }
});

// PUT - Update feature (Admin only)
export const PUT = withAdminAuth(async (request: NextRequest) => {
  try {
    const externalApiUrl = getExternalApiUrl();
    const body = await request.json();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return createErrorResponse('Feature ID is required', 400);
    }
    
    // Forward request to external API
    const response = await fetch(`${externalApiUrl}/features/${id}`, {
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
    console.error('Error updating feature:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to update feature', 
      500
    );
  }
});

// DELETE - Delete feature (Admin only)
export const DELETE = withAdminAuth(async (request: NextRequest) => {
  try {
    const externalApiUrl = getExternalApiUrl();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return createErrorResponse('Feature ID is required', 400);
    }
    
    // Forward request to external API
    const response = await fetch(`${externalApiUrl}/features/${id}`, {
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

    return createApiResponse({ message: 'Feature deleted successfully' });
  } catch (error) {
    console.error('Error deleting feature:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to delete feature', 
      500
    );
  }
});