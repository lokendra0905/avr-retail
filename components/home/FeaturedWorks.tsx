"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { HOME } from "@/constants/home";
import { getFeaturedProjects } from "@/lib/services";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function FeaturedWorks() {
  const projects = getFeaturedProjects(6);

  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading
            title={HOME.sections.featured.title}
            subtitle={HOME.sections.featured.subtitle}
            eyebrow="Portfolio"
          />
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ service, project }, i) => (
            <AnimatedSection key={`${service.slug}-${project.slug}`} delay={i * 0.06}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 280 }}>
                <Link
                  href={`/services/${service.slug}/${project.slug}`}
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
                    <div className="img-card-overlay absolute inset-0" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                      <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 font-accent text-xs font-medium text-white backdrop-blur-md">
                        {service.title}
                      </span>
                    </div>
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
                  </div>
                </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button href="/portfolio" variant="outline">
            View Full Portfolio
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
