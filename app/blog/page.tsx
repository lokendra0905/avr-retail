import { buildMetadata } from "@/lib/seo";
import { BLOG, BLOG_POSTS } from "@/constants/blog";
import { PAGE_BANNERS } from "@/constants/page-banners";
import { PageBanner } from "@/components/shared/PageBanner";
import { BlogCard } from "@/components/blog/BlogCard";

export const metadata = buildMetadata({
  title: BLOG.seo.title,
  description: BLOG.seo.description,
  keywords: [...BLOG.seo.keywords],
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageBanner title={BLOG.hero.title} subtitle={BLOG.hero.subtitle} image={PAGE_BANNERS.blog.image} />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
