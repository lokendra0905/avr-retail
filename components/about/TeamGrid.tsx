import Image from "next/image";
import { ABOUT } from "@/constants/about";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

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
              <div className="overflow-hidden rounded-xl border border-navy-700 bg-navy-900/50">
                <div className="relative aspect-square">
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.role} at AVR Retail`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-gold-400">{member.role}</p>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed">
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
