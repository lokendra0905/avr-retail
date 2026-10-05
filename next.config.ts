import type { NextConfig } from "next";

/** Set STATIC_EXPORT=1 when building for Hostinger static hosting (public_html). */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const legacyRedirects = [
  { source: "/services/optical-store-design", destination: "/services/eyewear-optical-retail" },
  { source: "/services/optical-store-design/:path*", destination: "/services/eyewear-optical-retail/:path*" },
  { source: "/services/garments-showroom-design", destination: "/services/fashion-apparel" },
  { source: "/services/garments-showroom-design/:path*", destination: "/services/fashion-apparel/:path*" },
  { source: "/services/jewellery-showroom-design", destination: "/services/luxury-jewellery" },
  { source: "/services/jewellery-showroom-design/:path*", destination: "/services/luxury-jewellery/:path*" },
  { source: "/services/shoe-showroom-design", destination: "/services/footwear-stores" },
  { source: "/services/shoe-showroom-design/:path*", destination: "/services/footwear-stores/:path*" },
  { source: "/services/mobile-showroom-design", destination: "/services/mobile-electronics" },
  { source: "/services/mobile-showroom-design/:path*", destination: "/services/mobile-electronics/:path*" },
  { source: "/services/watch-showroom-design", destination: "/services/watch-lifestyle" },
  { source: "/services/watch-showroom-design/:path*", destination: "/services/watch-lifestyle/:path*" },
  { source: "/services/gift-showroom-design", destination: "/services/gift-toy-stores" },
  { source: "/services/medical-store-design", destination: "/services/beauty-cosmetics" },
  {
    source: "/blog/optical-retail-store/optical-showroom-design-ideas",
    destination: "/blog/optical-showroom-design-ideas",
  },
  {
    source: "/blog/complete-guide-retail-fit-out-india",
    destination: "/blog/complete-guide-to-retail-fit-out-in-india",
  },
  {
    source: "/blog/how-to-choose-best-retail-fit-out-company-india",
    destination: "/blog/best-retail-fit-out-company-in-india",
  },
] as const;

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
      }
    : {}),
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      { protocol: "https", hostname: "www.avrretail.com" },
      { protocol: "https", hostname: "avrretail.com" },
    ],
  },
  ...(!isStaticExport
    ? {
        async redirects() {
          return legacyRedirects.map((r) => ({ ...r, permanent: true }));
        },
      }
    : {}),
};

export default nextConfig;
