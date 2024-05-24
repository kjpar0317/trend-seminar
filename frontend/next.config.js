/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "daisyui.com",
      },
      {
        hostname: "image.tmdb.org",
      },
      {
        hostname: "placehold.co",
      },
      // process.env.WORDPRESS_API_URL.match(/(http(?:s)?:\/\/)(.*)/)[2], // Valid WP Image domain.
    ],
  },
};

module.exports = nextConfig;
