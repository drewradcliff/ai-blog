/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [{ 
      hostname: process.env.AI_BLOG_API_HOST
    }]
  }
}

module.exports = nextConfig
