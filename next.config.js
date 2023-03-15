/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 6000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "react-challenge.human.hr",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
