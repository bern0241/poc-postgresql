/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },

  images: {
    domains: ['bit.ly']
  },
}

module.exports = nextConfig
