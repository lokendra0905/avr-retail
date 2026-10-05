import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo";
import { getAllServiceSlugs, getAllProjectPaths } from "@/lib/services";
import { BLOG_POSTS, getBlogPostPath } from "@/constants/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/services", "/portfolio", "/blog", "/contact"];

  const servicePages = getAllServiceSlugs().map((slug) => ({
    url: canonicalUrl(`/services/${slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const projectPages = getAllProjectPaths().map(({ serviceSlug, projectSlug }) => ({
    url: canonicalUrl(`/services/${serviceSlug}/${projectSlug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: canonicalUrl(getBlogPostPath(post.slug)),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages.map((path) => ({
      url: canonicalUrl(path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.9,
    })),
    ...servicePages,
    ...projectPages,
    ...blogPages,
  ];
}
