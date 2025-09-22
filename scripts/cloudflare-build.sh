#!/bin/bash

# Cloudflare Pages build script
# This script enables edge runtime and builds for Cloudflare Pages

echo "🔧 Configuring for Cloudflare Pages deployment..."

# Set Cloudflare environment variable for conditional runtime
export CF_PAGES=true
export NODE_ENV=production

# Enable edge runtime for critical API routes only (to reduce bundle size)
echo "⚡ Enabling Edge Runtime for critical API routes..."

# Only enable Edge Runtime for CMS routes that need D1 database access
find src/app/api/cms -name 'route.ts' -exec sed -i '' 's|// export const runtime = '\''edge'\'';|export const runtime = '\''edge'\'';|' {} \;
find src/app/api/cms -name 'route.ts' -exec sed -i '' 's|// // export const runtime = '\''edge'\'';|export const runtime = '\''edge'\'';|' {} \;

# Keep auth routes on Node.js runtime to avoid bundling better-auth in workers
echo "🔒 Auth routes will use Node.js runtime to reduce bundle size"

echo "✅ Edge Runtime enabled for Cloudflare compatibility"

# Build the Next.js application first
echo "🏗️ Building Next.js application..."
pnpm build

# Convert the build for Cloudflare Pages using next-on-pages
echo "🔄 Converting build for Cloudflare Pages..."
npx @cloudflare/next-on-pages

echo "🎉 Cloudflare Pages build completed successfully!"
echo "📁 Output directory: .vercel/output/static"
