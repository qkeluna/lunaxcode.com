import type { NextConfig } from "next";

// Check if we're building for static export
const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  // Enable experimental features for better Cloudflare compatibility
  experimental: {
    // Optimize for Edge Runtime
    esmExternals: true,
    // Additional experimental features can be added here
  },
  
  // Conditionally enable static export mode
  ...(isStaticExport && {
    output: 'export',
    trailingSlash: true,
    // Disable features not compatible with static export
    images: {
      unoptimized: true,
    },
  }),
  
  // For non-static builds, configure normally
  ...(!isStaticExport && {
    images: {
      unoptimized: false,
      domains: [
        'localhost',
        'lunaxcode.com',
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
  }),
  
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
};

export default nextConfig;
