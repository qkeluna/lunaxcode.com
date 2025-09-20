import { getLocalDB } from './db';
import { pricingPlans, features, processSteps, heroSection } from './schema';
import { eq } from 'drizzle-orm';

// Cache duration in seconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();

function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  return null;
}

function setCachedData<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function getPricingPlans() {
  const cacheKey = 'pricing-plans';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const db = getLocalDB();
    const plans = await db
      .select()
      .from(pricingPlans)
      .where(eq(pricingPlans.isActive, true))
      .orderBy(pricingPlans.displayOrder);

    // Parse features JSON for each plan
    const parsedPlans = plans.map(plan => ({
      ...plan,
      features: JSON.parse(plan.features),
    }));

    setCachedData(cacheKey, parsedPlans);
    return parsedPlans;
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return [];
  }
}

export async function getFeatures() {
  const cacheKey = 'features';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const db = getLocalDB();
    const featuresData = await db
      .select()
      .from(features)
      .where(eq(features.isActive, true))
      .orderBy(features.displayOrder);

    setCachedData(cacheKey, featuresData);
    return featuresData;
  } catch (error) {
    console.error('Error fetching features:', error);
    return [];
  }
}

export async function getProcessSteps() {
  const cacheKey = 'process-steps';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const db = getLocalDB();
    const steps = await db
      .select()
      .from(processSteps)
      .where(eq(processSteps.isActive, true))
      .orderBy(processSteps.displayOrder);

    setCachedData(cacheKey, steps);
    return steps;
  } catch (error) {
    console.error('Error fetching process steps:', error);
    return [];
  }
}

export async function getHeroSection() {
  const cacheKey = 'hero-section';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const db = getLocalDB();
    const [hero] = await db
      .select()
      .from(heroSection)
      .where(eq(heroSection.isActive, true))
      .limit(1);

    setCachedData(cacheKey, hero);
    return hero;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

// Clear cache function for when content is updated
export function clearCache() {
  cache.clear();
}

// Clear specific cache entry
export function clearCacheKey(key: string) {
  cache.delete(key);
}