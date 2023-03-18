/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  images: {
    domains: ['res.cloudinary.com'],
  },
  publicRuntimeConfig: {
    PRODUCTION_URL: process.env.PRODUCTION_URL,
    DEVELOPMENT_URL: process.env.DEVELOPMENT_URL,
  },
}

module.exports = nextConfig
