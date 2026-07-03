import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getAllServices } from "@/lib/services";
import { HOME } from "@/constants/home";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

export function ServicesPreview() {
  const services = getAllServices();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading
            title={HOME.sections.services.title}
            subtitle={HOME.sections.services.subtitle}
          />
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <AnimatedSection key={service.slug} delay={i * 0.05}>
              <Link
                href={`/services/${service.slug}`}
                className="group block overflow-hidden rounded-xl border border-navy-700 bg-navy-900/50 transition-all hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.coverImage}
                    alt={`${service.title} — showroom design services by AVR Retail India`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-ink group-hover:text-gold-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
                    {service.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold-400">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
