import { ABOUT } from "@/constants/about";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

export function Timeline() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading title="Success History" subtitle="Our journey since 2013" />
        </AnimatedSection>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gold-500/30 md:left-1/2" />
          <div className="space-y-8">
            {ABOUT.timeline.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 0.05}>
                <div
                  className={`relative flex flex-col md:flex-row gap-4 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="md:w-1/2 md:pr-12 md:text-right">
                    {i % 2 === 0 && (
                      <div className="ml-12 md:ml-0 rounded-xl border border-navy-700 bg-navy-900/50 p-5">
                        <span className="text-gold-400 font-bold">{item.year}</span>
                        <h3 className="mt-1 font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm text-white/60">{item.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-950">
                    {item.year.slice(2)}
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    {i % 2 !== 0 && (
                      <div className="ml-12 md:ml-0 rounded-xl border border-navy-700 bg-navy-900/50 p-5">
                        <span className="text-gold-400 font-bold">{item.year}</span>
                        <h3 className="mt-1 font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm text-white/60">{item.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
