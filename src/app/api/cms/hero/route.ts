import { NextRequest } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { getLocalDB } from '@/lib/db';
import { heroSection } from '@/lib/schema';
import { withAuth, createApiResponse, createErrorResponse } from '@/lib/auth';
import { z } from 'zod';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

const heroSchema = z.object({
  id: z.number().optional(),
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  ctaText: z.string().min(1),
  ctaVariant: z.string().default('default'),
  secondaryCtaText: z.string().optional(),
  secondaryCtaVariant: z.string().default('outline'),
  backgroundVideo: z.string().optional(),
  isActive: z.boolean(),
});

// GET - Fetch all hero sections
export async function GET() {
  try {
    const db = getLocalDB();
    const heroes = await db
      .select()
      .from(heroSection)
      .orderBy(asc(heroSection.id));

    return createApiResponse(heroes);
  } catch (error) {
    console.error('Error fetching hero sections:', error);
    return createErrorResponse('Failed to fetch hero sections', 500);
  }
}

// POST - Create new hero section
export const POST = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = heroSchema.parse(body);

    const db = getLocalDB();

    const [newHero] = await db.insert(heroSection).values(validatedData).returning();

    return createApiResponse(
      { message: 'Hero section created successfully', hero: newHero },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error creating hero section:', error);
    return createErrorResponse('Failed to create hero section', 500);
  }
});

// PUT - Update hero section
export const PUT = withAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validatedData = heroSchema.parse(body);

    if (!validatedData.id) {
      return createErrorResponse('Hero section ID is required for updates', 400);
    }

    const db = getLocalDB();

    // Check if hero section exists
    const [existingHero] = await db
      .select()
      .from(heroSection)
      .where(eq(heroSection.id, validatedData.id))
      .limit(1);

    if (!existingHero) {
      return createErrorResponse('Hero section not found', 404);
    }

    const updatedHero = {
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };

    await db
      .update(heroSection)
      .set(updatedHero)
      .where(eq(heroSection.id, validatedData.id));

    return createApiResponse({
      message: 'Hero section updated successfully',
      hero: updatedHero,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(`Validation error: ${error.issues.map(e => e.message).join(', ')}`, 400);
    }
    console.error('Error updating hero section:', error);
    return createErrorResponse('Failed to update hero section', 500);
  }
});

// DELETE - Delete hero section
export const DELETE = withAuth(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse('Hero section ID is required', 400);
    }

    const heroId = parseInt(id, 10);
    if (isNaN(heroId)) {
      return createErrorResponse('Invalid hero section ID', 400);
    }

    const db = getLocalDB();

    // Check if hero section exists
    const [existingHero] = await db
      .select()
      .from(heroSection)
      .where(eq(heroSection.id, heroId))
      .limit(1);

    if (!existingHero) {
      return createErrorResponse('Hero section not found', 404);
    }

    await db.delete(heroSection).where(eq(heroSection.id, heroId));

    return createApiResponse({
      message: 'Hero section deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting hero section:', error);
    return createErrorResponse('Failed to delete hero section', 500);
  }
});