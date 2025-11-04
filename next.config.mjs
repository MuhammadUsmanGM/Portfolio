/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['aos'],
  },
  generateBuildId: async () => {
    // This helps with cache busting
    return 'build-' + Date.now();
  },
};

export default nextConfig;
