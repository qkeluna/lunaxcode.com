#!/bin/bash

# Pure static deployment script for Cloudflare Pages
# This creates a purely static export without any server-side code

echo "🔧 Preparing pure static export for Cloudflare Pages..."

# Disable API routes completely
echo "📦 Removing API routes temporarily..."
if [ -d "src/app/api" ]; then
    mv src/app/api /tmp/api.backup.$$
fi

# Also remove any .disabled files that might interfere
find src/app -name "*.disabled" -delete

# Build pure static export
echo "🏗️ Building pure static export..."
rm -rf .next out
pnpm build

# Check if build succeeded
if [ ! -d "out" ]; then
    echo "❌ Static export failed"
    # Restore API routes
    if [ -d "/tmp/api.backup.$$" ]; then
        mv /tmp/api.backup.$$ src/app/api
    fi
    exit 1
fi

# Check output size
echo "📊 Checking static export size..."
if [ -d "out" ]; then
    SIZE=$(du -sh out | awk '{print $1}')
    echo "✅ Static export size: $SIZE"
    echo "📁 Static files ready in ./out directory"
else
    echo "❌ No static export found"
fi

# Restore API routes
echo "🔄 Restoring API routes..."
if [ -d "/tmp/api.backup.$$" ]; then
    mv /tmp/api.backup.$$ src/app/api
fi

echo "🎉 Pure static deployment ready!"
echo "📁 Upload ./out directory to Cloudflare Pages"
echo ""
echo "✅ This is a pure static site with NO server-side code"
echo "✅ No 3MB worker limit issues"
echo "⚠️  No API functionality (purely static HTML/CSS/JS)"
