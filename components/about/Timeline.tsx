import { ABOUT } from "@/constants/about";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";

export function Timeline() {
  return (
    <section className="section-alt border-t border-navy-700 py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <AnimatedSection>
          <SectionHeading
            title="Success History"
            subtitle="Our journey since 2013"
            eyebrow="Timeline"
          />
        </AnimatedSection>

        <div className="relative mx-auto max-w-5xl">
          <div
            className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent md:left-1/2 md:-translate-x-px"
            aria-hidden
          />

          <div className="space-y-10 md:space-y-14">
            {ABOUT.timeline.map((item, i) => {
              const isLeft = i % 2 === 0;

              return (
                <AnimatedSection key={item.year} delay={i * 0.05}>
                  <div className="relative md:grid md:grid-cols-2 md:items-center md:gap-12">
                    <div className={cn("hidden md:block md:pr-10", isLeft && "md:text-right")}>
                      {isLeft && <TimelineCard item={item} align="right" />}
                    </div>

                    <div
                      className="absolute left-4 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-gold-500 bg-white font-game text-xs font-bold text-gold-500 shadow-md md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                      aria-hidden
                    >
                      {item.year.slice(2)}
                    </div>

                    <div className="hidden md:block md:pl-10">
                      {!isLeft && <TimelineCard item={item} align="left" />}
                    </div>

                    <div className="ml-14 md:hidden">
                      <TimelineCard item={item} align="left" />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  item,
  align,
}: {
  item: (typeof ABOUT.timeline)[number];
  align: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "glass-card p-6 md:max-w-md",
        align === "right" && "md:ml-auto"
      )}
    >
      <span className="font-game text-sm font-bold text-gold-500">{item.year}</span>
      <h3 className="mt-1 font-display text-lg font-semibold text-ink">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
    </div>
  );
}
