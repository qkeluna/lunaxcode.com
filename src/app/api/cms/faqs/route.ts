import { NextRequest } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { getLocalDB } from '@/lib/db';
import { faqs } from '@/lib/schema';
import { withAuth, createApiResponse, createErrorResponse } from '@/lib/auth';
import { z } from 'zod';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

const faqSchema = z.object({
  id: z.number().optional(),
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().optional(),
  displayOrder: z.number().min(0),
  isActive: z.boolean(),
});

// GET - Fetch all FAQs
export async function GET() {
  try {
    const db = getLocalDB();
    const allFaqs = await db
      .select()
      .from(faqs)
      .orderBy(asc(faqs.displayOrder));

    return createApiResponse(allFaqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return createErrorResponse('Failed to fetch FAQs', 500);
  }
}

// POST - Create new FAQ
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = faqSchema.parse(body);

    const db = getLocalDB();

    const [newFaq] = await db.insert(faqs).values(validatedData).returning();

    return createApiResponse(
      { message: 'FAQ created successfully', faq: newFaq },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error creating FAQ:', error);
    return createErrorResponse('Failed to create FAQ', 500);
  }
});

// PUT - Update FAQ
export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = faqSchema.parse(body);

    if (!validatedData.id) {
      return createErrorResponse('FAQ ID is required for updates', 400);
    }

    const db = getLocalDB();

    // Check if FAQ exists
    const [existingFaq] = await db
      .select()
      .from(faqs)
      .where(eq(faqs.id, validatedData.id))
      .limit(1);

    if (!existingFaq) {
      return createErrorResponse('FAQ not found', 404);
    }

    const updatedFaq = {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };

    await db
      .update(faqs)
      .set(updatedFaq)
      .where(eq(faqs.id, validatedData.id));

    return createApiResponse({
      message: 'FAQ updated successfully',
      faq: updatedFaq,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error updating FAQ:', error);
    return createErrorResponse('Failed to update FAQ', 500);
  }
});

// DELETE - Delete FAQ
export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse('FAQ ID is required', 400);
    }

    const faqId = parseInt(id, 10);
    if (isNaN(faqId)) {
      return createErrorResponse('Invalid FAQ ID', 400);
    }

    const db = getLocalDB();

    // Check if FAQ exists
    const [existingFaq] = await db
      .select()
      .from(faqs)
      .where(eq(faqs.id, faqId))
      .limit(1);

    if (!existingFaq) {
      return createErrorResponse('FAQ not found', 404);
    }

    await db.delete(faqs).where(eq(faqs.id, faqId));

    return createApiResponse({
      message: 'FAQ deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return createErrorResponse('Failed to delete FAQ', 500);
  }
});