import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { HOME } from "@/constants/home";
import { getFeaturedProjects } from "@/lib/services";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function FeaturedWorks() {
  const projects = getFeaturedProjects(6);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading
            title={HOME.sections.featured.title}
            subtitle={HOME.sections.featured.subtitle}
          />
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ service, project }, i) => (
            <AnimatedSection key={`${service.slug}-${project.slug}`} delay={i * 0.05}>
              <Link
                href={`/services/${service.slug}/${project.slug}`}
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
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="rounded-full bg-gold-500/20 px-3 py-1 text-xs font-medium text-gold-400">
                      {service.title}
                    </span>
                  </div>
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
                  <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
                    {project.excerpt}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/services" variant="outline">
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
