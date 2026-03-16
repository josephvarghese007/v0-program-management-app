/** @type {import('next').NextConfig} */
const nextConfig = {
  // React compiler disabled - not installed
  // reactCompiler: true,

  // Optimize images
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },

  // Enable strict mode for development
  reactStrictMode: true,

  // Compression
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Optimize production builds
  swcMinify: true,

  // Enable SWR for API routes
  experimental: {
    // Use Turbopack for faster builds (optional)
    turbopack: process.env.TURBOPACK === 'true' ? {} : undefined,
  },

  // Custom headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects (example for future use)
  async redirects() {
    return [];
  },

  // Rewrites (example for future use)
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
