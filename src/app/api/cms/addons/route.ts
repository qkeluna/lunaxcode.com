import { NextRequest } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { getLocalDB } from '@/lib/db';
import { addOnServices } from '@/lib/schema';
import { withAuth, createApiResponse, createErrorResponse } from '@/lib/auth';
import { z } from 'zod';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

const addOnServiceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.string().min(1),
  description: z.string().min(1),
  unit: z.string().optional(),
  category: z.string().optional().default('general'),
  icon: z.string().optional(),
  popular: z.boolean().default(false),
  displayOrder: z.number().min(0).default(0),
  isActive: z.boolean().default(true),
});

// GET - Fetch all add-on services
export async function GET() {
  try {
    const db = getLocalDB();
    const addons = await db
      .select()
      .from(addOnServices)
      .where(eq(addOnServices.isActive, true))
      .orderBy(asc(addOnServices.displayOrder));

    return createApiResponse(addons);
  } catch (error) {
    console.error('Error fetching add-on services:', error);
    return createErrorResponse('Failed to fetch add-on services', 500);
  }
}

// POST - Create new add-on service
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = addOnServiceSchema.parse(body);

    const db = getLocalDB();

    // Check if add-on with this ID already exists
    const [existingAddOn] = await db
      .select()
      .from(addOnServices)
      .where(eq(addOnServices.id, validatedData.id))
      .limit(1);

    if (existingAddOn) {
      return createErrorResponse('Add-on service with this ID already exists', 400);
    }

    await db.insert(addOnServices).values(validatedData);

    return createApiResponse(
      { message: 'Add-on service created successfully', addon: validatedData },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error creating add-on service:', error);
    return createErrorResponse('Failed to create add-on service', 500);
  }
});

// PUT - Update add-on service
export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = addOnServiceSchema.parse(body);

    const db = getLocalDB();

    // Check if add-on exists
    const [existingAddOn] = await db
      .select()
      .from(addOnServices)
      .where(eq(addOnServices.id, validatedData.id))
      .limit(1);

    if (!existingAddOn) {
      return createErrorResponse('Add-on service not found', 404);
    }

    const updatedAddOn = {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };

    await db
      .update(addOnServices)
      .set(updatedAddOn)
      .where(eq(addOnServices.id, validatedData.id));

    return createApiResponse({
      message: 'Add-on service updated successfully',
      addon: validatedData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error updating add-on service:', error);
    return createErrorResponse('Failed to update add-on service', 500);
  }
});

// DELETE - Delete add-on service
export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse('Add-on ID is required', 400);
    }

    const db = getLocalDB();

    // Check if add-on exists
    const [existingAddOn] = await db
      .select()
      .from(addOnServices)
      .where(eq(addOnServices.id, id))
      .limit(1);

    if (!existingAddOn) {
      return createErrorResponse('Add-on service not found', 404);
    }

    await db.delete(addOnServices).where(eq(addOnServices.id, id));

    return createApiResponse({
      message: 'Add-on service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting add-on service:', error);
    return createErrorResponse('Failed to delete add-on service', 500);
  }
});
