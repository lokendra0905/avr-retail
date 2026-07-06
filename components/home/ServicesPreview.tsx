"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getAllServices } from "@/lib/services";
import { HOME } from "@/constants/home";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

export function ServicesPreview() {
  const services = getAllServices();

  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading
            title={HOME.sections.services.title}
            subtitle={HOME.sections.services.subtitle}
            eyebrow="What We Do"
          />
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <AnimatedSection key={service.slug} delay={i * 0.06} direction="up">
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 280 }}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-navy-700/80 bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-gold-500/10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={service.coverImage}
                      alt={`${service.title} — showroom design services by AVR Retail India`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="img-card-overlay absolute inset-0" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-lg font-semibold text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="line-clamp-2 text-sm leading-relaxed text-ink-muted">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-accent text-sm font-semibold text-gold-500">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
