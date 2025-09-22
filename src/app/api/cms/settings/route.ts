import { NextRequest } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { getLocalDB } from '@/lib/db';
import { siteSettings } from '@/lib/schema';
import { withAuth, createApiResponse, createErrorResponse } from '@/lib/auth';
import { z } from 'zod';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

const settingSchema = z.object({
  id: z.number().optional(),
  key: z.string().min(1),
  value: z.string().min(1),
  type: z.enum(['text', 'number', 'boolean', 'json']),
  description: z.string().optional(),
  isPublic: z.boolean(),
});

// GET - Fetch all settings
export async function GET() {
  try {
    const db = getLocalDB();
    const settings = await db
      .select()
      .from(siteSettings)
      .orderBy(asc(siteSettings.key));

    return createApiResponse(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return createErrorResponse('Failed to fetch settings', 500);
  }
}

// POST - Create new setting
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = settingSchema.parse(body);

    const db = getLocalDB();

    // Check if key already exists
    const [existingSetting] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, validatedData.key))
      .limit(1);

    if (existingSetting) {
      return createErrorResponse('Setting with this key already exists', 400);
    }

    const [newSetting] = await db.insert(siteSettings).values(validatedData).returning();

    return createApiResponse(
      { message: 'Setting created successfully', setting: newSetting },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error creating setting:', error);
    return createErrorResponse('Failed to create setting', 500);
  }
});

// PUT - Update setting
export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = settingSchema.parse(body);

    if (!validatedData.id) {
      return createErrorResponse('Setting ID is required for updates', 400);
    }

    const db = getLocalDB();

    // Check if setting exists
    const [existingSetting] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.id, validatedData.id))
      .limit(1);

    if (!existingSetting) {
      return createErrorResponse('Setting not found', 404);
    }

    const updatedSetting = {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };

    await db
      .update(siteSettings)
      .set(updatedSetting)
      .where(eq(siteSettings.id, validatedData.id));

    return createApiResponse({
      message: 'Setting updated successfully',
      setting: updatedSetting,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error updating setting:', error);
    return createErrorResponse('Failed to update setting', 500);
  }
});

// DELETE - Delete setting
export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse('Setting ID is required', 400);
    }

    const settingId = parseInt(id, 10);
    if (isNaN(settingId)) {
      return createErrorResponse('Invalid setting ID', 400);
    }

    const db = getLocalDB();

    // Check if setting exists
    const [existingSetting] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.id, settingId))
      .limit(1);

    if (!existingSetting) {
      return createErrorResponse('Setting not found', 404);
    }

    await db.delete(siteSettings).where(eq(siteSettings.id, settingId));

    return createApiResponse({
      message: 'Setting deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting setting:', error);
    return createErrorResponse('Failed to delete setting', 500);
  }
});