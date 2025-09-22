import { NextRequest } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { getLocalDB } from '@/lib/db';
import { processSteps } from '@/lib/schema';
import { withAuth, createApiResponse, createErrorResponse } from '@/lib/auth';
import { z } from 'zod';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

const processStepSchema = z.object({
  id: z.number().optional(),
  stepNumber: z.number().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  details: z.string().optional(),
  displayOrder: z.number().min(0),
  isActive: z.boolean(),
});

// GET - Fetch all process steps
export async function GET() {
  try {
    const db = getLocalDB();
    const steps = await db
      .select()
      .from(processSteps)
      .orderBy(asc(processSteps.displayOrder));

    return createApiResponse(steps);
  } catch (error) {
    console.error('Error fetching process steps:', error);
    return createErrorResponse('Failed to fetch process steps', 500);
  }
}

// POST - Create new process step
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = processStepSchema.parse(body);

    const db = getLocalDB();

    const [newStep] = await db.insert(processSteps).values(validatedData).returning();

    return createApiResponse(
      { message: 'Process step created successfully', step: newStep },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error creating process step:', error);
    return createErrorResponse('Failed to create process step', 500);
  }
});

// PUT - Update process step
export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = processStepSchema.parse(body);

    if (!validatedData.id) {
      return createErrorResponse('Process step ID is required for updates', 400);
    }

    const db = getLocalDB();

    // Check if process step exists
    const [existingStep] = await db
      .select()
      .from(processSteps)
      .where(eq(processSteps.id, validatedData.id))
      .limit(1);

    if (!existingStep) {
      return createErrorResponse('Process step not found', 404);
    }

    const updatedStep = {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };

    await db
      .update(processSteps)
      .set(updatedStep)
      .where(eq(processSteps.id, validatedData.id));

    return createApiResponse({
      message: 'Process step updated successfully',
      step: updatedStep,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error updating process step:', error);
    return createErrorResponse('Failed to update process step', 500);
  }
});

// DELETE - Delete process step
export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse('Process step ID is required', 400);
    }

    const stepId = parseInt(id, 10);
    if (isNaN(stepId)) {
      return createErrorResponse('Invalid process step ID', 400);
    }

    const db = getLocalDB();

    // Check if process step exists
    const [existingStep] = await db
      .select()
      .from(processSteps)
      .where(eq(processSteps.id, stepId))
      .limit(1);

    if (!existingStep) {
      return createErrorResponse('Process step not found', 404);
    }

    await db.delete(processSteps).where(eq(processSteps.id, stepId));

    return createApiResponse({
      message: 'Process step deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting process step:', error);
    return createErrorResponse('Failed to delete process step', 500);
  }
});