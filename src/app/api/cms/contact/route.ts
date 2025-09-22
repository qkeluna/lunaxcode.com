import { NextRequest } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { getLocalDB } from '@/lib/db';
import { contactInfo } from '@/lib/schema';
import { withAuth, createApiResponse, createErrorResponse } from '@/lib/auth';
import { z } from 'zod';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

const contactSchema = z.object({
  id: z.number().optional(),
  type: z.enum(['email', 'phone', 'address', 'social']),
  label: z.string().min(1),
  value: z.string().min(1),
  icon: z.string().optional(),
  isPrimary: z.boolean(),
  displayOrder: z.number().min(0),
  isActive: z.boolean(),
});

// GET - Fetch all contact info
export async function GET() {
  try {
    const db = getLocalDB();
    const contacts = await db
      .select()
      .from(contactInfo)
      .orderBy(asc(contactInfo.displayOrder));

    return createApiResponse(contacts);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return createErrorResponse('Failed to fetch contact info', 500);
  }
}

// POST - Create new contact info
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const db = getLocalDB();

    const [newContact] = await db.insert(contactInfo).values(validatedData).returning();

    return createApiResponse(
      { message: 'Contact info created successfully', contact: newContact },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error creating contact info:', error);
    return createErrorResponse('Failed to create contact info', 500);
  }
});

// PUT - Update contact info
export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    if (!validatedData.id) {
      return createErrorResponse('Contact info ID is required for updates', 400);
    }

    const db = getLocalDB();

    // Check if contact info exists
    const [existingContact] = await db
      .select()
      .from(contactInfo)
      .where(eq(contactInfo.id, validatedData.id))
      .limit(1);

    if (!existingContact) {
      return createErrorResponse('Contact info not found', 404);
    }

    const updatedContact = {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };

    await db
      .update(contactInfo)
      .set(updatedContact)
      .where(eq(contactInfo.id, validatedData.id));

    return createApiResponse({
      message: 'Contact info updated successfully',
      contact: updatedContact,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error updating contact info:', error);
    return createErrorResponse('Failed to update contact info', 500);
  }
});

// DELETE - Delete contact info
export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse('Contact info ID is required', 400);
    }

    const contactId = parseInt(id, 10);
    if (isNaN(contactId)) {
      return createErrorResponse('Invalid contact info ID', 400);
    }

    const db = getLocalDB();

    // Check if contact info exists
    const [existingContact] = await db
      .select()
      .from(contactInfo)
      .where(eq(contactInfo.id, contactId))
      .limit(1);

    if (!existingContact) {
      return createErrorResponse('Contact info not found', 404);
    }

    await db.delete(contactInfo).where(eq(contactInfo.id, contactId));

    return createApiResponse({
      message: 'Contact info deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting contact info:', error);
    return createErrorResponse('Failed to delete contact info', 500);
  }
});