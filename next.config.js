/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: ['assets.coingecko.com']
  }
}

module.exports = nextConfig
