"use client";

import Image from "next/image";
import { HOME } from "@/constants/home";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

export function LogoMarquee() {
  const logos = [...HOME.clientLogos, ...HOME.clientLogos];

  return (
    <section className="overflow-hidden border-y border-navy-700 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading
            title={HOME.sections.clients.title}
            subtitle={HOME.sections.clients.subtitle}
          />
        </AnimatedSection>
      </div>
      <div className="relative mt-4">
        <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-navy-950 to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-navy-950 to-transparent" />
        <div className="flex animate-marquee items-center gap-12">
          {logos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-navy-700 bg-white px-4 py-3"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} — AVR Retail client`}
                width={140}
                height={60}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
