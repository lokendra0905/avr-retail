"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/constants/blog";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <AnimatedSection>
      <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 280 }}>
        <Link
          href={`/blog/${post.slug}`}
          className="group block overflow-hidden rounded-2xl border border-navy-700/80 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/10"
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 font-accent text-xs font-medium uppercase tracking-wider text-ink-muted">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <h2 className="mt-3 font-display text-xl font-semibold text-ink transition-colors group-hover:text-gold-500">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 font-accent text-sm font-semibold text-gold-500">
              Read More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </span>
          </div>
        </Link>
      </motion.div>
    </AnimatedSection>
  );
}
