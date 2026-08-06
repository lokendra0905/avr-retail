import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.avrretail.com" },
      { protocol: "https", hostname: "avrretail.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/services/optical-store-design", destination: "/services/eyewear-optical-retail", permanent: true },
      { source: "/services/optical-store-design/:path*", destination: "/services/eyewear-optical-retail/:path*", permanent: true },
      { source: "/services/garments-showroom-design", destination: "/services/fashion-apparel", permanent: true },
      { source: "/services/garments-showroom-design/:path*", destination: "/services/fashion-apparel/:path*", permanent: true },
      { source: "/services/jewellery-showroom-design", destination: "/services/luxury-jewellery", permanent: true },
      { source: "/services/jewellery-showroom-design/:path*", destination: "/services/luxury-jewellery/:path*", permanent: true },
      { source: "/services/shoe-showroom-design", destination: "/services/footwear-stores", permanent: true },
      { source: "/services/shoe-showroom-design/:path*", destination: "/services/footwear-stores/:path*", permanent: true },
      { source: "/services/mobile-showroom-design", destination: "/services/mobile-electronics", permanent: true },
      { source: "/services/mobile-showroom-design/:path*", destination: "/services/mobile-electronics/:path*", permanent: true },
      { source: "/services/watch-showroom-design", destination: "/services/watch-lifestyle", permanent: true },
      { source: "/services/watch-showroom-design/:path*", destination: "/services/watch-lifestyle/:path*", permanent: true },
      { source: "/services/gift-showroom-design", destination: "/services/gift-toy-stores", permanent: true },
      { source: "/services/medical-store-design", destination: "/services/beauty-cosmetics", permanent: true },
    ];
  },
};

export default nextConfig;
