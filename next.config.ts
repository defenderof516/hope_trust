import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-9aa82d64f38146e3b49ffa5560be01d2.r2.dev",
        pathname: "/gallery/**",
      },
      {
        protocol: "https",
        hostname: "pub-9aa82d64f38146e3b49ffa5560be01d2.r2.dev",
        pathname: "/video/**",
      },
    ],
  },
};

export default nextConfig;
