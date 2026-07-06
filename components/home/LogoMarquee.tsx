"use client";

import Image from "next/image";
import { HOME } from "@/constants/home";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

export function LogoMarquee() {
  const logos = [...HOME.clientLogos, ...HOME.clientLogos];

  return (
    <section className="overflow-hidden border-y border-navy-700 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading
            title={HOME.sections.clients.title}
            subtitle={HOME.sections.clients.subtitle}
            eyebrow="Trusted By"
          />
        </AnimatedSection>
      </div>
      <div className="relative mt-2">
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-navy-950 to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-navy-950 to-transparent" />
        <div className="flex animate-marquee items-center gap-10 py-2">
          {logos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-navy-700/60 bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} — AVR Retail client`}
                width={140}
                height={60}
                className="max-h-12 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
