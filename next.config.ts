import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better Cloudflare compatibility
  experimental: {
    // Optimize for Edge Runtime
    esmExternals: true,
    // Additional experimental features can be added here
  },
  
  // For static deployment, enable export mode
  output: 'export',
  trailingSlash: true,
  
  // Disable features not compatible with static export
  images: {
    unoptimized: true,
  },
  
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
  
  // Image optimization disabled for static export
  // images config is set above for static export compatibility
  
  // Headers disabled for static export
  // async headers() - not compatible with output: 'export'
};

export default nextConfig;
