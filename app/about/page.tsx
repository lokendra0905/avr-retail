import { ABOUT } from "@/constants/about";
import { PAGE_BANNERS } from "@/constants/page-banners";
import { buildMetadata } from "@/lib/seo";
import { PageBanner } from "@/components/shared/PageBanner";
import { PageSection } from "@/components/shared/PageSection";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";
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
      <PageSection>
        <AnimatedSection>
          <SectionHeading title={ABOUT.company.title} align="left" eyebrow="Why Us" />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-5">
              {ABOUT.company.paragraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-ink-muted">{p}</p>
              ))}
            </div>
            <div className="glass-card p-8">
              <p className="font-game text-xs uppercase tracking-[0.3em] text-gold-500">Since 2013</p>
              <p className="mt-4 font-display text-3xl font-bold leading-tight text-ink">
                India&apos;s trusted partner for{" "}
                <span className="text-gradient-brand">retail interiors</span>
              </p>
              <p className="mt-4 text-ink-muted leading-relaxed">
                From optical boutiques to luxury showrooms — design, manufacture &amp; install under one roof.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </PageSection>
      <VisionMission />
      <Achievements />
      <Timeline />
      <TeamGrid />
      <PageSection>
        <CTABlock />
      </PageSection>
    </>
  );
}
