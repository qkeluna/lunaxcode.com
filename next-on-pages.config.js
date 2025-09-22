/**
 * @type {import('@cloudflare/next-on-pages').Config}
 */
const config = {
  // Optimize bundle size for Cloudflare Workers 3MB limit
  skipMiddleware: false,
  
  // Exclude large dependencies from the worker bundle
  workerExcludes: [
    // Exclude development and testing dependencies
    'eslint*',
    'prettier*',
    '@types/*',
    'typescript',
    'jest*',
    'testing-library*',
    
    // Exclude build tools
    'webpack*',
    'babel*',
    'postcss*',
    'autoprefixer*',
    
    // Exclude large UI libraries that aren't needed in workers
    'framer-motion',
    'lucide-react',
    'class-variance-authority',
    
    // Exclude Node.js specific modules
    'fs-extra',
    'chokidar',
    'glob',
  ],
  
  // Optimize the worker bundle
  optimizeWorker: true,
  
  // Split large functions into separate workers if possible
  splitFunctions: true,
};

module.exports = config;
