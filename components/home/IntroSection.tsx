import { Box, Layout, Store, Signpost } from "lucide-react";
import { HOME } from "@/constants/home";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/Button";

const iconMap = {
  box: Box,
  layout: Layout,
  store: Store,
  signpost: Signpost,
};

export function IntroSection() {
  const { intro } = HOME;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <SectionHeading title={intro.title} align="left" />
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              {intro.paragraphs.map((p, i) => (
                <p key={i} className="text-ink-muted leading-relaxed">
                  {p}
                </p>
              ))}
              <Button href="/about" variant="outline" className="mt-4">
                About Our Company
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {intro.capabilities.map((cap, i) => {
                const Icon = iconMap[cap.icon];
                return (
                  <AnimatedSection key={cap.title} delay={i * 0.1}>
                    <div className="rounded-xl border border-navy-700 bg-navy-900/50 p-6 transition-colors hover:border-gold-500/30">
                      <Icon className="h-8 w-8 text-gold-500" />
                      <h3 className="mt-4 font-semibold text-ink">{cap.title}</h3>
                      <p className="mt-2 text-sm text-ink-muted">{cap.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
