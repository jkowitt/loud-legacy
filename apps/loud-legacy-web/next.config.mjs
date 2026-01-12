/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Static export for Netlify drag & drop
  // output: 'export', // Removed for API routes support
  images: {
    unoptimized: true,
    domains: ['localhost', 'cdn.loud-legacy.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.loud-legacy.com',
      },
    ],
  },
  headers: async () => {
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
        ],
      },
    ];
  },
};

export default nextConfig;
