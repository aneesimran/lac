/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'customer-assets.emergentagent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lac-ltd.co.uk',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
