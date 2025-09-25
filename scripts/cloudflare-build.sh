#!/bin/bash

# Simplified Cloudflare Pages build script
# This script builds for Cloudflare Pages deployment

echo "🔧 Building for Cloudflare Pages deployment..."

# Set environment variables
export NODE_ENV=production

# Build the Next.js application
echo "🏗️ Building Next.js application..."
pnpm build

echo "🎉 Build completed successfully!"
echo "📁 Deploy the 'out' directory to Cloudflare Pages"
