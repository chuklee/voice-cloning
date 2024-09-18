/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'img.youtube.com',
      },
      {
        hostname: 'siecledigital.fr',
      }
    ],
  },
};

export default nextConfig;
