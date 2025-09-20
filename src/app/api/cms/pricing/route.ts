import { NextRequest } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { getLocalDB } from '@/lib/db';
import { pricingPlans } from '@/lib/schema';
import { withAuth, createApiResponse, createErrorResponse } from '@/lib/auth';
import { z } from 'zod';

const pricingPlanSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.string().min(1),
  period: z.string().optional(),
  description: z.string().min(1),
  features: z.array(z.string()),
  buttonText: z.string().min(1),
  buttonVariant: z.string().min(1),
  popular: z.boolean(),
  timeline: z.string().min(1),
  displayOrder: z.number().min(0),
  isActive: z.boolean(),
});

// GET - Fetch all pricing plans
export async function GET() {
  try {
    const db = getLocalDB();
    const plans = await db
      .select()
      .from(pricingPlans)
      .orderBy(asc(pricingPlans.displayOrder));

    // Parse features JSON for each plan
    const parsedPlans = plans.map(plan => ({
      ...plan,
      features: JSON.parse(plan.features),
    }));

    return createApiResponse(parsedPlans);
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return createErrorResponse('Failed to fetch pricing plans', 500);
  }
}

// POST - Create new pricing plan
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = pricingPlanSchema.parse(body);

    const db = getLocalDB();

    // Check if plan with this ID already exists
    const [existingPlan] = await db
      .select()
      .from(pricingPlans)
      .where(eq(pricingPlans.id, validatedData.id))
      .limit(1);

    if (existingPlan) {
      return createErrorResponse('Pricing plan with this ID already exists', 400);
    }

    const newPlan = {
      ...validatedData,
      features: JSON.stringify(validatedData.features),
    };

    await db.insert(pricingPlans).values(newPlan);

    return createApiResponse(
      { message: 'Pricing plan created successfully', plan: validatedData },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error creating pricing plan:', error);
    return createErrorResponse('Failed to create pricing plan', 500);
  }
});

// PUT - Update pricing plan
export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = pricingPlanSchema.parse(body);

    const db = getLocalDB();

    // Check if plan exists
    const [existingPlan] = await db
      .select()
      .from(pricingPlans)
      .where(eq(pricingPlans.id, validatedData.id))
      .limit(1);

    if (!existingPlan) {
      return createErrorResponse('Pricing plan not found', 404);
    }

    const updatedPlan = {
      ...validatedData,
      features: JSON.stringify(validatedData.features),
      updatedAt: new Date().toISOString(),
    };

    await db
      .update(pricingPlans)
      .set(updatedPlan)
      .where(eq(pricingPlans.id, validatedData.id));

    return createApiResponse({
      message: 'Pricing plan updated successfully',
      plan: validatedData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error updating pricing plan:', error);
    return createErrorResponse('Failed to update pricing plan', 500);
  }
});

// DELETE - Delete pricing plan
export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse('Plan ID is required', 400);
    }

    const db = getLocalDB();

    // Check if plan exists
    const [existingPlan] = await db
      .select()
      .from(pricingPlans)
      .where(eq(pricingPlans.id, id))
      .limit(1);

    if (!existingPlan) {
      return createErrorResponse('Pricing plan not found', 404);
    }

    await db.delete(pricingPlans).where(eq(pricingPlans.id, id));

    return createApiResponse({
      message: 'Pricing plan deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting pricing plan:', error);
    return createErrorResponse('Failed to delete pricing plan', 500);
  }
});