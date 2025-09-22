#!/bin/bash

# Cloudflare Pages build script
# This script enables edge runtime and builds for Cloudflare Pages

echo "🔧 Configuring for Cloudflare Pages deployment..."

# Set Cloudflare environment variable for conditional runtime
export CF_PAGES=true
export NODE_ENV=production

# Enable edge runtime for all API routes
echo "⚡ Enabling Edge Runtime for API routes..."
find src/app/api -name 'route.ts' -exec sed -i '' 's|// export const runtime = '\''edge'\'';|export const runtime = '\''edge'\'';|' {} \;
find src/app/api -name 'route.ts' -exec sed -i '' 's|// // export const runtime = '\''edge'\'';|export const runtime = '\''edge'\'';|' {} \;

echo "✅ Edge Runtime enabled for Cloudflare compatibility"

# Build the Next.js application first
echo "🏗️ Building Next.js application..."
pnpm build

# Convert the build for Cloudflare Pages using next-on-pages
echo "🔄 Converting build for Cloudflare Pages..."
npx @cloudflare/next-on-pages

echo "🎉 Cloudflare Pages build completed successfully!"
echo "📁 Output directory: .vercel/output/static"
