import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import { getBlogPostPath } from "@/constants/blog";

type SeoInput = {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
};

/** Canonical URL with trailing slash to match Hostinger static export. */
export function canonicalUrl(path = ""): string {
  if (!path || path === "/") return `${SITE.url}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

export function buildMetadata({
  title,
  description,
  keywords = [],
  path = "",
  image = "/images/og-default.jpg",
}: SeoInput): Metadata {
  const url = canonicalUrl(path);
  const fullTitle = title.includes(SITE.shortName)
    ? title
    : `${title} | ${SITE.shortName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: `${SITE.url}${image}`, width: 1200, height: 630 }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE.url}${image}`],
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url + "/",
    logo: `${SITE.url}${SITE.logo}`,
    image: `${SITE.url}/icon-512.png`,
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.contact.address,
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    areaServed: "IN",
    priceRange: "$$",
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function buildServiceJsonLd(
  name: string,
  description: string,
  path: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "LocalBusiness", name: SITE.name },
    areaServed: "IN",
    url: canonicalUrl(path),
  };
}

export function buildArticleJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  coverImage: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: `${SITE.url}${post.coverImage}`,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    url: canonicalUrl(getBlogPostPath(post.slug)),
  };
}
