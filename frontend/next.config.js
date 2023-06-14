/** @type {import('next').NextConfig} */
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
    domains: ['assets.coingecko.com', 'img.decrypt.co'],
  },
}

module.exports = nextConfig
