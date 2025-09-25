import { NextRequest } from 'next/server';
import { createApiResponse, createErrorResponse, withAdminAuth } from '@/lib/auth';
import { 
  OnboardingSubmissionCreateRequest
} from '@/types/onboarding';

// Dynamic runtime selection for better environment compatibility  
export const runtime = 'edge';

// Use Web API crypto for Edge Runtime compatibility (removed unused function)

// Validate form data function
const validateFormData = (formData: Record<string, unknown>) => {
  const errors: string[] = [];
  
  if (!formData.projectName || (typeof formData.projectName === 'string' && formData.projectName.trim().length === 0)) {
    errors.push('Project name is required');
  }
  
  if (!formData.contactEmail || (typeof formData.contactEmail === 'string' && !formData.contactEmail.includes('@'))) {
    errors.push('Valid email address is required');
  }
  
  if (!formData.serviceType) {
    errors.push('Service type is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// GET /api/cms/onboarding - Get all onboarding submissions with filtering (ADMIN ONLY)
export const GET = withAdminAuth(async (request: NextRequest) => {
  try {
    const externalApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 
                          process.env.API_BASE_URL ||
                          'https://lunaxcode-admin-qkeluna8941-yv8g04xo.apn.leapcell.dev/api/v1';
    
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Forward query parameters to external API
    const queryString = searchParams.toString();
    const externalUrl = queryString 
      ? `${externalApiUrl}/onboarding/submissions/?${queryString}`
      : `${externalApiUrl}/onboarding/submissions/`;

    const response = await fetch(externalUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return createErrorResponse(`External API error: ${response.status} ${response.statusText}`, response.status);
    }

    const data = await response.json();
    return createApiResponse(data);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return createErrorResponse('Failed to fetch submissions', 500);
  }
});

// POST /api/cms/onboarding - Create new onboarding submission (PUBLIC)
export async function POST(request: NextRequest) {
  try {
    const externalApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 
                          process.env.API_BASE_URL ||
                          'https://lunaxcode-admin-qkeluna8941-yv8g04xo.apn.leapcell.dev/api/v1';

    const body = await request.json();
    const validationResult = validateFormData(body);
    
    if (!validationResult.isValid) {
      return createErrorResponse('Validation failed', 400);
    }

    // Try to submit to external API first
    try {
      const externalResponse = await fetch(`${externalApiUrl}/onboarding/flow/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (externalResponse.ok) {
        const result = await externalResponse.json();
        return createApiResponse(result);
      } else {
        console.warn('External API submission failed:', externalResponse.status);
        // Fall through to local acknowledgment
      }
    } catch (apiError) {
      console.warn('External API not available:', apiError);
      // Fall through to local acknowledgment
    }

    // If external API fails, provide a local acknowledgment
    const submissionData: OnboardingSubmissionCreateRequest = {
      projectName: body.projectName,
      companyName: body.companyName || '',
      name: body.name || 'Unknown',
      email: body.contactEmail || body.email,
      phone: body.contactPhone || body.phone,
      serviceType: body.serviceType,
      timeline: body.timeline || 'Not specified',
      budget: body.budget || 'Not specified',
    };

    return createApiResponse(submissionData);

  } catch (error) {
    console.error('Error processing submission:', error);
    return createErrorResponse('Failed to process submission', 500);
  }
}