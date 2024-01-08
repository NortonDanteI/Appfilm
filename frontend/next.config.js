/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
}

module.exports = nextConfig
