import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.WP_IMAGE_PROTOCOL === "http" ? "http" : "https",
        hostname: process.env.WP_IMAGE_HOST ?? "localhost",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
