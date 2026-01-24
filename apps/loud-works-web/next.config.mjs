/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@loud-legacy/shared-design-system",
    "@loud-legacy/shared-auth",
    "@loud-legacy/shared-analytics",
  ],
};

export default nextConfig;
