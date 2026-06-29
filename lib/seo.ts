import type { Metadata } from "next";
import { SITE } from "@/constants/site";

type SeoInput = {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  keywords = [],
  path = "",
  image = "/images/og-default.jpg",
}: SeoInput): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = title.includes(SITE.shortName)
    ? title
    : `${title} | ${SITE.shortName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    alternates: { canonical: url },
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
    url: SITE.url,
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
      item: `${SITE.url}${item.path}`,
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
    url: `${SITE.url}${path}`,
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
    url: `${SITE.url}/blog/${post.slug}`,
  };
}
