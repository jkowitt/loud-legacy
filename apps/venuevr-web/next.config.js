/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@shared": require("path").join(__dirname, "..", "shared")
    };
    return config;
  }
};

module.exports = nextConfig;
