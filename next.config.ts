import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better Cloudflare compatibility
  experimental: {
    // Optimize for Edge Runtime
    esmExternals: true,
    // Additional experimental features can be added here
  },
  
  // Optimize for Cloudflare Pages deployment (use standalone for API routes)
  // output: 'export', // Don't use this - we have API routes
  
  // Configure for Cloudflare environment
  env: {
    // These will be replaced by actual environment variables in production
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_DATABASE_ID: process.env.CLOUDFLARE_DATABASE_ID,
  },
  
  // Webpack configuration for compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Avoid bundling server-only modules on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    return config;
  },
  
  // Image optimization for Cloudflare
  images: {
    // Use default Next.js Image Optimization API
    unoptimized: false,
    
    // Configure for production use
    domains: [
      'localhost',
      'lunaxcode.com',
      // Add any CDN domains you use
    ],
  },
  
  // Headers for better security and caching
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
