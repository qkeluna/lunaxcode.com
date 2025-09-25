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

// GET /api/cms/onboarding/[id] - Get specific onboarding submission (Admin only)
export const GET = withAdminAuth(async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const externalApiUrl = getExternalApiUrl();
    const { id } = await params;
    
    // Forward request to external API
    const response = await fetch(`${externalApiUrl}/onboarding/${id}`, {
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
      if (response.status === 404) {
        return createErrorResponse('Onboarding submission not found', 404);
      }
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    return createApiResponse(data.data || data);
  } catch (error) {
    console.error('Error fetching onboarding submission:', error);
    return createErrorResponse('Failed to fetch onboarding submission', 500);
  }
});

// PUT /api/cms/onboarding/[id] - Update specific onboarding submission (Admin only)
export const PUT = withAdminAuth(async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const externalApiUrl = getExternalApiUrl();
    const { id } = await params;
    const body = await request.json();
    
    // Forward request to external API
    const response = await fetch(`${externalApiUrl}/onboarding/${id}`, {
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
      if (response.status === 404) {
        return createErrorResponse('Onboarding submission not found', 404);
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `External API error: ${response.status}`);
    }

    const data = await response.json();
    return createApiResponse(data.data || data);
  } catch (error) {
    console.error('Error updating onboarding submission:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to update onboarding submission', 
      500
    );
  }
});

// DELETE /api/cms/onboarding/[id] - Delete specific onboarding submission (Admin only)
export const DELETE = withAdminAuth(async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const externalApiUrl = getExternalApiUrl();
    const { id } = await params;
    
    // Forward request to external API
    const response = await fetch(`${externalApiUrl}/onboarding/${id}`, {
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
      if (response.status === 404) {
        return createErrorResponse('Onboarding submission not found', 404);
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `External API error: ${response.status}`);
    }

    return createApiResponse({ message: 'Onboarding submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting onboarding submission:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to delete onboarding submission', 
      500
    );
  }
});