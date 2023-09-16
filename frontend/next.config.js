/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
    ],
    domains: [
      'assets.coingecko.com',
      'img.decrypt.co',
      'cdn.jwplayer.com',
      'res.cloudinary.com',
    ],
  },
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:80/api/:path*',
      },
    ]
  },
}
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer(nextConfig)
