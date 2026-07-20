"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Images } from "lucide-react";
import { PAGE_BANNERS } from "@/constants/page-banners";
import { PageBanner } from "@/components/shared/PageBanner";
import { PageSection } from "@/components/shared/PageSection";
import {
  getAllProjectPaths,
  getAllServices,
  getProjectBySlug,
  galleryAsProject,
} from "@/lib/services";
import { ProjectCard } from "@/components/services/ProjectCard";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
import { CTABlock } from "@/components/shared/CTABlock";
import { cn } from "@/lib/utils";

export function PortfolioContent() {
  const services = getAllServices();
  const namedProjects = useMemo(
    () =>
      getAllProjectPaths()
        .map(({ serviceSlug, projectSlug }) => getProjectBySlug(serviceSlug, projectSlug))
        .filter(Boolean) as NonNullable<ReturnType<typeof getProjectBySlug>>[],
    []
  );

  const [filter, setFilter] = useState<string>("all");

  const filteredProjects =
    filter === "all"
      ? namedProjects
      : namedProjects.filter(({ service }) => service.slug === filter);

  const galleryOnlyServices =
    filter === "all"
      ? services.filter((s) => s.projects.length === 0 && s.gallery.length > 0)
      : services.filter(
          (s) => s.slug === filter && s.projects.length === 0 && s.gallery.length > 0
        );

  const totalCount =
    namedProjects.length +
    services.filter((s) => s.projects.length === 0 && s.gallery.length > 0).length;

  return (
    <>
      <PageBanner
        title="Our Portfolio"
        subtitle="Retail fit-outs across optical, garments, jewellery, footwear, mobile, medical, watches & more."
        image={PAGE_BANNERS.portfolio.image}
        imageAlt={PAGE_BANNERS.portfolio.alt}
      />
      <PageSection>
        <AnimatedSection>
          <SectionHeading
            title="Projects Across Categories"
            subtitle="Browse named store projects and photo galleries from every retail vertical we serve."
            eyebrow={`${totalCount}+ Works`}
          />
        </AnimatedSection>

        <div className="mb-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full px-4 py-2 font-game text-[10px] uppercase tracking-wider transition-all",
              filter === "all"
                ? "bg-gold-500 text-white shadow-md shadow-gold-500/25"
                : "border border-navy-700 bg-white text-ink-muted hover:border-gold-500/40"
            )}
          >
            All
          </button>
          {services.map((service) => {
            const count =
              service.projects.length > 0
                ? service.projects.length
                : service.gallery.length;
            const label =
              service.projects.length > 0
                ? `${service.title} (${count})`
                : `${service.title} (${count} photos)`;
            return (
              <button
                key={service.slug}
                type="button"
                onClick={() => setFilter(service.slug)}
                className={cn(
                  "rounded-full px-4 py-2 font-game text-[10px] uppercase tracking-wider transition-all",
                  filter === service.slug
                    ? "bg-gold-500 text-white shadow-md shadow-gold-500/25"
                    : "border border-navy-700 bg-white text-ink-muted hover:border-gold-500/40"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(({ service, project }) => (
            <ProjectCard
              key={`${service.slug}-${project.slug}`}
              project={project}
              serviceSlug={service.slug}
              serviceTitle={service.title}
            />
          ))}

          {galleryOnlyServices.map((service) => {
            const virtual = galleryAsProject(service);
            return (
              <AnimatedSection key={service.slug}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 280 }}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-navy-700/80 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/10"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={service.coverImage}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-game text-[9px] uppercase tracking-wider text-white backdrop-blur-sm">
                        <Images className="h-3 w-3" />
                        {service.gallery.length} photos
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-gold-500">
                        {virtual.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{virtual.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-accent text-sm font-semibold text-gold-500">
                        View Gallery
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {filteredProjects.length === 0 && galleryOnlyServices.length === 0 && (
          <p className="py-16 text-center text-ink-muted">No work in this category yet.</p>
        )}
      </PageSection>
      <PageSection variant="dark">
        <CTABlock />
      </PageSection>
    </>
  );
}
