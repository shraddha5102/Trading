/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com', 'assets.coingecko.com'],
  },
  // Strict mode for better development experience
  reactStrictMode: true,
  // Enable SWC minification for better performance
  swcMinify: true,
}

module.exports = nextConfig