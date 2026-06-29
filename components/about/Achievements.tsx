import { ABOUT } from "@/constants/about";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

export function Achievements() {
  return (
    <section className="py-24 bg-navy-900/50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading title="Achievements" subtitle="Milestones we're proud of" />
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.achievements.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.1}>
              <div className="rounded-xl border border-navy-700 bg-navy-900/50 p-8 text-center">
                <div className="font-display text-4xl font-bold text-gold-400">
                  {item.value}
                </div>
                <p className="mt-2 text-white/60">{item.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
