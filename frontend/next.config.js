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
  env: {
    adminToken: '14|bcy2ucCe1qO0FGljdSkGoAAhE43XKPhcxnU3GKKg',
    backendHost: 'http://localhost:80',
  },
}
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer(nextConfig)
