import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.avrretail.com" },
      { protocol: "https", hostname: "avrretail.com" },
    ],
  },
};

export default nextConfig;
