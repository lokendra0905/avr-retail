import { buildMetadata } from "@/lib/seo";
import { BLOG, BLOG_POSTS } from "@/constants/blog";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { BlogCard } from "@/components/blog/BlogCard";

export const metadata = buildMetadata({
  title: BLOG.seo.title,
  description: BLOG.seo.description,
  keywords: [...BLOG.seo.keywords],
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            {BLOG.hero.title}
          </h1>
          <p className="mt-4 text-xl text-white/60">{BLOG.hero.subtitle}</p>
        </AnimatedSection>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
