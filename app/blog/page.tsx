import { buildMetadata } from "@/lib/seo";
import { BLOG, BLOG_POSTS } from "@/constants/blog";
import { PAGE_BANNERS } from "@/constants/page-banners";
import { PageBanner } from "@/components/shared/PageBanner";
import { PageSection } from "@/components/shared/PageSection";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
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
      <PageSection>
        <AnimatedSection>
          <SectionHeading
            title="Latest Articles"
            subtitle="Insights on optical retail design, space planning, and industry trends"
            eyebrow="Insights"
          />
        </AnimatedSection>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </PageSection>
    </>
  );
}
