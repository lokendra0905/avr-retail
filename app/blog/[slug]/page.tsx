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
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              <span className="mx-2">·</span>
              {post.author}
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
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
            <div className="prose prose-invert max-w-none">
              {post.content.map((paragraph, i) => (
                <p key={i} className="mb-6 text-lg text-white/70 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimatedSection>

          <div className="mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
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
