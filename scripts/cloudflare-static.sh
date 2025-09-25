#!/bin/bash

# Simple static deployment for Cloudflare Pages
# Uses environment variable to control build mode

echo "🔧 Building static export for Cloudflare Pages..."

# Set environment variable for static export
export STATIC_EXPORT=true

# Temporarily remove API routes for static export
echo "📦 Temporarily removing API routes..."
if [ -d "src/app/api" ]; then
    mv src/app/api /tmp/api-backup-$$
fi

# Build with static export mode
echo "🏗️ Building Next.js in static export mode..."
pnpm build

# Restore API routes
echo "🔄 Restoring API routes..."
if [ -d "/tmp/api-backup-$$" ]; then
    mv /tmp/api-backup-$$ src/app/api
fi

echo "🎉 Static export completed!"
echo "📁 Static files are in ./out directory"
