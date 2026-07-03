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
