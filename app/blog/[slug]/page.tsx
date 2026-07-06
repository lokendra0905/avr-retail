import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import {
  buildMetadata,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { getAllBlogSlugs, getBlogPost } from "@/constants/blog";
import { PageBanner } from "@/components/shared/PageBanner";
import { PageIntro } from "@/components/shared/PageIntro";
import { PageSection } from "@/components/shared/PageSection";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTABlock } from "@/components/shared/CTABlock";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    path: `/blog/${slug}`,
    image: post.coverImage,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleJsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.description,
    slug: post.slug,
    date: post.date,
    coverImage: post.coverImage,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <PageBanner title={post.title} image={post.coverImage} imageAlt={post.title} />
      <PageIntro items={[{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${slug}` }]}>
        <div className="flex flex-wrap items-center gap-3 font-accent text-sm text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gold-500" />
            {new Date(post.date).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="text-navy-700">·</span>
          <span>{post.author}</span>
        </div>
      </PageIntro>

      <PageSection containerClassName="max-w-4xl">
        <AnimatedSection>
          <article className="prose-custom">
            {post.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="mb-4 mt-12 font-game text-xl font-bold uppercase tracking-wide text-ink md:text-2xl">
                    {block.slice(3)}
                  </h2>
                );
              }
              if (block.startsWith("### ")) {
                return (
                  <h3 key={i} className="mb-3 mt-8 font-display text-lg font-semibold text-ink">
                    {block.slice(4)}
                  </h3>
                );
              }
              return (
                <p key={i} className="mb-6 text-lg leading-relaxed text-ink-muted">
                  {block}
                </p>
              );
            })}
          </article>
        </AnimatedSection>

        <Link
          href="/blog"
          className="mt-10 inline-flex items-center gap-2 font-game-alt text-sm font-semibold uppercase tracking-wider text-gold-500 transition-colors hover:text-gold-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </PageSection>

      <PageSection variant="alt">
        <CTABlock />
      </PageSection>
    </>
  );
}
