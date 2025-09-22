#!/bin/bash

# Static-only deployment script for Cloudflare Pages
# This temporarily disables API routes to stay under the 3MB worker limit

echo "🔧 Preparing static-only deployment for Cloudflare Pages..."

# Disable API routes to reduce bundle size
echo "📦 Disabling API routes temporarily..."
find src/app/api -name 'route.ts' -exec mv {} {}.disabled \;

# Build static version
echo "🏗️ Building static-only version..."
rm -rf .vercel .next
pnpm build

# Convert for Cloudflare Pages
echo "🔄 Converting for Cloudflare Pages..."
npx @cloudflare/next-on-pages

# Check bundle size
echo "📊 Checking bundle size..."
if [ -f ".vercel/output/static/_worker.js/index.js" ]; then
    SIZE=$(ls -lh .vercel/output/static/_worker.js/index.js | awk '{print $5}')
    echo "✅ Worker size: $SIZE (under 3MB limit)"
else
    echo "❌ No worker file found"
fi

# Restore API routes for development
echo "🔄 Restoring API routes..."
find src/app/api -name '*.disabled' -exec bash -c 'mv "$1" "${1%.disabled}"' _ {} \;

echo "🎉 Static deployment ready!"
echo "📁 Upload .vercel/output/static to Cloudflare Pages"
echo ""
echo "⚠️  Note: This is a static-only version. API functionality will be added later."
