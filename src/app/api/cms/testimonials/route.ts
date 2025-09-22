import { NextRequest } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { getLocalDB } from '@/lib/db';
import { testimonials } from '@/lib/schema';
import { withAuth, createApiResponse, createErrorResponse } from '@/lib/auth';
import { z } from 'zod';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

const testimonialSchema = z.object({
  id: z.number().optional(),
  clientName: z.string().min(1),
  clientCompany: z.string().optional(),
  clientRole: z.string().optional(),
  testimonial: z.string().min(1),
  rating: z.number().min(1).max(5).default(5),
  avatar: z.string().optional(),
  projectType: z.string().optional(),
  displayOrder: z.number().min(0),
  isActive: z.boolean(),
});

// GET - Fetch all testimonials
export async function GET() {
  try {
    const db = getLocalDB();
    const allTestimonials = await db
      .select()
      .from(testimonials)
      .orderBy(asc(testimonials.displayOrder));

    return createApiResponse(allTestimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return createErrorResponse('Failed to fetch testimonials', 500);
  }
}

// POST - Create new testimonial
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = testimonialSchema.parse(body);

    const db = getLocalDB();

    const [newTestimonial] = await db.insert(testimonials).values(validatedData).returning();

    return createApiResponse(
      { message: 'Testimonial created successfully', testimonial: newTestimonial },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error creating testimonial:', error);
    return createErrorResponse('Failed to create testimonial', 500);
  }
});

// PUT - Update testimonial
export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = testimonialSchema.parse(body);

    if (!validatedData.id) {
      return createErrorResponse('Testimonial ID is required for updates', 400);
    }

    const db = getLocalDB();

    // Check if testimonial exists
    const [existingTestimonial] = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, validatedData.id))
      .limit(1);

    if (!existingTestimonial) {
      return createErrorResponse('Testimonial not found', 404);
    }

    const updatedTestimonial = {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };

    await db
      .update(testimonials)
      .set(updatedTestimonial)
      .where(eq(testimonials.id, validatedData.id));

    return createApiResponse({
      message: 'Testimonial updated successfully',
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error updating testimonial:', error);
    return createErrorResponse('Failed to update testimonial', 500);
  }
});

// DELETE - Delete testimonial
export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse('Testimonial ID is required', 400);
    }

    const testimonialId = parseInt(id, 10);
    if (isNaN(testimonialId)) {
      return createErrorResponse('Invalid testimonial ID', 400);
    }

    const db = getLocalDB();

    // Check if testimonial exists
    const [existingTestimonial] = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, testimonialId))
      .limit(1);

    if (!existingTestimonial) {
      return createErrorResponse('Testimonial not found', 404);
    }

    await db.delete(testimonials).where(eq(testimonials.id, testimonialId));

    return createApiResponse({
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return createErrorResponse('Failed to delete testimonial', 500);
  }
});