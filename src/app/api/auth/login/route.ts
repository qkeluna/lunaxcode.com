import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { getLocalDB } from '@/lib/db';
import { cmsUsers } from '@/lib/schema';
import { generateToken, createApiResponse, createErrorResponse } from '@/lib/auth';

// Enable Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return createErrorResponse('Username and password are required', 400);
    }

    // Get database instance
    const db = getLocalDB();

    // Find user by username
    const [user] = await db
      .select()
      .from(cmsUsers)
      .where(eq(cmsUsers.username, username))
      .limit(1);

    if (!user) {
      return createErrorResponse('Invalid credentials', 401);
    }

    // Check if user is active
    if (!user.isActive) {
      return createErrorResponse('Account is disabled', 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return createErrorResponse('Invalid credentials', 401);
    }

    // Update last login
    await db
      .update(cmsUsers)
      .set({ lastLogin: new Date().toISOString() })
      .where(eq(cmsUsers.id, user.id));

    // Generate JWT token
    const tokenUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(tokenUser);

    return createApiResponse({
      message: 'Login successful',
      token,
      user: tokenUser,
    });

  } catch (error) {
    console.error('Login error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}