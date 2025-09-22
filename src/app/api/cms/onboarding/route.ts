import { NextRequest } from 'next/server';
import { eq, and, like, or, desc, sql } from 'drizzle-orm';
import { onboardingSubmission } from '@/lib/schema';
import { createApiResponse, createErrorResponse, withAuth } from '@/lib/auth';

// Dynamic runtime selection for better environment compatibility  
export const runtime = 'edge';
import { 
  OnboardingSubmissionCreateRequest, 
  OnboardingSubmissionFilters,
  ServiceType,
  SubmissionStatus,
  SubmissionPriority
} from '@/types/onboarding';
// Use Web API crypto for Edge Runtime compatibility
const randomUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// GET /api/cms/onboarding - Get all onboarding submissions with filtering
export const GET = withAuth(async (request: NextRequest) => {
  try {
    const { getDatabaseInstance } = await import('@/lib/db');
    const db = getDatabaseInstance();
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;
    
    const filters: OnboardingSubmissionFilters = {
      serviceType: (searchParams.get('serviceType') as ServiceType) || undefined,
      status: (searchParams.get('status') as SubmissionStatus) || undefined,
      priority: (searchParams.get('priority') as SubmissionPriority) || undefined,
      assignedTo: searchParams.get('assignedTo') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      search: searchParams.get('search') || undefined,
    };
    
    // Build where conditions
    const whereConditions = [];
    
    if (filters.serviceType) {
      whereConditions.push(eq(onboardingSubmission.serviceType, filters.serviceType));
    }
    
    if (filters.status) {
      whereConditions.push(eq(onboardingSubmission.status, filters.status));
    }
    
    if (filters.priority) {
      whereConditions.push(eq(onboardingSubmission.priority, filters.priority));
    }
    
    if (filters.assignedTo) {
      whereConditions.push(eq(onboardingSubmission.assignedTo, filters.assignedTo));
    }
    
    if (filters.dateFrom) {
      whereConditions.push(sql`${onboardingSubmission.createdAt} >= ${filters.dateFrom}`);
    }
    
    if (filters.dateTo) {
      whereConditions.push(sql`${onboardingSubmission.createdAt} <= ${filters.dateTo}`);
    }
    
    if (filters.search) {
      whereConditions.push(
        or(
          like(onboardingSubmission.projectName, `%${filters.search}%`),
          like(onboardingSubmission.companyName, `%${filters.search}%`),
          like(onboardingSubmission.email, `%${filters.search}%`),
          like(onboardingSubmission.name, `%${filters.search}%`)
        )
      );
    }
    
    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;
    
    // Get total count - using simple approach for compatibility
    const totalQuery = whereClause 
      ? db.select().from(onboardingSubmission).where(whereClause)
      : db.select().from(onboardingSubmission);
    const allRecords = await totalQuery;
    const total = allRecords.length;
    
    // Get submissions with pagination  
    const submissionsQuery = whereClause
      ? db.select().from(onboardingSubmission).where(whereClause)
      : db.select().from(onboardingSubmission);
    
    const submissions = await submissionsQuery
      .orderBy(desc(onboardingSubmission.createdAt))
      .limit(limit)
      .offset(offset);
    
    // Parse JSON fields and format timestamps
    const formattedSubmissions = submissions.map(submission => ({
      ...submission,
      createdAt: submission.createdAt ? new Date(submission.createdAt) : undefined,
      updatedAt: submission.updatedAt ? new Date(submission.updatedAt) : undefined,
      completedAt: submission.completedAt ? new Date(submission.completedAt) : undefined,
      serviceSpecificData: submission.serviceSpecificData ? JSON.parse(submission.serviceSpecificData) : undefined,
      addOns: submission.addOns ? JSON.parse(submission.addOns) : undefined,
    }));
    
    return createApiResponse({
      submissions: formattedSubmissions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching onboarding submissions:', error);
    return createErrorResponse('Failed to fetch onboarding submissions', 500);
  }
});

// POST /api/cms/onboarding - Create new onboarding submission (public endpoint, no auth required)
export async function POST(request: NextRequest) {
  try {
    const { getDatabaseInstance } = await import('@/lib/db');
    const db = getDatabaseInstance();
    const body: OnboardingSubmissionCreateRequest = await request.json();

    // Validate required fields
    if (!body.projectName || !body.name || !body.email || !body.serviceType) {
      return createErrorResponse('Missing required fields: projectName, name, email, serviceType', 400);
    }
    const now = new Date().toISOString();
    const id = randomUUID();
    
    const submissionData = {
      id,
      projectName: body.projectName,
      companyName: body.companyName || null,
      industry: body.industry || null,
      description: body.description || null,
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      preferredContact: body.preferredContact || null,
      serviceType: body.serviceType,
      budget: body.budget || null,
      timeline: body.timeline || null,
      urgency: body.urgency || null,
      serviceSpecificData: body.serviceSpecificData ? JSON.stringify(body.serviceSpecificData) : null,
      additionalRequirements: body.additionalRequirements || null,
      inspiration: body.inspiration || null,
      addOns: body.addOns ? JSON.stringify(body.addOns) : null,
      status: 'pending' as const,
      priority: 'medium' as const,
      assignedTo: null,
      internalNotes: null,
      clientNotes: null,
      createdAt: now,
      updatedAt: now,
      completedAt: null,
    };
    
    await db.insert(onboardingSubmission).values(submissionData);
    
    // Return the created submission with proper formatting
    const formattedSubmission = {
      ...submissionData,
      createdAt: new Date(now),
      updatedAt: new Date(now),
      serviceSpecificData: body.serviceSpecificData,
      addOns: body.addOns,
    };
    
    return createApiResponse(formattedSubmission, 201);
  } catch (error) {
    console.error('Error creating onboarding submission:', error);
    return createErrorResponse('Failed to create onboarding submission', 500);
  }
}