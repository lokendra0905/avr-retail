"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import type { Project } from "@/constants/services";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

type ProjectCardProps = {
  project: Project;
  serviceSlug: string;
  serviceTitle?: string;
};

export function ProjectCard({ project, serviceSlug, serviceTitle }: ProjectCardProps) {
  return (
    <AnimatedSection>
      <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 280 }}>
        <Link
          href={`/services/${serviceSlug}/${project.slug}`}
          className="group block overflow-hidden rounded-2xl border border-navy-700/80 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/10"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.coverImage}
              alt={project.seo.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="img-card-overlay absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {serviceTitle && (
              <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-game text-[9px] uppercase tracking-wider text-white backdrop-blur-sm">
                {serviceTitle}
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-gold-500">
              {project.title}
            </h3>
            {project.location && (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-ink-muted">
                <MapPin className="h-3.5 w-3.5 text-gold-500" />
                {project.location}
              </p>
            )}
            <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{project.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-accent text-sm font-semibold text-gold-500">
              View Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </span>
          </div>
        </Link>
      </motion.div>
    </AnimatedSection>
  );
}
