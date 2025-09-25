import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Next.js configuration for Vercel deployment
  experimental: {
    // Enable modern features
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
