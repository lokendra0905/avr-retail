import { PAGE_KEYWORDS } from "@/constants/seo-keywords";
import generated from "@/constants/blog-posts.generated.json";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  date: string;
  coverImage: string;
  author: string;
  content: string[];
  seo: { title: string; description: string; keywords: string[] };
};

export const BLOG_POSTS: BlogPost[] = generated as BlogPost[];

/** Legacy path segment from the original avrretail.com blog URLs. */
export const BLOG_CATEGORY_SLUG = "optical-retail-store";

/** Posts published at /blog/{slug} (not under optical-retail-store). */
const BLOG_ROOT_PATH_SLUGS = new Set([
  "optical-showroom-design-ideas",
  "retail-fit-out-company-in-india",
  "turnkey-retail-fit-out-services-india",
  "jewellery-showroom-interior-design",
  "top-commercial-interior-design-in-india",
  "jewellery-shop-interior-design",
  "complete-guide-to-retail-fit-out-in-india",
  "turnkey-retail-interior-design-cost-india",
  "best-retail-fit-out-company-in-india",
]);

export function getBlogPostPath(slug: string): string {
  if (BLOG_ROOT_PATH_SLUGS.has(slug)) return `/blog/${slug}`;
  return `/blog/${BLOG_CATEGORY_SLUG}/${slug}`;
}

export function getBlogSlugsForRootRoute(): string[] {
  return BLOG_POSTS.filter((p) => BLOG_ROOT_PATH_SLUGS.has(p.slug)).map((p) => p.slug);
}

export function getBlogSlugsForCategoryRoute(): string[] {
  return BLOG_POSTS.filter((p) => !BLOG_ROOT_PATH_SLUGS.has(p.slug)).map((p) => p.slug);
}

export const BLOG = {
  seo: {
    title: "Blog | Retail Design Insights | AVR Retail",
    description:
      "Expert insights on optical showroom design, retail space planning, and shop interior design from AVR Retail — same articles from avrretail.com.",
    keywords: [PAGE_KEYWORDS.blog.primary, ...PAGE_KEYWORDS.blog.secondary],
  },
  hero: {
    title: "Our Blog",
    subtitle: "Insights on optical retail design, space planning, and industry trends",
  },
} as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
