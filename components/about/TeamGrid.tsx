import Image from "next/image";
import { ABOUT } from "@/constants/about";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

function leaderWatermark(role: string): string {
  if (role.includes("CEO")) return "CEO";
  if (role.includes("Director")) return "DIRECTOR";
  return "ADVISORY";
}

export function TeamGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading title="Our Leaders" subtitle="The team behind AVR's success" />
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT.team.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 0.05}>
              <div className="overflow-hidden rounded-xl border border-navy-700 bg-navy-800 shadow-sm">
                <figure className="relative bg-gradient-to-b from-white via-white to-[#f0ebe6] px-6 pb-4 pt-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-3 select-none font-display text-4xl font-bold uppercase tracking-wider text-black/[0.04] md:text-5xl"
                  >
                    {leaderWatermark(member.role)}
                  </div>
                  <div className="relative mx-auto aspect-[3/4] w-full max-w-[260px]">
                    <Image
                      src={member.image}
                      alt={`${member.name} — ${member.role} at AVR Retail`}
                      fill
                      className="object-contain object-top"
                      sizes="(max-width: 768px) 80vw, 260px"
                    />
                  </div>
                </figure>
                <div className="border-t border-navy-700 bg-navy-800 p-5">
                  <h3 className="font-semibold text-ink">{member.name}</h3>
                  <p className="text-sm font-medium text-gold-500">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
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
