import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { Project } from "@/constants/services";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

type ProjectCardProps = {
  project: Project;
  serviceSlug: string;
};

export function ProjectCard({ project, serviceSlug }: ProjectCardProps) {
  return (
    <AnimatedSection>
      <Link
        href={`/services/${serviceSlug}/${project.slug}`}
        className="group block overflow-hidden rounded-xl border border-navy-700 bg-navy-900/50 transition-all hover:border-gold-500/30"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.seo.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-ink group-hover:text-gold-400 transition-colors">
            {project.title}
          </h3>
          {project.location && (
            <p className="mt-1 flex items-center gap-1 text-sm text-ink-muted/80">
              <MapPin className="h-3 w-3" />
              {project.location}
            </p>
          )}
          <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{project.excerpt}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold-400">
            View Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}
