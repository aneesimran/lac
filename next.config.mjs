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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/vehicle/lookup',
        destination: '/api/vehicle/lookup',
      },
    ];
  },
};

export default nextConfig;
