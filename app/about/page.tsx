import { ABOUT } from "@/constants/about";
import { PAGE_BANNERS } from "@/constants/page-banners";
import { buildMetadata } from "@/lib/seo";
import { PageBanner } from "@/components/shared/PageBanner";
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
      <PageBanner title={ABOUT.hero.title} subtitle={ABOUT.hero.subtitle} image={PAGE_BANNERS.about.image} />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-ink">{ABOUT.company.title}</h2>
            <div className="mt-6 space-y-4 max-w-4xl">
              {ABOUT.company.paragraphs.map((p, i) => (
                <p key={i} className="text-ink-muted leading-relaxed">{p}</p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      <VisionMission />
      <Achievements />
      <Timeline />
      <TeamGrid />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CTABlock />
        </div>
      </section>
    </>
  );
}
