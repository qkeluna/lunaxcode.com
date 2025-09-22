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

# Build the application with Cloudflare-specific settings
echo "🏗️ Building Next.js application for Cloudflare Pages..."
pnpm build

echo "🎉 Build completed successfully!"
