import { NextRequest } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { getLocalDB } from '@/lib/db';
import { features } from '@/lib/schema';
import { withAuth, createApiResponse, createErrorResponse } from '@/lib/auth';
import { z } from 'zod';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

const featureSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().min(1),
  displayOrder: z.number().min(0),
  isActive: z.boolean(),
});

// GET - Fetch all features
export async function GET() {
  try {
    const db = getLocalDB();
    const allFeatures = await db
      .select()
      .from(features)
      .orderBy(asc(features.displayOrder));

    return createApiResponse(allFeatures);
  } catch (error) {
    console.error('Error fetching features:', error);
    return createErrorResponse('Failed to fetch features', 500);
  }
}

// POST - Create new feature
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = featureSchema.parse(body);

    const db = getLocalDB();

    const [newFeature] = await db.insert(features).values(validatedData).returning();

    return createApiResponse(
      { message: 'Feature created successfully', feature: newFeature },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error creating feature:', error);
    return createErrorResponse('Failed to create feature', 500);
  }
});

// PUT - Update feature
export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = featureSchema.parse(body);

    if (!validatedData.id) {
      return createErrorResponse('Feature ID is required for updates', 400);
    }

    const db = getLocalDB();

    // Check if feature exists
    const [existingFeature] = await db
      .select()
      .from(features)
      .where(eq(features.id, validatedData.id))
      .limit(1);

    if (!existingFeature) {
      return createErrorResponse('Feature not found', 404);
    }

    const updatedFeature = {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };

    await db
      .update(features)
      .set(updatedFeature)
      .where(eq(features.id, validatedData.id));

    return createApiResponse({
      message: 'Feature updated successfully',
      feature: updatedFeature,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error updating feature:', error);
    return createErrorResponse('Failed to update feature', 500);
  }
});

// DELETE - Delete feature
export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse('Feature ID is required', 400);
    }

    const featureId = parseInt(id, 10);
    if (isNaN(featureId)) {
      return createErrorResponse('Invalid feature ID', 400);
    }

    const db = getLocalDB();

    // Check if feature exists
    const [existingFeature] = await db
      .select()
      .from(features)
      .where(eq(features.id, featureId))
      .limit(1);

    if (!existingFeature) {
      return createErrorResponse('Feature not found', 404);
    }

    await db.delete(features).where(eq(features.id, featureId));

    return createApiResponse({
      message: 'Feature deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting feature:', error);
    return createErrorResponse('Failed to delete feature', 500);
  }
});