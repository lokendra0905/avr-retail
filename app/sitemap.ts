import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { getAllServiceSlugs, getAllProjectPaths } from "@/lib/services";
import { getAllBlogSlugs } from "@/constants/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const staticPages = ["", "/about", "/services", "/portfolio", "/blog", "/contact"];

  const servicePages = getAllServiceSlugs().map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const projectPages = getAllProjectPaths().map(({ serviceSlug, projectSlug }) => ({
    url: `${base}/services/${serviceSlug}/${projectSlug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = getAllBlogSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.9,
    })),
    ...servicePages,
    ...projectPages,
    ...blogPages,
  ];
}
