/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "trending-movie-trailers.vercel.app"],
  },
};

module.exports = nextConfig;
