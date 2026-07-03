import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import {
  buildMetadata,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { getAllBlogSlugs, getBlogPost } from "@/constants/blog";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <Breadcrumbs
            items={[
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${slug}` },
            ]}
            className="mb-8"
          />

          <AnimatedSection>
            <div className="flex items-center gap-2 text-sm text-ink-muted/80">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              <span className="mx-2">·</span>
              {post.author}
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </AnimatedSection>

          <AnimatedSection className="mt-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-navy-700">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-12">
            <div className="max-w-none">
              {post.content.map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2 key={i} className="mb-4 mt-10 font-display text-2xl font-bold text-ink">
                      {block.slice(3)}
                    </h2>
                  );
                }
                if (block.startsWith("### ")) {
                  return (
                    <h3 key={i} className="mb-3 mt-8 text-xl font-semibold text-ink">
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
            </div>
          </AnimatedSection>

          <div className="mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gold-500 transition-colors hover:text-gold-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </article>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CTABlock />
        </div>
      </section>
    </>
  );
}
