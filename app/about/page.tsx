import { buildMetadata } from "@/lib/seo";
import { ABOUT } from "@/constants/about";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { VisionMission } from "@/components/about/VisionMission";
import { TeamGrid } from "@/components/about/TeamGrid";
import { Timeline } from "@/components/about/Timeline";
import { Achievements } from "@/components/about/Achievements";
import { CTABlock } from "@/components/shared/CTABlock";

export const metadata = buildMetadata({
  title: ABOUT.seo.title,
  description: ABOUT.seo.description,
  keywords: [...ABOUT.seo.keywords],
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
              {ABOUT.hero.title}
            </h1>
            <p className="mt-4 text-xl text-white/60">{ABOUT.hero.subtitle}</p>
          </AnimatedSection>
          <AnimatedSection className="mt-16">
            <h2 className="font-display text-2xl font-bold text-white">
              {ABOUT.company.title}
            </h2>
            <div className="mt-6 space-y-4 max-w-4xl">
              {ABOUT.company.paragraphs.map((p, i) => (
                <p key={i} className="text-white/70 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      <VisionMission />
      <Achievements />
      <Timeline />
      <TeamGrid />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CTABlock />
        </div>
      </section>
    </>
  );
}
