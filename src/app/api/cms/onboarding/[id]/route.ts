import { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { getLocalDB } from '@/lib/db';
import { onboardingSubmission } from '@/lib/schema';
import { createApiResponse, createErrorResponse, withAuth } from '@/lib/auth';
import { OnboardingSubmissionUpdateRequest } from '@/types/onboarding';

// GET /api/cms/onboarding/[id] - Get specific onboarding submission
export const GET = withAuth(async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const db = getLocalDB();
    const { id } = await params;
    
    const [submission] = await db
      .select()
      .from(onboardingSubmission)
      .where(eq(onboardingSubmission.id, id))
      .limit(1);
    
    if (!submission) {
      return createErrorResponse('Onboarding submission not found', 404);
    }
    
    // Parse JSON fields and format timestamps
    const formattedSubmission = {
      ...submission,
      createdAt: submission.createdAt ? new Date(submission.createdAt) : undefined,
      updatedAt: submission.updatedAt ? new Date(submission.updatedAt) : undefined,
      completedAt: submission.completedAt ? new Date(submission.completedAt) : undefined,
      serviceSpecificData: submission.serviceSpecificData ? JSON.parse(submission.serviceSpecificData) : undefined,
      addOns: submission.addOns ? JSON.parse(submission.addOns) : undefined,
    };
    
    return createApiResponse(formattedSubmission);
  } catch (error) {
    console.error('Error fetching onboarding submission:', error);
    return createErrorResponse('Failed to fetch onboarding submission', 500);
  }
});

// Helper function to build update data
function buildUpdateData(body: OnboardingSubmissionUpdateRequest, existingSubmission: any) {
  const now = new Date().toISOString();
  const updateData: any = { updatedAt: now };

  // Basic fields
  const basicFields = [
    'projectName', 'companyName', 'industry', 'description', 'name', 'email', 
    'phone', 'preferredContact', 'serviceType', 'budget', 'timeline', 'urgency',
    'additionalRequirements', 'inspiration', 'priority', 'assignedTo', 
    'internalNotes', 'clientNotes'
  ];

  basicFields.forEach(field => {
    if (body[field as keyof OnboardingSubmissionUpdateRequest] !== undefined) {
      updateData[field] = body[field as keyof OnboardingSubmissionUpdateRequest];
    }
  });

  // Handle JSON fields
  if (body.serviceSpecificData !== undefined) {
    updateData.serviceSpecificData = body.serviceSpecificData ? JSON.stringify(body.serviceSpecificData) : null;
  }
  if (body.addOns !== undefined) {
    updateData.addOns = body.addOns ? JSON.stringify(body.addOns) : null;
  }

  // Handle status and completedAt
  if (body.status !== undefined) {
    updateData.status = body.status;
    if (body.status === 'completed') {
      updateData.completedAt = now;
    } else if (existingSubmission.completedAt) {
      updateData.completedAt = null;
    }
  }

  return updateData;
}

// PUT /api/cms/onboarding/[id] - Update specific onboarding submission
export const PUT = withAuth(async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const db = getLocalDB();
    const { id } = await params;
    const body: OnboardingSubmissionUpdateRequest = await request.json();
    
    // Check if submission exists
    const [existingSubmission] = await db
      .select()
      .from(onboardingSubmission)
      .where(eq(onboardingSubmission.id, id))
      .limit(1);
    
    if (!existingSubmission) {
      return createErrorResponse('Onboarding submission not found', 404);
    }
    
    const updateData = buildUpdateData(body, existingSubmission);
    
    // Update the submission
    await db
      .update(onboardingSubmission)
      .set(updateData)
      .where(eq(onboardingSubmission.id, id));
    
    // Fetch and return the updated submission
    const [updatedSubmission] = await db
      .select()
      .from(onboardingSubmission)
      .where(eq(onboardingSubmission.id, id))
      .limit(1);
    
    // Parse JSON fields and format timestamps
    const formattedSubmission = {
      ...updatedSubmission,
      createdAt: updatedSubmission.createdAt ? new Date(updatedSubmission.createdAt) : undefined,
      updatedAt: updatedSubmission.updatedAt ? new Date(updatedSubmission.updatedAt) : undefined,
      completedAt: updatedSubmission.completedAt ? new Date(updatedSubmission.completedAt) : undefined,
      serviceSpecificData: updatedSubmission.serviceSpecificData ? JSON.parse(updatedSubmission.serviceSpecificData) : undefined,
      addOns: updatedSubmission.addOns ? JSON.parse(updatedSubmission.addOns) : undefined,
    };
    
    return createApiResponse(formattedSubmission);
  } catch (error) {
    console.error('Error updating onboarding submission:', error);
    return createErrorResponse('Failed to update onboarding submission', 500);
  }
});

// DELETE /api/cms/onboarding/[id] - Delete specific onboarding submission
export const DELETE = withAuth(async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const db = getLocalDB();
    const { id } = await params;
    
    // Check if submission exists
    const [existingSubmission] = await db
      .select()
      .from(onboardingSubmission)
      .where(eq(onboardingSubmission.id, id))
      .limit(1);
    
    if (!existingSubmission) {
      return createErrorResponse('Onboarding submission not found', 404);
    }
    
    // Delete the submission
    await db
      .delete(onboardingSubmission)
      .where(eq(onboardingSubmission.id, id));
    
    return createApiResponse({ message: 'Onboarding submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting onboarding submission:', error);
    return createErrorResponse('Failed to delete onboarding submission', 500);
  }
});