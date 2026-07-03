import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/constants/blog";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <AnimatedSection>
      <Link
        href={`/blog/${post.slug}`}
        className="group block overflow-hidden rounded-xl border border-navy-700 bg-navy-900/50 transition-all hover:border-gold-500/30"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-ink-muted/80">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h2 className="mt-3 text-xl font-semibold text-ink group-hover:text-gold-400 transition-colors">
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{post.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-400">
            Read More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}
