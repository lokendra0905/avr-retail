import Image from "next/image";
import { ABOUT } from "@/constants/about";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

export function TeamGrid() {
  return (
    <section className="section-alt py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <AnimatedSection>
          <SectionHeading title="Our Leaders" subtitle="The team behind AVR's success" eyebrow="Leadership" />
        </AnimatedSection>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {ABOUT.team.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 0.05}>
              <div className="glass-card overflow-hidden">
                <figure className="relative aspect-[3/4] w-full overflow-hidden bg-[#f0ebe6]">
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.role} at AVR Retail`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 16vw"
                  />
                </figure>
                <div className="border-t border-navy-700/80 bg-white p-4">
                  <h3 className="font-display text-base font-semibold text-ink">{member.name}</h3>
                  <p className="font-accent text-xs font-medium text-gold-500">{member.role}</p>
                  <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-ink-muted">
                    {member.bio}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
